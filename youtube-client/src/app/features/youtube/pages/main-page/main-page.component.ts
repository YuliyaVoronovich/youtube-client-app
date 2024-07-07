import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
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

  onValueChange(value: string) {
    this.inputValue = value;
  }
}
