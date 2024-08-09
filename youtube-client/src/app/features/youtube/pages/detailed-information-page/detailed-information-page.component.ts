import { CommonModule, NgIf } from '@angular/common';
import { Component, signal, effect } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BorderBottomDirective } from '@features/youtube/directives/border-bottom.directive';
import { CardShadowColorDirective } from '@features/youtube/directives/card-shadow-color.directive';
import { Video } from '@features/youtube/models/search-item.model';
import { SearchService } from '@features/youtube/services/search.service';
import { IconComponent } from '@shared/components/icon/icon.component';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-detailed-information-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    NgIf,
    IconComponent,
    BorderBottomDirective,
    CardShadowColorDirective,
    RouterLink,
  ],
  templateUrl: './detailed-information-page.component.html',
  styleUrl: './detailed-information-page.component.scss',
})
export class DetailedInformationPageComponent {
  public video = signal<Video | undefined>(undefined);

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {
    const videoIdSignal = toSignal(
      this.route.params.pipe(
        switchMap(params => this.searchService.getVideoById(params['id']))
      )
    );

    effect(
      () => {
        const video = videoIdSignal();
        if (video && video.length > 0) {
          this.video.set(video[0]);
        }
      },
      { allowSignalWrites: true }
    );
  }
}
