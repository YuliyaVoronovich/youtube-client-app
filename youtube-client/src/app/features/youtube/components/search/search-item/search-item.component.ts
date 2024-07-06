import { Component, Input } from '@angular/core';
import { Video } from '../../../models/search-item.model';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { ButtonComponent } from '../../../../../shared/components/buttons/button/button.component';
import { StatisticsIconComponent } from '../statistics-icon/statistics-icon.component';
import { BorderBottomColorDirective } from '../../../directives/border-bottom-color.directive';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [
    MaterialModule,
    ButtonComponent,
    StatisticsIconComponent,
    BorderBottomColorDirective,
  ],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
  // hostDirectives: [
  //   {
  //     directive: BorderBottomColorDirective,
  //     inputs: ['publishTime'],
  //   },
  // ],
})
export class SearchItemComponent {
  @Input() video!: Video;
}
