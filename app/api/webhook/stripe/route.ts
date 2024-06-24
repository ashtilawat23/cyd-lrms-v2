import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { fetcher } from '@/utils/swr';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

type ErrorResponse = {
  error: string;
  message?: string;
};

export async function POST(req: Request): Promise<Response> {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event: Stripe.Event;

  // Verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message } as ErrorResponse, { status: 400 });
  }

  const data = event.data.object;
  const eventType = event.type;

  console.log(`Received event type: ${eventType}`);
  console.log(`Event data: ${JSON.stringify(data)}`);

  try {
    switch (eventType) {
      case 'checkout.session.completed': {
        const session = data as Stripe.Checkout.Session;
        const email = session.customer_details?.email;
        const subscriptionId = session.subscription as string;

        if (!email) {
          throw new Error('No customer email found in session data');
        }

        console.log(`Fetching user with email: ${email}`);
        const userResult = await fetcher(`http://localhost:3000/api/users/email/${email}`, { method: 'GET' });
        let user = userResult.data;

        if (!user) {
          console.log(`User with email ${email} not found. Skipping update.`);
          break;
        }

        // Update user data + Grant user access to your product + Save subscription ID.
        user.hasAccess = true;
        user.stripe_subscription_id = subscriptionId;

        console.log(`Updating user with email: ${email}`);
        await fetcher(`http://localhost:3000/api/users/email/${email}}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        console.log(`User updated: ${JSON.stringify(user)}`);

        // Extra: >>>>> send email to dashboard <<<<

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = data as Stripe.Subscription;
        const subscriptionId = subscription.id;

        console.log(`Retrieving user with subscription ID: ${subscriptionId}`);
        const userResult = await fetcher(`http://localhost:3000/api/users/subscription/${subscriptionId}`, { method: 'GET' });
        const user = userResult.data;

        if (!user) {
          console.log(`User with subscription ID ${subscriptionId} not found. Skipping update.`);
          break;
        }

        user.hasAccess = false;

        console.log(`Updating user to revoke access for subscription ID: ${subscriptionId}`);
        await fetcher(`/api/users/subscription/${subscriptionId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        console.log(`User access revoked for subscription ID: ${subscriptionId}`);

        break;
      }

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }
  } catch (e: any) {
    console.error(
      'stripe error: ' + e.message + ' | EVENT TYPE: ' + eventType
    );
    return NextResponse.json({ error: e.message } as ErrorResponse, { status: 500 });
  }

  return NextResponse.json({});
}
