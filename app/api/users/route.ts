import { getMultiple, post } from '@/utils/crud';
import { CrudEntity } from '@/types/crud';
import { User } from '@/types/user';


// Gets a list of records with pagination and sorting.
export async function GET(request: Request) {
  return await getMultiple<User>(CrudEntity.User, request);
}

// Creates a new record.
export async function POST(request: Request) {
  return await post<User>(CrudEntity.User, request);
}