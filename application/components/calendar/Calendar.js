import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class Calendar extends Component{
  render(){
    return (
      <View style={styles.container}>
        {this.props.events.map((event, idx) => (
          <Text>{event.name}</Text>
        ))}
      </View>
    )
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Calendar;
