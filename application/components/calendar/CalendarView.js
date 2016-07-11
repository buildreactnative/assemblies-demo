import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class CalendarView extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Text>CALENDAR VIEW</Text>
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

export default CalendarView;
