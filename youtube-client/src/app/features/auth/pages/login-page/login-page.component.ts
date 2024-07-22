import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatError, MatFormField, MatHint } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Routes } from '@core/models/route.model';
import { LoginFormValue } from '@features/auth/models/user.model';
import { AuthService } from '@features/auth/services/auth.service';
import { getPasswordStrengthError } from '@features/youtube/utils/password-error-msg';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatIcon,
    MatHint,
    MatError,
    ReactiveFormsModule,
    MatInputModule,
    IconComponent,
    ButtonComponent,
    NgIf,
    NgFor,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      this.customPasswordValidator(),
    ]),
  });

  public passwordStrengthError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public login() {
    if (!this.loginForm.valid) return;
    const { username, password }: LoginFormValue = this.loginForm.value;
    if (username && password) {
      this.loginForm.reset();
      this.authService.login(username);
      this.router.navigate([Routes.Main]);
    }
  }

  private customPasswordValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;

      if (!value) {
        return null;
      }

      this.passwordStrengthError = getPasswordStrengthError(control.value);
      return this.passwordStrengthError ? { passwordStrength: true } : null;
    };
  }
}
