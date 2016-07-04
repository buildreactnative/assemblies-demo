import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import Colors from '../../styles/colors';
import Globals from '../../styles/globals';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {DEV} from '../../config';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
import LeftButton from './LeftButton';


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
        <NavigationBar title={titleConfig} tintColor={Colors.brandPrimary} leftButton={<LeftButton navigator={navigator}/>} />
        <ScrollView>
        </ScrollView>
      </View>
    )
  }
}

let styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
}

export default Register;
