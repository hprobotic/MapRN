import React, { Component, PropTypes } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import * as Animatable from 'react-native-animatable'

const transitionProps = ['top', 'height', 'width']

export default class LocationSearchHeader extends Component {

  static defaultProps = {
    visible: false,
  }

  render() {
    const {visible, onPress, children} = this.props
    const {width: windowWidth, height: windowHeight} = Dimensions.get('window')
    const top = 170
    const style = {
      top: visible ? top : windowHeight,
      height: windowHeight-top,
      width: windowWidth,
    }

    return (
      <Animatable.View
        style={[styles.container, style]}
        duration={300}
        easing={"ease-out"}
        transition={transitionProps}
      >
        {children}
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
  },
})