import { NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavigationEnd, Router } from '@angular/router';
import { Routes } from '@core/models/route.model';
import { FilterService } from '@features/youtube/services/filter.service';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '@shared/components/button/button.component';
import { debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';
import * as YoutubeAction from '@store/actions/youtube.actions';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ButtonComponent,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent implements OnInit, OnDestroy {
  public searchValue: string = '';

  private currentUrl: string = '';

  private routerSubscription!: Subscription;

  private searchSubscription!: Subscription;

  public searchText = new FormControl('', { nonNullable: true });

  constructor(
    private filterService: FilterService,

    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });

    this.searchSubscription = this.searchText.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter(value => value.length >= 3)
      )
      .subscribe(searchQuery => {
        this.store.dispatch(YoutubeAction.changeQuery({ searchQuery }));
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  getCurrentUrl(): string {
    return this.currentUrl;

  }

  isShowButtonSettings(): boolean {
    return (
      this.getCurrentUrl() === Routes.Main ||
      this.getCurrentUrl() === Routes.Default
    );
  }

  toggleFilters() {
    this.filterService.toggleShowFilter();
  }
}
