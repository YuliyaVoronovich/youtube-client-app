import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/material/material.module';
import { ButtonComponent } from '../../../../shared/components/buttons/button/button.component';
import { FilterService } from '../../../../features/youtube/services/filter.service';
import { SearchService } from '../../../../features/youtube/services/search.service';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [MaterialModule, FormsModule, ButtonComponent],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent {
  public searchValue: string = '';

  constructor(
    private filterService: FilterService,
    private searchService: SearchService
  ) {}

  getResult(value: string) {
    this.searchService.searchVideos(value);
  }

  toggleFilters() {
    this.filterService.toggleShowFilter();
  }
}
