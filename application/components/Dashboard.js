import React, {
  Component,
} from 'react';

import {
  Dimensions,
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon, {TabBarItemIOS} from 'react-native-vector-icons/Ionicons';
import ProfileView from './profile/ProfileView';
import MessagesView from './messages/MessagesView';
import ActivityView from './activity/ActivityView';

export default class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'Activity',
    };
  }
  render() {
    let { selectedTab } = this.state;
    return (
      <TabBarIOS>
        <TabBarItemIOS
          title='Activity'
          selected={ selectedTab == 'Activity' }
          iconName='ios-pulse'
          onPress={() => this.setState({ selectedTab: 'Activity' })}
        >
          <ActivityView />
        </TabBarItemIOS>
        <TabBarItemIOS
          title='Messages'
          selected={ selectedTab == 'Messages' }
          iconName='ios-chatboxes'
          onPress={() => this.setState({ selectedTab: 'Messages' })}
        >
          <MessagesView />
        </TabBarItemIOS>
        <TabBarItemIOS
          title='Profile'
          selected={ selectedTab == 'Profile' }
          iconName='ios-person'
          onPress={() => this.setState({ selectedTab: 'Profile' })}
        >
          <ProfileView />
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }
};

let styles = StyleSheet.create({
});
