/**
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import Reactotron from 'reactotron-react-native';
import _ from 'lodash';
import {
  LocationSearchHeader,
  LocationSearchResults,
  SearchResultsList,
  NavIcon
} from 'appComponents';
import styles from './styles';
import { actions as LocationActions } from '../../redux/LocationsRedux';

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.0421
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 }
class Map extends Component {
  static propTypes = {
    searchResultsOpen: PropTypes.bool,
    fromText: PropTypes.string,
    toText: PropTypes.string,
    coords: PropTypes.array,
    recentLocations: PropTypes.array,
    isFetching: PropTypes.bool,
    getLocations: PropTypes.func.isRequired,
    focusingOn: PropTypes.string,
    currentUserLocation: PropTypes.object,
    clearLocationData: PropTypes.func,
    handPickingLocation: PropTypes.bool,
    pickingMarker: PropTypes.object
  }

  state = {
    handPickingLocation: false,
    isFetching: false,
    searchResultsOpen: false,
    fromText: '',
    toText: '',
    directionCoords: [],
    locationResult: [],
    temporaryLocations: [],
    focusingOn: null,
    fromLoc: [],
    focusing: 'fromTextInput',
    toLoc: [],
    fromMarker: null,
    toMarker: null,
    pickingMarker: {},
    isShowTip: true
  };

  toggleSearchResults = () => {
    const {searchResultsOpen} = this.state
    this.setState({
      searchResultsOpen: !searchResultsOpen,
      handPickingLocation: false,
      fromText: '',
      toText: '',
      focusing: 'fromTextInput',
    })
    this.props.clearAllLocationData()
  }

  toggleNavButton = () => {
    const {searchResultsOpen} = this.state
    if (searchResultsOpen) {
      this.setState({searchResultsOpen: !searchResultsOpen})
    } else {
      this.props.navigate('DrawerOpen')
    }
  }

  onFromTextChange = (fromText) => {
    this.setState({
      fromText,
      focusingOn: 'from'
    })
    if (fromText.length === 0) {
      this.props.clearLocationData()
    }
    this.fetchLocations(fromText, this.state.currentUserPosition)
  }

  onToTextChange = (toText) => {
    this.setState({
      toText,
      focusingOn: 'to'
    })
    if (toText.length === 0) {
      this.props.clearLocationData()
    }
    this.fetchLocations(toText, this.state.currentUserPosition)
  }

  componentWillReceiveProps(nextProps) {
    const { toLocation, fromLocation} = nextProps
    if (!(toLocation === null || toLocation === undefined) && this.state.handPickingLocation) {
      this.setState({
        toText: toLocation.name
      })
    }
    if (!(fromLocation === null || fromLocation === undefined) && this.state.handPickingLocation) {
      this.setState({
        fromText: fromLocation.name
      })
    } 
    if (!(fromLocation === null || fromLocation === undefined)) {
      this.setState({
        fromMarker: {
          longitude: fromLocation.geometry.location.lng,
          latitude: fromLocation.geometry.location.lat,
        }
      })
    } else {
      this.setState({
        fromMarker: null
      })
    }
    if (!(toLocation === null || toLocation === undefined)) {
      this.setState({
        toMarker: {
          longitude: toLocation.geometry.location.lng,
          latitude: toLocation.geometry.location.lat,
        }
      })
    } else {
      this.setState({
        toMarker: null,
      })
    }
  }

  componentDidMount() {
    this.props.clearAllLocationData()
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        this.setState({
          currentUserPosition: {
            latitude,
            longitude,
          },
          region: {
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.setState({
      fromText: '',
    })
  }

  onLocationSelectedAt = (id) => {
    let item = this.props.temporaryLocations
      .filter(i => i.id === id)[0]
    if (this.state.focusingOn === 'to') {
      this.setState({
        toText: item.name
        
      })
    } else {
      this.setState({
        fromText: item.name,
        focusing: 'toInput'
      })
    }
    this.updateLocations(item, this.state.focusingOn);
  }

  onFindDirection = () => {
    const { fromLocation, toLocation } = this.props
    if ( _.isNull(fromLocation) || _.isNull(toLocation) || _.isUndefined(fromLocation) || _.isUndefined(toLocation)) {
      alert('You should select both start and to')
      return false
    } else {
      const fromLatLng = `${fromLocation.geometry.location.lat}, ${fromLocation.geometry.location.lng}`
      const toLatLng = `${toLocation.geometry.location.lat}, ${toLocation.geometry.location.lng}`
      this.setState({
        searchResultsOpen: false
      })
      this.props.getDirection(fromLatLng, toLatLng)
      this.fitAllMarkers(this.state.fromMarker, this.state.toMarker)
    }
  }
  
  onRegionChange(region) {
    this.setState({region: region});
  }

  changeFocusTo(field) {
    this.setState({
      focusingOn: field
    })
  }

  onHandPickLocationFor(type) {
    this.setState({
      handPickingLocation: true,
    })
  }

  onPickerDragEnd = (e) => {
    const coordinate = e.nativeEvent.coordinate
    this.props.getLocationInfoByGeocode(coordinate, this.state.focusingOn)
    if (this.state.focusingOn === 'from') {
      this.setState({
        focusing: 'toInput'
      })
    }
  }

  fitAllMarkers(fromMarker, toMarker) {
    this.map.fitToCoordinates([fromMarker, toMarker], {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }

  onMapPress(e) {
    this.setState({
      pickingMarker: {
          coordinate: e.nativeEvent.coordinate,
      },
    });
    this.props.getLocationInfoByGeocode(e.nativeEvent.coordinate, this.state.focusingOn)
    if (this.state.focusingOn === 'from') {
      this.setState({
        focusing: 'toInput'
      })
    }
  }
  hideTip(){
    this.setState({
      isShowTip: false
    })
  }

  fetchLocations = (text, currentUserPosition) => this.props.getLocations(text, currentUserPosition)
  updateLocations = (location, locationType) => this.props.updateLocation(location, locationType)

  render() {
    const {
      temporaryLocations,
      recentLocations,
      fromLocation,
      toLocation,
      directionCoords
    } = this.props;
    const {
      searchResultsOpen,
      fromText,
      toText,
      region,
      currentUserPosition,
      handPickingLocation,
      fromMarker,
      toMarker,
      centerOfMapView,
      pickingMarker,
      isShowTip
    } = this.state;
    return (
      <View style={styles.containerView}>
        <NavIcon
          icon={searchResultsOpen ? 'md-arrow-back' : 'md-menu'}
          onPress={this.toggleNavButton}
        />
        <LocationSearchHeader
          onPress={this.toggleSearchResults}
          expanded={searchResultsOpen}
          fromText={fromText}
          toText={toText}
          focusing={this.state.focusing}
          onChangeFocus={this.changeFocusTo.bind(this)}
          onFromTextChange={this.onFromTextChange}
          onToTextChange={this.onToTextChange}
          onFindDirection={this.onFindDirection}
        />
        <LocationSearchResults visible={searchResultsOpen && !handPickingLocation}>
          <SearchResultsList
            list={temporaryLocations}
            onLocationSelectedAt={(id) => this.onLocationSelectedAt(id)}
            handPickLocationFor={(locationType) => this.onHandPickLocationFor(locationType)}
          />
        </LocationSearchResults>
        <MapView
          ref={ref => { this.map = ref; }}
          style={styles.mainMapView}
          initialRegion={region}
          onPress={this.onMapPress.bind(this)}
        >
          {fromMarker && (
            <MapView.Marker
              title={fromLocation.name}
              showCallout
              coordinate={fromMarker}
            />
          )}
          {toMarker && (
            <MapView.Marker
              title={toLocation.name}
              showCallout
              coordinate={toMarker}
            />
          )}
          {pickingMarker && (
            <MapView.Marker
              coordinate={pickingMarker.coordinate}
              onDragEnd={(e) => this.onPickerDragEnd(e)}
              draggable
              style={styles.draggablePicker}
              >
            </MapView.Marker>
          )}
          {currentUserPosition && (
            <MapView.Circle
              center={currentUserPosition}
              radius={100}
              strokeColor="transparent"
              fillColor="#3D9FC6"
            />
          )}
          {currentUserPosition && (
            <MapView.Circle
              center={currentUserPosition}
              radius={100}
              strokeColor="transparent"
              fillColor="rgba(61,159,198,0.30)"
            />
          )}
          <MapView.Polyline
            coordinates={directionCoords}
            strokeWidth={2}
            strokeColor="red"
          />
        </MapView>
        {(isShowTip && handPickingLocation) && (
          <TouchableOpacity style={styles.toolTip} onPress={this.hideTip.bind(this)}>
            <Text style={styles.toolTipText}>
              Press on map screen to pick a location | DISMISS
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  recentLocations: state.locations.recentLocations,
  temporaryLocations: state.locations.temporaryLocations,
  fromLocation: state.locations.fromLocation,
  toLocation: state.locations.toLocation,
  directionCoords: state.locations.directionCoords,
  isLocationFetching: state.locations.isFetching,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  return {
    ...ownProps,
    ...stateProps,
    getLocations: (text, currentUserPosition) => {
      LocationActions.getLocations(dispatch, text, currentUserPosition)
    },
    updateLocation: (location, locationType) => {
      LocationActions.updateLocation(dispatch, location, locationType)
    },
    getDirection: (fromLocation, toLocation) => {
      LocationActions.getDirection(dispatch, fromLocation, toLocation)
    },
    clearLocationData: () => {
      LocationActions.clearLocationData(dispatch)
    },
    getLocationInfoByGeocode: (coordinate, locationType) => {
      LocationActions.getLocationInfoBy(dispatch, coordinate, locationType)
    },
    clearAllLocationData: () => {
      LocationActions.clearAllLocationData(dispatch)
    }
  }
}

export default connect(mapStateToProps, undefined, mergeProps)(Map);
