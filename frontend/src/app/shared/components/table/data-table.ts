import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from './table-column';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css'
})
export class DataTableComponent<T extends object> implements OnChanges {

  // ================= INPUTS =================

  @Input({ required: true }) data: T[] = [];
  @Input({ required: true }) columns: TableColumn<T>[] = [];

  @Input() pageSize = 10;

  @Input() showDelete = false;
  @Input() showEdit = false;
  @Input() placeHolder = 'Edit';

  // ================= OUTPUTS =================

  @Output() delete = new EventEmitter<T>();
  @Output() edit = new EventEmitter<T>();
  @Output() clicked = new EventEmitter<T>();

  @Output() selectChange = new EventEmitter<{
    item: T;
    key: keyof T;
    value: any;
  }>();

  // ================= INTERNAL =================

  currentPage = 1;

  private sortedData: T[] = [];

  sortColumn: keyof T | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // ================= GETTERS =================

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.sortedData.length / this.pageSize));
  }

  get pagedData(): T[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.sortedData.slice(start, start + this.pageSize);
  }

  // ================= LIFECYCLE =================

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['data']) {

      this.sortedData = [...this.data];

      if (this.sortColumn) {
        this.sort(this.sortColumn, false);
      }

      this.currentPage = 1;
    }

  }

  // ================= PAGINATION =================

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // ================= SORTING =================

  sort(column: keyof T, toggle = true): void {

    if (toggle) {

      if (this.sortColumn === column) {

        this.sortDirection =
          this.sortDirection === 'asc'
            ? 'desc'
            : 'asc';

      } else {

        this.sortColumn = column;
        this.sortDirection = 'asc';

      }

    }

    const columnDef = this.columns.find(c => c.key === column);

    this.sortedData = [...this.sortedData].sort((a, b) => {

      let valueA: any = a[column];
      let valueB: any = b[column];

      if (columnDef?.type === 'date') {

        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();

      } else if (typeof valueA === 'string') {

        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();

      } else if (typeof valueA === 'boolean') {

        valueA = Number(valueA);
        valueB = Number(valueB);

      }

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }

      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }

      return 0;

    });

  }

  getSortIcon(column: keyof T): string {

    if (this.sortColumn !== column) {
      return '↕';
    }

    return this.sortDirection === 'asc'
      ? '▲'
      : '▼';

  }

  // ================= EVENTS =================

  onRowClick(item: T): void {
    this.clicked.emit(item);
  }

  onDelete(item: T): void {
    this.delete.emit(item);
  }

  onEdit(item: T): void {
    this.edit.emit(item);
  }

  onSelectChange(
    item: T,
    column: TableColumn<T>,
    event: Event
  ): void {

    this.selectChange.emit({
      item,
      key: column.key,
      value: (event.target as HTMLSelectElement).value
    });

  }

}