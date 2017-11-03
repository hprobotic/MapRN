import Qs from 'qs';
import Polyline from '@mapbox/polyline';
import appConfig from '../appConfig';

const API = {
  GoogleMap: {
    getLocations: async (text, position) => {
      const GOOGLE_PLACES_QUERY = {
        key: appConfig.googleAPI.PlaceAPI,
        language: 'en',
        radius: '20000',
        keyword: text,
        location: `${position.latitude},${position.longitude}`,
      };
      try {
        const resp = await fetch(appConfig.googleAPI.BaseURL +
          appConfig.googleAPI.PlaceSearchPath +
          Qs.stringify(GOOGLE_PLACES_QUERY));
        const respJson = await resp.json();
        return respJson;
      } catch (error) {
        return error;
      }
    },
    getDirection: async (fromLocation, toLocation) => {
      const GOOGLE_PLACES_QUERY = {
        key: appConfig.googleAPI.PlaceAPI,
        mode: 'driving',
        origin: fromLocation,
        destination: toLocation,
      };
      try {
        const resp = await fetch(appConfig.googleAPI.BaseURL +
          appConfig.googleAPI.DirectionPath +
          Qs.stringify(GOOGLE_PLACES_QUERY));
        const respJson = await resp.json();
        const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        const coords = points.map((point, index) => ({
          latitude: point[0],
          longitude: point[1],
        }));
        return coords;
      } catch (error) {
        return error;
      }
    },
  },
};

export default API;

