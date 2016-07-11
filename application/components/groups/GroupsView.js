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
import { API, DEV } from '../../config';

class GroupsView extends Component{
  constructor(){
    super();
    this.state = {
      groups: [],
      suggestedGroups: [],
      ready: false,
    }
  }
  componentWillMount(){
    this.loadGroups(this.props.currentUser);
  }
  loadGroups(currentUser){
    /* TODO: load user groups and suggested groups */
    let query = {
      members: {
        $elemMatch: {
          user_id: currentUser.id
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
                <CreateGroupConfirm {...this.props} {...route} navigator={navigator}/>
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
