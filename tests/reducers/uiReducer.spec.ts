import {closeModal, openModal} from '../../src/app/reducers/uiActions';
import uiReducer from '../../src/app/reducers/uiReducer';

describe('UI Reducer', () => {
  test('reducer to return the default state', () => {
    const initialState = {modalOpen: false};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state = uiReducer(initialState as any, {type: ''} as any);
    expect(state).toEqual(initialState);
  });
  test('reducer sets modal open to true', () => {
    const currentState = {modalOpen: false};
    const state = uiReducer(currentState, openModal());
    expect(state).toEqual({modalOpen: true});
  });
  test('reducer sets modal open to false', () => {
    const currentState = {modalOpen: true};
    const state = uiReducer(currentState, closeModal());
    expect(state).toEqual({modalOpen: false});
  });
});
