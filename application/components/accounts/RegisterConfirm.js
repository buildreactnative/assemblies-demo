import _ from 'underscore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from 'react-native-navbar';
import Dropdown, {
  Select,
  Option,
  OptionList
} from 'react-native-selectme';
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';

import Colors from '../../styles/colors';
import Globals from '../../styles/globals';
import LeftButton from './LeftButton';
import { DEV, API } from '../../config';
import { Technologies, ImageOptions, DefaultAvatar } from '../../fixtures';
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
let ImagePickerManager = require('NativeModules').ImagePickerManager;

export const TechnologyList = ({ technologies, handlePress }) => {
  return (
    <View style={styles.techOuterContainer}>
      {technologies.map((technology, idx) => (
        <TouchableOpacity key={idx} style={styles.techContainer} onPress={() => handlePress(idx)}>
          <Text style={styles.technologyList}>{technology}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
};

export default class RegisterConfirm extends Component{
  constructor(){
    super();
    this.showImagePicker = this.showImagePicker.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.selectTechnology = this.selectTechnology.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.removeTechnology = this.removeTechnology.bind(this);
    this.state = {
      technologies: [],
      avatar: DefaultAvatar,
      errorMsg: ''
    }
  }
  submitForm(){
    let { technologies, avatar } = this.state;
    let { email, password, firstName, lastName, location } = this.props;
    console.log('PROPS', this.props, this.state);
    if (email === ''){
      this.setState({ errorMsg: 'Email not yet set.'});
    } else if (password === ''){
      this.setState({ errorMsg: 'Password not yet set.'});
    } else if (firstName === '') {
      this.setState({ errorMsg :'First name not yet set.'});
    } else if (lastName === ''){
      this.setState({ errorMsg: 'Last name not yet set.'});
    } else if (location === null){
      this.setState({ errorMsg: 'Location not yet set.'})
    } else {
      let userParams = { username: email, password, firstName, lastName, technologies, avatar, location };
      fetch(`${API}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userParams)
      })
      .then(response => response.json())
      .then(data => {
        fetch(`${API}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username: email, password: password})
        })
        .then(response => response.json())
        .then(data => {
          fetch(`${API}/users/me`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Set-Cookie': `sid=${data.id}`
            }
          })
          .then(response => response.json())
          .then(data => {
            this.props.updateUser(data);
            this.props.navigator.push({
              name: 'Dashboard'
            });
          })
          .catch((err) => { console.log('ERROR', err) })
          .done();
        })
        .catch((err) => { console.log('ERROR: ', err) })
        .done();
      })
      .catch((err) => { console.log('ERROR: ', err) })
      .done();
    }
  }
  showImagePicker(){
    ImagePickerManager.showImagePicker(ImageOptions, (response) => {
      if (DEV) {console.log('Response = ', response);}

      if (response.didCancel) {
        if (DEV) {console.log('User cancelled image picker');}
      }
      else if (response.error) {
        if (DEV) {console.log('ImagePickerManager Error: ', response.error);}
      }
      else if (response.customButton) {
        if (DEV) {console.log('User tapped custom button: ', response.customButton);}
      }
      else {
        const source = 'data:image/png;base64,' + response.data;
        if (DEV) {console.log('SRC', source);}
        this.setState({ avatar: source });
      }
    });
  }
  selectTechnology(technology){
    this.setState({ technologies: this.state.technologies.concat(technology)});
  }
  getOptions(){
    return this.refs.optionList;
  }
  removeTechnology(index){
    let { technologies } = this.state;
    this.setState({ technologies: [
      ...technologies.slice(0, index),
      ...technologies.slice(index + 1)
    ]})
  }
  render(){
    let { navigator } = this.props;
    let { technologies, errorMsg } = this.state;
    let titleConfig = {title: 'Confirm Account', tintColor: 'white'};
    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          leftButton={<LeftButton handlePress={() => navigator.pop()}/>}
          tintColor={Colors.brandPrimary}
        />
        <ScrollView ref="scrollView" style={styles.formContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.h4}>{"Select technologies"}</Text>
            <Select
              width={deviceWidth}
              height={55}
              ref="select"
              styleText={optionTextStyles}
              style={selectStyles}
              optionListRef={this.getOptions}
              defaultValue="Add a technology"
              onSelect={this.selectTechnology}>
              {Technologies.map((tech, idx) => (
                <Option styleText={optionTextStyles} key={idx}>
                  {tech}
                </Option>
              ))}
            </Select>
            <OptionList ref="optionList" overlayStyles={overlayStyles}/>
          </View>
          <View>
            { technologies.length ? <TechnologyList technologies={technologies} handlePress={this.removeTechnology}/> : null }
          </View>
          <TouchableOpacity style={styles.addPhotoContainer} onPress={this.showImagePicker}>
            <Icon name="camera" size={30} color={Colors.brandPrimary}/>
            <Text style={styles.photoText}>Add a Profile Photo</Text>
          </TouchableOpacity>
          <View style={{height: 120, alignItems: 'center'}}>
            <Image source={{uri: this.state.avatar}} style={styles.avatar}/>
          </View>
          <View style={styles.error}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity style={Globals.submitButton} onPress={this.submitForm}>
          <Text style={Globals.submitButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    padding: 20,
  },
  technologyList:{
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: Colors.brandPrimary,
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  backButton: {
    paddingLeft: 20,
    backgroundColor: 'transparent',
    paddingBottom: 10,
  },
  formContainer: {
    backgroundColor: Colors.inactive,
    flex: 1,
    paddingTop: 15,
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.brandPrimary,
    height: 80,
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
    marginTop: 15,
    color: 'black',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  formField: {
    backgroundColor: 'white',
    height: 50,
    paddingTop: 5,
    marginBottom: 10,
  },
  techContainer: {
    paddingHorizontal: 2,
    marginHorizontal: 2,
    marginVertical: 4,
  },
  techOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10
  },
  largeFormField: {
    backgroundColor: 'white',
    height: 100,
  },
  addPhotoContainer: {
    backgroundColor: 'white',
    marginVertical: 15,
    marginHorizontal: (deviceWidth - 250) / 2,
    width: 250,
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
    color: '#ccc',
    fontSize: 18,
    fontWeight: '300',
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  largeInput: {
    color: '#777',
    fontSize: 18,
    backgroundColor: 'white',
    fontWeight: '300',
    height: 100,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  formField:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginVertical: 25,
  },
  formName:{
    fontWeight: '300',
    fontSize: 20,
  },
  error: {
    backgroundColor: Colors.inactive,
    paddingHorizontal: 15,
    marginTop: 20
  },
  errorText: {
    fontSize: 16,
    fontWeight: '300',
    color: 'red',
    textAlign: 'center'
  },
});

export const selectStyles = {
  backgroundColor: 'white',
  justifyContent: 'center',
  paddingLeft: 10,
  borderTopWidth: 0,
  borderBottomWidth: 0,
};

export const optionTextStyles = {
  fontSize: 18,
  fontWeight: '300',
}

export const overlayStyles = {
  position: 'relative',
  width: window.width,
  height: window.height,
  flex : 1,
  justifyContent : "flex-start",
  alignItems : "center",
  backgroundColor : "#ffffff",
};
