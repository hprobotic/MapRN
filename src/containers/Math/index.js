/**
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import _ from 'lodash';
import {
  NavIcon,
} from 'appComponents';
import styles from './styles';

class Math extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      outputText: '',
    };
  }

  _onRunPressed() {
    let words = this.state.input.split(',')
      .map(item => item.trim())
      .filter(item => !_.isEmpty(item));
    words = words.map(s => (_.isString(s) ? s.toLowerCase() : s));
    const output = this._findAnagram(words);
    if (_.isArray(output) && output.length > 0) {
      this.setState({
        outputText: output.join('\n'),
      });
    }
  }

  _loadInput() {
    const inputText = 'hello, this, is , new, is, is, olleh, mega, bin, nib, test, me, em, anh, nha, cua, uac';
    this.setState({
      input: inputText,
    });
  }

  _findAnagram(words) {
    if (words.length === 1) {
      return words;
    }
    const results = [];
    const wordsSort = (a, b) => a > b;
    const wordsGroup = {};
    var wordChar;

    for (const i in words) {
      if (!_.isString(words[i])) {
        continue;
      }
      wordChar = words[i].split('').sort(wordsSort).join('');
      if (!Object.prototype.hasOwnProperty.call(wordsGroup, wordChar)) {
        wordsGroup[wordChar] = [];
      }
      wordsGroup[wordChar].push(words[i]);
    }
    for (const word in wordsGroup) {
      if (Object.prototype.hasOwnProperty.call(wordsGroup, word)) {
        results.push(wordsGroup[word]);
      }
    }
    return results;
  }

  openMenu() {
    this.props.navigate('DrawerOpen');
  }

  render() {
    return (
      <View style={styles.containerView}>
        <NavIcon
          icon="md-menu"
          onPress={this.openMenu.bind(this)}
        />
        <ScrollView containerStyle={styles.containerView}>
          <View style={styles.algorithmContainer}>
            <Text style={styles.headerText}>INPUT: </Text>
            <TextInput
              style={[styles.inputText, styles.textArea]}
              multiline
              value={this.state.input}
              onChangeText={input => this.setState({ input })}
            />
            <View style={styles.actionsGroup}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={this._onRunPressed.bind(this)}
              >
                <Text style={styles.goButtonText}>GO</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={this._loadInput.bind(this)}
              >
                <Text style={styles.goButtonText}>LOAD INPUT</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.headerText}>OUTPUT: </Text>
            <TextInput
              style={[styles.outputText, styles.textArea]}
              value={this.state.outputText}
              disable
              multiline
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Math;
