import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Video } from '../models/search-item.model';
import { SearchResponse } from '../models/search-response.model';

const BASE_API_URL = 'https://youtube.googleapis.com/youtube/v3';

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
      : {};

    return this.httpClient
      .get<SearchResponse>(`${BASE_API_URL}/search`, {
        params,
      })
      .pipe(
        switchMap(response =>
          forkJoin(
            response.items.map(item =>
              this.getVideoById(item.id.videoId).pipe(
                map(videoResponse => ({
                  ...item,
                  statistics: videoResponse.statistics,
                }))
              )
            )
          )
        )
      );
  }

  getVideoById(videoId: string): Observable<Video> {
    const params = new HttpParams()
      .set('part', 'snippet,statistics')
      .set('id', videoId);
    return this.httpClient
      .get<SearchResponse>(`${BASE_API_URL}/videos`, {
        params,
      })
      .pipe(map(response => response.items[0]));
  }
}
