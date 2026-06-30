export interface TableColumn<T = any> {
  /**
   * Property name in the object.
   * Example: 'name', 'email', 'createdAt'
   */
  key: keyof T;

  /**
   * Column header text.
   */
  label: string;

  /**
   * Enables sorting for this column.
   * Default: true
   */
  sortable?: boolean;

  /**
   * How the value should be displayed.
   */
  type?: 'text' | 'date' | 'boolean';

  /**
   * Optional width.
   * Example: '150px'
   */
  width?: string;
}