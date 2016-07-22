import _ from 'underscore';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Colors from '../../styles/colors';
import NavigationBar from 'react-native-navbar';
import {API, DEV} from '../../config';
import LeftButton from '../accounts/LeftButton';

let { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const EmptyGroupBox = () => (
  <View style={styles.groupsContainer}>
    <View style={styles.groupImage}>
      <View style={[styles.group, {backgroundColor: Colors.inactive,}]} />
    </View>
  </View>
);

const GroupBoxes = ({ groups }) => (
  <View style={{justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
    {groups.map((group, idx) => {
      if (!group) { return <EmptyGroupBox key={idx}/>}
      return (
        <View key={idx} style={styles.groupsContainer}>
          <Image source={{uri: group.image}} style={styles.groupImage}>
            <View style={[styles.group, {backgroundColor: group.color,}]} >
              <Text style={styles.groupText}>{group.name}</Text>
            </View>
          </Image>
        </View>
      )
    })}
  </View>
)



class Profile extends React.Component{
  constructor(props){
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      groups: []
    }
  }
  componentDidMount(){
    let { user } = this.props;
    let query = {
      members: {
        $elemMatch: {userId: user.id}
      }
    };
    fetch(`${API}/groups?${JSON.stringify(query)}`)
    .then(response => response.json())
    .then(groups => this.setState({ groups }))
    .catch(err => console.log('ERR:', err))
    .done();
  }
  sendMessage(){
    let { user, navigator } = this.props;
    navigator.push({
      name: 'Conversation',
      user
    })
  }
  render(){
    let {user, currentUser, navigator} = this.props;
    let {groups} = this.state;
    if (groups.length % 2 === 1) { groups.push(null) }
    let titleConfig = {title: `${user ? user.firstName : 'User'}'s Profile`, tintColor: 'white'};

    return (
      <View style={styles.container}>
        <NavigationBar
          tintColor={Colors.brandPrimary}
          title={titleConfig}
          leftButton={<LeftButton handlePress={() => navigator.pop()}/> }
        />
        <ScrollView style={styles.profileContainer}>
          <View style={{height: 120, alignItems: 'center'}}>
            <Image source={{uri: user.avatar}} style={styles.avatar}/>
          </View>
          <Text style={styles.username}>{user.firstName} {user.lastName}</Text>
          <Text style={styles.location}>{user.location.city.long_name}, {user.location.state.long_name}</Text>
          <TouchableOpacity style={styles.newMessageContainer} onPress={this.sendMessage}>
            <Icon name="ios-chatboxes" size={40} style={styles.chatBubble} color={Colors.brandPrimary}/>
            <Text style={styles.sendMessageText}>Send a Message</Text>
          </TouchableOpacity>
          <View style={styles.break}></View>
          <Text style={styles.technologies}>Technologies</Text>
          <Text style={styles.technologyList}>{user.technologies.join(', ')}</Text>
          <Text style={styles.technologies}>Assemblies</Text>
          <View style={{flex: 1}}>
            <GroupBoxes groups={this.state.groups} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  groupsContainer: {
    flexDirection: 'row'
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  backButtonText: {
    color: 'white',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    padding: 20,
  },
  username: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '300',
    padding: 8,
  },
  group: {
    opacity: 0.9,
    flex: 1,
    padding: 15,
    height: (deviceWidth / 2) - 25,
    width: (deviceWidth / 2) - 25,
  },
  groupsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  groupImage: {
    height: (deviceWidth / 2) - 25,
    width: (deviceWidth / 2) - 25,
    opacity: 0.8,
    margin: 5,
  },
  location: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '300',
  },
  newMessageContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupText: {
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    fontWeight: '500',
  },
  assemblies:{

  },
  break:{
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height: 1,
    width: deviceWidth - 20,
  },
  chatBubble:{
    padding: 10,
  },
  sendMessageText: {
    fontSize: 18,
    padding: 5,
  },
  technologies:{
    textAlign: 'left',
    fontSize: 22,
    paddingHorizontal: 20,
    paddingBottom: 4,
    paddingTop: 20,
  },
  technologyList:{
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.brandPrimary,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },

  inputBox: {
    height: 60,
    backgroundColor: '#F3EFEF',
    flexDirection: 'row',
    marginBottom: 50,
  },

  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    height: 70,
    backgroundColor: Colors.brandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
  },
})

export default Profile;
