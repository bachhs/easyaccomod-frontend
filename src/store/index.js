/* eslint-disable import/prefer-default-export */
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'src/reducers';

export function configureStore(preloadedState = {}) {
  const store = createStore(rootReducer, preloadedState, applyMiddleware(thunkMiddleware));

  return store;
}
