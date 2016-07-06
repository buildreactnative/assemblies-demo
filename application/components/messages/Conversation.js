import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class Conversation extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text>CONVERSATION</Text>
      </View>
    )
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
