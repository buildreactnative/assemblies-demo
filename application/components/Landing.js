import React from 'react-native';
import Dashboard from './Dashboard';

let {
  View,
  Text,
  StyleSheet,
  Component,
  TouchableOpacity,
} = React;

export default class Landing extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>This is Landing</Text>
        <TouchableOpacity onPress={() => {
            this.props.navigator.push({
              title: 'Dashboard',
              component: Dashboard,
            })
          }}>
          <Text>Go to Dashboard</Text>
        </TouchableOpacity>
      </View>
    )
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
  },
});
