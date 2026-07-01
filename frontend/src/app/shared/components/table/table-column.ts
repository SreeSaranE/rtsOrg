export interface TableColumn<T = any> {

  key: keyof T;

  label: string;

  sortable?: boolean;

  type?: 'text' | 'date' | 'boolean' | 'select';

  width?: string;

  options?: { label: string; value: any }[];
}