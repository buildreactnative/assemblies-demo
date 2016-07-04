import NavigationBar from 'react-native-navbar';
import Colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { notifications, upcomingEvent } from '../../fixtures';

import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  InteractionManager,
  TouchableOpacity,
  Image,
  Dimensions,
  MapView,
} from 'react-native';

let { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default class ActivityView extends Component{
  constructor(){
    super();
    this.state = {
      ready: false
    }
  }
  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.setState({ ready: true })
    });
  }

  _renderNotification(notification){
    return (
      <View style={styles.notificationsContainer}>
        <View style={{ flex: 1 }}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.seenCircle}/>
            <TouchableOpacity style={styles.subjectTextContainer}>
              <Text style={styles.subjectText}>new {notification.type}</Text>
            </TouchableOpacity>
            <Text>{moment(new Date(new Date(notification.time))).fromNow()}</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{notification.message}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.timeContainer}>
          <Icon name='ios-arrow-forward' color='#777' size={25} />
        </TouchableOpacity>
      </View>
    );
  }
  _renderMapView(){
    const mapRegion = {
      latitude: upcomingEvent.location.lat,
      longitude: upcomingEvent.location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    return (
      <MapView
        style={styles.map}
        region={mapRegion}
        annotations={[{latitude: mapRegion.latitude, longitude: mapRegion.longitude}]}
      />
    )
  }
  _renderMapFiller(){
    return (
      <View style={styles.map} />
    )
  }
  _renderScrollView(){
    let { ready } = this.state;
    return (
      <ScrollView
        contentContainerStyle={styles.scrollView}
        automaticallyAdjustContentInsets={false}
      >
        <View>
          <View style={styles.nextAssemblyContainer}>
            <Text style={styles.bodyText}>Next Assembly: </Text>
            <TouchableOpacity>
              <Text style={styles.eventName}>{upcomingEvent.name}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.dateText}>{moment(new Date(upcomingEvent.start)).format('dddd MMM Do, h:mm a')}</Text>
        </View>
        {ready ? this._renderMapView() : this._renderMapFiller() }
        <View>
          <Text style={styles.bodyText}>Notifications</Text>
          <View style={styles.break}/>
          <View style={styles.notificationsHolder}>
            {notifications.map((n, idx) => {
              return (
                <View key={idx} style={{ flex: 1 }}>
                  {this._renderNotification(n)}
                </View>
              );
            })}
            <View style={styles.emptySpace} />
          </View>
        </View>
      </ScrollView>
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.topTab}>
          <TouchableOpacity style={[
            styles.leftSelectTab,
            styles.selectTab,
            styles.leftActiveTab
          ]}>
            <Text style={styles.activeTabText}>Nearby</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[
            styles.rightSelectTab,
            styles.selectTab,
            styles.rightInactiveTab
          ]}>
            <Text style={styles.inactiveTabText}>Notifications</Text>
          </TouchableOpacity>
        </View>
        {this._renderScrollView()}
      </View>
    );
  }
};

let styles = StyleSheet.create({
  infoIcon: {
    marginHorizontal: 10,
  },
  scrollView: {
    flex: 1,
    paddingBottom: 80,
  },
  topTab: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    paddingTop: 25,
    paddingBottom: 10,
    backgroundColor: Colors.brandPrimary,
  },
  nextAssemblyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventName: {
    color: Colors.brandPrimary,
    fontWeight: '500',
  },
  selectTab:{
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  leftSelectTab: {
    borderRadius: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginLeft: 5,
    borderRightWidth: 0,
  },
  rightSelectTab: {
    borderRadius: 4,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    marginRight: 5,
  },
  leftActiveTab: {
    backgroundColor: 'white',
  },
  leftInactiveTab: {
    backgroundColor: Colors.brandPrimary,
  },
  rightActiveTab: {
    backgroundColor: 'white',
  },
  rightInactiveTab: {
    backgroundColor: Colors.brandPrimary,
  },
  activeTabText: {
    textAlign: 'center',
    color: Colors.brandPrimary,
  },
  inactiveTabText: {
    textAlign: 'center',
    color: 'white',
  },
  map: {
    backgroundColor: Colors.inactive,
        height: (deviceHeight / 3),
        width: deviceWidth
    },
  bodyText: {
    color: Colors.bodyText,
        fontSize: 16,
    fontWeight: '400',
        paddingHorizontal: 15,
    paddingVertical: 10,
  },
  nextEvent: {
    color: Colors.bodyTextLight,
    fontSize: 14,
    fontWeight: '300',
    fontStyle: 'italic',
  },
  dateText: {
    fontSize: 14,
    paddingBottom: 4,
    fontWeight: '300',
    fontStyle: 'italic',
    paddingHorizontal: 15,
    color: Colors.bodyText,
  },
  notificationsHolder:{
    flex: 1,
  },
  break: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 10,
  },
  notificationsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  seenCircle: {
    backgroundColor: Colors.brandPrimary,
    borderRadius: 7.5,
    width: 15,
    height: 15,
    marginHorizontal: 10,
  },
  emptySeen: {
    height: 15,
    width: 15,
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  subjectTextContainer: {
    marginRight: 5,
  },
  subjectText: {
    fontSize: 18,
    fontWeight: '500',
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '300',
    paddingHorizontal: 4,
  },
  timeLink: {
    paddingHorizontal: 10,
  },
  messageContainer: {
    flex: 1,
  },
  messageText: {
    color: 'black',
    marginLeft: 35,
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '300',
  },
});
