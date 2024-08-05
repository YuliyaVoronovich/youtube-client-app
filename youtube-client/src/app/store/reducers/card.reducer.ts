import { createReducer, on } from '@ngrx/store';
import * as CardActions from '@store/actions/card.actions';
import { CustomCardsState } from '../state.model';

export const cardFeatureKey = 'cards';

const initialState: CustomCardsState = {
  customCardsState: [],
};

export const CardReducer = createReducer(
  initialState,
  on(
    CardActions.addCard,
    (state, { payload }): CustomCardsState => ({
      ...state,
      customCardsState: [...state.customCardsState, payload],
    })
  ),
  on(
    CardActions.deleteCard,
    (state, { id }): CustomCardsState => ({
      ...state,
      customCardsState: state.customCardsState.filter(card => card.id !== id),
    })
  )
);
