import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const Event = ({ event }) => (
  <View style={styles.container}>
    <Text>{event.name}</Text>
  </View>
);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Event;
