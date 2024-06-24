import getDb from '@/db/db';
import { DbCollection } from '@/db/collections'
import { CrudApiRoute, CrudEntity } from "@/types/crud";
import { ApiResponse, PaginatedApiResponse } from '@/types/api';
import { generateRecordId, sortDirectionToValue } from "@/utils/db";
import { Document, Filter, OptionalUnlessRequiredId } from 'mongodb';

interface Identifiable {
  id?: string;
}

const db = await getDb();

export async function getMultiple<T extends Document & Identifiable>(entity: CrudEntity, request: Request) {
  console.log(`GET ${CrudApiRoute[entity]}`);

  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '10');
  const sort = searchParams.get('sort');
  const sortDirection = searchParams.get('sortDirection');

  const skip = (page - 1) * perPage;

  console.log({ page, perPage, sort, sortDirection, skip });

  try {
    const records = await db
    .collection<T>(DbCollection[entity])
    .find()
    .sort(sort ? sort : "_", sortDirectionToValue(sortDirection))
    .skip(skip)
    .limit(perPage)
    .toArray() as T[];

    console.log({ records });

    const count = await db
    .collection(DbCollection[entity])
    .countDocuments();

    console.log({ count });

    return Response.json({ 
      data: records,
      page,
      perPage,
      totalCount: count,
    } as PaginatedApiResponse<T[]>);
  } catch (error) {
    return Response.error();
  }
}

export async function getOne<T extends Document & Identifiable>(
  entity: CrudEntity,
  request: Request,
  params: { id: string }
) {
  console.log(`GET ${CrudApiRoute[entity]}/${params.id}`);

  const id = params.id;
  
  if (!id) {
    return Response.error();
  }

  try {
    const record = await db
    .collection<T>(DbCollection[entity])
    .findOne({id: id} as unknown as Filter<T>);

    return Response.json({ 
      data: record,
    } as ApiResponse<T>);
  } catch (error) {
    return Response.error();
  }
}

export async function post<T extends Document & Identifiable>(
  entity: CrudEntity,
  request: Request,
) {
  console.log(`POST ${CrudApiRoute[entity]}`);

  const body = await request.json();
  const fields = body as T;

  // If the item doesn't have an ID, create one.
  if (!fields.id) {
    fields.id = generateRecordId();
  }

  // Iterate over CrudFields to check for required fields
  const missingRequiredFields = Object.entries(fields)
    .filter(([fieldName, fieldValue]) => {
      const key = fieldName as keyof typeof fields;
      return fieldValue === undefined;
    })
    .map(([fieldName, fieldValue]) => {
      return fieldName;
    });

  if (missingRequiredFields.length > 0) {
    console.error(`Missing required fields: ${missingRequiredFields.join(', ')}`);
    return Response.error();
  }

  try {
    const result = await db
    .collection<T>(DbCollection[entity])
    .insertOne(fields as OptionalUnlessRequiredId<T>);

    console.log({ result });

    return Response.json({ data: result });
  } catch (error) {
    return Response.error();
  }
}

export async function put<T extends Document & Identifiable>(
  entity: CrudEntity,
  request: Request,
  params: { id: string }
) {
  console.log(`PUT ${CrudApiRoute[entity]}/${params.id}`);

  const id = params.id;

  const body = await request.json();

  if (!id) {
    console.error('No ID provided for update operation.');
    return Response.error();
  }

  console.log({ body });

  const updateFields: Partial<Record<string, unknown>> = {};

  // Iterate over CrudFields to check for editable fields
  Object.entries(body).forEach(([fieldName, fieldValue]) => {
    console.log({ fieldName, fieldValue });
    if (fieldValue !== undefined) {
      console.log(`Updating ${fieldName}...`);
      const key = fieldName as keyof typeof updateFields;
      updateFields[key] = fieldValue;
    }
  });

  if (Object.keys(updateFields).length === 0) {
    return Response.error();
  }

  console.log({ updateFields });

  try {
    const result = await db
    .collection(DbCollection[entity])
    .updateOne(
      { id },
      {
        $set: updateFields,
      },
    );

    console.log({ result });

    return Response.json({ data: result });
  } catch (error) {
    return Response.error();
  }
}

export async function deleteOne<T extends Document & Identifiable>(
  entity: CrudEntity,
  request: Request,
  params: { id: string }
) {
  console.log(`DELETE ${CrudApiRoute[entity]}/${params.id}`);

  const id = params.id;

  if (!id) {
    console.error('No ID provided for delete operation.');
    return Response.error();
  }

  try {
    const result = await db
    .collection(DbCollection[entity])
    .deleteOne({ id });

    console.log({ result });

    return Response.json({ data: result });
  } catch (error) {
    return Response.error();
  }
}