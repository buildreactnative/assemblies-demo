import _ from 'underscore';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { autocompleteStyles } from '../accounts/Register';

import Colors from '../../styles/colors';
import Globals from '../../styles/globals';
import LeftButton from '../accounts/LeftButton';
import {DEV, API} from '../../config';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class UserSettings extends Component{
  constructor(props){
    super(props);
    this.saveSettings = this.saveSettings.bind(this);
    this.state = {
      location: props.currentUser.location,
      firstName: props.currentUser.firstName,
      lastName: props.currentUser.lastName,
      email: props.currentUser.username,
      errorMsg: '',
    }
  }
  saveSettings(){
    let { location, firstName, lastName, email } = this.state;
    if (typeof location !== 'object' || ! location.city ) {
      this.setState({ errorMsg: 'Must provide valid location.'}); return;
    } else if (firstName === ''){
      this.setState({ errorMsg: 'Must provide a valid first name.'}); return;
    } else if (lastName === '') {
      this.setState({ errorMsg: 'Must provide a valid last name.'}); return;
    } else if (email === ''){
      this.setState({ errorMsg: 'Must provide a valid email address.'}); return;
    }
    fetch(`${API}/users/${this.props.currentUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location, firstName, lastName, email })
    })
    .then(response => response.json())
    .then(data => {
      this.props.updateUser(data);
      this.props.navigator.pop();
    })
    .catch(err => console.log('ERR:', err))
    .done();
  }
  render(){
    let { navigator } = this.props;
    let titleConfig = { title: 'User Settings', tintColor: 'white' };
    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          tintColor={Colors.brandPrimary}
          leftButton={<LeftButton handlePress={() => navigator.pop()}/>}
        />
        <KeyboardAwareScrollView style={styles.formContainer}>
          <Text style={styles.h4}>{"* Where are you looking for assemblies?"}</Text>
          <View ref="location" style={{flex: 1,}}>
            <GooglePlacesAutocomplete
              styles={autocompleteStyles}
              placeholder='Your city'
              minLength={2}
              autoFocus={false}
              fetchDetails={true}
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                if (DEV) {console.log(data);}
                if (DEV) {console.log(details);}
                this.setState({
                  location: _.extend({}, details.geometry.location, {
                    city: _.find(details.address_components, (c) => c.types[0] == 'locality'),
                    state: _.find(details.address_components, (c) => c.types[0] == 'administrative_area_level_1'),
                    county: _.find(details.address_components, (c) => c.types[0] == 'administrative_area_level_2'),
                    formattedAddress: details.formatted_address,
                  })
                });
              }}
              getDefaultValue={() => {return this.state.location.city.long_name;}}
              query={{
                key       :  Config.GOOGLE_PLACES_API_KEY,
                language  : 'en', // language of the results
                types     : '(cities)', // default: 'geocode'
              }}
              currentLocation={false}
              currentLocationLabel="Current location"
              nearbyPlacesAPI='GooglePlacesSearch'
              GoogleReverseGeocodingQuery={{}}
              GooglePlacesSearchQuery={{rankby: 'distance',}}
              filterReverseGeocodingByTypes={['street_address']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              predefinedPlaces={[]}>
            </GooglePlacesAutocomplete>
          </View>

          <Text style={styles.h4}>* Email</Text>

          <View ref="email" style={styles.formField}>
            <TextInput
              ref="emailField"
              returnKeyType="next"
              onChangeText={(text) => this.setState({email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={144}
              value={this.state.email}
              placeholderTextColor='#bbb'
              style={styles.input}
              placeholder="Your email address"
            />
          </View>
          <Text style={styles.h4}>* First Name</Text>
          <View style={styles.formField} ref="firstName">
            <TextInput
              ref="firstNameField"
              returnKeyType="next"
              maxLength={20}
              value={this.state.firstName}
              onChangeText={(text) => this.setState({ firstName: text})}
              placeholderTextColor='#bbb'
              style={styles.input}
              placeholder="Your first name"
            />
          </View>
          <Text style={styles.h4}>* Last name</Text>
          <View style={styles.formField} ref="lastName">
            <TextInput
              returnKeyType="next"
              maxLength={20}
              ref="lastNameField"
              onChangeText={(text) => this.setState({lastName: text})}
              placeholderTextColor='#bbb'
              value={this.state.lastName}
              style={styles.input}
              placeholder="Your last name"
            />
         </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity style={[Globals.submitButton, {marginBottom: 50}]} onPress={this.saveSettings}>
          <Text style={Globals.submitButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    paddingLeft: 20,
    backgroundColor: 'transparent',
    paddingBottom: 10,
  },
  technologyList:{
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.brandPrimary,
    paddingHorizontal: 20,
    marginLeft: 8,
    paddingVertical: 4,
  },
  formContainer: {
    backgroundColor: Colors.inactive,
    flex: 1,
    paddingTop: 15,
  },
  contentContainerStyle: {
    flex: 1,
  },
  h4: {
    fontSize: 20,
    fontWeight: '300',
    color: 'black',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  h5: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 5,
    textAlign: 'center',
  },
  formField: {
    backgroundColor: 'white',
    height: 50,
    paddingTop: 5,
    marginBottom: 10,
  },
  largeFormField: {
    backgroundColor: 'white',
    height: 100,
  },
  addPhotoContainer: {
    backgroundColor: 'white',
    marginVertical: 15,
      marginHorizontal: (deviceWidth - 200) / 2,
    width: 200,
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
  input: {
    color: '#777',
    fontSize: 18,
    fontWeight: '300',
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  pb: {
    paddingBottom: 10,
  },
  largeInput: {
    color: '#ccc',
    fontSize: 18,
    backgroundColor: 'white',
    fontWeight: '300',
    height: 100,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

export default UserSettings;
