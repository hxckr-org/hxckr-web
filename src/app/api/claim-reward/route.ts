import { NextResponse } from "next/server";
import { GraphQLClient, gql } from "graphql-request";
import { headers } from "next/headers";

type PaymentStatus = 'ALREADY_PAID' | 'FAILURE' | 'PENDING' | 'SUCCESS';

enum PaymentStatusCode {
  SUCCESS = 200,
  PENDING = 202,
  ALREADY_PAID = 409,
  FAILURE = 500,
  BAD_REQUEST = 400,
  TOO_MANY_REQUESTS = 429
}

// Simple in-memory store for rate limiting
// In production, use Redis or similar for distributed systems
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 claims per hour

const isValidLightningAddress = (address: string): boolean => {
  // Basic validation - should contain @ and no spaces
  return address.includes('@') && !address.includes(' ') && address.length < 100;
};

const getRateLimitKey = (ip: string, lnAddress: string): string => {
  return `${ip}:${lnAddress}`;
};

const isRateLimited = (key: string): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record) {
    rateLimitStore.set(key, { count: 1, timestamp: now });
    return false;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    // Reset if window has passed
    rateLimitStore.set(key, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  rateLimitStore.set(key, record);
  return false;
}

const getStatusCode = (status: PaymentStatus): PaymentStatusCode => {
  switch (status) {
    case 'SUCCESS':
      return PaymentStatusCode.SUCCESS;
    case 'PENDING':
      return PaymentStatusCode.PENDING;
    case 'ALREADY_PAID':
      return PaymentStatusCode.ALREADY_PAID;
    case 'FAILURE':
      return PaymentStatusCode.FAILURE;
  }
}

interface BlinkError {
  code: string;
  message: string;
  path: string[];
}

interface LnAddressPaymentSendResponse {
  lnAddressPaymentSend: {
    status: PaymentStatus;
    errors?: BlinkError[];
  }
}

// Initialize the GraphQL client with auth header
const client = new GraphQLClient("https://api.blink.sv/graphql", {
  headers: {
    "X-API-KEY": process.env.BLINK_API_TOKEN || "",
  },
});

// Define the mutation
const SEND_PAYMENT_MUTATION = gql`
  mutation LnAddressPaymentSend($input: LnAddressPaymentSendInput!) {
    lnAddressPaymentSend(input: $input) {
      status
      errors {
        code
        message
        path
      }
    }
  }
`;

const WALLET_ID = process.env.BLINK_WALLET_ID;
const REWARD_AMOUNT = process.env.REWARD_IN_SATS;

export async function POST(request: Request) {
  try {
    // Validate environment variables
    if (!process.env.BLINK_API_TOKEN) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: PaymentStatusCode.FAILURE }
      );
    }

    if (!WALLET_ID || !REWARD_AMOUNT) {
      return NextResponse.json(
        { error: "Reward configuration error" },
        { status: PaymentStatusCode.FAILURE }
      );
    }

    // Get IP address for rate limiting
    const headersList = headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

    const { lnAddress } = await request.json();

    // Validate input
    if (!lnAddress || typeof lnAddress !== 'string') {
      return NextResponse.json(
        { error: "Please enter a valid Lightning address" },
        { status: PaymentStatusCode.BAD_REQUEST }
      );
    }

    if (!isValidLightningAddress(lnAddress)) {
      return NextResponse.json(
        { error: "Please enter a valid Lightning address (e.g., you@wallet.com)" },
        { status: PaymentStatusCode.BAD_REQUEST }
      );
    }

    // Check rate limit
    const rateLimitKey = getRateLimitKey(ip, lnAddress);
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: "Too many reward claims. Please try again in an hour." },
        { status: PaymentStatusCode.TOO_MANY_REQUESTS }
      );
    }

    // Call the Blink GraphQL API
    const response = await client.request<LnAddressPaymentSendResponse>(SEND_PAYMENT_MUTATION, {
      input: {
        walletId: WALLET_ID,
        amount: parseInt(REWARD_AMOUNT, 10),
        lnAddress,
      },
    });

    const { status, errors = [] } = response.lnAddressPaymentSend;
    
    // Handle any errors first
    const firstError = errors[0];
    if (firstError) {
      return NextResponse.json(
        { error: `Payment failed: ${firstError.message}` },
        { status: PaymentStatusCode.FAILURE }
      );
    }

    const statusCode = getStatusCode(status);
    
    if (status === 'FAILURE') {
      return NextResponse.json(
        { error: "Payment failed. Please try again." },
        { status: PaymentStatusCode.FAILURE }
      );
    }

    return NextResponse.json({ 
      success: status === 'SUCCESS',
      status: statusCode,
      message: status.toLowerCase()
    }, {
      status: statusCode
    });
  } catch (error) {
    console.error("Error processing reward payment:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: PaymentStatusCode.FAILURE }
    );
  }
}
