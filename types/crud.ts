import { ChapterCrudFields, ChapterDisplayColumns } from './chapter';
import { CourseCrudFields, CourseDisplayColumns } from './course';
import { Organization, OrganizationCrudFields, OrganizationDisplayColumns } from './organization';
import { UserCrudFields, UserDisplayColumns } from './user';

export enum CrudAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

export enum CrudMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum CrudEntity {
  Organization = 'Organization',
  Chapter = 'Chapter',
  Course = 'Course',
  User = 'User',
}

export enum CrudApiRoute {
  Organization = '/api/organizations',
  Chapter = '/api/chapters',
  Course = '/api/courses',
  User = '/api/users',
}

export type CrudField = {
  name: string;
  label?: string;
  addable: boolean;
  requiredOnAdd: boolean;
  editable: boolean;
  requiredOnEdit: boolean;
  deletable: boolean;
};

export type CrudFieldMap = {
  [key: string]: CrudField & { value?: any };
};

export const CrudEntityFields: {
  [key: string]: CrudFieldMap;
} = {
  [CrudEntity.Organization]: OrganizationCrudFields,
  [CrudEntity.Chapter]: ChapterCrudFields,
  [CrudEntity.Course]: CourseCrudFields,
  [CrudEntity.User]: UserCrudFields,
};

export type CrudDisplayColumn = {
  label: string;
  key: string;
  sortable: boolean;
};

export const CrudEntityDisplayColumns: {
  [key: string]: CrudDisplayColumn[];
} = {
  [CrudEntity.Organization]: OrganizationDisplayColumns,
  [CrudEntity.Chapter]: ChapterDisplayColumns,
  [CrudEntity.Course]: CourseDisplayColumns,
  [CrudEntity.User]: UserDisplayColumns,
};

export function getCrudMethod(action: CrudAction): CrudMethod {
  switch (action) {
    case CrudAction.Create:
      return CrudMethod.POST;
    case CrudAction.Read:
      return CrudMethod.GET;
    case CrudAction.Update:
      return CrudMethod.PUT;
    case CrudAction.Delete:
      return CrudMethod.DELETE;
  }
}