/**
 * @flow
 */

import React, { Component } from 'react';
import { Map } from '../containers';

export default class MapScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Map
        navigate={navigate}
      />
    );
  }
}
