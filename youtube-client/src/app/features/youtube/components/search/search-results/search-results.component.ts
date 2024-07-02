import { Component } from '@angular/core';
import { Video } from '../../../models/search-item.model';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  public videos: Video[] = [];
}
