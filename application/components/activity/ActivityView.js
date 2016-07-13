import React, {
  Component,
} from 'react';

import {
  Dimensions,
  MapView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Colors from '../../styles/colors';
import moment from 'moment';
import { notifications, upcomingEvent } from '../../fixtures/fixtures';

let { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default class ActivityView extends Component{
  _renderScrollView(){
    const mapRegion = {
      latitude: upcomingEvent.location.lat,
      longitude: upcomingEvent.location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
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
        <MapView
          style={styles.map}
          region={mapRegion}
          annotations={[{latitude: mapRegion.latitude, longitude: mapRegion.longitude}]}
        />
      </ScrollView>
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationBar
          title={{ title: 'Activity', tintColor: 'white' }}
          tintColor={Colors.brandPrimary}
        />
        <View style={styles.container}>
          {this._renderScrollView()}
        </View>
      </View>
    );
  }
};

let styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingBottom: 80,
  },
  nextAssemblyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventName: {
    color: Colors.brandPrimary,
    fontWeight: '500',
  },
  map: {
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
});
