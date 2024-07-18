import { Component } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {}
