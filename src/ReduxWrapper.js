import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import Reactotron from 'reactotron-react-native';
import logger from 'redux-logger'
import './ReactotronConfig';
import AppRoot from './index';
import { reducer as LocationsReducer } from './redux/LocationsRedux';

const middleware = [
  thunk,
  // logger,
];

const reducers = combineReducers({
  locations: LocationsReducer,
});


let store = null;
if (__DEV__) {
  store = Reactotron.createStore(
    reducers,
    compose(applyMiddleware(...middleware), autoRehydrate({ log: true })));
} else {
  store = compose(applyMiddleware(...middleware), autoRehydrate())(createStore)(reducers);
}


persistStore(store, {
  storage: AsyncStorage,
  blacklist: [
  ],
});

export default class ReduxWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}><AppRoot /></Provider>
    );
  }
}
