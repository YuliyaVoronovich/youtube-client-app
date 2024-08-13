import { Component } from '@angular/core';
import { SearchItemComponent } from '@features/youtube/components/search/search-item/search-item.component';
import { Store } from '@ngrx/store';
import * as YoutubeSelectors from '@store/selectors/youtube.selector';
import * as YoutubeAction from '@store/actions/youtube.actions';
import { Video } from '@features/youtube/models/search-item.model';
import { CommonModule, NgFor } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, SearchItemComponent, NgFor],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss',
})
export class FavoritesPageComponent {
  public favoritesVideos = toSignal(
    this.store.select(YoutubeSelectors.selectFavoriteVideos),
    {
      initialValue: [],
    }
  );

  constructor(private store: Store) {}

  isFavorite(video: Video): boolean {
    const favorites = this.favoritesVideos();
    return (
      Array.isArray(favorites) && favorites.some(fav => fav.id === video.id)
    );
  }

  toggleFavorite(video: Video): void {
    if (this.isFavorite(video)) {
      this.store.dispatch(YoutubeAction.removeFromFavorites({ video }));
    } else {
      this.store.dispatch(YoutubeAction.addToFavorites({ video }));
    }
  }
}
