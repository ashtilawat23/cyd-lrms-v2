import { deleteOne, getOne, put } from '@/utils/crud';
import { CrudEntity } from '@/types/crud';
import { User } from '@/types/user';

// Gets a single record by ID.
// -----------------------------------------------------------------------------
export async function GET(
  request: Request,
  { params }: { params: { id: string } }, // Slug
) {
  return await getOne<User>(CrudEntity.User, request, params);
}

// Updates a single record by ID.
// -----------------------------------------------------------------------------
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }, // Slug
) {
  return await put<User>(CrudEntity.User, request, params);
}

// Deletes a record by ID.
// -----------------------------------------------------------------------------
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }, // Slug
) {
  return await deleteOne<User>(CrudEntity.User, request, params);
}