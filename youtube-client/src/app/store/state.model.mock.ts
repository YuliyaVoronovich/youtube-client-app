import { Video } from '@features/youtube/models/search-item.model';
import { CustomCard, CustomCardsState, YoutubeState } from './state.model';

export const mockVideos: Video[] = [
  {
    id: {
      videoId: '1',
    },
    snippet: {
      title: 'Video 1',
    },
  },
  {
    id: {
      videoId: '2',
    },
    snippet: {
      title: 'Video 2',
    },
  },
] as Video[];

export const mockVideo: Video = {
  id: {
    videoId: '1',
  },
  snippet: {
    title: 'Video 1',
  },
} as Video;

export const mockCard: CustomCard = {
  id: '3',
  title: 'New Card',
  description: 'Description',
  imageLink: 'https://test.com/image.jpg',
  videoLink: 'https://test.com/video.mp4',
  creationDate: new Date().toISOString(),
  type: 'card',
} as CustomCard;

export const mockCards: CustomCard[] = [
  {
    id: '1',
    title: 'Card 1',
    description: 'Description 1',
    imageLink: 'https://example.com/image1.jpg',
    videoLink: 'https://example.com/video1.mp4',
    creationDate: new Date().toISOString(),
    type: 'card',
  },
  {
    id: '2',
    title: 'Card 2',
    description: 'Description 2',
    imageLink: 'https://example.com/image2.jpg',
    videoLink: 'https://example.com/video2.mp4',
    creationDate: new Date().toISOString(),
    type: 'card',
  },
] as CustomCard[];

export const mockCustomCardsState: CustomCardsState = {
  items: mockCards,
};

export const mockYoutubeState: YoutubeState = {
  items: mockVideos,
  searchQuery: '',
  currentPage: 1,
  nextPageToken: '',
  prevPageToken: '',
  stateError: '',
  favorites: [],
};
