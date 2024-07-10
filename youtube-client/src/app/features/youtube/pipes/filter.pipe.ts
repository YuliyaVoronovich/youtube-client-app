import { Pipe, PipeTransform } from '@angular/core';
import { Video } from '../models/search-item.model';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(videos: Video[] | null, input: string): Video[] {
    return input && videos
      ? videos.filter(video =>
          video.snippet.title.toLowerCase().includes(input.toLowerCase())
        )
      : videos ?? [];
  }
}
