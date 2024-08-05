import { createAction, props } from '@ngrx/store';
import { CustomCard } from '../state.model';

enum CustomCardActions {
  CREATE = '[CustomCard] Create new card',
  DELETE = '[CustomCard] Delete card',
}

export const addCard = createAction(
  CustomCardActions.CREATE,
  props<{ payload: CustomCard }>()
);

export const deleteCard = createAction(
  CustomCardActions.DELETE,
  props<{ id: string }>()
);
