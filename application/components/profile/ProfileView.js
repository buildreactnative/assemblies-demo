import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
// import { currentUser } from '../../fixtures';

export default class ProfileView extends Component{
  render() {
    let { currentUser, logout } = this.props;
    console.log('CURRENT USER', currentUser);
    return (
      <View style={styles.outerContainer}>
        <NavigationBar
          title={{ title: 'Profile', tintColor: 'white' }}
          tintColor={Colors.brandPrimary}
        />
        <ScrollView style={styles.container}>
          <View style={styles.profileHolder}>
            <TouchableOpacity style={styles.avatarHolder}>
              <Image source={{uri: currentUser.avatarUrl}} style={styles.avatar}/>
            </TouchableOpacity>
            <View style={styles.userInfoHolder}>
              <Text style={styles.name}>{currentUser.firstName} {currentUser.lastName}</Text>
              <Text style={styles.location}>{currentUser.location.city.long_name}, {currentUser.location.state.short_name}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.formField}>
            <Text style={styles.formName}>My Technologies</Text>
            <View>
              <Icon name='ios-arrow-forward' size={30} color='#ccc' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.formField}>
            <Text style={styles.formName}>Settings</Text>
            <View>
              <Icon name='ios-arrow-forward' size={30} color='#ccc' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
};

let styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.inactive,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#777',
  },
  profileHolder: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  formField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  formName: {
    fontWeight: '300',
    fontSize: 18,
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  location: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '300',
  },
  userInfoHolder: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 12,
  },
  avatarHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  logoutButton: {
    position: 'absolute',
    left: 30,
  },
  logoutText: {
    paddingTop: 15,
    fontSize: 18,
    fontWeight: '300',
    color: 'red',
  },
});
