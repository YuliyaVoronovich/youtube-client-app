import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import * as YoutubeAction from '@store/actions/youtube.actions';
import * as CardSelectors from '@store/selectors/card.selector';
import { PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';
import { Video } from '@features/youtube/models/search-item.model';
import { SearchResultsComponent } from './search-results.component';

jest.mock('src/environments/environment', () => ({
  environment: {
    BASE_API_URL: 'https://mock-api-url.com',
    YOUTUBE_API_KEY: 'mock-youtube-api-key',
  },
}));

const storeMock = {
  dispatch: jest.fn(),
  select: jest.fn().mockImplementation(selector => {
    switch (selector) {
      case CardSelectors.selectVideosFirstPage:
        return of([]);
      default:
        return of([]);
    }
  }),
};

const mockPageEvent: PageEvent = {
  pageIndex: 1,
  pageSize: 20,
  length: 100,
};

const mockVideo: Video = {
  id: {
    videoId: 'mockVideoId',
  },
  snippet: {
    title: 'Mock Video Title',
    description: 'Mock Video Description',
    thumbnails: {
      default: {
        url: 'https://test.com/test.jpg',
      },
    },
  },
} as Video;

describe('FilterComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultsComponent],
      providers: [
        provideMockStore({
          initialState: {
            card: { items: [] },
            youtube: { items: [] },
          },
        }),
        provideRouter([]),
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch setCurrentPage and switchPage actions on page change', () => {
    const storeSpy = storeMock.dispatch;

    component.currentPage = 1;
    component.prevPageToken = 'prevToken';
    component.nextPageToken = 'nextToken';
    component.searchQuery = 'testQuery';

    component.handlePageChange(mockPageEvent);

    expect(storeSpy).toHaveBeenCalledWith(
      YoutubeAction.setCurrentPage({ page: 2 })
    );
    expect(storeSpy).toHaveBeenCalledWith(
      YoutubeAction.switchPage({
        searchQuery: 'testQuery',
        pageToken: 'nextToken',
      })
    );
  });

  it('should dispatch addToFavorites when video is not a favorite', () => {
    const storeSpy = storeMock.dispatch;

    jest.spyOn(component, 'isFavorite').mockReturnValue(false);

    component.toggleFavorite(mockVideo);

    expect(storeSpy).toHaveBeenCalledWith(
      YoutubeAction.addToFavorites({ video: mockVideo })
    );
  });

  it('should dispatch removeFromFavorites when video is a favorite', () => {
    const storeSpy = storeMock.dispatch;

    jest.spyOn(component, 'isFavorite').mockReturnValue(true);

    component.toggleFavorite(mockVideo);

    expect(storeSpy).toHaveBeenCalledWith(
      YoutubeAction.removeFromFavorites({ video: mockVideo })
    );
  });
});
