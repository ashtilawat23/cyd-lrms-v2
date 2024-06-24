import { deleteOne, getOne, put } from '@/utils/crud';
import { CrudEntity } from '@/types/crud';
import { User } from '@/types/user';
import { NextResponse } from 'next/server';
import { ErrorResponse } from '@/types/error';

// Helper function to clean and validate the auth0_id
function cleanAuth0Id(auth0_id: string): string {
  if (!auth0_id) {
    console.error(`Invalid ID: ${auth0_id}`);
    return '';
  }
  if (auth0_id.includes('}')) {
    console.error(`Invalid ID format detected: ${auth0_id}`);
    return auth0_id.replace('}', '');
  }
  return auth0_id;
}

// Gets a single record by auth0_id.
// -----------------------------------------------------------------------------
export async function GET(
  request: Request,
  { params }: { params: { auth0_id: string } }, // auth0_id
) {
  console.log("Received GET request with params:", params);
  const { auth0_id } = params;
  const cleanedAuth0Id = cleanAuth0Id(auth0_id);
  if (!cleanedAuth0Id) {
    return NextResponse.json({ error: 'Invalid auth0_id' } as ErrorResponse, { status: 400 });
  }
  console.log(`Fetching user with auth0_id: ${cleanedAuth0Id}`);

  try {
    return await getOne<User>(CrudEntity.User, request, { id: cleanedAuth0Id });
  } catch (error: any) {
    console.error(`Error fetching user: ${error.message}`, error);
    return NextResponse.json({ error: 'Error fetching user', message: error.message } as ErrorResponse, { status: 500 });
  }
}

// Updates a single record by auth0_id.
// -----------------------------------------------------------------------------
export async function PUT(
  request: Request,
  { params }: { params: { auth0_id: string } }, // auth0_id
) {
  console.log("Received PUT request with params:", params);
  const { auth0_id } = params;
  const cleanedAuth0Id = cleanAuth0Id(auth0_id);
  if (!cleanedAuth0Id) {
    return NextResponse.json({ error: 'Invalid auth0_id' } as ErrorResponse, { status: 400 });
  }
  console.log(`Updating user with auth0_id: ${cleanedAuth0Id}`);

  try {
    return await put<User>(CrudEntity.User, request, { id: cleanedAuth0Id });
  } catch (error: any) {
    console.error(`Error updating user: ${error.message}`, error);
    return NextResponse.json({ error: 'Error updating user', message: error.message } as ErrorResponse, { status: 500 });
  }
}

// Deletes a record by auth0_id.
// -----------------------------------------------------------------------------
export async function DELETE(
  request: Request,
  { params }: { params: { auth0_id: string } }, // auth0_id
) {
  console.log("Received DELETE request with params:", params);
  const { auth0_id } = params;
  const cleanedAuth0Id = cleanAuth0Id(auth0_id);
  if (!cleanedAuth0Id) {
    return NextResponse.json({ error: 'Invalid auth0_id' } as ErrorResponse, { status: 400 });
  }
  console.log(`Deleting user with auth0_id: ${cleanedAuth0Id}`);

  try {
    return await deleteOne<User>(CrudEntity.User, request, { id: cleanedAuth0Id });
  } catch (error: any) {
    console.error(`Error deleting user: ${error.message}`, error);
    return NextResponse.json({ error: 'Error deleting user', message: error.message } as ErrorResponse, { status: 500 });
  }
}