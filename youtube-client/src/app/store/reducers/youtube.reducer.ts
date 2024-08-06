import { createReducer, on } from '@ngrx/store';
import * as YoutubeAction from '@store/actions/youtube.actions';
import { YoutubeState } from '@store/state.model';

export const yotubeFeatureKey = 'youtube';

const initialState: YoutubeState = {
  items: [],
  searchQuery: '',
  currentPage: 1,
  nextPageToken: '',
  prevPageToken: '',
  stateError: '',
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
  )
);
