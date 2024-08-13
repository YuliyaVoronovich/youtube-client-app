import { mockYoutubeState } from '@store/state.model.mock';
import {
  selectYoutubeVideos,
  selectCurrentPage,
  selectSnapshot,
  selectFavoriteVideos,
} from './youtube.selector';

describe('Youtube Selectors', () => {
  it('should select youtube videos from state', () => {
    const result = selectYoutubeVideos.projector(mockYoutubeState);
    expect(result).toEqual(mockYoutubeState.items);
  });

  it('should select current page from state', () => {
    const result = selectCurrentPage.projector(mockYoutubeState);
    expect(result).toEqual(mockYoutubeState.currentPage);
  });

  it('should select the entire youtube state', () => {
    const result = selectSnapshot.projector(mockYoutubeState);
    expect(result).toEqual(mockYoutubeState);
  });

  it('should select favorite videos from state', () => {
    const result = selectFavoriteVideos.projector(mockYoutubeState);
    expect(result).toEqual(mockYoutubeState.favorites);
  });
});
