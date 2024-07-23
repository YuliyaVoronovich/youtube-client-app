import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { validateDate } from '@features/youtube/utils/date.validator';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [
    ButtonComponent,
    MatFormField,
    MatIcon,
    MatError,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    IconComponent,
    ButtonComponent,
    NgIf,
    NgFor,
  ],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss',
})
export class CardFormComponent {
  public createCardForm = this.formBuilder.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    description: ['', [Validators.maxLength(255)]],
    imageUrl: ['', [Validators.required]],
    videoLink: ['', [Validators.required]],
    creationDate: ['', [Validators.required, validateDate()]],
    tags: new FormArray([], Validators.required),
  });

  public isShowIconCreate = true;

  constructor(private formBuilder: FormBuilder) {}

  createCard() {
    if (!this.createCardForm.valid) return;
    console.warn('Create Card');
  }

  get tags(): FormArray {
    return this.createCardForm.get('tags') as FormArray;
  }

  addTag() {
    if (this.tags.length < 5) {
      this.tags.push(new FormControl('', Validators.required));
    } else {
      this.isShowIconCreate = false;
    }
  }

  resetForm() {
    this.tags.clear();
    this.createCardForm.reset();
  }
}
