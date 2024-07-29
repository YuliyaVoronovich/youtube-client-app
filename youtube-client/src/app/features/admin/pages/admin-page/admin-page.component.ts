import { Component } from '@angular/core';
import { CardFormComponent } from '@features/admin/components/card-form/card-form.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CardFormComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent {}
