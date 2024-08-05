/* eslint-disable class-methods-use-this */
import { Component, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterPipe } from '@features/youtube/pipes/filter.pipe';
import { SortPipe } from '@features/youtube/pipes/sort.pipe';
import {
  SortFieldType,
  SortOrderType,
} from '@features/youtube/models/sort-field.model';
import { SearchService } from '@features/youtube/services/search.service';
import { Store } from '@ngrx/store';
import * as CardSelectors from '@store/selectors/card.selector';
import { VideoType } from '@features/youtube/models/type-video.model';
import { Video } from '@features/youtube/models/search-item.model';
import { CustomCard } from '@store/state.model';
import { SearchItemComponent } from '../search-item/search-item.component';
import { CustomCardComponent } from '../../custom-card/custom-card.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule,
    SearchItemComponent,
    CustomCardComponent,
    MatPaginatorModule,
    NgFor,
    NgIf,
    FilterPipe,
    SortPipe,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  // public readonly videos$: Observable<Video[]> = this.searchService.videos$;

  // public readonly customCards$ = this.store.select(
  //   CardSelectors.selectCustomCards
  // );

  // public readonly youtubeVideos$ = this.store.select(
  //   YoutubeSelectors.selectYoutubeVideos
  // );

  // public readonly videos$: Observable<(Video | CustomCard)[]> = combineLatest([
  //   this.customCards$,
  //   this.youtubeVideos$,
  // ]).pipe(
  //   tap(([youtubeVideos]) => {
  //     console.warn('youtubeVideos$:', youtubeVideos);
  //   }),
  //   map(([customCards, youtubeVideos]) => [...customCards, ...youtubeVideos])
  // );

  public readonly videos$ = this.store.select(
    CardSelectors.selectVideosFirstPage
  );

  @Input({ required: true }) filterValue!: string;

  @Input({ required: true }) sortType!: SortFieldType;

  @Input({ required: true }) orderType!: SortOrderType;

  public readonly videosLength$: Observable<number> =
    this.searchService.videos$.pipe(map(videos => videos.length));

  constructor(
    private searchService: SearchService,
    private store: Store
  ) {}

  isCustomCard(item: Video | CustomCard): item is CustomCard {
    return item.type === VideoType.Card;
  }
}
