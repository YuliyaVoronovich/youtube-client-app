import { Video } from '@features/youtube/models/search-item.model';
import { createAction, props } from '@ngrx/store';

enum YouTubePage {
  Error = '[Youtube Api] Set error',
  Success = '[Youtube Api] Set response',
  Query = '[Youtube Api] Change query',
}

export const getVideosSuccess = createAction(
  YouTubePage.Success,
  props<{ items: Video[] }>()
);
export const changeQuery = createAction(
  YouTubePage.Query,
  props<{ searchQuery: string }>()
);
export const setError = createAction(
  YouTubePage.Error,
  props<{ stateError: string }>()
);
