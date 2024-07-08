import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

import {
  SortFieldType,
  SortingField,
  SortOrderType,
} from '../../models/sort-field.model';
import { FilterComponent } from '../../components/filter/filter.component';
import { SearchResultsComponent } from '../../components/search/search-results/search-results.component';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FilterComponent, SearchResultsComponent, NgIf],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit, OnDestroy {
  public showFilters = false;

  public inputValue: string = '';

  public sortType = SortFieldType.Date;

  public orderType = SortOrderType.Desc;

  private subscription!: Subscription;

  constructor(private filterService: FilterService) {
    this.showFilters = this.filterService.isShowFilter();
  }

  ngOnInit() {
    this.subscription = this.filterService.showFilters$.subscribe(
      showFilters => {
        this.showFilters = showFilters;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFilterChange(value: string) {
    this.inputValue = value;
  }

  onSortingChange(sortingField: SortingField) {
    this.sortType = sortingField.value;
    this.orderType = sortingField.order;
  }
}
