import { getMultiple, post } from '@/utils/crud';
import { CrudEntity } from '@/types/crud';
import { Chapter } from '@/types/chapter';


// Gets a list of records with pagination and sorting.
export async function GET(request: Request) {
  return await getMultiple<Chapter>(CrudEntity.Chapter, request);
}

// Creates a new record.
export async function POST(request: Request) {
  return await post<Chapter>(CrudEntity.Chapter, request);
}