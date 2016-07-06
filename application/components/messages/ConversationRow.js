import Colors from '../../styles/colors';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { currentUser, FAKE_USERS } from '../../fixtures';
import _ from 'underscore';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

let { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default class ConversationRow extends Component{
  render(){
    let { conversation, user, handlePress } = this.props;
    let msg = conversation.lastMessageText;
    let date = new Date(conversation.lastMessageDate);
    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
        <View style={styles.container}>
          <Image style={styles.profile} source={{uri: user.avatar}}/>
          <View style={styles.fromContainer}>
            <View style={styles.container}>
              <Text style={styles.fromText}>{user.firstName} {user.lastName}</Text>
              <Text style={styles.sentText}>{moment(date).fromNow()}</Text>
            </View>
            <Text style={styles.messageText}>{msg.substring(0, 40)}...</Text>
          </View>
          <View style={styles.iconHolder}>
            <Icon size={30} name="ios-arrow-forward" color={Colors.bodyTextLight}/>
          </View>
        </View>
        <View style={styles.center}>
          <View style={styles.border}/>
        </View>
      </TouchableOpacity>
    );
  }
};

let styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile:{
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  fromContainer:{
    justifyContent: 'center',
    marginLeft: 10,
    flex: 1,
  },
  fromText:{
    fontSize: 12,
    fontWeight: '700'
  },
  sentText:{
    fontSize: 12,
    fontWeight: '300',
    color: Colors.bodyTextGray,
    marginLeft: 10,
    fontWeight: '300',
    marginLeft: 10
  },
  iconHolder: {
    flex: 0.5,
    alignItems: 'flex-end',
    paddingRight: 25,
  },
  border: {
    height: 0,
    borderBottomWidth: 1,
    width: deviceWidth * 0.95,
    borderBottomColor: Colors.inactive,
  },
  messageText:{
    fontSize: 16,
    color: '#9B9B9B',
    fontStyle: 'italic',
    fontWeight: '300',
  },
  center: {
    alignItems: 'center',
  },
});
