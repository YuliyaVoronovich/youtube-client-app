import { InjectionToken } from '@angular/core';

export const CUSTOM_ERRORS = new InjectionToken<Record<string, string>>(
  'custom-error'
);
