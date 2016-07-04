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

class assemblies extends Component {
  constructor(){
    super();
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      user: null
    }
  }
  updateUser(user){
    this.setState({ user: user });
  }
  render() {
    let { user } = this.state;
    return (
      <Navigator
      initialRoute={{name: 'Landing', index: 0}}
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
