/**
 * @flow
 */
import React, { Component } from 'react'
import {
  FlatList,
  View,
  Text,
  StyleSheet } from 'react-native'
import Reactotron from 'reactotron-react-native';
import { Colors } from 'appTheme';
import SearchResultsRow from '../SearchResultsRow'

export default class SearchResultsList extends Component {
  _keyExtractor = (item, index) => item.id;
  componentWillReceiveProps = nextProps => this.forceUpdateComponents(nextProps.list);

  forceUpdateComponents = (list) => {
    this.setState({
    })
  }

  _renderSeparator = (sectionID, rowID) => {
    return (
      <View
        key={rowID}
        style={styles.separator}
      />
    )
  }

  _renderItem = ({ item }) => {
    const {name, vicinity, id} = item
    return (
      <SearchResultsRow
        title={name}
        icon={'map-marker'}
        subtitle={vicinity}
        onPressItem={this._onPresseItem}
        id={id}
      />
    )
  }

  _renderHeader = () => {
    return (
      <SearchResultsRow
        title={'Set location on map'}
        subtitle={''}
        icon={'map-marker-plus'}
        onPressItem={this._onPressePicker}
        id={'-1'}
        customStyle={{
          borderBottomWidth: 0.5, 
          borderBottomColor: Colors.primary,
        }}
      />
    )
  }

  _onPressePicker = () => {
    this.props.handPickLocationFor('to')
  }
  _onPresseItem = (id: string) => {
    this.props.onLocationSelectedAt(id)
  }

  render() {
    const { list } = this.props;
    return (
      <FlatList
        style={styles.container}
        data={list}
        renderItem={this._renderItem}
        extraData={this.state}
        ItemSeparatorComponent={this._renderSeparator}
        ListHeaderComponent={this._renderHeader}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#EDEDED',
  }
})