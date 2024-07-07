import { Component } from '@angular/core';
import { MaterialModule } from '../../../../shared/material/material.module';
import { ButtonComponent } from '../../../../shared/components/buttons/button/button.component';
import { IconComponent } from '../search/icon/icon.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MaterialModule, ButtonComponent, IconComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {}
