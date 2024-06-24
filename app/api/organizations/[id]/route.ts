import { deleteOne, getOne, put } from '@/utils/crud';
import { CrudEntity } from '@/types/crud';
import { Organization } from '@/types/organization';

// Gets a single record by ID.
// -----------------------------------------------------------------------------
export async function GET(
  request: Request,
  { params }: { params: { id: string } }, // Slug
) {
  return await getOne<Organization>(CrudEntity.Organization, request, params);
}

// Updates a single record by ID.
// -----------------------------------------------------------------------------
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }, // Slug
) {
  return await put<Organization>(CrudEntity.Organization, request, params);
}

// Deletes a record by ID.
// -----------------------------------------------------------------------------
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }, // Slug
) {
  return await deleteOne<Organization>(CrudEntity.Organization, request, params);
}