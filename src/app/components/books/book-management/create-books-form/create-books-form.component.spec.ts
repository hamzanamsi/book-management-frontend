import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBooksFormComponent } from './create-books-form.component';

describe('CreateBooksFormComponent', () => {
  let component: CreateBooksFormComponent;
  let fixture: ComponentFixture<CreateBooksFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBooksFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBooksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
