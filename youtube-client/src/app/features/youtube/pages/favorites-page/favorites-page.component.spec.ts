import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Video } from '@features/youtube/models/search-item.model';
import * as YoutubeSelectors from '@store/selectors/youtube.selector';
import { FavoritesPageComponent } from './favorites-page.component';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;

  let store: MockStore;

  const mockFavoriteVideos: Video[] = [
    {
      kind: 'youtube#video',
      etag: 'etag1',
      id: { videoId: '1' },
      snippet: {
        title: 'Video 1',
        description: 'Desc 1',
        thumbnails: {
          default: { url: 'http://test.com/1.jpg' },
          medium: { url: 'http://test.com/1.jpg' },
        },
      },
      statistics: {},
      type: 'video',
    },
    {
      kind: 'youtube#video',
      etag: 'etag2',
      id: { videoId: '2' },
      snippet: {
        title: 'Video 2',
        description: 'Desc 2',
        thumbnails: {
          default: { url: 'http://test.com/2.jpg' },
          medium: { url: 'http://test.com/2.jpg' },
        },
      },
      statistics: {},
      type: 'video',
    },
  ] as Video[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesPageComponent],
      providers: [
        provideMockStore({}),
        provideRouter([]),
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    store.overrideSelector(
      YoutubeSelectors.selectFavoriteVideos,
      mockFavoriteVideos
    );

    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly identify a video as favorite', () => {
    const video: Video = mockFavoriteVideos[0];
    expect(component.isFavorite(video)).toBeTruthy();
  });

});
