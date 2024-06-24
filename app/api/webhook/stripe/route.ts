import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import connectMongo from '@/libs/mongoose';
import User from '@/db/schema/user';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10'
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request): Promise<Response> {
  await connectMongo();

  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let data: Stripe.Event.Data;
  let eventType: string;
  let event: Stripe.Event;

  // Verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  data = event.data;
  eventType = event.type;

  try {
    switch (eventType) {
      case 'checkout.session.completed': {
        let user;
        const session = await stripe.checkout.sessions.retrieve(
          data.object.id as string,
          {
            expand: ['line_items']
          }
        );
        const customerId = session?.customer as string;
        const customer = await stripe.customers.retrieve(customerId);
        const priceId = session?.line_items?.data[0]?.price?.id;

        if (customer.email) {
          user = await User.findOne({ email: customer.email });

          if (!user) {
            user = new User({
              email: customer.email,
              name: customer.name,
              customerId
            });

            await user.save();
          }
        } else {
          console.error('No user found');
          throw new Error('No user found');
        }

        // Update user data + Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
        user.priceId = priceId;
        user.hasAccess = true;
        await user.save();

        // Extra: >>>>> send email to dashboard <<<<

        break;
      }

      case 'customer.subscription.deleted': {
        // ❌ Revoke access to the product
        const subscription = await stripe.subscriptions.retrieve(
          data.object.id as string
        );
        const user = await User.findOne({
          customerId: subscription.customer as string
        });

        if (user) {
          user.hasAccess = false;
          await user.save();
        }

        break;
      }

      default:
      // Unhandled event type
    }
  } catch (e: any) {
    console.error(
      'stripe error: ' + e.message + ' | EVENT TYPE: ' + eventType
    );
  }

  return NextResponse.json({});
}
