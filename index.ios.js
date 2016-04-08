/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  NavigatorIOS,
  Navigator,
  StyleSheet,
} from 'react-native';

import Landing from './application/components/Landing';
import Dashboard from './application/components/Dashboard';

class assembliesTutorial extends Component {
  render() {
    return (
      <Navigator
        style={{flex: 1}}
        initialRoute={{
          name: 'Landing'
        }}
        renderScene={(route, navigator) => {
          switch(route.name){
            case 'Landing':
              return <Landing navigator={navigator} />
            case 'Dashboard':
              return <Dashboard navigator={navigator} />
          }
        }}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
      />
    );
  }
};

AppRegistry.registerComponent('assembliesTutorial', () => assembliesTutorial);
