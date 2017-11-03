/**
 * @flow
 */

import React, { Component } from 'react';
import { Math } from '../containers';

export default class MathScreen extends Component {
  static navigationOptions = {
    title: 'Math'
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Math
        navigate={navigate}
      />
    );
  }
}
