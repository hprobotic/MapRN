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
} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import GooglePlacesInput from '../GooglePlacesInput';

const transitionProps = {
  hoverbar: ['top', 'left', 'height', 'width', 'shadowRadius'],
  square: ['top', 'left'],
  destinationBox: ['left', 'height', 'opacity'],
  sourceBox: ['top', 'opacity'],
  destinationText: ['top', 'left', 'fontSize', 'color', 'opacity'],
  sourceText: ['top', 'opacity'],
  verticalBar: ['top', 'left', 'opacity'],
  dot: ['top', 'left', 'opacity'],
}


const SQUARE_SIZE = 6
const AnimatableTouchable = Animatable.createAnimatableComponent(TouchableWithoutFeedback)

class LocationSearchHeader extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      startPlaces: [],
      destinationPlaces: []
    })
  }
  static defaultProps = {
    expanded: false,
    onPress: () => {},
    onSourceTextChange: () => {},
    onDestinationTextChange: () => {},
    sourceText: '',
    destinationText: '',
  }

  componentWillMount() {
    this.googlePlacesRequest = this.props.debounce
      ? debounce(this.googlePlacesRequest, this.props.debounce)
      : this.googlePlacesRequest
  }

  onSourceTextChange = (sourceText) => {
    const {onSourceTextChange} = this.props
    this.setState({sourceText})
    onSourceTextChange(sourceText)
  };


  onDestinationTextChange = (destinationText) => {
    const {onDestinationTextChange} = this.props
    onDestinationTextChange(destinationText)
  }

  googlePlacesRequest = (text) => {
    this._abortRequests();
    if (text.length >= this.props.minLength) {
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = this.props.timeout;
      request.ontimeout = this.props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);
          if (typeof responseJSON.predictions !== 'undefined') {
            if (this._isMounted === true) {
              this._results = responseJSON.predictions;
              this.setState({
                dataSource: this.buildRowsFromResults(responseJSON.predictions),
              });
            }
          }
          if (typeof responseJSON.error_message !== 'undefined') {
            console.warn('Places: ' + responseJSON.error_message);
          }
        } else {
          console.log('Terminated')
        }
      };
      request.open('GET', 'https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=' + encodeURIComponent(text) + '&' + Qs.stringify(this.props.query));
      if (this.props.query.origin !== null) {
        request.setRequestHeader('Referer', this.props.query.origin)
      }
      request.send();
    }
  }



  onExpand = () => {
    const {onPress} = this.props
    onPress()
    setTimeout(() => {
      if (!this.refs.destinationInput) return
      this.refs.destinationInput.focus()
    }, 350)
  }

  getAnimatableStyles = () => {
    const {expanded, destinationText} = this.props
    const {width: windowWidth} = Dimensions.get('window')
    const width = windowWidth - 24 * 2

    return {
      hoverbar: {
        top: expanded ? 0 : 96,
        left: expanded ? 0 : 24,
        height: expanded ? 136 : 56,
        width: expanded ? windowWidth : width,
        shadowRadius: expanded ? 10 / 2 : 60 / 2,
      },
      square: {
        top: expanded ? 109 : 96 + 56 / 2 - SQUARE_SIZE / 2,
        left: expanded ? 29 : 24 + 22,
      },
      destinationBox: {
        left: expanded ? 56 : 24,
        right: 24,
        top: 96,
        height: expanded ? 32 : 56,
        opacity: expanded ? 1 : 0,
      },
      destinationText: {
        left: expanded ? 65 : 75,
        top: expanded ? 103 : 112,
        fontSize: expanded ? 15 : 20,
        color: expanded ? '#A4A4AC' : '#525760',
        opacity: (expanded && destinationText.length !== 0) ? 0 : 1,
      },
      sourceBox: {
        left: 56,
        right: 24,
        height: 32,
        top: expanded ? 56 : 96,
        opacity: expanded ? 1 : 0,
      },
      sourceText: {
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

  render() {
    const {expanded, sourceText, destinationText} = this.props
    const animatableStyles = this.getAnimatableStyles()
    return (
      <View style={styles.container}>
        <Animatable.View
          style={[styles.square, animatableStyles.square]}
          transition={transitionProps.square}
        />
        <Animatable.Text
          style={[styles.sourceText, animatableStyles.sourceText]}
          transition={transitionProps.sourceText}
          pointerEvents={'none'}
        >
          Where to?{sourceText}
        </Animatable.Text>
        <Animatable.Text
          style={[styles.destinationText, animatableStyles.destinationText]}
          transition={transitionProps.destinationText}
          pointerEvents={'none'}
        >
          {destinationText.length === 0 ? 'Where to?' : destinationText}
        </Animatable.Text>
        <Animatable.View
          style={[styles.destinationBox, animatableStyles.destinationBox]}
          transition={transitionProps.destinationBox}
          pointerEvents={'box-none'}
        >
          {expanded && (
            <GooglePlacesInput
              setAddressText="destinationInput"
              styles={styles.input}
              value={destinationText}
              onChangeText={this.onDestinationTextChange}
              clearButtonMode="while-editing"
            />
          )}
        </Animatable.View>
        <Animatable.View
          style={[styles.sourceBox, animatableStyles.sourceBox]}
          transition={transitionProps.sourceBox}
          pointerEvents={'none'}
        />
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