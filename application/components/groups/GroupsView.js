import React, { Component } from 'react';
import { Navigator } from 'react-native';
import { find, isEqual } from 'underscore';

import Conversation from '../messages/Conversation';
import CreateEvent from './CreateEvent';
import CreateEventConfirm from './CreateEventConfirm';
import CreateGroup from './CreateGroup';
import CreateGroupConfirm from './CreateGroupConfirm';
import Event from './Event';
import Group from './Group';
import Groups from './Groups';
import Headers from '../../fixtures/headers';
import Profile from '../profile/Profile';
import { API, DEV } from '../../config';
import { globals } from '../../styles';

class GroupsView extends Component{
  constructor(){
    super();
    this.addGroup = this.addGroup.bind(this);
    this.addUserToGroup = this.addUserToGroup.bind(this);
    this.unsubscribeFromGroup = this.unsubscribeFromGroup.bind(this);
    this.state = {
      groups            : [],
      ready             : false,
      suggestedGroups   : [],
    }
  }
  componentWillMount(){
    this._loadGroups(this.props.currentUser);
  }
  _loadGroups(currentUser){ /* fetch all groups that the current user belongs to */
    let query = {
      members: {
        $elemMatch: { userId: currentUser.id }
      },
      $limit: 10
    };
    fetch(`${API}/groups/?${JSON.stringify(query)}`)
    .then(response => response.json())
    .then(groups => this._loadSuggestedGroups(groups))
    .catch(err => this.ready(err))
    .done();
  }
  ready(err){
    this.setState({ ready: true });
  }
  _loadSuggestedGroups(groups){
    this.setState({ groups, ready: true });
    let query = { /* query groups that the user does not belong to but are nearby */
      id: { $nin: groups.map(group => group.id) },
      'location.city.long_name': this.props.currentUser.location.city.long_name,
      $limit: 4
    };
    fetch(`${API}/groups/?${JSON.stringify(query)}`)
    .then(response => response.json())
    .then(suggestedGroups => {
      console.log('SUGGESTED GROUPS', suggestedGroups)
      this.setState({ suggestedGroups })
    })
    .catch(err => this.ready(err))
    .done();
  }
  unsubscribeFromGroup(group, currentUser){
    let { groups, suggestedGroups } = this.state;
    group.members = group.members.filter(member => member.userId !== currentUser.id);
    groups = groups.filter(g => g.id !== group.id);
    suggestedGroups = [
      ...suggestedGroups, group
    ];
    this.setState({ groups, suggestedGroups })
    this.updateGroup(group);
  }
  addGroup(group){
    console.log('GROUPS VIEW GROUP', group)
    this.setState({
      groups: [
        ...this.state.groups, group
      ]
    })
  }
  updateGroup(group){
    fetch(`${API}/groups/${group.id}`, {
      method: 'PUT',
      headers: Headers,
      body: JSON.stringify(group)
    })
    .then(response => response.json())
    .then(data => {})
    .catch(err => {})
  }
  addUserToGroup(group, currentUser){
    let { groups, suggestedGroups } = this.state;
    let member = {
      userId    : currentUser.id,
      role      : 'member',
      joinedAt  : new Date().valueOf(),
      notifications: {
        email: true
      }
    };
    if (! find(group.members, ({ userId}) => isEqual(userId, currentUser.id))){
      group.members = [ ...group.members, member ];
      groups = [ ...groups, group ];
      suggestedGroups = suggestedGroups.filter(({ id }) => ! isEqual(id, group.id));
      this.setState({ groups, suggestedGroups })
      this.updateGroup(group);
    }
  }

  render(){
    return (
      <Navigator
        style={globals.flex}
        initialRoute={{ name: 'Groups' }}
        renderScene={(route, navigator) => {
          switch(route.name){
            case 'Groups':
              return (
                <Groups
                  {...route}
                  {...this.props}
                  {...this.state}
                  navigator={navigator}
                />
              );
            case 'CreateGroup':
              return (
                <CreateGroup
                  {...this.props}
                  navigator={navigator}
                />
              );
            case 'CreateGroupConfirm':
              return (
                <CreateGroupConfirm
                  {...this.props}
                  {...route}
                  navigator={navigator}
                  addGroup={this.addGroup}
                />
              );
            case 'Event':
              return (
                <Event
                  {...this.props}
                  {...route}
                  navigator={navigator}
                />
            );
            case 'Group':
              return (
                <Group
                  {...this.props}
                  {...route}
                  navigator={navigator}
                  unsubscribeFromGroup={this.unsubscribeFromGroup}
                  addUserToGroup={this.addUserToGroup}
                />
              );
            case 'CreateEvent':
              return (
                <CreateEvent
                  {...this.props}
                  {...route}
                  navigator={navigator}
                />
              );
            case 'CreateEventConfirm':
              return (
                <CreateEventConfirm
                  {...this.props}
                  {...route}
                  navigator={navigator}
                />
              );
            case 'Profile':
              return (
                <Profile
                  {...this.props}
                  {...route}
                  navigator={navigator}
                />
            );
            case 'Conversation':
              return (
                <Conversation
                  {...this.props}
                  {...route}
                  navigator={navigator}
                />
            );
          }
        }}
      />
    );
  }
};

export default GroupsView;
