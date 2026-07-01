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
  @Input() placeHolder = "edit";
  @Input() showStatus = false;

  // ================= OUTPUTS =================

  @Output() delete = new EventEmitter<T>();
  @Output() edit = new EventEmitter<T>();

  @Output() statusChange = new EventEmitter<{
    item: T;
    value: boolean;
  }>();

  // ✅ NEW: row click output
  @Output() clicked = new EventEmitter<T>();

  // ================= INTERNAL STATE =================

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

  sort(column: keyof T): void {

    if (this.sortColumn === column) {
      this.sortDirection =
        this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortedData = [...this.sortedData].sort((a, b) => {

      let valueA: any = a[column];
      let valueB: any = b[column];

      // string
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      // boolean
      if (typeof valueA === 'boolean') {
        valueA = Number(valueA);
        valueB = Number(valueB);
      }

      // date detection
      if (
        valueA instanceof Date ||
        column.toString().toLowerCase().includes('date') ||
        column.toString().toLowerCase().includes('at')
      ) {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }

      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }

      return 0;
    });

    this.currentPage = 1;
  }

  getSortIcon(column: keyof T): string {
    if (this.sortColumn !== column) return '↕';
    return this.sortDirection === 'asc' ? '▲' : '▼';
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

  onStatusChange(item: T, event: Event): void {
    const value =
      (event.target as HTMLSelectElement).value === 'true';

    this.statusChange.emit({
      item,
      value
    });
  }
}