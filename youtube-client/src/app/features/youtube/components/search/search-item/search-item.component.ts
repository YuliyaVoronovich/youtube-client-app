import { Component, Input } from '@angular/core';
import { Video } from '../../../models/search-item.model';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { ButtonComponent } from '../../../../../shared/components/buttons/button/button.component';
import { StatisticsIconComponent } from '../statistics-icon/statistics-icon.component';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [MaterialModule, ButtonComponent, StatisticsIconComponent],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
})
export class SearchItemComponent {
  @Input() video!: Video;
}
