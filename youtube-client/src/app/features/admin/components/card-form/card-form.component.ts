import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IconComponent } from '@shared/components/icon/icon.component';

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
  public createCardForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    description: new FormControl('', [Validators.maxLength(255)]),
    imageUrl: new FormControl('', [Validators.required]),
    videoLink: new FormControl('', [Validators.required]),
    creationDate: new FormControl('', [
      Validators.required,
      this.validateDate(),
    ]),
  });

  // eslint-disable-next-line class-methods-use-this
  validateDate() {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = control.value;
      if (!date) {
        return null;
      }
      return date > new Date() ? { dateError: true } : null;
    };
  }

  // eslint-disable-next-line class-methods-use-this
  createCard() {}
}
