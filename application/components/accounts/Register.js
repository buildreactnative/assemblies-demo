import _ from 'underscore';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import KeyboardSpacer from 'react-native-keyboard-spacer';
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

import Colors from '../../styles/colors';
import Globals from '../../styles/globals';
import LeftButton from './LeftButton';
import {DEV} from '../../config';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');


class Register extends Component{
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      location: null
    }
  }
  render(){
    let { navigator } = this.props;
    let titleConfig = { title: 'Create Account', tintColor: 'white' };
    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          tintColor={Colors.brandPrimary}
          leftButton={<LeftButton handlePress={() => navigator.pop()}/>}
        />
        <ScrollView style={styles.formContainer}>
          <TouchableOpacity onPress={()=> navigator.push({ name: 'Login' })}>
            <Text style={styles.h5}>
              Already have an account? <Text style={styles.technologyList}>Login</Text>
            </Text>
          </TouchableOpacity>
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
              getDefaultValue={() => {return '';}}
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
              onSubmitEditing={() => this.refs.passwordField.focus()}
              onChangeText={(text) => this.setState({email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={144}
              placeholderTextColor='#bbb'
              style={styles.input}
              placeholder="Your email address"
            />
          </View>
          <Text style={styles.h4}>* Password</Text>

          <View style={styles.formField} ref="password">
            <TextInput
              ref="passwordField"
              returnKeyType="next"
              onSubmitEditing={() => this.refs.firstNameField.focus()}
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry={true}
              autoCapitalize="none"
              maxLength={20}
              placeholderTextColor='#bbb'
              style={styles.input}
              placeholder="Your password"
            />
          </View>
          <Text style={styles.h4}>* First Name</Text>
          <View style={styles.formField} ref="firstName">
            <TextInput
              ref="firstNameField"
              returnKeyType="next"
              onSubmitEditing={() => this.refs.lastNameField.focus()}
              maxLength={20}
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
              style={styles.input}
              placeholder="Your last name"
            />
         </View>
        </ScrollView>
        <TouchableOpacity style={Globals.submitButton} onPress={()=>{
          this.props.navigator.push({
            name: 'RegisterConfirm',
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            location: this.state.location,
          })
        }}>
          <Text style={Globals.submitButtonText}>Next</Text>
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

export const autocompleteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInputContainer: {
    backgroundColor: 'white',
    height: 44,
    borderTopColor: 'white',
    borderBottomColor: 'white',
  },
  textInput: {
    backgroundColor: 'white',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 18,
  },
  poweredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.inactive,
  },
  powered: {
    marginTop: 15,
  },
  listView: {
    // flex: 1,
  },
  row: {
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 1,
    backgroundColor: 'white',
  },
  description: {
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  androidLoader: {
    marginRight: -15,
  },
});

export default Register;
