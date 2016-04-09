import Icon, {TabBarItem} from 'react-native-vector-icons/Ionicons';
import ProfileView from './profile/ProfileView';
import MessagesView from './messages/MessagesView';
import ActivityView from './activity/ActivityView';

import React, {
  View,
  Text,
  StyleSheet,
  Component,
  TouchableOpacity,
  TabBarIOS,
  Dimensions,
} from 'react-native';

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
        <TabBarItem 
          title='Activity'
          selected={ selectedTab == 'Activity' }
          iconName='clipboard'
          onPress={() => this.setState({ selectedTab: 'Activity' })}
        >
          <ActivityView />
        </TabBarItem>
        <TabBarItem
          title='Messages'
          selected={ selectedTab == 'Messages' }
          iconName='android-chat'
          onPress={() => this.setState({ selectedTab: 'Messages' })}
        >
          <MessagesView />
        </TabBarItem>
        <TabBarItem
          title='Profile'
          selected={ selectedTab == 'Profile' }
          iconName='gear-b'
          onPress={() => this.setState({ selectedTab: 'Profile' })}
        >
          <ProfileView />
        </TabBarItem>
      </TabBarIOS>
    );
  }
};

let styles = StyleSheet.create({
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
  backBtn: {
    paddingTop: 10,
    paddingHorizontal: 20,
  }
});
