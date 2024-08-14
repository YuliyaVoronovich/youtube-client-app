import { YoutubeState } from '@store/state.model';
import { mockVideos as items, mockVideo } from '@store/state.model.mock';
import { YoutubeReducer, initialState } from './youtube.reducer';
import * as YoutubeActions from '../actions/youtube.actions';

describe('Youtube Reducer', () => {
  let initialStateYoutube: YoutubeState;

  beforeEach(() => {
    initialStateYoutube = { ...initialState };
  });

  it('should handle getVideosSuccess', () => {
    const action = YoutubeActions.getVideosSuccess({ items });
    const result = YoutubeReducer(initialStateYoutube, action);
    expect(result.items).toEqual(items);
  });

  it('should handle changeQuery', () => {
    const searchQuery = 'new query';
    const action = YoutubeActions.changeQuery({ searchQuery });
    const result = YoutubeReducer(initialStateYoutube, action);
    expect(result.searchQuery).toEqual(searchQuery);
    expect(result.items).toEqual([]);
  });

  it('should handle setError', () => {
    const stateError = 'Some error';
    const action = YoutubeActions.setError({ stateError });
    const result = YoutubeReducer(initialStateYoutube, action);
    expect(result.stateError).toEqual(stateError);
  });

  it('should handle setCurrentPage', () => {
    const page = 2;
    const action = YoutubeActions.setCurrentPage({ page });
    const result = YoutubeReducer(initialStateYoutube, action);
    expect(result.currentPage).toEqual(page);
  });

  it('should handle setTokens', () => {
    const nextPageToken = 'next_token';
    const prevPageToken = 'prev_token';
    const action = YoutubeActions.setTokens({ nextPageToken, prevPageToken });
    const result = YoutubeReducer(initialStateYoutube, action);
    expect(result.nextPageToken).toEqual(nextPageToken);
    expect(result.prevPageToken).toEqual(prevPageToken);
  });

  it('should handle addToFavorites', () => {
    const action = YoutubeActions.addToFavorites({ video: mockVideo });
    const result = YoutubeReducer(initialStateYoutube, action);
    expect(result.favorites).toContain(mockVideo);
  });

  it('should handle removeFromFavorites', () => {
    initialStateYoutube.favorites = [mockVideo];

    const action = YoutubeActions.removeFromFavorites({ video: mockVideo });
    const result = YoutubeReducer(initialStateYoutube, action);
    expect(result.favorites).not.toContain(mockVideo);
  });
});
