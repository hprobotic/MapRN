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
    const {name, vicinity, icon, id} = item
    return (
      <SearchResultsRow
        title={name}
        subtitle={vicinity}
        icon={icon}
        onPressItem={this._onPresseItem}
        id={id}
      />
    )
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