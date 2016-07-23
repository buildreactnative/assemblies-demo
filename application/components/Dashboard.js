import Icon, { TabBarItemIOS } from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import { TabBarIOS } from 'react-native';

import ActivityView from './activity/ActivityView';
import CalendarView from './calendar/CalendarView';
import GroupsView from './groups/GroupsView';
import Headers from '../fixtures/headers';
import MessagesView from './messages/MessagesView';
import ProfileView from './profile/ProfileView';
import { DEV, API } from '../config';
import { globals } from '../styles';

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.setTab = this.setTab.bind(this);
    this.state = {
      selectedTab: 'Activity',
    };
  }
  logout(){ /* end the current session and redirect to the Landing page */
    fetch(`${API}/users/logout`, { method: 'POST', headers: Headers })
    .then(response => response.json())
    .then(data => this.props.navigator.popToTop())
    .catch(err => {})
    .done();
  }
  setTab(tab) { /* change the tabbar location */
    this.setState({ selectedTab: tab });
  }
  render() {
    return (
      <TabBarIOS style={globals.flexContainer}>
        <TabBarItemIOS
          title='Activity'
          selected={this.state.selectedTab === 'Activity'}
          iconName='ios-pulse'
          onPress={() => this.setTab('Activity')}
        >
          <ActivityView currentUser={this.props.currentUser} />
        </TabBarItemIOS>
        <TabBarItemIOS
          title='Groups'
          selected={this.state.selectedTab === 'Groups'}
          iconName='ios-people'
          onPress={() => this.setTab('Groups')}
        >
          <GroupsView currentUser={this.props.currentUser} />
        </TabBarItemIOS>
        <TabBarItemIOS
          title='Calendar'
          selected={this.state.selectedTab === 'Calendar'}
          iconName='ios-calendar'
          onPress={() => this.setTab('Calendar')}
        >
          <CalendarView currentUser={this.props.currentUser} />
        </TabBarItemIOS>
        <TabBarItemIOS
          title='Messages'
          selected={this.state.selectedTab == 'Messages'}
          iconName='ios-chatboxes'
          onPress={() => this.setTab('Messages')}
        >
          <MessagesView currentUser={this.props.currentUser} />
        </TabBarItemIOS>
        <TabBarItemIOS
          title='Profile'
          selected={this.state.selectedTab == 'Profile'}
          iconName='ios-person'
          onPress={() => this.setTab('Profile')}
        >
          <ProfileView
            updateUser={this.props.updateUser}
            currentUser={this.props.currentUser}
            logout={this.logout}
          />
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }
};

export default Dashboard;
