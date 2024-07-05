import { Component } from '@angular/core';
import { MaterialModule } from '../../../../shared/material/material.module';
import { ButtonComponent } from '../../../../shared/components/buttons/button/button.component';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [MaterialModule, ButtonComponent],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent {}
