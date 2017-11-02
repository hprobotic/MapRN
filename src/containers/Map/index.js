/**
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import {
  LocationSearchHeader,
  LocationSearchResults,
  SearchResultsList,
  NavIcon
} from 'appComponents'

import styles from './styles';


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResultsOpen: false,
      sourceText: 'Work',
      destinationText: '',
      coords: [],
      position: {
        latitude: 10.7739635,
        longitude: 106.7597868,
      },
      region: {
        latitude: 10.7739635,
        longitude: 106.7597868,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  toggleSearchResults = () => {
    const {searchResultsOpen} = this.state

    this.setState({searchResultsOpen: !searchResultsOpen})
  }

  onSourceTextChange = (sourceText) => {
    this.setState({sourceText})
  }

  onDestinationTextChange = (destinationText) => {
    this.setState({destinationText})
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;

        // this.setState({
        //   position: {
        //     latitude,
        //     longitude,
        //   },
        //   region: {
        //     latitude,
        //     longitude,
        //     latitudeDelta: 0.0922,
        //     longitudeDelta: 0.0421,
        //   },
        // });
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.getDirections('10.7739635, 106.7597868', '10.7718932, 106.6869543');
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`);
      const respJson = await resp.json();
      const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map((point, index) => ({
        latitude: point[0],
        longitude: point[1],
      }));
      this.setState({ coords });
      return coords;
    } catch (error) {
      return error;
    }
  }

  render() {
    const {
      recentLocations, shortcutLocations,
    } = this.props;
    const {
      searchResultsOpen,
      sourceText,
      destinationText,
      region,
      position,
      coords,
    } = this.state;

    return (
      <View style={styles.containerView}>
        <NavIcon
          icon={searchResultsOpen ? 'md-arrow-back' : 'md-menu'}
          onPress={this.toggleSearchResults}
        />
        <LocationSearchHeader
          onPress={this.toggleSearchResults}
          expanded={searchResultsOpen}
          sourceText={sourceText}
          destinationText={destinationText}
          onSourceTextChange={this.onSourceTextChange}
          onDestinationTextChange={this.onDestinationTextChange}
        />
        <LocationSearchResults visible={searchResultsOpen}>
          <SearchResultsList list={recentLocations} />
        </LocationSearchResults>
        <MapView
          style={styles.mainMapView}
          region={region}
        >
          {position && (
            <MapView.Circle
              center={position}
              radius={300}
              strokeColor="transparent"
              fillColor="rgba(112,185,213,0.30)"
            />
          )}
          {position && (
            <MapView.Circle
              center={position}
              radius={100}
              strokeColor="transparent"
              fillColor="red"
            />
          )}
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"
          />
        </MapView>
      </View>
    );
  }
}

Map.propTypes = {
  searchResultsOpen: PropTypes.bool,
  sourceText: PropTypes.string,
  destinationText: PropTypes.string,
  coords: PropTypes.array,
};

Map.defaultProps = {
  searchResultsOpen: false,
  sourceText: 'Work',
  destinationText: '',
};

const mapStateToProps = (state) => ({
  recentLocations: state.recentLocations,
  shortcutLocations: state.recentLocations.slice(0, 3),
})

export default connect(mapStateToProps)(Map);
