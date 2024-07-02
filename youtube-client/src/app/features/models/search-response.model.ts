import { Video } from './search-item.models';

export interface SearchResponse {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: Video[];
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
