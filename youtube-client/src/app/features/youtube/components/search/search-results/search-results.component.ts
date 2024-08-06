/* eslint-disable class-methods-use-this */
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FilterPipe } from '@features/youtube/pipes/filter.pipe';
import { SortPipe } from '@features/youtube/pipes/sort.pipe';
import {
  SortFieldType,
  SortOrderType,
} from '@features/youtube/models/sort-field.model';
import { SearchService } from '@features/youtube/services/search.service';
import { Store } from '@ngrx/store';
import * as CardSelectors from '@store/selectors/card.selector';
import * as YoutubeSelectors from '@store/selectors/youtube.selector';
import * as YoutubeAction from '@store/actions/youtube.actions';
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
export class SearchResultsComponent implements OnInit, OnDestroy {
  public readonly videos$ = this.store.select(
    CardSelectors.selectVideosFirstPage
  );

  @Input({ required: true }) filterValue!: string;

  @Input({ required: true }) sortType!: SortFieldType;

  @Input({ required: true }) orderType!: SortOrderType;

  public readonly videosLength$: Observable<number> =
    this.searchService.videos$.pipe(map(videos => videos.length));

  public prevPageToken = '';

  public nextPageToken = '';

  public currentPage!: number;

  public searchQuery = '';

  private tokenSubscription!: Subscription;

  constructor(
    private searchService: SearchService,
    private store: Store
  ) {}

  ngOnInit(): void {
    const pageTokens$ = this.store.select(YoutubeSelectors.selectSnapshot);
    this.tokenSubscription = pageTokens$.subscribe(tokens => {
      this.prevPageToken = tokens.prevPageToken;
      this.nextPageToken = tokens.nextPageToken;
      this.currentPage = tokens.currentPage;
      this.searchQuery = tokens.searchQuery;
    });
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

  isCustomCard(item: Video | CustomCard): item is CustomCard {
    return item.type === VideoType.Card;
  }

  handlePageChange(event: PageEvent) {
    const page = event.pageIndex + 1;
    const pageToken =
      this.currentPage < page ? this.nextPageToken : this.prevPageToken;
    this.store.dispatch(
      YoutubeAction.setCurrentPage({
        page,
      })
    );
    if (pageToken) {
      this.store.dispatch(
        YoutubeAction.switchPage({
          searchQuery: this.searchQuery,
          pageToken,
        })
      );
    }
  }
}
