import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet
} from 'react-native';

import Activity from './Activity';
import Event from '../groups/Event';
import { API, DEV } from '../../config';

class ActivityView extends Component{
  constructor(){
    super();
    this.state = {
      notifications: [],
      nextEvents: [],
    }
  }
  componentDidMount(){
    let { currentUser } = this.props;
    let query = {
      participants: {
        $elemMatch: {
          userId: currentUser.id
        }
      }
    };
    fetch(`${API}/notifications?${JSON.stringify(query)}`)
    .then(response => response.json())
    .then(notifications => {
      this.setState({ notifications });
      let eventQuery = {
        $or: [
          {
            $elemMatch: {
              going: currentUser.id
            },
            start: { $gt: new Date().valueOf() }
          },
          {
            'location.city.long_name': currentUser.location.city.long_name,
            start: { $gt: new Date().valueOf() }
          }
        ]
      };
      let sort = {
        sort: { createdAt: 1 },
        limit: 1
      }
      fetch(`${API}/events?${eventQuery}${sort}`)
      .then(response => response.json())
      .then(events => this.setState({ nextEvents: events }))
      .catch(err => console.log('FETCH EVENTS ERROR: ', err))
      .done();
    })
    .catch(err => console.log('FETCH NOTIFICATIONS ERROR: ', err))
    .done();
  }
  render(){
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'Activity'}}
        renderScene={(route, navigator) => {
          switch(route.name){
            case 'Activity':
              return (
                <Activity
                  {...this.props}
                  {...route}
                  {...this.state}
                  navigator={navigator}
                />
            );
            case 'Event':
              return (
                <Event
                  {...this.props}
                  {...route}
                  {...this.state}
                  navigator={navigator}
                />
            );
          }
        }}
      />
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default ActivityView;
