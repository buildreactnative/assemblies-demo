import _ from 'underscore';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import Dropdown, {
  Select,
  Option,
  OptionList
} from 'react-native-selectme';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../styles/colors';
import Globals from '../../styles/globals';
import LeftButton from '../accounts/LeftButton';
import {DEV, API} from '../../config';
import { Technologies } from '../../fixtures';
import { selectStyles, optionTextStyles, overlayStyles, TechnologyList } from '../accounts/RegisterConfirm';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class UserTechnologies extends Component{
  constructor(props){
    super(props);
    this.selectTechnology = this.selectTechnology.bind(this);
    this.removeTechnology = this.removeTechnology.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.state = {
      technologies: props.currentUser.technologies,
      errorMsg: '',
    }
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
  saveSettings(){
    let { technologies } = this.state;
    fetch(`${API}/users/${this.props.currentUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ technologies })
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
    let { technologies } = this.state;
    let titleConfig = { title: 'User Technologies', tintColor: 'white' };
    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          tintColor={Colors.brandPrimary}
          leftButton={<LeftButton handlePress={() => navigator.pop()}/>}
        />
        <KeyboardAwareScrollView style={styles.formContainer}>
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

export default UserTechnologies;
