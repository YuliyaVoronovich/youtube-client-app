import { Component, OnDestroy } from '@angular/core';
import { SearchItemComponent } from '@features/youtube/components/search/search-item/search-item.component';
import { Store } from '@ngrx/store';
import * as YoutubeSelectors from '@store/selectors/youtube.selector';
import * as YoutubeAction from '@store/actions/youtube.actions';
import { Video } from '@features/youtube/models/search-item.model';
import { CommonModule, NgFor } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, SearchItemComponent, NgFor],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss',
})
export class FavoritesPageComponent implements OnDestroy {
  public favoritesVideos$ = this.store.select(
    YoutubeSelectors.selectFavoriteVideos
  );

  private favoritesSubscription!: Subscription;

  constructor(private store: Store) {}

  ngOnDestroy() {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

  isFavorite(video: Video): boolean {
    let isFavorite = false;
    this.favoritesSubscription = this.favoritesVideos$.subscribe(favorites => {
      isFavorite = favorites.includes(video);
    });
    return isFavorite;
  }

  toggleFavorite(video: Video): void {
    if (this.isFavorite(video)) {
      this.store.dispatch(YoutubeAction.removeFromFavorites({ video }));
    } else {
      this.store.dispatch(YoutubeAction.addToFavorites({ video }));
    }
  }
}
