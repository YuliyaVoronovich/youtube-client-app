import { NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavigationEnd, Router } from '@angular/router';
import { Routes } from '@core/models/route.model';
import { FilterService } from '@features/youtube/services/filter.service';
import { SearchService } from '@features/youtube/services/search.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { Subscription } from 'rxjs';

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

  protected searchText = new FormControl('');

  constructor(
    private filterService: FilterService,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });

    this.searchText.valueChanges.subscribe(value => {
      if (!value) return;
      this.searchService.searchVideos(value);
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  isShowButtonSettings() {
    return (
      this.currentUrl === Routes.Default || this.currentUrl === Routes.Main
    );
  }

  toggleFilters() {
    this.filterService.toggleShowFilter();
  }
}
