import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Dashboard from './Dashboard';

export default class Landing extends Component{
  render(){
    return (
      <View style={{flex: 1}}>
        <NavigationBar
          title={{title: 'Landing', tintColor: 'white'}}
          tintColor='#3A7BD2'
        />
        <View style={styles.container}>
          <Text style={styles.h1}>This is Landing</Text>
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
