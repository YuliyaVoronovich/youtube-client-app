import * as YoutubeActions from '@store/actions/youtube.actions';
import { mockVideos, mockVideo } from '@store/state.model.mock';
import { YouTubePage } from './youtube.actions';

describe('YouTube Actions', () => {
  it('should create a getVideosSuccess action', () => {
    const action = YoutubeActions.getVideosSuccess({ items: mockVideos });

    expect(action).toEqual({
      type: YouTubePage.Success,
      items: mockVideos,
    });
  });

  it('should create a changeQuery action', () => {
    const query = 'test query';
    const action = YoutubeActions.changeQuery({ searchQuery: query });

    expect(action).toEqual({
      type: YouTubePage.Query,
      searchQuery: query,
    });
  });

  it('should create a setError action', () => {
    const error = 'Some error occurred';
    const action = YoutubeActions.setError({ stateError: error });

    expect(action).toEqual({
      type: YouTubePage.Error,
      stateError: error,
    });
  });

  it('should create a setCurrentPage action', () => {
    const page = 2;
    const action = YoutubeActions.setCurrentPage({ page });

    expect(action).toEqual({
      type: YouTubePage.SetCurrentPage,
      page,
    });
  });

  it('should create a switchPage action', () => {
    const query = 'test query';
    const pageToken = 'some_page_token';
    const action = YoutubeActions.switchPage({
      searchQuery: query,
      pageToken,
    });

    expect(action).toEqual({
      type: YouTubePage.SwitchPage,
      searchQuery: query,
      pageToken,
    });
  });

  it('should create a setTokens action', () => {
    const nextPageToken = 'next_page_token';
    const prevPageToken = 'prev_page_token';
    const action = YoutubeActions.setTokens({
      nextPageToken,
      prevPageToken,
    });

    expect(action).toEqual({
      type: YouTubePage.SaveTokens,
      nextPageToken,
      prevPageToken,
    });
  });

  it('should create an addToFavorites action', () => {
    const action = YoutubeActions.addToFavorites({ video: mockVideo });

    expect(action).toEqual({
      type: YouTubePage.Add_favorites,
      video: mockVideo,
    });
  });

  it('should create a removeFromFavorites action', () => {
    const action = YoutubeActions.removeFromFavorites({ video: mockVideo });

    expect(action).toEqual({
      type: YouTubePage.Remove_favorites,
      video: mockVideo,
    });
  });
});
