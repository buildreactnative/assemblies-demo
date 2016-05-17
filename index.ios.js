import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  Navigator,
  StyleSheet
} from 'react-native';

import Dashboard from './application/components/Dashboard';
import Landing from './application/components/Landing';

class assembliesTutorial extends Component{
  render(){
    console.log(Navigator.SceneConfigs)
    return (
      <Navigator
        initialRoute={{name: 'Landing', index: 0}}
        renderScene={(route, navigator) => {
          switch(route.name){
            case 'Landing':
              return <Landing navigator={navigator} />
              break;
            case 'Dashboard':
              return <Dashboard navigator={navigator} />
              break;
          }
        }}
        configureScene={() => Navigator.SceneConfigs.PushFromRight}
      />
    )
  }
}

AppRegistry.registerComponent('assembliesTutorial', () => assembliesTutorial);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
