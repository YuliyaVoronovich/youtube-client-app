import { Component } from '@angular/core';
import { IconComponent } from 'app/shared/components/icon/icon.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {}
