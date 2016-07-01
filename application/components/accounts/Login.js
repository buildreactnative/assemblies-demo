import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

class Login extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Text>LOGIN</Text>
      </View>
    )
  }
}

let styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default Login;
