import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';
import NavigationBar from 'react-native-navbar';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class Login extends Component{
  constructor(props){
    super(props);
    this.loginUser = this.loginUser.bind(this)
    this.state = {
      email           : '',
      password        : '',
      errorMsg        : '',
      sendingData     : false,
    };
  }
  loginUser(){
    console.log('Logging in...');
  }
  render(){
    let { errorMsg } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{ title: 'Login', tintColor: 'white' }}
          tintColor={Colors.brandPrimary}
        />
        <ScrollView
          ref="scrollView"
          keyboardDismissMode="interactive"
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.formContainer}>
          <Text style={styles.h4}>{"Login with your email and password."}</Text>
          <Text style={styles.h4}>Email</Text>
          <View style={styles.formField} ref="email">
            <TextInput
              ref="email"
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => this.refs.passwordField.focus()}
              onChangeText={(text)=> this.setState({email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={140}
              placeholderTextColor='#bbb'
              style={styles.input}
              placeholder="Your email address"
            />
          </View>
          <Text style={styles.h4}>Password</Text>
          <View style={styles.formField} ref="password">
            <TextInput
              ref="passwordField"
              returnKeyType="next"
              onChangeText={(text)=> this.setState({password: text})}
              secureTextEntry={true}
              autoCapitalize="none"
              maxLength={140}
              placeholderTextColor='#bbb' style={styles.input} placeholder="Your password"
            />
          </View>
          <View style={styles.error}>
            <Text>{errorMsg}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity style={Globals.submitButton} onPress={this.loginUser}>
          <Text style={Globals.submitButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

let styles = {
  container: {
    flex: 1,
  },
  backButton: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'transparent',
    paddingBottom: 20,
    paddingTop: 0,
    width: 50,
    height: 50,
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
  error: {
    backgroundColor: Colors.inactive,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '400'
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
  largeInput: {
    color: '#ccc',
    fontSize: 18,
    backgroundColor: 'white',
    fontWeight: '300',
    height: 100,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
}

export default Login;
