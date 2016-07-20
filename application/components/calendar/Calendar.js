import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { uniq, flatten } from 'underscore';

import Loading from '../utilities/Loading';

let { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const EmptyList = ({ ready }) => {
  if (! ready ) { return <Loading /> }
  return (
    <View style={styles.emptyList}>
      <Text style={styles.emptyListText}>
        No events scheduled. Explore groups in the groups tab or create your own to start an event.
      </Text>
    </View>
  );
};

class EventList extends Component{
  constructor(props){
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.visitEvent = this.visitEvent.bind(this);
    this.state = {
      dataSource: this.loadData(props.events)
    };
  }
  loadData(events){
    let dataBlob = {};
    let dates = uniq(events.map(evt => new Date(evt.start).toLocaleDateString()));
    let sections = dates.map((date, id) => ({
      date: new Date(date),
      id: id,
      events: events.filter(event => new Date(event.start).toLocaleDateString() === date)
    }));
    let sectionIDs = sections.map((section, id) => id);
    let rowIDs = sectionIDs.map(sectionID => sections[sectionID].events.map((e, id) => id));

    sections.forEach(section => {
      dataBlob[section.id] = section.date;
      section.events.forEach((event, rowID) => {
        dataBlob[`${section.id}:${rowID}`] = event;
      });
    });

    return new ListView.DataSource({
      getSectionData: (dataBlob, sectionID) => dataBlob[sectionID],
      getRowData: (dataBlob, sectionID, rowID) => dataBlob[`${sectionID}:${rowID}`],
      rowHasChanged: (r1, r2) => r1 != r2,
      sectionHeaderHasChanged: (s1, s2) => s1 != s2
    })
    .cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
  }
  visitEvent(event){
    this.props.navigator.push({
      name: 'Event',
      event
    })
  }
  renderRow(event, sectionID, rowID){
    let { currentUser } = this.props;
    let isGoing = event.going.indexOf(currentUser.id) !== -1;
    return (
      <TouchableOpacity style={styles.rowContainer} onPress={() => this.visitEvent(event)}>
        <View style={styles.row}>
          <View style={styles.textRow}>
            <Text style={styles.subjectText}>{event.name}</Text>
            <Text style={styles.going}> {event.going.length} going</Text>
            { isGoing && <Text style={styles.attending}><Icon name="ios-checkmark" color={Colors.brandSuccess}/> Yes</Text> }
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{moment(event.start).format('h:mm a')}</Text>
          <Icon style={styles.icon} name="ios-arrow-forward" size={25} color={Colors.bodyTextLight}/>
        </View>
      </TouchableOpacity>
    )
  }
  renderSectionHeader(sectionData, sectionID){
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{moment(sectionData).format('dddd MMM Do')}</Text>
      </View>
    )
  }
  render(){
    return (
      <ListView
        enableEmptySectionHeaders={true}
        style={styles.listview}
        contentInset={{ bottom: 49 }}
        automaticallyAdjustContentInsets={false}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
      />
    )
  }
}

class Calendar extends Component{
  render(){
    let titleConfig = { title: 'Calendar ', tintColor: 'white' };
    let { events, ready } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          tintColor={Colors.brandPrimary}
          title={titleConfig}
        />
        { events && events.length ? <EventList events={events} {...this.props}/> : <EmptyList ready={ready} /> }
      </View>
    )
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: deviceWidth / 8,
  },
  emptyListText: {
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center'
  },
  sectionHeader: {
    backgroundColor: Colors.inactive,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7',
  },
  sectionHeaderText: {
    color: Colors.brandPrimaryDark,
    fontSize: 18,
    fontWeight: '300',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    paddingVertical: 15,
    borderBottomColor: Colors.inactive,
    marginHorizontal: 8,
  },
  attending: {
    color: Colors.brandSuccess,
    fontSize: 12,
    fontWeight: '300',
    paddingHorizontal: 4,
  },
  group: {
    opacity: 0.9,
    flex: 1,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  groupImage: {
    height: 30,
    borderRadius: 15,
    width: 30,
    margin: 10,
    opacity: 0.8,
  },
  row: {
    flex: 1,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  going: {
    fontSize: 12,
    fontWeight: '300',
    paddingHorizontal: 5,
  },
  subjectText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '300',
  },
  icon: {
    marginLeft: 15,
    marginTop: 5,
  },
  timeLink: {},
  timeLinkText: {},
  messageText: {
    fontStyle: 'italic',
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '300',
    paddingVertical: 8,
  },
});

export default Calendar;
