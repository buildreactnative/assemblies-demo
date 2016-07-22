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
  AsyncStorage
} from 'react-native';

import Landing from './application/components/Landing';
import Dashboard from './application/components/Dashboard';
import Register from './application/components/accounts/Register';
import Login from './application/components/accounts/Login';
import RegisterConfirm from './application/components/accounts/RegisterConfirm';
import Loading from './application/components/utilities/Loading';
import { API, DEV } from './application/config';

class assemblies extends Component {
  constructor(){
    super();
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      user: null,
      ready: false,
      initialRoute: 'Landing'
    }
  }
  async _loadLoginCredentials(){
    try {
      let sid = await AsyncStorage.getItem('sid');
      if (sid){
        fetch(`${API}/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': `sid=${sid}`
          }
        })
        .then(response => response.json())
        .then(data => { this.setState({ user: data, ready: true, initialRoute: 'Dashboard' }) })
        .catch(err => {
          if (DEV) { console.log('Connection error ', err); }
          this.setState({ ready: true })
        })
        .done();
      } else {
        this.setState({ ready: true })
      }
    } catch (err) {
      this.setState({ ready: true })
    }
  }
  componentDidMount(){
    this._loadLoginCredentials();
  }
  updateUser(user){
    this.setState({ user: user });
    if (!user){
      this.nav.push({ name: 'Landing' })
    }
  }
  render() {
    let { user, ready, initialRoute } = this.state;
    if (! ready ) { return <Loading /> }
    return (
      <Navigator
        ref={(el) => {this.nav = el}}
        initialRoute={{name: initialRoute, index: 0}}
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
                updateUser={this.updateUser}
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
