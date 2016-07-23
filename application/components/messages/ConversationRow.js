import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import Colors from '../../styles/colors';
import { globals, messagesStyles } from '../../styles';

const styles = messagesStyles;

class ConversationRow extends Component{
  render(){
    let { conversation, user, handlePress } = this.props;
    return (
      <TouchableOpacity style={globals.flexContainer} onPress={handlePress}>
        <View style={globals.flexRow}>
          <Image style={globals.avatar} source={{uri: user.avatar}}/>
          <View style={globals.flexRow}>
            <View style={globals.textContainer}>
              <Text style={styles.h5}>{user.firstName} {user.lastName}</Text>
              <Text style={styles.h6}>{moment(conversation.lastMessageDate).fromNow()}</Text>
            </View>
            <Text style={styles.h4}>{conversation.lastMessageText.substring(0, 40)}...</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Icon size={30} name="ios-arrow-forward" color={Colors.bodyTextLight}/>
          </View>
        </View>
        <View style={styles.divider}/>
      </TouchableOpacity>
    );
  }
};

export default ConversationRow;
