import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateDate(message: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = control.value;
    if (!date) {
      return null;
    }
    return date > new Date() ? { dateError: message } : null;
  };
}
