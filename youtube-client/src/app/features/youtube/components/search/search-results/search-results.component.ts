import { Component, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FilterPipe } from '@features/youtube/pipes/filter.pipe';
import { SortPipe } from '@features/youtube/pipes/sort.pipe';
import {
  SortFieldType,
  SortOrderType,
} from '@features/youtube/models/sort-field.model';
import { SearchService } from '@features/youtube/services/search.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchItemComponent } from '../search-item/search-item.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule,
    SearchItemComponent,
    NgFor,
    NgIf,
    FilterPipe,
    SortPipe,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  public readonly videos = toSignal(this.searchService.videos$, {
    initialValue: [],
  });

  @Input({ required: true }) filterValue!: string;

  @Input({ required: true }) sortType!: SortFieldType;

  @Input({ required: true }) orderType!: SortOrderType;

  public readonly videosLength$: Observable<number> =
    this.searchService.videos$.pipe(map(videos => videos.length));

  constructor(private searchService: SearchService) {}
}
