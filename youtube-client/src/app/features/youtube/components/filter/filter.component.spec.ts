import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  SortFieldType,
  SortOrderType,
} from '@features/youtube/models/sort-field.model';
import { provideAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent],
      providers: [provideRouter([]), provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sorting order and emit sortChange event', () => {
    const sortChangeSpy = jest.spyOn(component.sortChange, 'emit');

    expect(component.sortingField).toEqual({
      value: SortFieldType.Date,
      order: SortOrderType.Desc,
    });

    component.toggleSorting(SortFieldType.Date);
    expect(component.sortingField).toEqual({
      value: SortFieldType.Date,
      order: SortOrderType.Asc,
    });
    expect(sortChangeSpy).toHaveBeenCalledWith({
      value: SortFieldType.Date,
      order: SortOrderType.Asc,
    });

    component.toggleSorting(SortFieldType.Count);
    expect(component.sortingField).toEqual({
      value: SortFieldType.Count,
      order: SortOrderType.Asc,
    });
    expect(sortChangeSpy).toHaveBeenCalledWith({
      value: SortFieldType.Count,
      order: SortOrderType.Asc,
    });
  });

  it('should emit filterChange event on input change', () => {
    const filterChangeSpy = jest.spyOn(component.filterChange, 'emit');

    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;

    inputElement.value = 'test filter';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.inputValue).toBe('test filter');
    expect(filterChangeSpy).toHaveBeenCalledWith('test filter');
  });
});
