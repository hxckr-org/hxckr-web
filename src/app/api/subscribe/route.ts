import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.length) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const MAILCHIMP_API_SERVER = process.env.MAILCHIMP_API_SERVER;

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_API_SERVER) {
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    const data = {
      email_address: email,
      status: 'subscribed',
    };

    try {
      const response = await fetch(
        `https://${MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
        {
          method: 'POST',
          headers: {
            Authorization: `apikey ${MAILCHIMP_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        // Handle specific Mailchimp error cases
        if (responseData.title === 'Member Exists') {
          return NextResponse.json(
            { error: 'Member Exists' },
            { status: 400 }
          );
        }
        
        if (responseData.title === 'Invalid Resource') {
          return NextResponse.json(
            { error: 'Invalid Resource' },
            { status: 400 }
          );
        }

        return NextResponse.json(
          { error: responseData.detail || 'Subscription failed' },
          { status: response.status }
        );
      }

      return NextResponse.json(
        { message: 'Successfully subscribed to the newsletter!' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Mailchimp API error:', error);
      return NextResponse.json(
        { error: 'Failed to connect to mailing service' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
