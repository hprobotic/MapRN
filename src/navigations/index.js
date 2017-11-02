/**
 * @flow
 */

import { DrawerNavigator } from 'react-navigation';

import MapScreen from './MapScreen';

export default Navigation = DrawerNavigator({
  MapScreen: { screen: MapScreen},
})