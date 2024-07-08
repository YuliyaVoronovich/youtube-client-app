import { Pipe, PipeTransform } from '@angular/core';
import { Video } from '../models/search-item.model';
import { sortVideos } from '../utils/sort-video';
import { SortFieldType, SortOrderType } from '../models/sort-field.model';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(
    videos: Video[] | undefined,
    param: SortFieldType,
    order: SortOrderType
  ): Video[] | undefined {
    if (videos) {
      return sortVideos(videos, param, order);
    }
    return videos ?? [];
  }
}
