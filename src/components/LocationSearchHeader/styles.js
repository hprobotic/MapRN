import { StyleSheet } from 'react-native';
import _ from 'lodash';
import { BaseStyles, Fonts } from 'appTheme';

const SQUARE_SIZE = 6
const baseStyle = _.extend(BaseStyles.general, {
  container: {
    zIndex: 1,
  },
  hoverbar: {
    position: 'absolute',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    zIndex: 1,
  },
  target: {
    flex: 1,
  },
  square: {
    position: 'absolute',
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    backgroundColor: 'black',
    zIndex: 2,
  },
  dot: {
    position: 'absolute',
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    borderRadius: SQUARE_SIZE / 2,
    backgroundColor: '#A4A4AC',
    zIndex: 2,
  },
  toBox: {
    position: 'absolute',
    backgroundColor: '#EDEDED',
    borderRadius: 4,
    zIndex: 3,
  },
  fromBox: {
    position: 'absolute',
    borderRadius: 4,
    zIndex: 3,
    backgroundColor: '#F9F9F9',
  },
  actionBox: {
    position: 'absolute',
    zIndex: 3,
  },
  toText: {
    position: 'absolute',
    zIndex: 4,
    backgroundColor: 'transparent',
    fontSize: 14,
    fontFamily: Fonts.base,
  },
  fromText: {
    position: 'absolute',
    zIndex: 3,
    color: '#525760',
    backgroundColor: 'transparent',
    fontSize: 15,
    fontFamily: Fonts.base,
  },
  verticalBar: {
    position: 'absolute',
    height: 28,
    width: 1,
    backgroundColor: '#A4A4AC',
    zIndex: 2,
  },
  input: {
    flex: 1,
    color: 'black',
    backgroundColor: 'transparent',
    zIndex: 13,
    fontSize: 14,
    fontFamily: Fonts.base,
    paddingHorizontal: 10,
  },
  goButton: {
    backgroundColor: '#3D9FC6',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  goButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles = StyleSheet.create(baseStyle);
