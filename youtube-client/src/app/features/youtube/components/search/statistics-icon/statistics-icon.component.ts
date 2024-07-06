import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../../../shared/material/material.module';

@Component({
  selector: 'app-statistics-icon',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './statistics-icon.component.html',
  styleUrl: './statistics-icon.component.scss',
})
export class StatisticsIconComponent {
  @Input() fontIcon: string = '';

  @Input() text: string = '';
}
