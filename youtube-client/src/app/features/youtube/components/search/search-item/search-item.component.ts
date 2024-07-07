import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Video } from '../../../models/search-item.model';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { IconComponent } from '../../../../../shared/components/icon/icon.component';
import { BorderBottomDirective } from '../../../directives/border-bottom.directive';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [
    MatCardModule,
    ButtonComponent,
    IconComponent,
    BorderBottomDirective,
  ],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
})
export class SearchItemComponent {
  @Input({ required: true }) video!: Video;
}
