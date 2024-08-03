import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BorderBottomDirective } from '@features/youtube/directives/border-bottom.directive';
import { Video } from '@features/youtube/models/search-item.model';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IconComponent } from '@shared/components/icon/icon.component';

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

  get videoId(): string {
    if (typeof this.video.id === 'object') {
      return this.video.id.videoId;
    }
    return this.video.id;
  }
}
