import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import NavigationBar from 'react-native-navbar';
import Dropdown, { Select, Option, OptionList } from 'react-native-selectme';
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Image,
} from 'react-native';
import { uniq, extend } from 'underscore';

import Colors from '../../styles/colors';
import Headers from '../../fixtures/headers';
import LeftNavButton from '../shared/LeftNavButton';
import { DEV, API } from '../../config';
import { Technologies, ImageOptions, DefaultAvatar } from '../../fixtures';
import { formStyles, globals, selectStyles, optionTextStyles, overlayStyles } from '../../styles';

const styles = formStyles;

/* Utility function to return an error message unless form is completed */
function setErrorMsg({ email, password, location, firstName, lastName}){
  if (! /@/.test(email)) { return 'Invalid email address'; }
  if (! password.length) { return 'Must set a password.'; }
  if (! location || typeof location !== "object") { return "Must set a valid location."; }
  if (firstName === '') { return 'Must set a first name.' }
  if (lastName === '') { return 'Must set a last name.' }
  return '';
}

/* selected technologies by user */
const TechnologyList = ({ technologies, handlePress }) => (
  <View style={styles.textContainer}>
    {technologies.map((technology, idx) => (
      <TouchableOpacity
        key={idx}
        onPress={() => handlePress(idx)}
        style={styles.technology}
      >
        <Text style={[styles.h6, globals.primaryText]}>{technology}</Text>
      </TouchableOpacity>
    ))}
  </View>
)

class RegisterConfirm extends Component{
  constructor(){
    super();
    this.goBack = this.goBack.bind(this);
    this.removeTechnology = this.removeTechnology.bind(this);
    this.selectTechnology = this.selectTechnology.bind(this);
    this.showImagePicker = this.showImagePicker.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      avatar        : DefaultAvatar,
      errorMsg      : '',
      technologies  : [],
    }
  }
  getUserInfo(sid){ /* use session id to retreive user information and store session id in local storage */
    AsyncStorage.setItem('sid', sid);
    fetch(`${API}/users/me`, { headers: extend(Headers, { 'Set-Cookie': `sid=${sid}`}) })
    .then(response => response.json())
    .then(user => {
      this.props.updateUser(user);
      this.props.navigator.push({
        name: 'Dashboard'
      });
    })
    .catch((err) => {})
    .done();
  }
  loginUser(email, password){ /* email and password based authentication with Deployd */
    fetch(`${API}/users/login`, {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify({username: email, password: password})
    })
    .then(response => response.json())
    .then(data => this.getUserInfo(data.id))
    .catch(err => {})
    .done();
  }
  submitForm(){ /* aggregate user information from <Register/> and <RegisterConfirm/> */
    let errorMsg = setErrorMsg(this.props);
    if (errorMsg !== '') { /* return error if missing information */
      this.setState({ errorMsg: errorMsg}); return;
    }
    let user = {
      avatar: this.state.avatar,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      location: this.props.location,
      password: this.props.password,
      technologies: this.state.technologies,
      username: this.props.email,
    };
    fetch(`${API}/users`, {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(user => {
      this.loginUser(this.props.email, this.props.password);
    })
    .catch(err => {})
    .done();
  }
  showImagePicker(){ /* select image from camera roll for avatar */
    ImagePicker.showImagePicker(ImageOptions, (response) => {
      const avatar = 'data:image/png;base64,' + response.data;
      this.setState({ avatar });
    });
  }
  selectTechnology(technology){
    this.setState({
      technologies: uniq(this.state.technologies.concat(technology))
    });
  }
  removeTechnology(index){
    let { technologies } = this.state;
    this.setState({
      technologies: [
      ...technologies.slice(0, index),
      ...technologies.slice(index + 1)
      ]
    })
  }
  goBack(){
    this.props.navigator.pop();
  }
  render(){
    return (
      <View style={[globals.flex, globals.inactive]}>
        <NavigationBar
          title={{ title: 'Confirm Account', tintColor: 'white' }}
          leftButton={<LeftNavButton handlePress={this.goBack}/>}
          tintColor={Colors.brandPrimary}
        />
        <ScrollView style={styles.container}>
          <View style={globals.flex}>
            <Text style={styles.h4}>{"Select technologies"}</Text>
            <Select
              defaultValue="Add a technology"
              height={55}
              onSelect={this.selectTechnology}
              optionListRef={() => this.options}
              style={selectStyles}
              styleText={optionTextStyles}
              width={deviceWidth}
            >
              {Technologies.map((technology, idx) => (
                <Option styleText={optionTextStyles} key={idx}>
                  {technology}
                </Option>
              ))}
            </Select>
            <OptionList overlayStyles={overlayStyles} ref={(el) => this.options = el }/>
          </View>
          <View>
            <TechnologyList technologies={this.state.technologies} handlePress={this.removeTechnology} />
          </View>
          <TouchableOpacity style={styles.avatarContainer} onPress={this.showImagePicker}>
            <Icon name="camera" size={30} color={Colors.brandPrimary}/>
            <Text style={[styles.h4, globals.primaryText]}>Add a Profile Photo</Text>
          </TouchableOpacity>
          <View style={styles.avatarImageContainer}>
            <Image source={{uri: this.state.avatar}} style={styles.avatarImage}/>
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{this.state.errorMsg}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.submitButton} onPress={this.submitForm}>
          <Text style={globals.largeButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default RegisterConfirm;
