import { v4 as uuidv4 } from 'uuid';

export function generateRecordId() {
  return uuidv4();
}

export function sortDirectionToValue(sortDirection: string | null) {
  if (!sortDirection) {
    return undefined;
  }

  switch (sortDirection) {
    case 'ascending':
      return 1;
    case 'descending':
      return -1;
    default:
      return undefined;
  }
}