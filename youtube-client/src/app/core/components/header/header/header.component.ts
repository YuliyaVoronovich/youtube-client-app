import { Component } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { LogoComponent } from '../logo/logo.component';
import { ButtonComponent } from '../../../../shared/components/buttons/button/button.component';
import { MaterialModule } from '../../../../shared/material/material.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    SearchFormComponent,
    ButtonComponent,
    UserInfoComponent,
    MaterialModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
