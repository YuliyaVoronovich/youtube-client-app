import { createAction, props } from '@ngrx/store';
import { CustomCard } from '../state.model';

enum CustomCardActions {
  Create = '[CustomCard] Create new card',
  Delete = '[CustomCard] Delete card',
}

export const addCard = createAction(
  CustomCardActions.Create,
  props<{ payload: CustomCard }>()
);

export const deleteCard = createAction(
  CustomCardActions.Delete,
  props<{ id: string }>()
);
