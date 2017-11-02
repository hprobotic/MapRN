/**
 * @flow
 */
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Navigation from './navigations'

const initialState = {
  recentLocations: [
    {id: 0, icon: 'home', title: 'Home', subtitle: '123 Spear St, San Francisco'}
  ]
}
const store = createStore((state)=> state, initialState)

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}