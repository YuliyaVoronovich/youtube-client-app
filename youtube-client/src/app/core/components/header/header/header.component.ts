import { Component } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, SearchFormComponent, UserInfoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
