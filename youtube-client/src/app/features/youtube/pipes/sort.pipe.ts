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
    videos: Video[],
    param: SortFieldType,
    order: SortOrderType
  ): Video[] {
    return videos ? sortVideos(videos, param, order) : videos;
  }
}
