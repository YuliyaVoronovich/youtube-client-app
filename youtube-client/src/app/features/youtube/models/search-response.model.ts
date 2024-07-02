import { Video } from './search-item.model';

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
