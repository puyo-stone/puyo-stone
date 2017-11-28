import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import board from './board';
import puyo from './puyoAction';
import nextPuyo from './nextPuyo';
import score from './score';
import pause from './pause';

const reducer = combineReducers({ board, puyo, nextPuyo, score, pause });

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))

const store = createStore(reducer, middleware)

export default store
export * from './board';
export * from './nextPuyo';
export * from './puyoAction';
export * from './score';
export * from './pause';
