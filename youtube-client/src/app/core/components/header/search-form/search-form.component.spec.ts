import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { FilterService } from '@features/youtube/services/filter.service';
import { Routes } from '@core/models/route.model';
import { Store } from '@ngrx/store';
import * as YoutubeAction from '@store/actions/youtube.actions';
import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let filterService: FilterService;

  const storeMock = {
    dispatch: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFormComponent],
      providers: [
        provideMockStore({}),
        provideRouter([]),
        provideAnimations(),
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    filterService = TestBed.inject(FilterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle filters', () => {
    jest.spyOn(filterService, 'toggleShowFilter');
    component.toggleFilters();
    expect(filterService.toggleShowFilter).toHaveBeenCalled();
  });

  it('should show button settings on default or main route', () => {
    jest.spyOn(component, 'getCurrentUrl').mockReturnValue(Routes.Main);
    expect(component.isShowButtonSettings()).toBeTruthy();

    jest.spyOn(component, 'getCurrentUrl').mockReturnValue(Routes.Default);
    expect(component.isShowButtonSettings()).toBeTruthy();

    jest.spyOn(component, 'getCurrentUrl').mockReturnValue('/some-other-route');
    expect(component.isShowButtonSettings()).toBeFalsy();
  });

  it('should dispatch searchQuery on search input change', () => {
    const searchQuery = 'test query';
    component.searchText.valueChanges.subscribe(() => {
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        YoutubeAction.changeQuery({ searchQuery })
      );
    });
  });
});
