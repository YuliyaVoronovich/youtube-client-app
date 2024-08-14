import { Injectable } from '@angular/core';
import { YoutubeApiService } from '@features/youtube/services/youtube-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as YoutubeAction from '@store/actions/youtube.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class YoutubeEffects {
  public constructor(
    private readonly youtubeApiService: YoutubeApiService,
    private readonly actions$: Actions
  ) {}

  private searchResults$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YoutubeAction.changeQuery),
      switchMap(action =>
        this.youtubeApiService.getVideos(action.searchQuery).pipe(
          map(items => YoutubeAction.getVideosSuccess({ items })),
          catchError(stateError => of(YoutubeAction.setError({ stateError })))
        )
      )
    );
  });

  private switchPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YoutubeAction.switchPage),
      switchMap(action =>
        this.youtubeApiService
          .getVideos(action.searchQuery, action.pageToken)
          .pipe(
            map(items => YoutubeAction.getVideosSuccess({ items })),
            catchError(stateError => of(YoutubeAction.setError({ stateError })))
          )
      )
    );
  });
}
