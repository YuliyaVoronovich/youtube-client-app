import { Video } from '../models/search-item.model';
import { SortFieldType, SortOrderType } from '../models/sort-field.model';

export function sortVideos(
  videos: Video[],
  param: SortFieldType,
  order: SortOrderType
): Video[] {
  return videos.sort((a, b) => {
    if (param === SortFieldType.Date) {
      return order === SortOrderType.Desc
        ? Date.parse(b.snippet.publishedAt) - Date.parse(a.snippet.publishedAt)
        : Date.parse(a.snippet.publishedAt) - Date.parse(b.snippet.publishedAt);
    }
    if (param === SortFieldType.Count) {
      return order === SortOrderType.Desc
        ? +b.statistics.viewCount - +a.statistics.viewCount
        : +a.statistics.viewCount - +b.statistics.viewCount;
    }
    return 0;
  });
}
