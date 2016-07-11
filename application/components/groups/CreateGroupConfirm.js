import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const CreateGroupConfirm = (props) => (
  <View style={styles.container}>
    <Text>CREATE GROUP CONFIRM</Text>
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

export default CreateGroupConfirm;
