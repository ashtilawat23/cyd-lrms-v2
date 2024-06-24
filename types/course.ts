import { CrudDisplayColumn, CrudField, CrudFieldMap } from './crud';

export type Course = {
  id: string;
  name: string;
  description: string;
  organization_id: string;
  chapter_count: number;
  course_materials: {
    id: string;
    title: string;
    description: string;
    type: string;
    audience: string;
    level: string;
  }[];
}

export const CourseDisplayColumns: CrudDisplayColumn[] = [
  {
    label: "Organization",
    key: "organization_id", // TODO: Replace with organization name string
    sortable: true,
  },
  {
    label: "Course Name",
    key: "name",
    sortable: true,
  },
  {
    label: "Description",
    key: "description",
    sortable: true,
  },
  {
    label: "Chapters",
    key: "chapter_count",
    sortable: true,
  },
  {
    label: "Actions",
    key: "actions",
    sortable: false,
  },
];

export const CourseCrudFields: CrudFieldMap = {
  organization: {
    name: 'organization',
    label: 'Organization',
    addable: true,
    requiredOnAdd: true,
    editable: true,
    requiredOnEdit: true,
    deletable: false,
  },
  name: {
    name: 'name',
    label: 'Course Name',
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
};