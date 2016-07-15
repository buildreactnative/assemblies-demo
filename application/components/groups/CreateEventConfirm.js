import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  DatePickerIOS,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Picker from 'react-native-picker';
import Colors from '../../styles/colors';
import Globals from '../../styles/globals';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { extend, find, range } from 'underscore';
import { autocompleteStyles } from '../accounts/Register';
import LeftButton from '../accounts/LeftButton';
import moment from 'moment';
import Config from 'react-native-config';
import { API, DEV } from '../../config';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class CreateEvent extends Component{
  constructor(){
    super();
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      start: new Date(),
      showStartModal: false,
      showEndModal: false,
      end: new Date(),
      description: '',
      finalStart: new Date(),
      finalEnd: new Date(),
      errorMsg: ''
    };
  }
  submitForm(){
    /* TODO: submit form */
    let { finalStart, finalEnd, description } = this.state;
    let { group, eventName, location, capacity, currentUser, navigator } = this.props;
    let event = {
      start: finalStart.valueOf(),
      end: finalEnd.valueOf(),
      description,
      createdAt: new Date().valueOf(),
      groupId: group.id,
      name: eventName,
      location: location || {},
      capacity,
      going: [ currentUser.id ]
    };
    fetch(`${API}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    })
    .then(response => response.json())
    .then(data => navigator.push({ name: 'Group', group }))
    .catch(err => this.setState({ errorMsg: err.reason }))
    .done();
  }
  render(){
    let { navigator } = this.props;
    let { start, end, finalStart, finalEnd, showStartModal, showEndModal, description, errorMsg } = this.state;
    let titleConfig = {title: 'Confirm Event', tintColor: 'white'};
    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          tintColor={Colors.brandPrimary}
          leftButton={<LeftButton handlePress={() => navigator.pop()}/>}
        />
        <ScrollView style={styles.formContainer} contentContainerStyle={styles.scrollViewContainer}>
          <Text style={styles.h4}>{"* When does the event start?"}</Text>
          <View style={styles.formField}>
            <TouchableOpacity style={styles.pickerButton} onPress={() => this.setState({ showStartModal: ! showStartModal })}>
              <Text style={styles.input}>{finalStart ? moment(finalStart).format('dddd MMM Do, h:mm a') : 'Choose a starting time'}</Text>
              <Icon name="ios-arrow-forward" color='#777' size={30} style={{marginRight: 15}}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.h4}>* When does the event end?</Text>
          <View style={styles.formField}>
            <TouchableOpacity style={styles.pickerButton} onPress={() => this.setState({ showEndModal: ! showEndModal })}>
              <Text style={styles.input}>{finalEnd ? moment(finalEnd).format('dddd MMM Do, h:mm a') : 'Choose an ending time'}</Text>
              <Icon name="ios-arrow-forward" color='#777' size={30} style={{marginRight: 15}}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.h4}>Leave a note for your attendees</Text>
          <TextInput
            ref="summary"
            returnKeyType="next"
            blurOnSubmit={true}
            clearButtonMode='always'
            onChangeText={(text)=> this.setState({ description: text })}
            placeholderTextColor='#bbb'
            style={styles.largeInput}
            multiline={true}
            placeholder="Type a summary of the event..."
          />
          <View style={styles.error}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={this.submitForm}
          style={[Globals.submitButton, {marginBottom: 50}]}>
          <Text style={Globals.submitButtonText}>Save</Text>
        </TouchableOpacity>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={showStartModal}
          onRequestClose={() => this.setState({ showStartModal: false, finalStart: this.state.start })}
          >
         <View style={styles.modal}>
           <View style={styles.datepicker}>
             <DatePickerIOS
               date={this.state.start}
               minimumDate={new Date()}
               minuteInterval={15}
               mode='datetime'
               onDateChange={(date) => this.setState({ start: date })}
             />
             <View style={styles.btnGroup}>
               <TouchableOpacity
                 style={styles.pickerBtn}
                 onPress={() => this.setState({ showStartModal: false })}
                 >
                 <Text style={styles.btnText}>Cancel</Text>
               </TouchableOpacity>
               <TouchableOpacity
                 style={[styles.pickerBtn, styles.btnPrimary]}
                 onPress={() => this.setState({ showStartModal: false, finalStart: this.state.start })}
                 >
                 <Text style={[styles.btnText, { color: 'white' }]}>Save</Text>
               </TouchableOpacity>
             </View>
           </View>

         </View>
        </Modal>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={showEndModal}
          onRequestClose={() => this.setState({ showEndModal: false, finalEnd: this.state.end })}
          >
         <View style={styles.modal}>
           <View style={styles.datepicker}>
             <DatePickerIOS
               date={this.state.end}
               minimumDate={new Date()}
               minuteInterval={15}
               mode='datetime'
               onDateChange={(date) => this.setState({ end: date })}
             />
             <View style={styles.btnGroup}>
               <TouchableOpacity
                 style={styles.pickerBtn}
                 onPress={() => this.setState({ showEndModal: false })}
                 >
                 <Text style={styles.btnText}>Cancel</Text>
               </TouchableOpacity>
               <TouchableOpacity
                 style={[styles.pickerBtn, styles.btnPrimary]}
                 onPress={() => this.setState({ showEndModal: false, finalEnd: this.state.end })}
                 >
                 <Text style={[styles.btnText, { color: 'white' }]}>Save</Text>
               </TouchableOpacity>
             </View>
           </View>

         </View>
        </Modal>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  datepicker: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 3,
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 15,
  },
  btnPrimary: {
    backgroundColor: Colors.brandPrimary,
  },
  pickerBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: Colors.inactive,
    marginHorizontal: 5
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
  error: {
    backgroundColor: Colors.inactive,
    paddingHorizontal: 15,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '300',
    color: 'red'
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

export default CreateEvent;
