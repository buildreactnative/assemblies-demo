import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListView,
  Image,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Colors from '../../styles/colors';
import Conversation from './Conversation';

import { messages } from '../../fixtures';

export default class MessagesView extends Component{
  constructor(props){
    super(props);
    let conversations = {};
    // store each message under a conversation key
    messages.forEach(msg => {
      let key = msg.participants.sort().join('-');
      if (conversations[key]) { conversations[key].push(msg); }
      else { conversations[key] = [msg]; }
    });
    let dataBlob = Object.keys(conversations).map(key => conversations[key]);
    // take the first message from each conversation
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      })
      .cloneWithRows(dataBlob)
    };
  }
  _renderRow(rowData){
    console.log('ROW DATA', rowData);
    return (
      <Conversation conversation={rowData}/>
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationBar
          title={{ title: 'Messages', tintColor: 'white' }}
          tintColor={Colors.brandPrimary}
        />
        <ListView
          dataSource={this.state.dataSource}
          contentInset={{ bottom: 49 }}
          automaticallyAdjustContentInsets={false}
          ref='messagesList'
          renderRow={this._renderRow.bind(this)}
        />
      </View>
    );
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
  },
});
