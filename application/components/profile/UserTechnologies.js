import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'

const UserTechnologies = () => (
  <View style={styles.container}>
    <Text>USER TECHNOLOGIES</Text>
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

export default UserTechnologies;
