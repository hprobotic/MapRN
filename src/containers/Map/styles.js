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
    backgroundColor: 'blue'
  },
});

export default styles = StyleSheet.create(baseStyle);
