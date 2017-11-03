import Immutable from 'seamless-immutable';
import API from '../services/API';

const Types = {
  GET_LOCATIONS: 'GET_LOCATIONS',
  GET_LOCATIONS_PENDING: 'GET_LOCATIONS_PENDING',
  UPDATE_LOCATION: 'UPDATE_LOCATION',
  GET_DIRECTION: 'GET_DIRECTION',
  CLEAR_RESULTS: 'CLEAR_RESULTS',
};

export const InitialState = Immutable({
  isFetching: null,
  error: null,
  searchTerm: null,
  recentLocations: [],
  temporaryLocations: [],
  currentPosition: {},
  fromLocation: null,
  toLocation: null,
  destination: null,
  directionCoords: [],
});

export const actions = {
  getLocations: (dispatch, text, position) => {
    dispatch({ type: Types.GET_LOCATIONS_PENDING });
    API.GoogleMap.getLocations(text, position).then((data) => {
      if (data.results.length >= 0) {
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
  clearLocationData: (dispatch) => {
    dispatch({
      type: Types.CLEAR_RESULTS,
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
        temporaryLocations: action.data.results,
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
    case Types.CLEAR_RESULTS: {
      return {
        ...state,
        temporaryLocations: [],
        directionCoords: [],
      };
    }
    default: {
      return state;
    }
  }
};
