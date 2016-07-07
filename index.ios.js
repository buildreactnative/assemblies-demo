/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
} from 'react-native';

import Landing from './application/components/Landing';
import Dashboard from './application/components/Dashboard';
import Register from './application/components/accounts/Register';
import Login from './application/components/accounts/Login';
import RegisterConfirm from './application/components/accounts/RegisterConfirm';
const FAKE_USER = {
  avatar: 'https://confluence.slac.stanford.edu/s/en_GB/5996/4a6343ec7ed8542179d6c78fa7f87c01f81da016.20/_/images/icons/profilepics/default.png',
  technologies: [
  	"JavaScript",
  	"Machine Learning",
  	"React Native",
  	"Redux"
  ],
  id: '15f9d0d11a023b8a',
  username: 'tom@example.com',
  password: 'password',
  firstName: 'Tom',
  lastName: 'Goldenberg',
  location : {
  	lat: 41.308274,
  	lng: -72.9278835,
  	city: {
  		long_name: "New Haven",
  		short_name: "New Haven",
  		types: [
  			"locality",
  			"political"
  		]
  	},
  	state: {
  		long_name: "Connecticut",
  		short_name: "CT",
  		types: [
  			"administrative_area_level_1",
  			"political"
  		]
  	},
  	county: {
  		long_name: "New Haven County",
  		short_name: "New Haven County",
  		types: [
  			"administrative_area_level_2",
  			"political"
  		]
  	},
  	formattedAddress: "New Haven, CT, USA"
  }
}

class assemblies extends Component {
  constructor(){
    super();
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      user: FAKE_USER
    }
  }
  updateUser(user){
    this.setState({ user: user });
  }
  render() {
    let { user } = this.state;
    return (
      <Navigator
      initialRoute={{name: 'Dashboard', index: 0}}
      renderScene={(route, navigator) => {
        switch(route.name){
          case 'Landing':
            return <Landing navigator={navigator} />
            break;
          case 'Dashboard':
            return (
              <Dashboard
                navigator={navigator}
                currentUser={user}
              />
            );
          case 'Register':
            return <Register navigator={navigator} />
          case 'Login':
            return (
              <Login
                navigator={navigator}
                updateUser={this.updateUser}
              />
            );
          case 'RegisterConfirm':
            return (
              <RegisterConfirm
                {...route}
                navigator={navigator}
                updateUser={this.updateUser}
              />
            );
            break;
          }
        }}
        configureScene={() => Navigator.SceneConfigs.PushFromRight}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('assemblies', () => assemblies);
