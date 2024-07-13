import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';
import { Video } from '../models/search-item.model';
import { YoutubeApiService } from './youtube-api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly searchString$ = new BehaviorSubject<string>('');

  public videos$: Observable<Video[]> = this.searchString$.pipe(
    filter(searchString => searchString.trim().length > 0),
    switchMap(searchString => {
      return this.youtubeApiService.getVideos(searchString).pipe(startWith([]));
    })
  );

  constructor(private youtubeApiService: YoutubeApiService) {}

  searchVideos(value: string) {
    this.searchString$.next(value);
  }

  getVideoById() {
    return this.youtubeApiService.getVideos().pipe(startWith([]));
  }
}
