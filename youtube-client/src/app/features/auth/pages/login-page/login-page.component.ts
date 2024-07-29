import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Routes } from '@core/models/route.model';
import { LoginFormValue } from '@features/auth/models/user.model';
import { AuthService } from '@features/auth/services/auth.service';
import { getPasswordValidator } from '@features/youtube/utils/password.validator';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ErrorComponent } from '@shared/components/error/error.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { errors } from '@shared/constants/built-in-errors.constant';
import { CUSTOM_ERRORS } from '@shared/tokens/custom-error.token';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatError,
    ReactiveFormsModule,
    MatInputModule,
    IconComponent,
    ButtonComponent,
    NgIf,
    NgFor,
    ErrorComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  providers: [
    {
      provide: CUSTOM_ERRORS,
      useValue: errors,
    },
  ],
})
export class LoginPageComponent {
  public loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, getPasswordValidator()]],
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
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
}
