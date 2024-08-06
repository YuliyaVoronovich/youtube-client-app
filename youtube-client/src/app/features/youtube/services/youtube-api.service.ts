import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as YoutubeAction from '@store/actions/youtube.actions';
import { Video } from '../models/search-item.model';
import { SearchResponse } from '../models/search-response.model';

const { BASE_API_URL } = environment;
const COUNT_LIMIT = 30;

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  constructor(
    private httpClient: HttpClient,
    private store: Store
  ) {}

  getVideos(search?: string, token: string = ''): Observable<Video[]> {
    const params = search
      ? new HttpParams()
          .set('type', 'video')
          .set('maxResults', COUNT_LIMIT)
          .set('q', search)
          .set('pageToken', token)
      : new HttpParams();

    return this.httpClient
      .get<SearchResponse>(`${BASE_API_URL}/search`, {
        params,
      })
      .pipe(
        tap(response => {
          const newTokens = {
            nextPageToken: response.nextPageToken || '',
            prevPageToken: response.prevPageToken || '',
          };
          this.store.dispatch(
            YoutubeAction.setTokens({
              nextPageToken: newTokens.nextPageToken,
              prevPageToken: newTokens.prevPageToken,
            })
          );
        }),
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
