import { Video } from '@features/youtube/models/search-item.model';

export interface CustomCard {
  id: string;
  title: string;
  description: string;
  imageLink: string;
  videoLink: string;
  creationDate: string;
}

export interface CustomCardsState {
  customCardsState: CustomCard[];
}

export interface YoutubeState {
  customCards: CustomCard[];
  items: Video[];
  nextPageToken: string;
  prevPageToken: string;
  currentPage: number;
  searchQuery: string;
}
