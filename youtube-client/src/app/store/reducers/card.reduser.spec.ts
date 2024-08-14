import { CustomCardsState } from '@store/state.model';
import { mockCard, mockCards } from '@store/state.model.mock';
import { CardReducer, initialState } from './card.reducer';
import * as CardActions from '../actions/card.actions';

describe('Card Reducer', () => {
  let initialStateCard: CustomCardsState;

  beforeEach(() => {
    initialStateCard = { ...initialState };
  });

  it('should add a new card to the state', () => {
    const action = CardActions.addCard({ payload: mockCard });
    const result = CardReducer(initialStateCard, action);
    expect(result.items).toContain(mockCard);
  });

  it('should delete the card with the given id', () => {
    const updatedState = { ...initialStateCard, items: mockCards };
    const action = CardActions.deleteCard({ id: '1' });
    const result = CardReducer(updatedState, action);

    expect(result.items).not.toContain(mockCards[0]);
    expect(result.items.length).toBe(1);
  });
});
