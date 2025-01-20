import { Component } from '@angular/core';
import { BooksService } from '../../../services/books/books.service';
import { BookListComponent } from './book-list/book-list.component';
import { CommonModule } from '@angular/common';
import { CreateBooksFormComponent } from './create-books-form/create-books-form.component';
import { map, Observable } from 'rxjs';
import { BookDetailsComponent } from './book-list/book-details/book-details.component';
import { Book } from '../../../interfaces/book.interface';

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [
    BookListComponent,
    BookDetailsComponent,
    CreateBooksFormComponent,
    CommonModule,
  ],
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.scss',
})
export class BookManagementComponent {
  books$!: Observable<Book[]>;
  isModalOpen = false;
  selectedBook: Book | null = null;
  isDetailsModalOpen = false;
  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.books$ = this.booksService
      .getBooks()
      .pipe(map((response) => (Array.isArray(response) ? response : [])));
  }

  handleBookFormSubmitted(book: Book): void {
    this.booksService.createBook(book).subscribe({
      next: () => {
        this.isModalOpen = false;
        this.fetchBooks();
      },
      error: (err) => console.error('Error creating book:', err),
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  handleDeleteBook(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.booksService.deleteBook(bookId).subscribe({
        next: () => {
          this.fetchBooks();
        },
        error: (err) => console.error('Error deleting book:', err),
      });
    }
  }
  handleViewDetails(bookId: string): void {
    this.booksService.getBookById(bookId).subscribe({
      next: (book) => {
        this.selectedBook = book;
        this.isDetailsModalOpen = true;
      },
      error: (err) => console.error('Error fetching book details:', err),
    });
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
    this.selectedBook = null;
  }
}
