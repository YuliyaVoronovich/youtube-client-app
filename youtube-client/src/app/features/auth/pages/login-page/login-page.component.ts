import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { User } from '@features/auth/models/user.model';
import { AuthService } from '@features/auth/services/auth.service';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatHint,
    ReactiveFormsModule,
    MatInputModule,
    IconComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  public loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public login() {
    const { username, password }: Partial<User> = this.loginForm.value;
    if (username && password) {
      this.loginForm.reset();
      this.authService.login(username);
      this.router.navigateByUrl('/main');
    }
  }
}
