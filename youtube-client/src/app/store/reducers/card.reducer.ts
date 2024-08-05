import { createReducer, on } from '@ngrx/store';
import * as CardActions from '@store/actions/card.actions';
import { CustomCardsState } from '../state.model';

export const cardFeatureKey = 'card';

const initialState: CustomCardsState = {
  items: [],
};

export const CardReducer = createReducer(
  initialState,
  on(
    CardActions.addCard,
    (state, { payload }): CustomCardsState => ({
      ...state,
      items: [...state.items, payload],
    })
  ),
  on(
    CardActions.deleteCard,
    (state, { id }): CustomCardsState => ({
      ...state,
      items: state.items.filter(card => card.id !== id),
    })
  )
);
