import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { find, extend } from 'underscore';

import Colors from '../../styles/colors';
import LeftNavButton from '../shared/LeftNavButton';
import { GooglePlacesCityConfig } from '../../config';
import { globals, autocompleteStyles, formStyles } from '../../styles';

const styles = formStyles;

class CreateGroup extends Component{
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.goBack = this.goBack.bind(this);
    this.state = {
      description   : '',
      errorMsg      : '',
      location      : null,
      name          : '',
    }
  }
  handleSubmit(){
    let { name, location, summary, description } = this.state;
    this.props.navigator.push({
      name        : 'CreateGroupConfirm',
      groupName   : name,
      description,
      location,
      summary,
    })
  }
  handlePress(data, details){
    if ( ! details ) { return; }
    let location = {
      ...details.geometry.location,
      city: find(details.address_components, (c) => c.types[0] === 'locality'),
      state: find(details.address_components, (c) => c.types[0] === 'administrative_area_level_1'),
      county: find(details.address_components, (c) => c.types[0] === 'administrative_area_level_2'),
      formattedAddress: details.formatted_address
    };
    this.setState({ location });
    this.name.focus();
  }
  goBack(){
    this.props.navigator.pop();
  }
  render(){
    let { navigator } = this.props;
    return (
      <View style={[globals.flexContainer, globals.inactive]}>
        <NavigationBar
          title={{ title: 'Create Assembly', tintColor: 'white' }}
          tintColor={Colors.brandPrimary}
          leftButton={<LeftNavButton handlePress={this.goBack}/>}
        />
        <KeyboardAwareScrollView style={styles.formContainer} contentInset={{ bottom: 49}}>
          <Text style={styles.h4}>* Where is your group located?</Text>
          <GooglePlacesAutocomplete
            styles={autocompleteStyles}
            placeholder='Your city'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            fetchDetails={true}
            onPress={this.handlePress}
            getDefaultValue={() => { return ''; }}
            query={GooglePlacesCityConfig}
            currentLocation={false}
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch'
            GoogleReverseGeocodingQuery={{}}
            GooglePlacesSearchQuery={{ rankby: 'distance',}}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
            predefinedPlaces={[]}
          />
          <Text style={styles.h4}>* Name of your assembly</Text>
          <View style={styles.formField}>
            <TextInput
              returnKeyType="next"
              autofocus={true}
              ref={(el) => this.name = el }
              onSubmitEditing={() => this.description.focus()}
              onChangeText={(name) => this.setState({ name })}
              placeholderTextColor='#bbb'
              style={styles.input}
              placeholder="Name of your assembly"
            />
          </View>
          <Text style={styles.h4}>Who should join and why?</Text>
          <TextInput
            ref={(el) => this.description = el }
            returnKeyType="next"
            blurOnSubmit={true}
            clearButtonMode='always'
            onChangeText={(text)=> this.setState({ description: text })}
            placeholderTextColor='#bbb'
            style={styles.largeInput}
            multiline={true}
            placeholder="Type a message to get people interested in your group..."
          />
        </KeyboardAwareScrollView>
        <TouchableOpacity
          onPress={this.handleSubmit}
          style={[styles.submitButton, styles.buttonMargin]}>
          <Text style={globals.largeButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default CreateGroup;
