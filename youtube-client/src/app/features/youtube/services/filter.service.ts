import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private showFilters = signal(false);

  get isShowFilters(): WritableSignal<boolean> {
    return this.showFilters;
  }

  toggleShowFilter(): void {
    this.showFilters.update(value => !value);
  }
}
