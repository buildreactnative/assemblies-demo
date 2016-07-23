import NavigationBar from 'react-native-navbar';
import React, { Component } from 'react';
import { Image, ListView, Text, TouchableOpacity, View } from 'react-native';
import { find } from 'underscore';

import Colors from '../../styles/colors';
import ConversationRow from './ConversationRow';
import Loading from '../shared/Loading';
import { globals, messagesStyles } from '../../styles';

const styles = messagesStyles;

class Conversations extends Component{
  constructor(){
    super();
    this._renderRow = this._renderRow.bind(this);
    this.dataSource = this.dataSource.bind(this);
    this.visitConversation = this.visitConversation.bind(this);
  }
  visitConversation(user){
    this.props.navigator.push({
      name: 'Conversation',
      user
    })
  }
  _renderRow(conversation){
    let otherUserID = find([conversation.user1Id, conversation.user2Id], (id) => id !== this.props.currentUser.id);
    let otherUser = find(this.props.users, ({ id }) => id === otherUserID);
    return (
      <ConversationRow
        conversation={conversation}
        handlePress={() => this.visitConversation(otherUser)}
        user={otherUser}
      />
    );
  }
  dataSource(){
    return (
      new ListView.DataSource({
        rowHasChanged: (r1,r2) => r1 != r2
      })
      .cloneWithRows(this.props.conversations)
    );
  }
  render() {
    if (! this.props.ready ) { return <Loading /> }
    return (
      <View style={globals.flex}>
        <NavigationBar
          title={{ title: 'Messages', tintColor: 'white' }}
          tintColor={Colors.brandPrimary}
        />
        <ListView
          dataSource={this.dataSource()}
          enableEmptySections={true}
          contentInset={{ bottom: 49 }}
          automaticallyAdjustContentInsets={false}
          renderRow={this._renderRow}
        />
      </View>
    );
  }
};

export default Conversations;
