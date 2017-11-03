/**
 * @flow
 */

import { DrawerNavigator } from 'react-navigation';

import MapScreen from './MapScreen';
import MathScreen from './MathScreen';

export default Navigation = DrawerNavigator({
  MapScreen: { screen: MapScreen},
  MathScreen: { screen: MathScreen},
})