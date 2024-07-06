import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Video } from '../models/search-item.model';
import { SearchResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  constructor(private httpClient: HttpClient) {}

  getVideos(search: string): Observable<Video[]> {
    const params = new HttpParams().set('search', search);

    return this.httpClient
      .get<SearchResponse>('./assets/youtube-response.json', {
        params,
      })
      .pipe(map(response => response.items as Video[]));
  }
}
