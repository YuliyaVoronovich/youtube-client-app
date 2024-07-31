import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Video } from '../models/search-item.model';
import { SearchResponse } from '../models/search-response.model';

const { BASE_API_URL } = environment;
const COUNT_LIMIT = 10;

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  constructor(private httpClient: HttpClient) {}

  getVideos(search?: string): Observable<Video[]> {
    const params = search
      ? new HttpParams()
          .set('type', 'video')
          .set('maxResults', COUNT_LIMIT)
          .set('q', search)
      : new HttpParams();

    return this.httpClient
      .get<SearchResponse>(`${BASE_API_URL}/search`, {
        params,
      })
      .pipe(
        map(response => response.items.map(item => item.id.videoId).join(',')),
        switchMap(videoIds => this.getVideosByIds(videoIds))
      );
  }

  getVideosByIds(videoId: string): Observable<Video[]> {
    const params = new HttpParams()
      .set('part', 'snippet,statistics')
      .set('id', videoId);

    return this.httpClient
      .get<SearchResponse>(`${BASE_API_URL}/videos`, {
        params,
      })
      .pipe(map(response => response.items));
  }
}
