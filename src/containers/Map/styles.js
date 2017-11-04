import { StyleSheet } from 'react-native';
import _ from 'lodash';
import { BaseStyles } from 'appTheme';

const baseStyle = _.extend(BaseStyles.general, {
  containerView: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainMapView: {
    flex: 1,
    zIndex: -1,
    backgroundColor: 'blue',
  },
  bottomAction: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 40,
  },
  draggablePicker: {
    zIndex: 90
  },
});

export default styles = StyleSheet.create(baseStyle);
