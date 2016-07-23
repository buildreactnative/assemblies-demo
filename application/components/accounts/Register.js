import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { extend, find } from 'underscore';

import Colors from '../../styles/colors';
import Globals from '../../styles/globals';
import LeftNavButton from '../shared/LeftNavButton';
import { DEV, GooglePlacesCityConfig } from '../../config';
import { formStyles, autocompleteStyles, globals } from '../../styles';

const styles = formStyles;

class Register extends Component{
  constructor(){
    super();
    this.goBack = this.goBack.bind(this);
    this.visitLogin = this.visitLogin.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email       : '',
      password    : '',
      firstName   : '',
      lastName    : '',
      location    : null
    }
  }
  goBack(){
    this.props.navigator.pop();
  }
  visitLogin(){
    this.props.navigator.push({ name: 'Login' })
  }
  selectLocation(data, details){
    if ( ! details ) { return; }
    let location = {
      ...details.geometry.location,
      city: find(details.address_components, (c) => c.types[0] === 'locality'),
      state: find(details.address_components, (c) => c.types[0] === 'administrative_area_level_1'),
      county: find(details.address_components, (c) => c.types[0] === 'administrative_area_level_2'),
      formattedAddress: details.formatted_address
    };
    this.setState({ location });
  }
  handleSubmit(){
    this.props.navigator.push({
      name: 'RegisterConfirm',
      ...this.state
    })
  }
  render(){
    return (
      <View style={globals.flexContainer}>
        <NavigationBar
          title={{ title: 'Create Account', tintColor: 'white' }}
          tintColor={Colors.brandPrimary}
          leftButton={<LeftNavButton handlePress={this.goBack}/>}
        />
        <KeyboardAwareScrollView style={styles.container}>
          <TouchableOpacity onPress={this.visitLogin}>
            <Text style={styles.h5}>
              Already have an account? <Text style={[styles.h5, globals.primaryText]}>Login</Text>
            </Text>
          </TouchableOpacity>
          <Text style={styles.h4}>* Where are you looking for assemblies?</Text>
          <View style={globals.flex}>
            <GooglePlacesAutocomplete
              styles={autocompleteStyles}
              placeholder='Your city'
              minLength={2}
              autoFocus={false}
              fetchDetails={true}
              onPress={this.selectLocation}
              getDefaultValue={() => {return '';}}
              query={GooglePlacesCityConfig}
              currentLocation={false}
              currentLocationLabel="Current location"
              nearbyPlacesAPI='GooglePlacesSearch'
              GoogleReverseGeocodingQuery={{}}
              GooglePlacesSearchQuery={{rankby: 'distance',}}
              filterReverseGeocodingByTypes={['street_address']}
              predefinedPlaces={[]}>
            </GooglePlacesAutocomplete>
          </View>
          <Text style={styles.h4}>* Email</Text>
          <View style={styles.formField}>
            <TextInput
              returnKeyType="next"
              onSubmitEditing={() => this.password.focus()}
              onChangeText={(email) => this.setState({ email })}
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={144}
              placeholderTextColor={Colors.copyMedium}
              style={styles.input}
              placeholder="Your email address"
            />
          </View>
          <Text style={styles.h4}>* Password</Text>
          <View style={styles.formField}>
            <TextInput
              ref={(el) => this.password = el }
              returnKeyType="next"
              onSubmitEditing={() => this.firstName.focus()}
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry={true}
              autoCapitalize="none"
              maxLength={20}
              placeholderTextColor={Colors.copyMedium}
              style={styles.input}
              placeholder="Your password"
            />
          </View>
          <Text style={styles.h4}>* First Name</Text>
          <View style={styles.formField}>
            <TextInput
              ref={(el) => this.firstName = el }
              returnKeyType="next"
              onSubmitEditing={() => this.lastName.focus()}
              maxLength={20}
              onChangeText={(firstName) => this.setState({ firstName })}
              placeholderTextColor='#bbb'
              style={styles.input}
              placeholder="Your first name"
            />
          </View>
          <Text style={styles.h4}>* Last name</Text>
          <View style={styles.formField}>
            <TextInput
              ref={(el) => this.lastName = el }
              returnKeyType="next"
              maxLength={20}
              onChangeText={(lastName) => this.setState({ lastName })}
              placeholderTextColor='#bbb'
              style={styles.input}
              placeholder="Your last name"
            />
         </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity  style={styles.submitButton} onPress={this.handleSubmit}>
          <Text style={Globals.submitButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Register;
