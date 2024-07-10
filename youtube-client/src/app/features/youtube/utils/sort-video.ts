import { Video } from '../models/search-item.model';
import { SortFieldType, SortOrderType } from '../models/sort-field.model';

function sortByDate(videos1: Video, videos2: Video): number {
  const dateA = Date.parse(videos1.snippet.publishedAt);
  const dateB = Date.parse(videos2.snippet.publishedAt);
  return dateA - dateB;
}

function sortByCount(videos1: Video, videos2: Video): number {
  const countA = +videos1.statistics.viewCount;
  const countB = +videos2.statistics.viewCount;
  return countA - countB;
}

const mapFunctions: Record<SortFieldType, (a: Video, b: Video) => number> = {
  [SortFieldType.Date]: sortByDate,
  [SortFieldType.Count]: sortByCount,
};

export function sortVideos(
  videos: Video[],
  param: SortFieldType,
  order: SortOrderType
): Video[] {
  const sortFunction = mapFunctions[param];
  const multiplier = order === SortOrderType.Desc ? -1 : 1;

  return videos
    .slice()
    .sort((videos1, videos2) => sortFunction(videos1, videos2) * multiplier);
}
