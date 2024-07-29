export interface Video {
  kind: string;
  etag: string;
  id: {
    videoId: string;
  };
  snippet: Snippet;
  statistics: Statistics;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage: DefaultLanguage;
  defaultLanguage?: DefaultLanguage;
}

export interface Statistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface Thumbnails {
  default: ThumbnailInfo;
  medium: ThumbnailInfo;
  high: ThumbnailInfo;
  standard: ThumbnailInfo;
  maxres: ThumbnailInfo;
}

export interface Localized {
  title: string;
  description: string;
}

export enum DefaultLanguage {
  En = 'en',
  EnUS = 'en-US',
  Ru = 'ru',
}

export interface ThumbnailInfo {
  url: string;
  width: number;
  height: number;
}
