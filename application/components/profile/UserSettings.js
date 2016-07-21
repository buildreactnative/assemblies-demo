import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'

const UserSettings = () => (
  <View style={styles.container}>
    <Text>USER SETTINGS</Text>
  </View>
);

let styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default UserSettings;
