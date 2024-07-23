import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateDate() {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = control.value;
    if (!date) {
      return null;
    }
    return date > new Date() ? { dateError: true } : null;
  };
}
