import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class Conversation extends Component{
  render(){
    <View style={styles.container}>
      <Text>CONVERSATION</Text>
    </View>
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
