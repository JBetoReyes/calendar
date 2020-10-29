/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import CalendarReducer from '../reducers/calendarReducer';
import UIReducer from '../reducers/uiReducer';
import { AppActions } from './appActions';
import { IStoreState } from './storeModel';

const rootReducer = combineReducers<IStoreState, AppActions>({
  ui: UIReducer,
  calendar: CalendarReducer,
});

const composeEnhancers =
  (typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
