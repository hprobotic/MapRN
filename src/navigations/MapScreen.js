/**
 * @flow
 */

import React, { Component } from 'react';
import { Map } from '../containers';

export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map'
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Map
        navigate={navigate}
      />
    );
  }
}
