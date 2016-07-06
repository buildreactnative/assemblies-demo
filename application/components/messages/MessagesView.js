import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Navigator,
  Dimensions
} from 'react-native';
import Conversations from './Conversations';
import Conversation from './Conversation';
import UserProfile from '../profile/UserProfile';
import { DEV, API } from '../../config';
import _ from 'underscore';

export default class MessagesView extends Component{
  constructor(){
    super();
    this.state = {
      conversations: [],
      users: [],
      ready: false,
    }
  }
  componentDidMount(){
    let { currentUser } = this.props;
    let conversationQuery = {
      $or: [
        {user1Id: currentUser.id},
        {user2Id: currentUser.id}
      ]
    };
    fetch(`${API}/conversations?${JSON.stringify(conversationQuery)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(conversations => {
      let userIds = _.uniq(_.flatten(conversations.map(d => ([d.user1Id, d.user2Id]))));
      console.log('USER IDS', userIds);
      let userQuery = {
        id: { $in: userIds }
      }
      fetch(`${API}/users?${userQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(users => {
        this.setState({ conversations, users });
      })
      .catch(err => { console.log('ERR: ', err)})
      .done();
    })
    .catch(err => { console.log('ERR:', err)})
    .done();
  }
  render(){
    let { conversations, users } = this.state;
    return (
      <Navigator
        style={styles.container}
        initialRoute={{
          name: 'Conversations'
        }}
        renderScene={(route, navigator) => {
          switch(route.name){
            case 'Conversations':
              return (
                <Conversations
                  {...this.props}
                  {...route}
                  conversations={conversations}
                  navigator={navigator}
                  users={users}
                />
              );
            case 'Conversation':
              return (
                <Conversation
                  {...this.props}
                  {...route}
                  navigator={navigator}
                />
              );
            case 'Profile':
              return (
                <Profile user={route.user} />
              );
          }
        }}
      />
    )
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
