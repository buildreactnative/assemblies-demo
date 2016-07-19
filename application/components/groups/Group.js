import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import Swipeout from '../3rd_party/react-native-swipeout';
import React, { Component } from 'react';
import {
  View,
  ListView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
  ActionSheetIOS,
  StyleSheet
} from 'react-native';
import { find } from 'underscore';

import LeftButton from '../accounts/LeftButton';
import { API, DEV } from '../../config';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const OptionsButton = ({ openActionSheet }) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={openActionSheet}>
      <Icon name="ios-more" size={25} color="#ccc" />
    </TouchableOpacity>
  )
}
const Join = () => (
  <Icon name='ios-add' size={30} color='white' style={styles.joinIcon} />
)

const Joined = () => (
  <View style={styles.joinedContainer}>
    <Icon name="ios-checkmark" size={30} color='white' style={styles.joinIcon}/>
  </View>
);

class EventList extends Component{
  constructor(){
    super();
    this._renderRow = this._renderRow.bind(this);
    this.visitEvent = this.visitEvent.bind(this);
  }
  visitEvent(event){
    let { navigator, updateEvents, group } = this.props;
    navigator.push({
      name: 'Event',
      event,
      group,
     })
  }
  _renderRow(event, sectionID, rowID){
    let { currentUser, cancelRSVP, joinEvent, events, navigator, group } = this.props;
    let going = find(event.going, (g) => g === currentUser.id);
    let right = [{
      text: 'RSVP',
      type: 'primary',
      onPress: () => { joinEvent(event, currentUser) }
    }];
    if (going) {
      right = [{
        text: 'Cancel',
        type: 'delete',
        onPress: () => { cancelRSVP(event, currentUser) }
      }];
    }
    return (
      <Swipeout
        backgroundColor='white'
        rowID={rowID}
        right={right}
      >
        <View style={styles.eventContainer}>
          <TouchableOpacity style={styles.eventInfo} onPress={() => this.visitEvent(event)}>
            <Text style={styles.h5}>{event.name}</Text>
            <Text style={styles.h4}>{moment(event.start).format('dddd, MMM Do')}</Text>
            <Text style={styles.h4}>{event.going.length} Going</Text>
          </TouchableOpacity>
          <View style={styles.goingContainer}>
            <Text style={styles.goingText}>{going ? "You're Going" : "Want to go?"}</Text>
            {going ? <Icon name="ios-checkmark" size={30} color={Colors.brandPrimary} /> : <Icon name="ios-add" size={30} color={Colors.brandPrimary} /> }
          </View>
        </View>
      </Swipeout>
    )
  }
  render(){
    let { events } = this.props
    return (
      <ListView
        enableEmptySections={true}
        dataSource={new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2 }).cloneWithRows(events)}
        renderRow={this._renderRow.bind(this)}
        style={styles.listview}
      />
    )
  }
};

class Group extends Component{
  constructor(){
    super();
    this._renderJoin = this._renderJoin.bind(this);
    this.openActionSheet = this.openActionSheet.bind(this);
    this.cancelRSVP = this.cancelRSVP.bind(this);
    this.joinEvent = this.joinEvent.bind(this);
    this.state = {
      users: [],
      events: [],
      ready: false,
    }
  }
  cancelRSVP(event, currentUser){
    console.log('CANCEL RSVP', event, currentUser);
    let { events } = this.state;
    event.going = event.going.filter(userId => userId !== currentUser.id);
    let idx = events.map(evt => evt.id).indexOf(event.id);
    this.setState({ events: [
      ...events.slice(0, idx),
      event,
      ...events.slice(idx + 1)
    ]});
    this.updateEventGoing(event);
  }
  updateEventGoing(event){
    fetch(`${API}/events/${event.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ going: event.going })
    })
    .then(response => response.json())
    .then(data => console.log('RESPONSE', data))
    .catch(err => console.log('ERROR', err))
    .done();
  }
  joinEvent(event, currentUser){
    console.log('JOIN RSVP', event, currentUser);
    let { events } = this.state;
    event.going = event.going.concat(currentUser.id);
    let idx = events.map(evt => evt.id).indexOf(event.id);
    this.setState({ events: [
      ...events.slice(0, idx),
      event,
      ...events.slice(idx + 1)
    ]});
    this.updateEventGoing(event);
  }
  componentDidMount(){
    let { group } = this.props;
    let eventsQuery = { groupId: group.id };
    fetch(`${API}/events?${JSON.stringify(eventsQuery)}`)
    .then(response => response.json())
    .then(events => {
      this.setState({ events, ready: true });
      let query = {
        id: { $in: group.members.map(member => member.userId) }
      }
      fetch(`${API}/users?${JSON.stringify(query)}`)
      .then(response => response.json())
      .then(users => this.setState({ users, ready: true }))
      .catch(err => { if (DEV) console.log('FETCH USERS ERROR: ', err)})
      .done();
    })
    .catch(err => this.setState({ ready: true }))
    .done();
  }
  _renderJoin(){
    let {group, currentUser, addUserToGroup} = this.props;
    let isMember = group.members.map(m => m.userId).indexOf(currentUser.id) !== -1;
    return (
      <View style={styles.joinContainer}>
        <TouchableOpacity
          onPress={() => addUserToGroup(group, currentUser)}
          style={styles.joinButton}>
          <Text style={styles.joinText}>{ isMember ? 'Joined' : 'Join'}</Text>
          { isMember ? <Joined /> : <Join /> }
        </TouchableOpacity>
      </View>
    )
  }
  openActionSheet(){
    let { group, currentUser, unsubscribeFromGroup, navigator } = this.props;
    let user = find(group.members, (member) => member.userId === currentUser.id);
    let buttonActions = ['Unsubscribe', 'Cancel'];
    if (user && user.role === 'admin' || user.role === 'owner')
      buttonActions.unshift('Create Event');
    let options = {
      options: buttonActions,
      cancelButtonIndex: buttonActions.length-1
    };
    ActionSheetIOS.showActionSheetWithOptions(options, (buttonIndex) => {
      switch(buttonActions[buttonIndex]){
        case 'Unsubscribe':
          unsubscribeFromGroup(group, currentUser);
          break;
        case 'Create Event':
          navigator.push({ name: 'CreateEvent', group })
          console.log('CREATE EVENT')
          break;
        default:
          return;
      }
    });
  }
  render(){
    let { users, events } = this.state;
    let { group, currentUser, navigator } = this.props;
    if (DEV) console.log('NAV', navigator);
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{title: group.name, tintColor: 'white'}}
          tintColor={Colors.brandPrimary}
          leftButton={<LeftButton handlePress={() => navigator.replacePreviousAndPop({name: 'Groups'})}/>}
          rightButton={<OptionsButton openActionSheet={this.openActionSheet}/>}
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
          <EventList
            {...this.state}
            {...this.props}
            joinEvent={this.joinEvent}
            cancelRSVP={this.cancelRSVP}
          />
          <View style={styles.break} />
          <Text style={styles.h2}>Members</Text>
          <View style={styles.break} />
          {group.members.map((member, idx) => {
            if (DEV) {console.log('MEMBER', member)}
            let user = find(users, (u => u.id === member.userId))
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
    paddingTop: 10
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
  listview: {
    flex: 1,
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
    height: 50,
  },
  joinButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: Colors.brandPrimary,
  },
  joinedContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white'
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
