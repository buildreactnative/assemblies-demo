import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Colors from '../../styles/colors';

export default class ProfileView extends Component{
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationBar
          title={{ title: 'Profile', tintColor: 'white' }}
          tintColor={Colors.brandPrimary}
        />
        <View style={styles.container}>
          <Text style={styles.h1}>This is the ProfileView</Text>
        </View>
      </View>
    );
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
  },
});
