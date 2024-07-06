import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Video } from '../models/search-item.model';
import { YoutubeApiService } from './youtube-api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly searchString$ = new BehaviorSubject<string>('');

  public readonly videos$: Observable<Video[]> = this.searchString$.pipe(
    switchMap(searchString => this.youtubeApiServise.getVideos(searchString))
  );

  constructor(private youtubeApiServise: YoutubeApiService) {}

  getVideos(): Observable<Video[]> {
    return this.videos$;
  }
}
