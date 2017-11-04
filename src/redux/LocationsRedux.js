import Immutable from 'seamless-immutable';
import API from '../services/API';
import { REHYDRATE } from 'redux-persist/constants';

const Types = {
  GET_LOCATIONS: 'GET_LOCATIONS',
  GET_LOCATIONS_PENDING: 'GET_LOCATIONS_PENDING',
  UPDATE_LOCATION: 'UPDATE_LOCATION',
  GET_DIRECTION: 'GET_DIRECTION',
  CLEAR_RESULTS: 'CLEAR_RESULTS',
  GET_LOCATION_BY_GEO: 'GET_LOCATION_BY_GEO',
  CLEAR_ALL_LOCATION_DATA: 'CLEAR_ALL_LOCATION_DATA',
  CLEAR_APP_DATA: 'CLEAR_APP_DATA',
};

export const InitialState = Immutable({
  isFetching: null,
  error: null,
  searchTerm: null,
  recentLocations: [],
  temporaryLocations: null,
  tempPickedLocation: {},
  currentPosition: {},
  fromLocation: null,
  toLocation: null,
  destination: null,
  directionCoords: null,
});

export const actions = {
  getLocations: (dispatch, text, position) => {
    dispatch({ type: Types.GET_LOCATIONS_PENDING });
    API.GoogleMap.getLocations(text, position).then((data) => {
      if (data.length >= 0) {
        dispatch({
          type: Types.GET_LOCATIONS,
          data,
        });
      }
    });
  },
  updateLocation: (dispatch, location, locationType) => {
    dispatch({
      type: Types.UPDATE_LOCATION,
      location,
      locationType,
    });
  },
  getDirection: (dispatch, fromLocation, toLocation) => {
    dispatch({ type: Types.CLEAR_RESULTS });
    API.GoogleMap.getDirection(fromLocation, toLocation).then((data) => {
      dispatch({
        type: Types.GET_DIRECTION,
        data,
      });
    });
  },
  getLocationInfoBy: (dispatch, coordinate) => {
    dispatch({ type: Types.CLEAR_RESULTS });
    API.GoogleMap.getLocationInfoBy(coordinate.longitude, coordinate.latitude).then((data) => {
      dispatch({
        type: Types.GET_LOCATION_BY_GEO,
        data,
      });
    });
  },
  clearLocationData: (dispatch) => {
    dispatch({
      type: Types.CLEAR_RESULTS,
    });
  },
  clearAllLocationData: (dispatch) => {
    dispatch({
      type: REHYDRATE,
      payload: InitialState,
    });
    dispatch({
      type: Types.CLEAR_ALL_LOCATION_DATA,
    });
  },
};

export const reducer = (state = InitialState, action) => {
  const { type } = action;
  switch (type) {
    case Types.GET_LOCATIONS: {
      return Object.assign({}, state, {
        isFetching: false,
        searchTerm: action.searchTerm,
        temporaryLocations: action.data.slice(0, 5),
      });
    }
    case Types.GET_LOCATIONS_PENDING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case Types.UPDATE_LOCATION: {
      if (action.locationType === 'from') {
        return {
          ...state,
          fromLocation: action.location,
        };
      }
      return {
        ...state,
        toLocation: action.location,
      };
    }
    case Types.GET_DIRECTION: {
      return {
        ...state,
        directionCoords: action.data,
      };
    }
    case Types.GET_LOCATION_BY_GEO: {
      if (action.locationType === 'from') {
        return {
          ...state,
          fromLocation: {
            name: `${action.data.formatted_address.split(',')[0]}`,
            geometry: action.data.geometry,
          },
        };
      }
      return {
        ...state,
        toLocation: {
          name: `${action.data.formatted_address.split(',')[0]}`,
          geometry: action.data.geometry,
        },
      };
    }
    case Types.CLEAR_RESULTS: {
      return {
        ...state,
        temporaryLocations: [],
        directionCoords: [],
      };
    }
    case Types.CLEAR_ALL_LOCATION_DATA: {
      return {
        ...state,
        fromLocation: null,
        toLocation: null,
        temporaryLocations: null,
        directionCoords: null,
      };
    }
    default: {
      return InitialState;
    }
  }
};
