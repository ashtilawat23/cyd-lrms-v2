import { CrudDisplayColumn, CrudField, CrudFieldMap } from './crud';

export type Chapter = {
  id: string;
  name: string;
  description: string;
  website: string;
  member_count: number;
  organization_id: string;
  courses_access: string[]; // Array of course IDs
  admins: string[]; // Array of user IDs
  members: string[]; // Array of user IDs
}

export const ChapterDisplayColumns: CrudDisplayColumn[] = [
  {
    label: "Chapter Name",
    key: "name",
    sortable: true,
  },
  {
    label: "Description",
    key: "description",
    sortable: true,
  },
  {
    label: "Website",
    key: "website",
    sortable: true,
  },
  {
    label: "Members",
    key: "member_count",
    sortable: true,
  },
  {
    label: "Actions",
    key: "actions",
    sortable: false,
  },
];

export const ChapterCrudFields: CrudFieldMap = {
  name: {
    name: 'name',
    label: 'Chapter Name',
    addable: true,
    requiredOnAdd: true,
    editable: true,
    requiredOnEdit: true,
    deletable: true,
  },
  description: {
    name: 'description',
    label: 'Description',
    addable: true,
    requiredOnAdd: false,
    editable: true,
    requiredOnEdit: false,
    deletable: true,
  },
  website: {
    name: 'website',
    label: 'Website',
    addable: true,
    requiredOnAdd: false,
    editable: true,
    requiredOnEdit: false,
    deletable: true,
  },
};