import { deleteOne, getOne, put } from '@/utils/crud';
import { CrudEntity } from '@/types/crud';
import { Course } from '@/types/course';

// Gets a single record by ID.
// -----------------------------------------------------------------------------
export async function GET(
  request: Request,
  { params }: { params: { id: string } }, // Slug
) {
  return await getOne<Course>(CrudEntity.Course, request, params);
}

// Updates a single record by ID.
// -----------------------------------------------------------------------------
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }, // Slug
) {
  return await put<Course>(CrudEntity.Course, request, params);
}

// Deletes a record by ID.
// -----------------------------------------------------------------------------
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }, // Slug
) {
  return await deleteOne<Course>(CrudEntity.Course, request, params);
}