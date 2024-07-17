import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private showFiltersSubject$$ = new BehaviorSubject<boolean>(false);

  public showFilters$: Observable<boolean> = this.showFiltersSubject$$;

  toggleShowFilter(): void {
    this.showFiltersSubject$$.next(!this.showFiltersSubject$$.value);
  }
}
