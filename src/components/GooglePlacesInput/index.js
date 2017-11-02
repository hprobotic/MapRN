/**
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';
import { GooglePlacesAutocomplete } from '../GooglePlacesAutocomplete';
import appConfig from '../../appConfig';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };

class GooglePlacesInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { value } = this.props;
    console.log(this.props);
    return (
      <GooglePlacesAutocomplete
        setAddressText="destinationInput"
        placeholder={""}
        minLength={2}
        autoFocus={false}
        returnKeyType="search"
        fetchDetails
        renderDescription={row => row.description}
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        getDefaultValue={() => ''}
        query={{
          key: appConfig.googleAPI.placeAPI,
          language: 'en',
          types: '(cities)',
        }}
        styles={{
          textInputContainer: {
            width: '100%',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            backgroundColor: '#EDEDED',
            borderRadius: 5,
            height: 32,

          },
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          textInput: {
            flex: 1,
            color: 'black',
            backgroundColor: 'transparent',
            zIndex: 10,
            padding: 0,
            marginTop: 2,
            marginLeft: 0,
            fontSize: 15,
            paddingHorizontal: 10,
          }
        }}
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch"
        filterReverseGeocodingByTypes={['street_number', 'route', 'locality' , 'street_address', 'park']}
        predefinedPlaces={[homePlace, workPlace]}
        debounce={200}
        textInputProps={{
          onChangeText: (text) => this.props.onChangeText(text),
        }}
      />
    );
  }
}

export default GooglePlacesInput;
