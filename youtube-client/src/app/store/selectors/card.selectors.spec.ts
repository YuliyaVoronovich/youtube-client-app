import {
  mockCustomCardsState,
  mockYoutubeState,
} from '@store/state.model.mock';
import {
  selectCustomCards,
  selectVideos,
  selectVideosFirstPage,
} from './card.selector';

describe('Card Selectors', () => {
  it('should select custom cards from state', () => {
    const result = selectCustomCards.projector(mockCustomCardsState);
    expect(result).toEqual(mockCustomCardsState.items);
  });

  it('should select all videos (custom and youtube)', () => {
    const result = selectVideos.projector(
      mockCustomCardsState.items,
      mockYoutubeState.items
    );
    expect(result).toEqual([
      ...mockCustomCardsState.items,
      ...mockYoutubeState.items,
    ]);
  });

  it('should select videos for the first page', () => {
    const result = selectVideosFirstPage.projector(
      mockCustomCardsState.items,
      mockYoutubeState.items,
      1
    );
    expect(result).toEqual(
      [...mockCustomCardsState.items, ...mockYoutubeState.items].slice(0, 20)
    );
  });

  it('should select only youtube videos for pages other than the first', () => {
    const result = selectVideosFirstPage.projector(
      mockCustomCardsState.items,
      mockYoutubeState.items,
      2
    );
    expect(result).toEqual(mockYoutubeState.items.slice(0, 20));
  });
});
