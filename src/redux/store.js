import thunk from 'redux-thunk';
import reducer from './reducers'
import {applyMiddleware, createStore}  from 'redux';

const middlewares = [thunk];

export default  createStore(reducer, applyMiddleware(...middlewares));