import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Navigator,
} from 'react-native';
import Groups from './Groups';
import CreateGroup from './CreateGroup';
import CreateGroupConfirm from './CreateGroupConfirm';
import Group from './Group';
import { API, DEV } from '../../config';

class GroupsView extends Component{
  constructor(){
    super();
    this.addGroup = this.addGroup.bind(this);
    this.addUserToGroup = this.addUserToGroup.bind(this);
    this.unsubscribeFromGroup = this.unsubscribeFromGroup.bind(this);
    this.state = {
      groups: [],
      suggestedGroups: [],
      ready: false,
    }
  }
  unsubscribeFromGroup(group, currentUser){
    let { groups, suggestedGroups } = this.state;
    group.members = group.members.filter(member => member.userId !== currentUser.id);
    groups = groups.filter(g => g.id !== group.id);
    suggestedGroups = suggestedGroups.concat(group);
    this.setState({ groups, suggestedGroups })
    this.updateGroup(group);
  }
  componentWillMount(){
    this.loadGroups(this.props.currentUser);
  }
  addGroup(group){
    this.setState({ groups: this.state.groups.concat(group)})
  }
  updateGroup(group){
    fetch(`${API}/groups/${group.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(group)
    })
    .then(response => response.json())
    .then(data => console.log('RES', data))
    .catch(err => console.log('ERROR', err))
    .done();
  }
  addUserToGroup(group, currentUser){
    let { groups, suggestedGroups } = this.state;
    let member = {
      userId: currentUser.id,
      role: 'member',
      joinedAt: new Date().valueOf(),
      notifications: {
        email: true
      }
    };
    if (group.members.map(m => m.userId).indexOf(currentUser.id) === -1){
      group.members = group.members.concat(member);
      groups = groups.concat(group);
      suggestedGroups = suggestedGroups.filter(g => g.id !== group.id);
      this.setState({ groups, suggestedGroups })
      this.updateGroup(group);
    }
  }
  loadGroups(currentUser){
    /* TODO: load user groups and suggested groups */
    let query = {
      members: {
        $elemMatch: {
          userId: currentUser.id
        }
      }
    };
    fetch(`${API}/groups/?${JSON.stringify(query)}`)
    .then(response => response.json())
    .then(groups => {
      this.setState({ groups, ready: true });
      let suggestedGroupsQuery = {
        id: { $nin: groups.map(group => group.id) },
        'location.city.long_name': currentUser.location.city.long_name
      };
      fetch(`${API}/groups/?${JSON.stringify(suggestedGroupsQuery)}`)
      .then(response => response.json())
      .then(suggestedGroups => this.setState({ suggestedGroups }))
      .catch(err => { console.log('ERR:', err)})
      .done();
    })
    .catch(err => {
      console.log('ERR:', err);
      this.setState({ ready: true });
    })
    .done();
  }
  render(){
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ name: 'Groups' }}
        renderScene={(route, navigator) => {
          switch(route.name){
            case 'Groups':
              return (
                <Groups {...route} {...this.props} {...this.state} navigator={navigator}/>
              );
            case 'CreateGroup':
              return (
                <CreateGroup {...this.props} navigator={navigator}/>
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
            case 'Group':
              return (
                <Group
                  {...this.props}
                  {...route}
                  navigator={navigator}
                  unsubscribeFromGroup={this.unsubscribeFromGroup}
                  addUserToGroup={this.addUserToGroup}
                />
              )
          }
        }}
      />
    )
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default GroupsView;
