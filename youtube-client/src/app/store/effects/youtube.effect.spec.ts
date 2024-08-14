import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, of, take } from 'rxjs';
import { YoutubeApiService } from '@features/youtube/services/youtube-api.service';
import * as YoutubeActions from '@store/actions/youtube.actions';
import { mockVideos } from '@store/state.model.mock';
import { Action } from '@ngrx/store';
import { YoutubeEffects } from './youtube.effect';

describe('YoutubeEffects', () => {
  let effect: YoutubeEffects;
  let action$: ReplaySubject<Action>;
  let youtubeApiService: YoutubeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        YoutubeEffects,
        provideMockActions(() => action$),
        {
          provide: YoutubeApiService,
          useValue: {
            getVideos: jest.fn(() => of(mockVideos)),
          },
        },
      ],
    });

    effect = TestBed.inject(YoutubeEffects);
    youtubeApiService = TestBed.inject(YoutubeApiService);
    action$ = new ReplaySubject();
  });

  it('should be created', () => {
    expect(effect).toBeTruthy();
  });

  it('should get videos on searchResults$', async () => {
    const searchQuery = 'test query';
    action$.next(YoutubeActions.changeQuery({ searchQuery }));

    const result = await new Promise(resolve => {
      effect.searchResults$.pipe(take(1)).subscribe(resolve);
    });

    expect(youtubeApiService.getVideos).toHaveBeenCalledWith(searchQuery);
    expect(result).toEqual(
      YoutubeActions.getVideosSuccess({ items: mockVideos })
    );
  });

  it('should get videos on switchPage$', async () => {
    const searchQuery = 'test query';
    const pageToken = 'next_page_token';
    action$.next(YoutubeActions.switchPage({ searchQuery, pageToken }));

    const result = await new Promise(resolve => {
      effect.switchPage$.pipe(take(1)).subscribe(resolve);
    });

    expect(youtubeApiService.getVideos).toHaveBeenCalledWith(
      searchQuery,
      pageToken
    );
    expect(result).toEqual(
      YoutubeActions.getVideosSuccess({ items: mockVideos })
    );
  });
});
