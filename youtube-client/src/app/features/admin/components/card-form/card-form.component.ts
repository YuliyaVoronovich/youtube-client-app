import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { getDateValidator } from '@features/youtube/utils/date.validator';
import { ErrorComponent } from '@shared/components/error/error.component';
import { CUSTOM_ERRORS } from '@shared/tokens/custom-error.token';
import { errors } from '@shared/constants/built-in-errors.constant';
import { Store } from '@ngrx/store';

import * as CardActions from '@store/actions/card.actions';
import { CustomCard } from '@store/state.model';
import { MatNativeDateModule } from '@angular/material/core';
import { generateRandomString } from '@features/youtube/utils/random-string';

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
    MatNativeDateModule,
    IconComponent,
    ButtonComponent,
    NgIf,
    NgFor,
    ErrorComponent,
  ],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss',
  providers: [
    {
      provide: CUSTOM_ERRORS,
      useValue: errors,
    },
  ],
})
export class CardFormComponent {
  public createCardForm = this.formBuilder.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    description: ['', [Validators.maxLength(255)]],
    imageLink: ['', [Validators.required]],
    videoLink: ['', [Validators.required]],
    creationDate: [
      '',
      [Validators.required, getDateValidator('The date is invalid')],
    ],
    tags: this.formBuilder.array([], Validators.required),
  });

  public isShowIconCreate = true;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  createCard() {
    if (!this.createCardForm.valid) return;

    const id = generateRandomString();

    this.store.dispatch(
      CardActions.addCard({
        payload: {
          ...(this.createCardForm.value as CustomCard),
          id,
        },
      })
    );
  }

  get tags(): FormArray {
    return this.createCardForm.get('tags') as FormArray;
  }

  addTag() {
    if (this.tags.length < 5) {
      this.tags.push(this.formBuilder.control('', Validators.required));
    } else {
      this.isShowIconCreate = false;
    }
  }

  resetForm() {
    this.tags.clear();
    this.createCardForm.reset();
  }
}
