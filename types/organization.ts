import { CrudDisplayColumn, CrudField, CrudFieldMap } from './crud';

export type Organization = {
  id: string;
  name: string;
  description: string;
  website: string;
  chapter_count: number;
  member_count: number;
  chapters: string[]; // Array of chapter IDs
  courses: string[]; // Array of course IDs
  admins: string[]; // Array of user IDs
};

export const OrganizationDisplayColumns: CrudDisplayColumn[] = [
  {
    label: "Organization Name",
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
    label: "Chapters",
    key: "chapter_count",
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

export const OrganizationCrudFields: CrudFieldMap = {
  name: {
    name: 'name',
    label: 'Organization Name',
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