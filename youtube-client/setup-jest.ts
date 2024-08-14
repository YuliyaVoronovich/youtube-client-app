import 'jest-preset-angular/setup-jest';

jest.mock('src/environments/environment', () => ({
  environment: {
    BASE_API_URL: 'https://mock-api-url.com',
    YOUTUBE_API_KEY: 'mock-youtube-api-key',
  },
}));
