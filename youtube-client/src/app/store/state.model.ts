import { Video } from '@features/youtube/models/search-item.model';
import { VideoType } from '@features/youtube/models/type-video.model';

export interface CustomCard {
  id: string;
  title: string;
  description: string;
  imageLink: string;
  videoLink: string;
  creationDate: string;
  type: VideoType.Card;
}

export interface CustomCardsState {
  items: CustomCard[];
}

export interface YoutubeState {
  items: Video[];
  nextPageToken: string;
  prevPageToken: string;
  currentPage: number;
  searchQuery: string;
  stateError: string;
}
