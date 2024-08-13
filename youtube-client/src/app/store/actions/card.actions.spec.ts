import { mockCard } from '@store/state.model.mock';
import { addCard, CustomCardActions, deleteCard } from './card.actions';

describe('CustomCard Actions', () => {
  it('should create an action to add a card', () => {
    const action = addCard({ payload: mockCard });

    expect(action).toEqual({
      type: CustomCardActions.Create,
      payload: mockCard,
    });
  });

  it('should create an action to delete a card', () => {
    const cardId = '1';
    const action = deleteCard({ id: cardId });

    expect(action).toEqual({
      type: CustomCardActions.Delete,
      id: cardId,
    });
  });
});
