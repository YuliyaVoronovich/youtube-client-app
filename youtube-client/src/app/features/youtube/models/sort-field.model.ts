export const enum SortFieldType {
  Date = 'Date',
  Count = 'Count',
}

export const enum SortOrderType {
  Asc = 'Asc',
  Desc = 'Desc',
}

export interface SortingField {
  value: SortFieldType;
  order: SortOrderType;
}
