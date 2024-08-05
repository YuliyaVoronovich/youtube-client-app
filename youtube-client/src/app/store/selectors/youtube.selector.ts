import { createFeatureSelector, createSelector } from '@ngrx/store';
import { YoutubeState } from '@store/state.model';

const selectYoutubeFeature = createFeatureSelector<YoutubeState>('youtube');

export const selectYoutubeVideos = createSelector(
  selectYoutubeFeature,
  (state: YoutubeState) => state.items
);

export const selectCurrentPage = createSelector(
  selectYoutubeFeature,
  (state: YoutubeState) => state.currentPage
);
