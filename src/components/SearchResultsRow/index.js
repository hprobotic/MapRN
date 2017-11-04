import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SearchResultsRow extends Component {

  static defaultProps = {
    icon: 'home',
    title: 'Home',
    subtitle: 'Earth',
    id: 'id',
    customStyle: {}
  }
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  }

  render() {
    const {title, subtitle, icon, customStyle} = this.props
    console.log(this.props);
    return (
      <TouchableOpacity
        style={[styles.container, customStyle]}
        onPress={this._onPress}
      >
        <View style={styles.iconContainer}>
          <Icon
            name={icon}
            style={styles.icon}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    minHeight: 56,
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: 25,
    justifyContent: 'center',
  },
  icon: {
    width: 15,
    height: 15,
  },
  textContainer: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    color: 'black',
  },
  subtitle: {
    fontSize: 13,
    color: '#A4A4AC',
  },
})