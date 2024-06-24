import { getMultiple, post } from '@/utils/crud';
import { CrudEntity } from '@/types/crud';
import { Organization } from '@/types/organization';


// Gets a list of records with pagination and sorting.
export async function GET(request: Request) {
  return await getMultiple<Organization>(CrudEntity.Organization, request);
}

// Creates a new record.
export async function POST(request: Request) {
  return await post<Organization>(CrudEntity.Organization, request);
}