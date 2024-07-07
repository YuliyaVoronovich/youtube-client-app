import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Video } from '../../../models/search-item.model';
import { SearchService } from '../../../services/search.service';
import { SearchItemComponent } from '../search-item/search-item.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, SearchItemComponent, NgFor, NgIf],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  public readonly videos$: Observable<Video[]> = this.searchService.videos$;

  public readonly videosLength$: Observable<number> =
    this.searchService.videos$.pipe(map(videos => videos.length));

  constructor(private searchService: SearchService) {}
}
