import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import Colors from '../../styles/colors';
import Globals from '../../styles/globals';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import LeftButton from '../accounts/LeftButton';
import Config from 'react-native-config';
import _ from 'underscore';
import { autocompleteStyles } from '../accounts/Register';

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class CreateGroup extends Component{
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.state = {
      name: '',
      description: '',
      location: null,
      errorMsg: ''
    }
  }
  handleSubmit(){
    let { name, location, summary } = this.state;
    this.props.navigator.push({
      name        : 'CreateGroupConfirm',
      groupName   : name,
      location,
      summary
    })
  }
  handlePress(data, details){
    this.setState({
      location: _.extend({}, details.geometry.location, {
        city: _.find(details.address_components, (c) => c.types[0] == 'locality'),
        state: _.find(details.address_components, (c) => c.types[0] == 'administrative_area_level_1'),
        county: _.find(details.address_components, (c) => c.types[0] == 'administrative_area_level_2'),
        formattedAddress: details.formatted_address,
      })
    })
  }
  render(){
    let { navigator } = this.props;
    let titleConfig = {title: 'Create Assembly', tintColor: 'white'}
    let leftButtonConfig = <LeftButton navigator={navigator}/>
    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          tintColor={Colors.brandPrimary}
          leftButton={leftButtonConfig}
        />
        <ScrollView
          style={styles.formContainer}
          contentContainerStyle={styles.scrollView}>
          <Text style={styles.h4}>* Name of your assembly</Text>
          <View style={styles.formField}>
            <TextInput
              ref="name"
              returnKeyType="next"
              autofocus={true}
              onChangeText={(text)=> this.setState({name: text})}
              placeholderTextColor='#bbb'
              style={styles.input}
              placeholder="Name of your assembly"
            />
          </View>
          <Text style={styles.h4}>* Where is your group located?</Text>
          <GooglePlacesAutocomplete
            styles={autocompleteStyles}
            placeholder='Your city'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            ref="location"
            fetchDetails={true}
            onPress={this.handlePress}
            getDefaultValue={() => { return ''; }}
            query={{
              key       : Config.GOOGLE_PLACES_API_KEY,
              language  : 'en', // language of the results
              types     : '(cities)', // default: 'geocode'
            }}
            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{}}
            GooglePlacesSearchQuery={{ rankby: 'distance',}}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            predefinedPlaces={[]}
          />
          <Text style={styles.h4}>Who should join and why?</Text>
          <TextInput
            ref="summary"
            returnKeyType="next"
            blurOnSubmit={true}
            clearButtonMode='always'
            onChangeText={(text)=> this.setState({summary: text})}
            placeholderTextColor='#bbb'
            style={styles.largeInput}
            multiline={true}
            placeholder="Type a message to get people interested in your group..."
          />
        </ScrollView>
        <TouchableOpacity
          onPress={this.handleSubmit}
          style={[Globals.submitButton, {marginBottom: 50}]}>
          <Text style={Globals.submitButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  backButton: {
    paddingLeft: 20,
    backgroundColor: 'transparent',
    paddingBottom: 10,
  },
  formContainer: {
    backgroundColor: Colors.inactive,
    flex: 1,
    paddingTop: 25,
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.brandPrimary,
    height: 80,
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '400'
  },
  h4: {
    fontSize: 20,
    fontWeight: '300',
    color: 'black',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  formField: {
    backgroundColor: 'white',
    height: 50,
    paddingTop: 5,
  },
  largeFormField: {
    backgroundColor: 'white',
    height: 100,
  },
  addPhotoContainer: {
    backgroundColor: 'white',
    marginVertical: 15,
    marginHorizontal: (deviceWidth - 200) / 2,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: Colors.brandPrimary
  },
  technologyList:{
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.brandPrimary,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  input: {
    color: '#777',
    fontSize: 18,
    fontWeight: '300',
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  avatar: {
    height: 200,
    width: deviceWidth,
    borderRadius: 3,
    padding: 20,
  },
  largeInput: {
    color: '#777',
    fontSize: 18,
    backgroundColor: 'white',
    fontWeight: '300',
    height: 120,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

export default CreateGroup;
