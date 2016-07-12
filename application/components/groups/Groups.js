import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Colors from '../../styles/colors';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const Loading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size='large'/>
  </View>
)
const AddGroupBox = ({ navigator }) => (
  <TouchableOpacity
    onPress={()=> {
      navigator.push({ name: 'CreateGroup' })
    }}
    style={styles.groupImage}>
    <View style={[styles.group, {backgroundColor: Colors.inactive,}]} >
      <Icon name="add-circle" size={60} color={Colors.brandPrimary} />
    </View>
  </TouchableOpacity>
);

const GroupBox = ({ group }) => (
  <View></View>
);

const EmptyGroupBox = () => (
  <View style={styles.groupsContainer}>
    <View style={styles.groupImage}>
      <View style={[styles.group, {backgroundColor: Colors.inactive,}]} />
    </View>
  </View>
);

const EmptyGroupBoxes = ({ navigator }) => (
  <View style={styles.assemblyBoxContainer}>
    <View style={styles.groupsContainer}>
      <AddGroupBox navigator={navigator}/>
      <EmptyGroupBox />
    </View>
  </View>
);

const EmptySuggestedGroupBoxes = () => (
  <View style={styles.assemblyBoxContainer}>
    <View style={styles.groupsContainer}>
      <EmptyGroupBox />
      <EmptyGroupBox />
    </View>
  </View>
)

const GroupBoxes = ({ groups, navigator }) => (
  <View style={{justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
    {groups.map((group, idx) => {
      if (!group) { return <EmptyGroupBox key={idx}/>}
      return (
        <TouchableOpacity
          key={idx}
          style={styles.groupsContainer}
          onPress={() => navigator.push({
            name: 'Group',
            group
          })}
        >
          <Image source={{uri: group.image}} style={styles.groupImage}>
            <View style={[styles.group, {backgroundColor: group.color,}]} >
              <Text style={styles.groupText}>{group.name}</Text>
            </View>
          </Image>
        </TouchableOpacity>
      )
    })}
  </View>
);

const SuggestedGroupBoxes = ({ groups }) => (
  <View>
    {groups.map((group, idx) => (
      <View key={idx} style={styles.groupsContainer}>
        <Image source={{uri: group.image}} style={styles.groupImage}>
          <View style={[styles.group, {backgroundColor: group.color,}]} >
            <Text style={styles.groupText}>{group.name}</Text>
          </View>
        </Image>
      </View>
    ))}
  </View>
);

class Groups extends Component{
  constructor(){
    super();
    this._renderAddButton = this._renderAddButton.bind(this);
  }
  _renderAddButton(){
    return (
      <TouchableOpacity style={styles.navButton} onPress={()=>{
        this.props.navigator.push({
          name: 'CreateGroup'
        })
      }}>
        <Icon name="add-circle" size={25} color="#ccc" />
      </TouchableOpacity>
    )
  }
  render(){
    let { groups, suggestedGroups, ready, navigator } = this.props;
    if (! ready ) { return <Loading /> }
    if (groups.length % 2 === 1){
      groups = groups.concat(null);
    }
    let rightButtonConfig = this._renderAddButton()
    let titleConfig = {title: 'My Groups', tintColor: 'white'}
    return (
      <View style={styles.container}>
        <NavigationBar
          statusBar={{style: 'light-content', hidden: false}}
          title={titleConfig}
          tintColor={Colors.brandPrimary}
          rightButton={rightButtonConfig}
        />
        <ScrollView style={styles.assembliesContainer}>
          <Text style={styles.h2}>Your Assemblies</Text>
          {groups.length ? <GroupBoxes groups={groups} navigator={navigator}/> : <EmptyGroupBoxes navigator={navigator}/>}
          <Text style={styles.h2}>You Might Like</Text>
          {suggestedGroups.length ? <SuggestedGroupBoxes groups={suggestedGroups} /> : <EmptySuggestedGroupBoxes />}
        </ScrollView>
      </View>
    )
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  h2: {
    fontSize: 20,
    fontWeight: '400',
    paddingHorizontal: 10,
    color: Colors.bodyText,
  },
  group: {
    opacity: 0.9,
    flex: 1,
    padding: 15,
    height: (deviceWidth / 2) - 25,
    width: (deviceWidth / 2) - 25,
  },
  groupsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  groupImage: {
    height: (deviceWidth / 2) - 25,
    width: (deviceWidth / 2) - 25,
    opacity: 0.8,
    margin: 5,
  },
  navButton: {
    padding: 10,
  },
  groupText: {
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Groups;
