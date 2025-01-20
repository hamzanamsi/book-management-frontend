import { Component, EventEmitter, output, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BooksService } from '../../../../services/books/books.service';
import { CommonModule } from '@angular/common';
import { Book } from '../../../../interfaces/book.interface';

@Component({
  selector: 'app-create-books-form',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-books-form.component.html',
  styleUrl: './create-books-form.component.scss',
})
export class CreateBooksFormComponent {
  bookFormSubmitted = output<Book>();

  closeModal = output<void>();
  bookCreated = output<Book>();

  bookForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      coverImage: [''],
      description: [''],
    });
  }

  submitForm(): void {
    if (this.bookForm.valid) {
      const book: Book = this.bookForm.value;
      this.bookFormSubmitted.emit(book);
    }
  }
  cancel() {
    this.closeModal.emit();
  }
}
