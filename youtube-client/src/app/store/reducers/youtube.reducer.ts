import { createReducer, on } from '@ngrx/store';
import * as YoutubeAction from '@store/actions/youtube.actions';
import { YoutubeState } from '@store/state.model';

export const yotubeFeatureKey = 'youtube';

export const initialState: YoutubeState = {
  items: [],
  searchQuery: '',
  currentPage: 1,
  nextPageToken: '',
  prevPageToken: '',
  stateError: '',
  favorites: [],
};

export const YoutubeReducer = createReducer(
  initialState,
  on(
    YoutubeAction.getVideosSuccess,
    (state, { items }): YoutubeState => ({
      ...state,
      items,
    })
  ),
  on(
    YoutubeAction.changeQuery,
    (state, { searchQuery }): YoutubeState => ({
      ...state,
      items: [],
      searchQuery,
    })
  ),
  on(
    YoutubeAction.setError,
    (state, { stateError }): YoutubeState => ({
      ...state,
      stateError,
    })
  ),
  on(
    YoutubeAction.setCurrentPage,
    (state, { page }): YoutubeState => ({
      ...state,
      currentPage: page,
    })
  ),
  on(
    YoutubeAction.setTokens,
    (state, { nextPageToken, prevPageToken }): YoutubeState => ({
      ...state,
      nextPageToken,
      prevPageToken,
    })
  ),
  on(
    YoutubeAction.addToFavorites,
    (state, { video }): YoutubeState => ({
      ...state,
      favorites: [...state.favorites, video],
    })
  ),
  on(
    YoutubeAction.removeFromFavorites,
    (state, { video }): YoutubeState => ({
      ...state,
      favorites: state.favorites.filter(favorites => favorites !== video),
    })
  )
);
