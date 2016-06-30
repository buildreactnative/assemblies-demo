import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Dashboard from './Dashboard';
import NavigationBar from 'react-native-navbar';

export default class Landing extends Component{
  render(){
    return (
      <View style={styles.outerContainer}>
        <NavigationBar
            title={{title: 'Landing', tintColor: 'white'}}
            tintColor='#3A7BD2'
          />
        <View style={styles.container}>
          <Text style={styles.h1}>This is the Landing</Text>
          <TouchableOpacity onPress={() => {
            this.props.navigator.push({
              name: 'Dashboard'
            });
          }}>
            <Text>Go to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

let styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
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
