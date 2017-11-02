import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'

const hitSlop = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
}

export default class NavIcon extends Component {

  static propTypes = {
    icon: PropTypes.string.isRequired,
  }

  static defaultProps = {
    onPress: () => {}
  }

  render() {
    const {onPress, icon} = this.props

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        hitSlop={hitSlop}
      >
        <Icon name={icon} size={21} style={styles.icon}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 36,
    left: 22,
    zIndex: 10,
  },
  icon: {
    width: 21,
    height: 21,
    backgroundColor: "transparent"
  },

})