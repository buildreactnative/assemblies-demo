import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
  StyleSheet
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import LeftButton from '../accounts/LeftButton';
import { API, DEV } from '../../config';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class Group extends Component{
  constructor(){
    super();
    this.state = {
      users: [],
      ready: false,
    }
  }
  componentDidMount(){
    let { group } = this.props;
    let query = {
      id: { $in: group.members.map(member => member.userId) }
    }
    fetch(`${API}/users?${JSON.stringify(query)}`)
    .then(response => response.json())
    .then(users => this.setState({ users, ready: true }))
    .catch(err => this.setState({ ready: true }))
    .done();
  }
  render(){
    let { users } = this.state;
    let { group, currentUser, navigator } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{title: group.name, tintColor: 'white'}}
          tintColor={Colors.brandPrimary}
          leftButton={<LeftButton navigator={navigator}/>}
        />
        <ScrollView style={styles.scrollView}>
          <Image source={{uri: group.image}} style={styles.topImage}>
            <View style={styles.overlayBlur}>
              <Text style={styles.h1}>{group.name}</Text>
            </View>
            <View style={styles.bottomPanel}>
              <Text style={styles.memberText}>{group.members.length} {group.members.length === 1 ? 'member' : 'members'}</Text>
            </View>
          </Image>
          <Text style={styles.h2}>Summary</Text>
          <Text style={[styles.h4, {paddingHorizontal: 20,}]}>{group.description}</Text>
          <Text style={styles.h2}>Technologies</Text>
          <Text style={styles.h3}>{group.technologies.join(', ')}</Text>
          { group.members.map(m => m.userId).indexOf(currentUser.id) === -1 ? this._renderJoin() : null}
          <Text style={styles.h2}>Events</Text>
          <Text style={styles.h2}>Members</Text>
          <View style={styles.break} />
          {group.members.map((member, idx) => {
            if (DEV) {console.log('MEMBER', member)}
            let user = users[users.map(u => u.id).indexOf(member.userId)];
            let isOwner = member.role === 'owner';
            let isAdmin = member.role === 'admin';
            let status = isOwner ? 'owner' : isAdmin ? 'admin' : 'member'
            if ( ! user ) { return; }
            return (
              <TouchableOpacity key={idx} style={styles.memberContainer}>
                <Image source={{uri: user.avatar}} style={styles.avatar}/>
                <View style={styles.memberInfo}>
                  <Text style={styles.h5}>{user.firstName} {user.lastName}</Text>
                  <Text style={styles.h4}>{status}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  backButton: {
    paddingLeft: 20,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  addButton: {
    backgroundColor: 'transparent',
    paddingRight: 20,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  topImage: {
    width: deviceWidth,
    height: 200,
    flexDirection: 'column',
  },
  overlayBlur: {
    backgroundColor: '#333',
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  h1: {
    fontSize: 22,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  bottomPanel: {
    flex: 0.3,
    backgroundColor: 'white',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberText: {
    textAlign: 'center',
    color: Colors.brandPrimary,
    fontSize: 18,
    fontWeight: '400',
  },
  h4: {
    fontSize: 16,
    fontWeight: '300',
  },
  h3: {
    fontSize: 16,
    color: Colors.brandPrimary,
    paddingHorizontal: 18,
    paddingVertical: 5,
    fontWeight: '400',
  },
  break: {
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  h2: {
    fontSize: 20,
    fontWeight: '400',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  joinContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  joinButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: Colors.brandPrimary,
  },
  joinText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: 'center',
  },
  joinIcon: {

  },
  eventInfo: {
    flex: 1,
  },
  h5: {
    fontSize: 18,
    fontWeight: '500',
  },
  goingContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goingText: {
    fontSize: 17,
    color: Colors.brandPrimary
  },
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  memberInfo: {
    paddingLeft: 30,
  },
});

export default Group;
