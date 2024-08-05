import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomCardsState } from '@store/state.model';

import { selectCurrentPage, selectYoutubeVideos } from './youtube.selector';

const MAX_ITEMS_PER_PAGE = 20;

const selectCustomCardsFeature =
  createFeatureSelector<CustomCardsState>('card');

export const selectCustomCards = createSelector(
  selectCustomCardsFeature,
  (state: CustomCardsState) => state.items
);

export const selectVideos = createSelector(
  selectCustomCards,
  selectYoutubeVideos,
  (custom, youtube) => [...custom, ...youtube]
);

export const selectVideosFirstPage = createSelector(
  selectCustomCards,
  selectYoutubeVideos,
  selectCurrentPage,
  (custom, youtube, page) => {
    const videos = page === 1 ? [...custom, ...youtube] : [...youtube];
    return videos.slice(0, MAX_ITEMS_PER_PAGE);
  }
);
