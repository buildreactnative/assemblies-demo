import Colors from './colors';
import { Dimensions, StyleSheet } from 'react-native';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

export const autocompleteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInputContainer: {
    backgroundColor: 'white',
    height: 44,
    borderTopColor: 'white',
    borderBottomColor: 'white',
  },
  textInput: {
    backgroundColor: 'white',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 18,
  },
  poweredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.inactive,
  },
  powered: {
    marginTop: 15,
  },
  listView: {
    flex: 1,
  },
  row: {
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 1,
    backgroundColor: 'white',
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  }
});

export const landingStyles = StyleSheet.create({
  container: {
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  loginButton: {
    bottom: 80,
  },
  backgroundImage: {
    height: deviceHeight,
    width: deviceWidth
  },
  logo: {
    height: 90,
    width: 90
  },

});

export const formStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.inactive,
    flex: 1,
    paddingVertical: 15
  },
  h3: {
    fontWeight: '400',
    fontSize: 22,
    textAlign: 'center',
    color: Colors.copyMedium,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  h4: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.copyDark,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  h5: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },
  errorContainer: {
    paddingHorizontal: 15,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '300',
    color: Colors.red
  },

  formField: {
    backgroundColor: 'white',
    height: 50,
    paddingTop: 5,
    marginBottom: 10,
  },
  input: {
    color: Colors.copyMedium,
    fontSize: 18,
    fontWeight: '300',
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.brandPrimary,
    height: 70,
  }
})

export const globals = StyleSheet.create({
  flex: {
    flex: 1
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  lightText: {
    color: 'white'
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
  },
  h4: {
    fontSize: 20
  },
  mt1: {
    marginTop: 10
  },
  mb1: {
    marginBottom: 10
  },
  mx1: {
    marginHorizontal: 10
  },
  mv1: {
    marginVertical: 10
  },
  mb2: {
    marginBottom: 20
  },
  button: {
    height: 80,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.brandPrimary
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  largeButtonText: {
    fontSize: 24,
    fontWeight: '400',
    color: 'white'
  },
  brandPrimary: {
    backgroundColor: Colors.brandPrimary
  },
  primaryText: {
    color: Colors.brandPrimary
  },
  inactive: {
    backgroundColor: Colors.inactive
  }
});
