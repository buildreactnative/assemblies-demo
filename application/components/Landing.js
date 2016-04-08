import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/colors';
import React, {
  View,
  Text,
  StyleSheet,
  Component,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

let { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default class Landing extends Component{
  render(){
    return (
        <View style={styles.container}>
          <View style={styles.backgroundHolder}>
            <Image style={styles.image} source={require('../assets/images/welcome.png')}/>
          </View>
          <View style={styles.logoHolder}>
            <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
            <Text style={styles.title}>assemblies</Text>
            <Text style={styles.subTitle}>Where Developers Connect</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigator.push({
                name: 'Dashboard'
              })
            }}
          >
            <Icon style={styles.icon} name='person' size={36} color='white' />
            <Text style={styles.buttonText}>Go to Dashboard</Text>
          </TouchableOpacity>
        </View>
    )
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  backgroundHolder: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  image: {
    height: deviceHeight,
    width: deviceWidth,
  },
  logoHolder: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  logo: {
    height: 90,
    width: 90,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    paddingBottom: 24,
  },
  subTitle: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    height: 80,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: Colors.brandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: 20,
    left: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});
