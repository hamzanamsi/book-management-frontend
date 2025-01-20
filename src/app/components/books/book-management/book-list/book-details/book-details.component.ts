import { Component, input, output } from '@angular/core';
import { Book } from '../../../../../interfaces/book.interface';

@Component({
  selector: 'app-book-details',
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent {
  book = input<Book | null>(null);
  modalClosed = output<void>();

  closeModal(): void {
    this.modalClosed.emit();
  }
}
