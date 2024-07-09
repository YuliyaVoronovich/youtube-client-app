import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { Video } from '../models/search-item.model';
import { YoutubeApiService } from './youtube-api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly searchString$ = new BehaviorSubject<string>('');

  public videos$: Observable<Video[]> = this.searchString$.pipe(
    switchMap(searchString => {
      if (searchString.trim().length === 0) {
        return of([]);
      }
      return this.youtubeApiService.getVideos(searchString);
    })
  );

  constructor(private youtubeApiService: YoutubeApiService) {}

  searchVideos(value: string) {
    this.searchString$.next(value);
  }
}
