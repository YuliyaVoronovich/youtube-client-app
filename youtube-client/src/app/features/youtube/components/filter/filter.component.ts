import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { ButtonComponent } from '@shared/components/button/button.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import {
  SortFieldType,
  SortingField,
  SortOrderType,
} from '../../models/sort-field.model';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonToggleModule,
    ButtonComponent,
    IconComponent,
    FormsModule,
    NgIf,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Output() filterChange = new EventEmitter<string>();

  @Output() sortChange = new EventEmitter<SortingField>();

  public inputValue: string = '';

  public sortingField: SortingField = {
    value: SortFieldType.Date,
    order: SortOrderType.Desc,
  };

  public showDateIcon = false;

  public showCountIcon = false;

  public SORT_ORDER_ICONS: Record<SortOrderType, string> = {
    [SortOrderType.Asc]: 'expand_less',
    [SortOrderType.Desc]: 'expand_more',
  };

  readonly dateFieldType = SortFieldType.Date;

  readonly countFieldType = SortFieldType.Count;

  getButtonColor(sortField: SortFieldType): string {
    return this.sortingField.value === sortField ? 'primary' : 'accent';
  }

  getButtonIcon(showIcon: boolean): string {
    if (!showIcon) {
      return '';
    }
    return this.SORT_ORDER_ICONS[this.sortingField.order];
  }

  toggleSorting(value: SortFieldType) {
    let order: SortOrderType;

    if (this.sortingField.value === value) {
      order =
        this.sortingField.order === SortOrderType.Asc
          ? SortOrderType.Desc
          : SortOrderType.Asc;
    } else {
      order = SortOrderType.Asc;
    }

    this.sortingField = {
      value,
      order,
    };
    this.showDateIcon = value === SortFieldType.Date;
    this.showCountIcon = !this.showDateIcon;

    this.sortChange.emit(this.sortingField);
  }

  onInputChange() {
    this.filterChange.emit(this.inputValue);
  }
}
