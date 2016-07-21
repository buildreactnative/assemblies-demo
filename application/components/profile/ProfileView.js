import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet
} from 'react-native';
import UserProfile from './UserProfile';
import UserSettings from './UserSettings';
import UserTechnologies from './UserTechnologies';

export default class ProfileView extends Component{
  render(){
    return (
      <Navigator
        initialRoute={{ name: 'UserProfile' }}
        style={styles.container}
        renderScene={(route, navigator) => {
          switch(route.name){
            case 'UserProfile':
              return (
                <UserProfile
                  {...this.props}
                  {...route}
                  navigator={navigator}
                />
            );
            case 'UserSettings':
              return (
                <UserSettings
                  {...this.props}
                  {...route}
                  navigator={navigator}
                />
            );
            case 'UserTechnologies':
              return (
                <UserTechnologies
                  {...this.props}
                  {...route}
                  navigator={navigator}
                />
            );
          }
        }}
      />
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
