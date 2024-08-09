import { Component } from '@angular/core';
import { Routes } from '@core/models/route.model';
import { AuthService } from '@features/auth/services/auth.service';
import { IconComponent } from '@shared/components/icon/icon.component';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, IconComponent, NgIf],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  public isLoggedIn = this.authService.isLoggedIn();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.router.navigate([Routes.Login]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate([Routes.Default]);
  }
}
