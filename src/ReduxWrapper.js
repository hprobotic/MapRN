import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import Reactotron from 'reactotron-react-native';
import logger from 'redux-logger';
import './ReactotronConfig';
import AppRoot from './index';
import { reducer as LocationsReducer } from './redux/LocationsRedux';

const middleware = [
  thunk,
  // logger,
];

const appReducers = combineReducers({
  locations: LocationsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_APP_DATA') {
    state = undefined
  }
  return appReducers(state, action)
};

let store = null;
if (__DEV__) {
  store = Reactotron.createStore(
    rootReducer,
    compose(applyMiddleware(...middleware), autoRehydrate({ log: true }))
);
} else {
  store = compose(applyMiddleware(...middleware), autoRehydrate())(createStore)(reducers);
}


persistStore(store, {
  storage: AsyncStorage,
  blacklist: [
  ],
});

const ReduxWrapper = () => (<Provider store={store}><AppRoot /></Provider>);


export default ReduxWrapper;
