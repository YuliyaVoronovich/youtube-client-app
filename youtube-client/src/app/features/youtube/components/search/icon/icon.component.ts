import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../../../shared/material/material.module';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input() fontIcon: string = '';

  @Input() text: string = '';
}
