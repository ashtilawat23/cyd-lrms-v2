import { getMultiple, post } from '@/utils/crud';
import { CrudEntity } from '@/types/crud';
import { Course } from '@/types/course';


// Gets a list of records with pagination and sorting.
export async function GET(request: Request) {
  return await getMultiple<Course>(CrudEntity.Course, request);
}

// Creates a new record.
export async function POST(request: Request) {
  return await post<Course>(CrudEntity.Course, request);
}