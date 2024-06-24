import { CrudDisplayColumn, CrudFieldMap } from './crud';
import { Role } from './role';

export type User = {
  auth0_id: string;
  name: string;
  email: string;
  role: Role;
  organizations: {
    organization_id: string;
    role: Role;
  }[];
  chapters: string[]; // Array of chapter IDs
  hasAccess: boolean; // Added hasAccess field
  stripe_subscription_id: string; // Added stripe_subscription_id field
}

export const UserDisplayColumns: CrudDisplayColumn[] = [
  {
    label: "Organization",
    key: "organization_id", // TODO: Replace with organization name string
    sortable: true,
  },
  {
    label: "Chapter",
    key: "chapter_id", // TODO: Replace with chapter name string
    sortable: true,
  },
  {
    label: "User Name",
    key: "name",
    sortable: true,
  },
  {
    label: "User Email",
    key: "email",
    sortable: true,
  },
  {
    label: "Role",
    key: "role",
    sortable: true,
  },
  {
    label: "Has Access",
    key: "hasAccess",
    sortable: true,
  },
  {
    label: "Stripe Subscription ID",
    key: "stripe_subscription_id",
    sortable: true,
  },
  {
    label: "Actions",
    key: "actions",
    sortable: false,
  },
];

export const UserCrudFields: CrudFieldMap = {
  organization: {
    name: 'organization',
    label: 'Organization',
    addable: true,
    requiredOnAdd: true,
    editable: true,
    requiredOnEdit: true,
    deletable: false,
  },
  chapter: {
    name: 'chapter',
    label: 'Chapter',
    addable: true,
    requiredOnAdd: true,
    editable: true,
    requiredOnEdit: true,
    deletable: false,
  },
  name: {
    name: 'name',
    label: 'User Name',
    addable: true,
    requiredOnAdd: true,
    editable: true,
    requiredOnEdit: true,
    deletable: true,
  },
  userEmail: {
    name: 'userEmail',
    label: 'User Email',
    addable: true,
    requiredOnAdd: false,
    editable: true,
    requiredOnEdit: false,
    deletable: true,
  },
  role: {
    name: 'role',
    label: 'Role',
    addable: true,
    requiredOnAdd: false,
    editable: true,
    requiredOnEdit: false,
    deletable: true,
  },
  hasAccess: {
    name: 'hasAccess',
    label: 'Has Access',
    addable: true,
    requiredOnAdd: false,
    editable: true,
    requiredOnEdit: false,
    deletable: true,
  },
  stripe_subscription_id: {
    name: 'stripe_subscription_id',
    label: 'Stripe Subscription ID',
    addable: true,
    requiredOnAdd: false,
    editable: true,
    requiredOnEdit: false,
    deletable: true,
  },
};