import { StyleSheet } from 'react-native';
import _ from 'lodash';
import { BaseStyles, Fonts } from 'appTheme';

const baseStyle = _.extend(BaseStyles.general, {
  containerView: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
  },
  algorithmContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 16,
    paddingTop: 30,
  },
  headerText: {
    height: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CCC',
    fontFamily: Fonts.base,
    fontSize: 20,
  },
  textArea: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    padding: 10,
    borderRadius: 5
  },
  actionButton: {
    backgroundColor: '#3D9FC6',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    margin: 1,
    flex: 1,
  },
  goButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionsGroup: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  }
});

export default styles = StyleSheet.create(baseStyle);
