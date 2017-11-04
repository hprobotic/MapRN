import { Platform } from 'react-native';

import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

const base = {
  general: {
    container: {
      flexDirection: 'column',
      alignSelf: 'stretch',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      marginTop: Metrics.navBarHeight,
      flex: 1,
      backgroundColor: Colors.mainBackground,
    },
    noDataText: {
      fontFamily: Fonts.base,
      fontSize: 16,
      textAlign: 'center',
    },
    hiddenThumb: {
      width: 0,
      height: 0,
    },
    heroesCardContainer: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 5,
      marginBottom: 10,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 3,
    },
    titleText: {
      fontFamily: Fonts.base,
      fontSize: 28,
    },
    titleContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    separator: {
      height: 2,
    },
    rowContainer: {
      paddingTop: 5,
      paddingBottom: 5,
    },
    tableHeaderContainer: {
      flexDirection: 'row',
    },
    tableHeaderCell: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10,
    },
    tableHeaderText: {
      fontFamily: Fonts.base,
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    tableValueText: {
      fontFamily: Fonts.base,
      fontSize: 14,
      alignSelf: 'center',
      textAlign: 'center',
    },
    peersCardContainer: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 5,
      marginBottom: 10,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 3,
    },
    inRowSeparator: {
      height: 2,
      marginTop: 5,
      marginBottom: 5,
    },
    filterText: {
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 10,
    },
    primaryButton: {
      backgroundColor: Colors.primary,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
    },
    primaryButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    toolTip: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 40,
      padding: 5,
      paddingLeft: 16,
      paddingRight: 16,
      backgroundColor: 'green'
    },
    toolTipText: {
      flex: 1,
      fontSize: 12,
      color: 'white'
    },
  },
};

export default base;