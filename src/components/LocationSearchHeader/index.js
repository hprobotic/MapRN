/**
 * @flow
 */

import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import styles from './styles';

const transitionProps = {
  hoverbar: ['top', 'left', 'height', 'width', 'shadowRadius'],
  square: ['top', 'left'],
  toBox: ['left', 'height', 'opacity'],
  fromBox: ['top', 'opacity'],
  toText: ['top', 'left', 'fontSize', 'color', 'opacity'],
  fromText: ['top', 'opacity'],
  verticalBar: ['top', 'left', 'opacity'],
  dot: ['top', 'left', 'opacity'],
}

const SQUARE_SIZE = 6
class LocationSearchHeader extends Component {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    expanded: false,
    onFromTextChange: () => {},
    onToTextChange: () => {},
    focusedOn: null
  }

  componentWillMount() {
    this.googlePlacesRequest = this.props.debounce
      ? debounce(this.googlePlacesRequest, this.props.debounce)
      : this.googlePlacesRequest
  }

  onFromTextChange = (fromText) => {
    const {onFromTextChange} = this.props
    onFromTextChange(fromText)
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.focusing === 'toInput') {
      setTimeout(() => {
        if (!this.refs.toInput) return
        this.refs.toInput.focus()
      }, 350)
    }
  }

  onToTextChange = (toText) => {
    const {onToTextChange} = this.props
    onToTextChange(toText)
  }

  onExpand = () => {
    const {onPress} = this.props
    onPress()
    setTimeout(() => {
      if (!this.refs.fromTextInput) return
      this.refs.fromTextInput.focus()
    }, 350)
  }

  findDirectionPressed = () => {
    this.props.findDirection()
  }

  getAnimatableStyles = () => {
    const {expanded, toText} = this.props
    const {width: windowWidth} = Dimensions.get('window')
    const width = windowWidth - 24 * 2

    return {
      hoverbar: {
        top: expanded ? 0 : 96,
        left: expanded ? 0 : 24,
        height: expanded ? 170 : 56,
        width: expanded ? windowWidth : width,
        shadowRadius: expanded ? 10 / 2 : 60 / 2,
      },
      square: {
        top: expanded ? 109 : 96 + 56 / 2 - SQUARE_SIZE / 2,
        left: expanded ? 29 : 24 + 22,
      },
      toBox: {
        left: expanded ? 56 : 24,
        right: 24,
        top: 96,
        height: expanded ? 32 : 56,
        opacity: expanded ? 1 : 0,
      },
      actionBox: {
        left: expanded ? 56 : 24,
        right: 24,
        top: 134,
        height: expanded ? 32 : 56,
        opacity: expanded ? 1 : 0,
      },
      toText: {
        left: expanded ? 65 : 75,
        top: expanded ? 103 : 112,
        fontSize: expanded ? 14 : 18,
        color: expanded ? '#A4A4AC' : '#525760',
        opacity: (expanded && toText.length !== 0) ? 0 : 1,
      },
      fromBox: {
        left: 56,
        right: 24,
        height: 32,
        top: expanded ? 56 : 96,
        opacity: expanded ? 1 : 0,
      },
      fromText: {
        left: 65,
        top: expanded ? 64 : 76,
        opacity: expanded ? 1 : 0,
      },
      verticalBar: {
        top: expanded ? 78 : 78 + 22 - 5,
        left: expanded ? 32 : 32 + 22 - 5,
        opacity: expanded ? 1 : 0,
      },
      dot: {
        top: expanded ? 69 : 69 + 22 - 5,
        left: expanded ? 29.5 : 29.5 + 22 - 5,
        opacity: expanded ? 1 : 0,
      },
    }
  }

  _onFocused = (text) => {
    this.props.onChangeFocus(text)
  }


  render() {
    const {expanded, fromText, toText, onFindDirection} = this.props
    const animatableStyles = this.getAnimatableStyles()
    return (
      <View style={styles.container}>
        <Animatable.View
          style={[styles.square, animatableStyles.square]}
          transition={transitionProps.square}
        />
        <Animatable.Text
          style={[styles.fromText, animatableStyles.fromText]}
          transition={transitionProps.fromText}
          pointerEvents={'none'}
        >
          {fromText.length === 0 ? 'From?' : fromText}
        </Animatable.Text>
        <Animatable.Text
          style={[styles.toText, animatableStyles.toText]}
          transition={transitionProps.toText}
          pointerEvents={'none'}
        >
          {toText.length === 0 ? 'Where to?' : toText}
        </Animatable.Text>
        <Animatable.View
          style={[styles.fromBox, animatableStyles.fromBox]}
          transition={transitionProps.fromBox}
          pointerEvents={'box-none'}
        >
          {expanded && (
            <TextInput
              ref="fromTextInput"
              style={styles.input}
              value={fromText}
              onChangeText={this.onFromTextChange}
              clearButtonMode="while-editing"
              onFocus={() => {
                this._onFocused('from')
              }}
            />
          )}
        </Animatable.View>
        <Animatable.View
          style={[styles.toBox, animatableStyles.toBox]}
          transition={transitionProps.toBox}
          pointerEvents={'box-none'}
        >
          {expanded && (
            <TextInput
              ref="toTexInput"
              style={styles.input}
              value={toText}
              onChangeText={this.onToTextChange}
              clearButtonMode="while-editing"
              onFocus={() => {
                this._onFocused('to')
              }}
            />
          )}
        </Animatable.View>
        <Animatable.View
          style={[styles.actionBox, animatableStyles.actionBox]}
          transition={transitionProps.toBox}
          pointerEvents={'box-none'}
        >
          {expanded && (
            <TouchableOpacity
              style={styles.goButton}
              onPress={onFindDirection}
            >
              <Text style={styles.goButtonText}>FIND DIRECTION</Text>
            </TouchableOpacity>
          )}
        </Animatable.View>
        <Animatable.View
          style={[styles.verticalBar, animatableStyles.verticalBar]}
          transition={transitionProps.verticalBar}
          pointerEvents={'none'}
        />
        <Animatable.View
          style={[styles.dot, animatableStyles.dot]}
          transition={transitionProps.dot}
          pointerEvents={'none'}
        />
        <Animatable.View
          style={[styles.hoverbar, animatableStyles.hoverbar]}
          transition={transitionProps.hoverbar}
        >
          <TouchableOpacity
            style={styles.target}
            onPress={expanded ? null : this.onExpand}
          />
        </Animatable.View>

      </View>
    )
  }
}

export default LocationSearchHeader