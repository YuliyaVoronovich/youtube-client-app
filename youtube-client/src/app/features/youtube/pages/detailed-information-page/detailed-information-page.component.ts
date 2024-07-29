import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BorderBottomDirective } from '@features/youtube/directives/border-bottom.directive';
import { CardShadowColorDirective } from '@features/youtube/directives/card-shadow-color.directive';
import { Video } from '@features/youtube/models/search-item.model';
import { SearchService } from '@features/youtube/services/search.service';
import { IconComponent } from '@shared/components/icon/icon.component';
import { Subscription, switchMap } from 'rxjs';

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
export class DetailedInformationPageComponent implements OnInit, OnDestroy {
  public video?: Video | undefined;

  private routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params
      .pipe(
        switchMap(params => {
          return this.searchService.getVideoById(params['id']);
        })
      )
      .subscribe(video => {
        this.video = video;
      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
