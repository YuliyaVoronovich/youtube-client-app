import { Video } from '@features/youtube/models/search-item.model';
import { createAction, props } from '@ngrx/store';

export enum YouTubePage {
  Error = '[Youtube Api] Set error',
  Success = '[Youtube Api] Set response',
  Query = '[Youtube Api] Change query',
  SetCurrentPage = '[Youtube Api] Set current page',
  SaveTokens = '[Youtube Api] Save page tokens',
  SwitchPage = '[Youtube Api] Switch Page',
  Add_favorites = '[Favorites Video] Add favorites video',
  Remove_favorites = '[Favorites Video] Remove favorites video',
  Check_video = '[Favorites Video] Check favorites video',
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
export const setCurrentPage = createAction(
  YouTubePage.SetCurrentPage,
  props<{ page: number }>()
);
export const switchPage = createAction(
  YouTubePage.SwitchPage,
  props<{ searchQuery: string; pageToken?: string }>()
);

export const setTokens = createAction(
  YouTubePage.SaveTokens,
  props<{ nextPageToken: string; prevPageToken: string }>()
);
export const addToFavorites = createAction(
  YouTubePage.Add_favorites,
  props<{ video: Video }>()
);

export const removeFromFavorites = createAction(
  YouTubePage.Remove_favorites,
  props<{ video: Video }>()
);
