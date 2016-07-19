import React, { Component } from 'react';

import {
  Dimensions,
  TabBarIOS,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon, { TabBarItemIOS } from 'react-native-vector-icons/Ionicons';
import ProfileView from './profile/ProfileView';
import MessagesView from './messages/MessagesView';
import ActivityView from './activity/ActivityView';
import { DEV, API } from '../config';
import CalendarView from './calendar/CalendarView';
import GroupsView from './groups/GroupsView';

export default class Dashboard extends Component{
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.updateTab = this.updateTab.bind(this);
    this.state = {
      selectedTab: 'Activity',
    };
  }
  updateTab(type){
    switch(type){
      case 'Message':
        this.setState({ selectedTab: 'Messages'});
        break;
      case 'Event':
        this.setState({ selectedTab: 'Groups'});
        break;
    }
  }
  logout(){
    fetch(`${API}/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      this.props.navigator.popToTop();
    })
    .catch(err => {})
    .done();
  }
  render() {
    let { selectedTab } = this.state;
    let { currentUser } = this.props;
    return (
      <TabBarIOS style={styles.outerContainer}>
        <TabBarItemIOS
          title='Activity'
          selected={ selectedTab == 'Activity' }
          iconName='ios-pulse'
          onPress={() => this.setState({ selectedTab: 'Activity' })}
        >
          <ActivityView {...this.props} updateTab={this.updateTab}/>
        </TabBarItemIOS>
        <TabBarItemIOS
          title='Groups'
          selected={ selectedTab == 'Groups' }
          iconName='ios-people'
          onPress={() => this.setState({ selectedTab: 'Groups' })}
        >
          <GroupsView {...this.props}/>
        </TabBarItemIOS>
        <TabBarItemIOS
          title='Calendar'
          selected={ selectedTab == 'Calendar' }
          iconName='ios-calendar'
          onPress={() => this.setState({ selectedTab: 'Calendar' })}
        >
          <CalendarView {...this.props}/>
        </TabBarItemIOS>
        <TabBarItemIOS
          title='Messages'
          selected={ selectedTab == 'Messages' }
          iconName='ios-chatboxes'
          onPress={() => this.setState({ selectedTab: 'Messages' })}
        >
          <MessagesView currentUser={currentUser}/>
        </TabBarItemIOS>
        <TabBarItemIOS
          title='Profile'
          selected={ selectedTab == 'Profile' }
          iconName='ios-person'
          onPress={() => this.setState({ selectedTab: 'Profile' })}
        >
          <ProfileView currentUser={currentUser} logout={this.logout}/>
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }
};

let styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  backBtn: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
  },
});
