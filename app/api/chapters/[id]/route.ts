import { deleteOne, getOne, put } from '@/utils/crud';
import { CrudEntity } from '@/types/crud';
import { Chapter } from '@/types/chapter';

// Gets a single record by ID.
// -----------------------------------------------------------------------------
export async function GET(
  request: Request,
  { params }: { params: { id: string } }, // Slug
) {
  return await getOne<Chapter>(CrudEntity.Chapter, request, params);
}

// Updates a single record by ID.
// -----------------------------------------------------------------------------
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }, // Slug
) {
  return await put<Chapter>(CrudEntity.Chapter, request, params);
}

// Deletes a record by ID.
// -----------------------------------------------------------------------------
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }, // Slug
) {
  return await deleteOne<Chapter>(CrudEntity.Chapter, request, params);
}