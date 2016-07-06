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
import ConversationRow from './ConversationRow';

import { messages } from '../../fixtures';

export default class Conversations extends Component{
  _renderRow(rowData){
    console.log('ROW DATA', rowData);
    let { users, currentUser, navigator } = this.props;
    let otherUserId = rowData.user1Id == currentUser.id ? rowData.user2Id : rowData.user1Id;
    let otherUserIdx = users.map(u => u.id).indexOf(otherUserId);
    let otherUser = users[otherUserIdx];
    return (
      <ConversationRow
        conversation={rowData}
        user={otherUser}
        handlePress={() => {
          navigator.push({
            name: 'Conversation',
            conversation: rowData,
            user: otherUser
          });
        }}
      />
    );
  }
  render() {
    let { conversations, users } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <NavigationBar
          title={{ title: 'Messages', tintColor: 'white' }}
          tintColor={Colors.brandPrimary}
        />
        <ListView
          dataSource={new ListView.DataSource({
              rowHasChanged: (r1,r2) => r1 != r2
            })
            .cloneWithRows(conversations)
          }
          enableEmptySections={true}
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
