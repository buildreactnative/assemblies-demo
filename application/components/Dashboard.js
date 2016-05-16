import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Landing from './Landing';

export default class Dashboard extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>This is Dashboard</Text>
        <TouchableOpacity onPress={() => {
          this.props.navigator.push({
            title: 'Landing',
            component: Landing,
          });
        }}>
          <Text >Go to Landing</Text>
        </TouchableOpacity>
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
