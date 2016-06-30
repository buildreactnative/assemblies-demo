import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Dashboard extends Component{
  _renderBackButton(){
    return (
      <TouchableOpacity
        onPress={() => this.props.navigator.pop()}
        style={styles.backBtn}>
        <Icon name='ios-arrow-back' size={25} color='white' />
      </TouchableOpacity>
    )
  }
  render(){
    return (
      <View style={styles.outerContainer}>
        <NavigationBar
          title={{title: 'Dashboard', tintColor: 'white'}}
          tintColor='#3A7BD2'
          leftButton={this._renderBackButton()}
        />
        <View style={styles.container}>
          <Text style={styles.h1}>This is Dashboard</Text>
          <TouchableOpacity onPress={() => {
              this.props.navigator.push({
                name: 'Landing'
              })
            }}>
            <Text>Go to Landing</Text>
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
  backBtn: {
    paddingTop: 10,
    paddingHorizontal: 20,
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
