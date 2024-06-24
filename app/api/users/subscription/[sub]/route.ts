import { NextResponse } from 'next/server';
import getDb from '@/db/db';
import { DbCollection } from '@/db/collections';
import { ErrorResponse } from '@/types/error';
import { User } from '@/types/user';

const db = await getDb();

// Gets a single record by stripe_subscription_id.
// -----------------------------------------------------------------------------
export async function GET(
  request: Request,
  { params }: { params: { sub: string } }, // Subscription ID
): Promise<Response> {
  const { sub: stripe_subscription_id } = params;
  console.log(`Fetching user with stripe_subscription_id: ${stripe_subscription_id}`);
  try {
    const record = await db.collection<User>(DbCollection.User).findOne({ stripe_subscription_id });
    if (!record) {
      console.log(`User not found for stripe_subscription_id: ${stripe_subscription_id}`);
      return NextResponse.json({ error: 'User not found' } as ErrorResponse, { status: 404 });
    }
    console.log(`User found: ${JSON.stringify(record)}`);
    return NextResponse.json({ data: record });
  } catch (error: any) {
    console.error(`Error retrieving user: ${error.message}`);
    return NextResponse.json({ error: 'Error retrieving user', message: error.message } as ErrorResponse, { status: 500 });
  }
}

// Updates a single record by stripe_subscription_id.
// -----------------------------------------------------------------------------
export async function PUT(
  request: Request,
  { params }: { params: { sub: string } }, // Subscription ID
): Promise<Response> {
  const { sub: stripe_subscription_id } = params;
  const body = await request.json();
  console.log(`Updating user with stripe_subscription_id: ${stripe_subscription_id}, data: ${JSON.stringify(body)}`);

  try {
    const result = await db.collection<User>(DbCollection.User).updateOne(
      { stripe_subscription_id },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      console.log(`User not found for stripe_subscription_id: ${stripe_subscription_id}`);
      return NextResponse.json({ error: 'User not found' } as ErrorResponse, { status: 404 });
    }

    console.log(`User updated: ${JSON.stringify(result)}`);
    return NextResponse.json({ data: result });
  } catch (error: any) {
    console.error(`Error updating user: ${error.message}`);
    return NextResponse.json({ error: 'Error updating user', message: error.message } as ErrorResponse, { status: 500 });
  }
}
