/* eslint-disable class-methods-use-this */
import {
  Component,
  DestroyRef,
  inject,
  type OnInit,
  signal,
} from '@angular/core';
import { NgControl, type ControlValueAccessor } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatError } from '@angular/material/form-field';
import { CUSTOM_ERRORS } from '@shared/tokens/custom-error.token';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [MatError],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent implements ControlValueAccessor, OnInit {
  private readonly control = inject(NgControl, { self: true });

  private readonly destroy = inject(DestroyRef);

  private readonly errorMap = inject(CUSTOM_ERRORS);

  protected readonly error = signal('');

  constructor() {
    this.control.valueAccessor = this;
  }

  public ngOnInit(): void {
    this.control.control?.events
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(() => {
        const { control } = this.control;
        const errors = control?.errors;

        if (this.computedInvalid) {
          let error = '';

          if (errors) {
            const [firstErrorKey, firstErrorValue] =
              Object.entries(errors)[0] || [];
            error = this.errorMap[firstErrorKey] || firstErrorValue;
          }

          this.error.set(error);
        } else {
          this.error.set('');
        }
      });
  }

  public get computedInvalid(): boolean {
    const { control } = this.control;

    return !!(
      control?.invalid &&
      control.errors &&
      control.dirty &&
      control.touched
    );
  }

  public writeValue(): void {}

  public registerOnChange(): void {}

  public registerOnTouched(): void {}
}
