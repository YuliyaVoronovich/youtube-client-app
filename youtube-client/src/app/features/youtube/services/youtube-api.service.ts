import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Video } from '../models/search-item.model';
import { SearchResponse } from '../models/search-response.model';
import { Endpoint } from '../models/endpoint-youtube.model';

const BASE_API_URL = import.meta.env.NG_APP_BASE_API_URL;

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  constructor(private httpClient: HttpClient) {}

  getVideos(search?: string): Observable<Video[]> {
    const params = search
      ? new HttpParams()
          .set('type', 'video')
          .set('part', 'snippet')
          .set('maxResults', '10')
          .set('q', search)
      : new HttpParams();

    return this.httpClient
      .get<SearchResponse>(`${BASE_API_URL}${Endpoint.Search}`, {
        params,
      })
      .pipe(
        map(response => response.items.map(item => item.id.videoId).join(',')),
        switchMap(idString => this.getVideoById(idString))
      );
  }

  getVideoById(videoId: string): Observable<Video[]> {
    const params = new HttpParams()
      .set('part', 'snippet,statistics')
      .set('id', videoId);

    return this.httpClient
      .get<SearchResponse>(`${BASE_API_URL}${Endpoint.Videos}`, {
        params,
      })
      .pipe(map(response => response.items));
  }
}
