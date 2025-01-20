import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../../../interfaces/book.interface';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  books = input<Book[] | null>(null);
  isLoading = input<boolean>(false);
  deleteBook = output<string>();
  viewDetails = output<string>();
  writeReview = output<string>();
  isDetailsModalOpen = false;
  selectedBook: any = null;
  constructor() {}

  onDelete(book: Book): void {
    this.deleteBook.emit(book.id);
  }

  onViewDetails(book: Book): void {
    this.viewDetails.emit(book.id);
  }

  onWriteReview(book: Book): void {
    this.writeReview.emit(book.id);
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
    this.selectedBook = null;
  }
}
