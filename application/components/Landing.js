import React, {
  Component,
} from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Colors from '../styles/colors';
import Dashboard from './Dashboard';

let { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default class Landing extends Component{
  render(){
    return (
        <View style={styles.container}>
          <View style={styles.backgroundHolder}>
            <Image style={styles.image} source={require('../assets/images/welcome.png')}/>
          </View>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
            <Text style={styles.title}>assemblies</Text>
            <Text style={styles.subTitle}>Where Developers Connect</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigator.push({
                name: 'Dashboard'
              })
            }}
          >
            <Text style={styles.buttonText}>Go to Dashboard</Text>
          </TouchableOpacity>
        </View>
    )
  }
};

let styles = StyleSheet.create({
  backgroundHolder: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  button: {
    height: 80,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: Colors.brandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  image: {
    height: deviceHeight,
    width: deviceWidth,
  },
  logo: {
    height: 90,
    width: 90,
  },
  logoContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  subTitle: {
    color: 'white',
    fontSize: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    paddingBottom: 24,
  },
});
