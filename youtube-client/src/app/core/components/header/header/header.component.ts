import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonComponent } from '@shared/components/button/button.component';
import { AuthService } from '@features/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserInfoComponent } from '../user-info/user-info.component';
import { LogoComponent } from '../logo/logo.component';
import { SearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    SearchFormComponent,
    ButtonComponent,
    UserInfoComponent,
    MatToolbarModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
