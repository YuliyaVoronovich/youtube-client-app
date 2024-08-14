import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';

describe('FilterServiceService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle showFilters value', () => {
    expect(service.isShowFilters()).toBe(false);

    service.toggleShowFilter();
    expect(service.isShowFilters()).toBe(true);

    service.toggleShowFilter();
    expect(service.isShowFilters()).toBe(false);
  });
});
