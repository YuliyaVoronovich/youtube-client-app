import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

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
export class MainPageComponent {
  public inputValue: string = '';

  public sortType = SortFieldType.Date;

  public orderType = SortOrderType.Desc;

  constructor(private filterService: FilterService) {}

  get showFilters(): boolean {
    return this.filterService.isShowFilters();
  }

  onFilterChange(value: string) {
    this.inputValue = value;
  }

  onSortingChange(sortingField: SortingField) {
    this.sortType = sortingField.value;
    this.orderType = sortingField.order;
  }
}
