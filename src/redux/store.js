import thunk from 'redux-thunk';
import {applyMiddleware, createStore}  from 'redux';
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux Persist configuration
const persistConfig = {
    key: 'root', // This must match the key used in combineReducers
    storage: AsyncStorage,
    whitelist: ['auth'], // Whitelist reducers you want to persist
    // Other options...
  };
  
  // Create a persisted reducer
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  // Apply middleware (in this case, only redux-thunk)
  const middlewares = [thunk];
  
  // Create the store with middleware and persisted reducer
  export const store = createStore(persistedReducer, applyMiddleware(...middlewares));
  
  // Create a persistor for the store
  export const persistor = persistStore(store);