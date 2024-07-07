import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchFormComponent } from '../search-form/search-form.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { LogoComponent } from '../logo/logo.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

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
export class HeaderComponent {}
