import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet
} from 'react-native';

import Calendar from './Calendar';
import Event from '../groups/Event';
import { API, DEV } from '../../config';

class CalendarView extends Component{
  constructor(){
    super();
    this.state = {
      events: [],
      ready: false,
    }
  }
  componentDidMount(){
    let { currentUser } = this.props;
    let groupsQuery = {
      members: {
        $elemMatch: {
          userId: currentUser.id
        }
      }
    };
    fetch(`${API}/groups?${JSON.stringify(groupsQuery)}`)
    .then(response => response.json())
    .then(groups => {
      let eventsQuery = {
        $or: [
          { groupId: { $in: groups.map(g => g.id) }, start: { $gt: new Date().valueOf() } },
          {  going: { $elemMatch: { $eq: currentUser.id }}, start: { $gt: new Date().valueOf() } },
          { 'location.city.long_name': currentUser.location.city.long_name, start: { $gt: new Date().valueOf() } }
        ]
      }
      fetch(`${API}/events?${JSON.stringify(eventsQuery)}`)
      .then(response => response.json())
      .then(events => {
        console.log('EVENTS', events);
        this.setState({ events, ready: true })
      })
      .catch(err => {
        console.log('FETCH EVENTS ERROR: ', err)
        this.setState({ ready: true })
      })
      .done()
    })
    .catch(err => console.log('FETCH GROUPS ERROR: ', err))
    .done();
  }
  render(){
    return (
      <Navigator
        initialRoute={{ name: 'Calendar' }}
        style={styles.container}
        renderScene={(route, navigator) => {
          switch(route.name){
            case 'Calendar':
              return (
                <Calendar
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
});

export default CalendarView;
