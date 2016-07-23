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

import Dashboard from './application/components/Dashboard';
import Landing from './application/components/Landing';
import Loading from './application/components/utilities/Loading';
import Login from './application/components/accounts/Login';
import Register from './application/components/accounts/Register';
import RegisterConfirm from './application/components/accounts/RegisterConfirm';
import { API, DEV } from './application/config';
import Headers from './application/fixtures/headers';

class assemblies extends Component {
  constructor(){
    super();
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      user          : null,
      ready         : false,
      initialRoute  : 'Landing'
    }
  }
  componentDidMount(){
    this._loadLoginCredentials();
  }
  async _loadLoginCredentials(){
    /* fetch session id from AsyncStorage to enable persistent user login */
    try {
      let sid = await AsyncStorage.getItem('sid');
      if (sid) {
        this.fetchUser(sid);
      } else {
        this.ready();
      }
    } catch (err) {
      this.ready();
    }
  }
  ready(){ /* render screen */
    this.setState({ ready: true })
  }
  fetchUser(sid){
    /* fetch user with session id */
    fetch(`${API}/users/me`, { headers: extend(Headers, { 'Set-Cookie': `sid=${sid}`}) })
    .then(response => response.json())
    .then(user => this.setState({ user, ready: true, initialRoute: 'Dashboard' }))
    .catch(err => this.ready())
    .done();
  }
  updateUser(user){
    this.setState({ user: user });
    if (!user) this.nav.push({ name: 'Landing' })
  }
  render() {
    if (! this.state.ready ) { return <Loading /> }
    return (
      <Navigator
        ref={(el) => this.nav = el }
        initialRoute={{ name: this.state.initialRoute }}
        renderScene={(route, navigator) => {
        switch(route.name){
          case 'Landing':
            return (
              <Landing navigator={navigator} />
            );
          case 'Dashboard':
            return (
              <Dashboard
                navigator={navigator}
                currentUser={this.state.user}
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
};

AppRegistry.registerComponent('assemblies', () => assemblies);
