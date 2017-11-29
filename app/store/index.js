import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import board from './board';
import puyo from './puyoAction';
import nextPuyo from './nextPuyo';
import score from './score';
import pause from './pause';
import timer from './timer';
import puyoColors from './puyoColors';
import sound from './sound';

const reducer = combineReducers({ board, puyo, nextPuyo, score, pause, timer, puyoColors, sound });

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))

const store = createStore(reducer, middleware)

export default store
export * from './board';
export * from './nextPuyo';
export * from './puyoAction';
export * from './puyoColors'
export * from './pause';
export * from './timer';
export * from './score';
export * from './sound';
