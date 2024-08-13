import { TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as YoutubeAction from '@store/actions/youtube.actions';
import { YoutubeApiService } from './youtube-api.service';

describe('YoutubeApiService', () => {
  let service: YoutubeApiService;
  const httpClientMock = {
    get: jest.fn(),
  };
  const storeMock = {
    dispatch: jest.fn(),
  };

  const mockResponse = {
    items: [{ id: { videoId: 'abc123' } }],
    nextPageToken: 'next-token',
    prevPageToken: 'prev-token',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({}),
        provideHttpClient(),
        provideHttpClientTesting(),
        YoutubeApiService,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: Store, useValue: storeMock },
      ],
    });
    service = TestBed.inject(YoutubeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch setTokens action with the correct tokens', () => {
    httpClientMock.get.mockReturnValue(of(mockResponse));

    service.getVideos('test').subscribe();

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      YoutubeAction.setTokens({
        nextPageToken: 'next-token',
        prevPageToken: 'prev-token',
      })
    );
  });

  it('should call getVideosByIds with correct parameters', () => {
    const mockVideoId = 'abc123';
    const mockResponseId = {
      items: [{ id: mockVideoId, snippet: {}, statistics: {} }],
    };

    httpClientMock.get.mockReturnValue(of(mockResponseId));

    service.getVideosByIds(mockVideoId).subscribe(videos => {
      expect(videos).toEqual(mockResponseId.items);
    });
  });
});
