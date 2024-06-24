import { NextResponse } from 'next/server';
import getDb from '@/db/db';
import { DbCollection } from '@/db/collections';
import { ErrorResponse } from '@/types/error';
import { User } from '@/types/user';

async function connectToDb() {
  try {
    return await getDb();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw new Error('Database connection error');
  }
}

const db = await connectToDb();

// Helper function to clean email
function cleanEmail(email: string): string {
  if (email.includes('}')) {
    console.error(`Invalid email format detected: ${email}`);
    return email.replace('}', '');
  }
  return email;
}

// Gets a single record by Email.
// -----------------------------------------------------------------------------
export async function GET(
  request: Request,
  { params }: { params: { email: string } }, // Email
): Promise<Response> {
  const { email } = params;
  console.log(`Fetching user with email: ${email}`);

  // Clean the email
  const cleanedEmail = cleanEmail(email);
  console.log(`Cleaned email: ${cleanedEmail}`);

  try {
    const record = await db.collection<User>(DbCollection.User).findOne({ email: cleanedEmail });
    if (!record) {
      console.log(`User not found for email: ${cleanedEmail}`);
      return NextResponse.json({ error: 'User not found' } as ErrorResponse, { status: 404 });
    }
    console.log(`User found: ${JSON.stringify(record)}`);
    return NextResponse.json({ data: record });
  } catch (error: any) {
    console.error(`Error retrieving user: ${error.message}`, error);
    return NextResponse.json({ error: 'Error retrieving user', message: error.message } as ErrorResponse, { status: 500 });
  }
}

// Updates a single record by Email.
// -----------------------------------------------------------------------------
export async function PUT(
  request: Request,
  { params }: { params: { email: string } }, // Email
): Promise<Response> {
  const { email } = params;
  console.log(`Updating user with email: ${email}`);

  const body = await request.json();
  console.log(`Received data: ${JSON.stringify(body)}`);

  // Clean the email
  const cleanedEmail = cleanEmail(email);
  console.log(`Cleaned email: ${cleanedEmail}`);

  // Remove _id from the body if it exists
  const { _id, ...updateFields } = body;

  try {
    const result = await db.collection<User>(DbCollection.User).updateOne(
      { email: cleanedEmail },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      console.log(`User not found for email: ${cleanedEmail}`);
      return NextResponse.json({ error: 'User not found' } as ErrorResponse, { status: 404 });
    }

    console.log(`User updated: ${JSON.stringify(result)}`);
    return NextResponse.json({ data: result });
  } catch (error: any) {
    console.error(`Error updating user: ${error.message}`, error);
    return NextResponse.json({ error: 'Error updating user', message: error.message } as ErrorResponse, { status: 500 });
  }
}
