import { NextResponse } from "next/server";
import { GraphQLClient, gql } from "graphql-request";

type PaymentStatus = 'ALREADY_PAID' | 'FAILURE' | 'PENDING' | 'SUCCESS';

enum PaymentStatusCode {
  SUCCESS = 200,
  PENDING = 202,
  ALREADY_PAID = 409,
  FAILURE = 500
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

const WALLET_ID = "bbb1a6bb-ad98-4070-9c8e-c697b631afc9";
const REWARD_AMOUNT = 10; // sats reward amount

export async function POST(request: Request) {
  try {
    const { lnAddress } = await request.json();

    if (!process.env.BLINK_API_TOKEN) {
      throw new Error("BLINK_API_TOKEN environment variable is not set");
    }

    // Call the Blink GraphQL API
    const response = await client.request<LnAddressPaymentSendResponse>(SEND_PAYMENT_MUTATION, {
      input: {
        walletId: WALLET_ID,
        amount: REWARD_AMOUNT,
        lnAddress,
      },
    });

    const { status, errors = [] } = response.lnAddressPaymentSend;
    
    // Handle any errors first
    const firstError = errors[0];
    if (firstError) {
      throw new Error(`Payment failed: ${firstError.message}`);
    }

    const statusCode = getStatusCode(status);
    
    if (status === 'FAILURE') {
      throw new Error('Payment failed');
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
      { error: error instanceof Error ? error.message : "Failed to process reward payment" },
      { status: 500 }
    );
  }
}
