import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private showFilters$$ = new BehaviorSubject<boolean>(false);

  public showFilters$: Observable<boolean> = this.showFilters$$;

  toggleShowFilter(): void {
    this.showFilters$$.next(!this.showFilters$$.value);
  }
}
