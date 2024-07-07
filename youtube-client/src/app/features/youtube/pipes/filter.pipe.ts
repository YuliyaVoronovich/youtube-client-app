import { Pipe, PipeTransform } from '@angular/core';
import { Video } from '../models/search-item.model';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(value: Video[], input: string): Video[] {
    if (input) {
      return value.filter(video => video.snippet.title.includes(input));
    }
    return value;
  }
}
