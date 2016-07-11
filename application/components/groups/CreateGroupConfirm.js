import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import _ from 'underscore';
import Icon from 'react-native-vector-icons/Ionicons';
import LeftButton from '../accounts/LeftButton';
import NavigationBar from 'react-native-navbar';
import Colors from '../../styles/colors';
import Globals from '../../styles/globals';
import { Technologies, ImageOptions, DefaultAvatar } from '../../fixtures';
import Dropdown, {
  Select,
  Option,
  OptionList
} from 'react-native-selectme';
import { API, DEV } from '../../config';
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
let ImagePickerManager = require('NativeModules').ImagePickerManager;
const SolidColors = ['red','deepPurple','indigo','teal','orange','blueGrey','purple','green'];
const TechnologyList = ({ technologies, handlePress }) => {
  return (
    <View style={styles.techOuterContainer}>
      {technologies.map((technology, idx) => (
        <TouchableOpacity key={idx} style={styles.techContainer} onPress={() => handlePress(technology)}>
          <Text style={styles.technologyList}>{technology}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
};

class CreateGroupConfirm extends Component{
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.showImagePicker = this.showImagePicker.bind(this);
    this.selectTechnology = this.selectTechnology.bind(this);
    this.removeTechnology = this.removeTechnology.bind(this);
    this.state = {
      image: '',
      color: '#3F51B5',
      technologies: [],
      errorMsg: ''
    }
  }
  getOptions(){
    return this.refs.optionList;
  }
  handleSubmit(){
    let { color, image, technologies } = this.state;
    let { name, description, location, updateGroups, navigator } = this.props;
    if (! location ){
      this.setState({ errorMsg: 'You must provide a location.'})
    } else if (! name ){
      this.setState({ errorMsg: 'You must provide a name.'})
    } else if (! description){
      this.setState({ errorMsg: 'You must provide a description.'})
    } else {
      let group = { color, image, technologies, name, description, location };
      fetch(`${API}/groups`, {
        method: 'POST',
        body: JSON.stringify(group)
      })
      .then(response => response.json())
      .then(group => {
        updateGroups(group);
        navigator.push({
          name: 'Group',
          group: group
        })
      })
      .catch(err => console.log('ERR:', err))
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
        // if (DEV) {console.log('SRC', source);}
        this.setState({ image: source });
      }
    });
  }
  selectTechnology(technology){
    this.setState({ technologies: _.uniq(this.state.technologies.concat(technology))})
  }
  removeTechnology(technology){
    this.setState({ technologies: this.state.technologies.filter(tech => tech !== technology)})
  }
  render(){
    let { navigator } = this.props;
    let { technologies, image, color } = this.state;
    let titleConfig = {title: 'Create Assembly', tintColor: 'white'}
    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          tintColor={Colors.brandPrimary}
          leftButton={<LeftButton navigator={navigator}/>}
        />
        <ScrollView
          style={styles.formContainer}>
          <Text style={styles.h4}>{"My technologies"}</Text>
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
          <OptionList ref='optionList' overlayStyles={overlayStyles}/>
          <View>
            { technologies.length ? <TechnologyList technologies={technologies} handlePress={this.removeTechnology}/> : null }
          </View>
          <TouchableOpacity style={styles.addPhotoContainer} onPress={this.showImagePicker.bind(this)}>
            <Icon name="ios-camera" size={30} color={Colors.brandPrimary}/>
            <Text style={styles.photoText}>Add a Photo</Text>
          </TouchableOpacity>
          <View style={{height: 200, alignItems: 'center', backgroundColor: 'black'}}>
            <Image source={image === '' ? require('../../assets/images/welcome.png') : {uri: image}} style={styles.avatar}/>
          </View>
          <Text style={styles.h4}>What background color would you like?</Text>
          <View style={styles.colorContainer}>
            {SolidColors.map((color, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={()=>this.setState({color: Colors[color]})}
                style={[styles.colorBox, {backgroundColor: Colors[color], borderColor: this.state.color == Colors[color] ? Colors.highlight : 'transparent' }]}
              >
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity style={[Globals.submitButton, {marginBottom: 50}]} onPress={this.handleSubmit}>
          <Text style={Globals.submitButtonText}>Create group</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  colorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexWrap: 'wrap'
  },
  colorBox: {
    flex: 1,
    height: (deviceWidth / 4) - 20,
    width: (deviceWidth / 4) - 20,
    margin: 10,
    borderWidth: 4,
  },
  avatar: {
    height: 200,
    width: deviceWidth,
    borderRadius: 3,
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
});

let selectStyles = {
  backgroundColor: 'white',
  justifyContent: 'center',
  paddingLeft: 10,
  borderTopWidth: 0,
  borderBottomWidth: 0,
};

let optionTextStyles = {
  fontSize: 18,
  fontWeight: '300',
}

let overlayStyles = {
  position: 'relative',
  width: window.width,
  height: window.height,
  flex : 1,
  justifyContent : "flex-start",
  alignItems : "center",
  backgroundColor : "#ffffff",
};

export default CreateGroupConfirm;
