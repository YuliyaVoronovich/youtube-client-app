import { Component, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Video } from '../../../models/search-item.model';
import { SearchService } from '../../../services/search.service';
import { SearchItemComponent } from '../search-item/search-item.component';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { SortPipe } from '../../../pipes/sort.pipe';
import { SortFieldType, SortOrderType } from '../../../models/sort-field.model';

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
  public readonly videos$: Observable<Video[]> = this.searchService.videos$;

  @Input() filterValue!: string;

  @Input() sortType!: SortFieldType;

  @Input() orderType!: SortOrderType;

  public readonly videosLength$: Observable<number> =
    this.searchService.videos$.pipe(map(videos => videos.length));

  constructor(private searchService: SearchService) {}
}
