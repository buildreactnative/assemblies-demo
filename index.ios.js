/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  NavigatorIOS,
  StyleSheet,
} from 'react-native';

import Landing from './application/components/Landing';

class assembliesTutorial extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        barTintColor='#3A7BD2'
        titleTextColor='#FFFFFF'
        tintColor='#FFFFFF'
        shadowHidden={true}
        translucent={false}
        initialRoute={{
          component: Landing,
          title: 'Landing'
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('assembliesTutorial', () => assembliesTutorial);
