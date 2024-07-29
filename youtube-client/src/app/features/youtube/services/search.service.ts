import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  switchMap,
} from 'rxjs';
import { Video } from '../models/search-item.model';
import { YoutubeApiService } from './youtube-api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly searchString$$ = new BehaviorSubject<string>('');

  public videos$: Observable<Video[]> = this.searchString$$.pipe(
    debounceTime(1000),
    distinctUntilChanged(),
    filter(searchString => searchString.length >= 3),
    switchMap(searchString => {
      return this.youtubeApiService.getVideos(searchString);
    })
  );

  constructor(private youtubeApiService: YoutubeApiService) {}

  searchVideos(value: string) {
    this.searchString$$.next(value);
  }

  getVideoById(videoId: string) {
    return this.youtubeApiService.getVideoById(videoId);
  }
}
