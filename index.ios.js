import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} from 'react-native';

import Landing from './application/components/Landing';

class assembliesTutorial extends Component{
  render(){
    return (
      <NavigatorIOS
        style={{flex: 1}}
        barTintColor='#3A7BD2'
        titleTextColor='white'
        tintColor='white'
        shadowHidden={true}
        translucent={false}
        initialRoute={{
          component: Landing,
          title: 'Landing',
        }}
      />
    );
  }
};

AppRegistry.registerComponent('assembliesTutorial', () => assembliesTutorial);
