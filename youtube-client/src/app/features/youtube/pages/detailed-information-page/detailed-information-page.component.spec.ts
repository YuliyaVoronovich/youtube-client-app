import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DetailedInformationPageComponent } from './detailed-information-page.component';

jest.mock('src/environments/environment', () => ({
  environment: {
    BASE_API_URL: 'https://mock-api-url.com',
    YOUTUBE_API_KEY: 'mock-youtube-api-key',
  },
}));

describe('DetailedInformationPageComponent', () => {
  let component: DetailedInformationPageComponent;
  let fixture: ComponentFixture<DetailedInformationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedInformationPageComponent],
      providers: [
        provideMockStore({}),
        provideRouter([]),
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailedInformationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
