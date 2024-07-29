import { AbstractControl, ValidationErrors } from '@angular/forms';

export function getDateValidator(message: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = control.value;
    if (!date) {
      return null;
    }
    return date > new Date() ? { message } : null;
  };
}
