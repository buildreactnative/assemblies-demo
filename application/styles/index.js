import Colors from './colors';
import { Dimensions, StyleSheet } from 'react-native';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

export const selectStyles = {
  backgroundColor: 'white',
  borderBottomWidth: 0,
  borderTopWidth: 0,
  justifyContent: 'center',
  paddingLeft: 10,
};

export const optionTextStyles = {
  fontSize: 18,
  fontWeight: '300',
}

export const overlayStyles = {
  alignItems : "center",
  backgroundColor : 'transparent',
  flex : 1,
  height: deviceHeight,
  justifyContent : "flex-start",
  position: 'relative',
  width: deviceWidth,
};

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
    borderRadius: 5,
    fontSize: 18,
    height: 28,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 7.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4.5,
  },
  poweredContainer: {
    alignItems: 'center',
    backgroundColor: Colors.inactive,
    justifyContent: 'center',
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
    color: Colors.copyMedium,
    fontSize: 22,
    fontWeight: '400',
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },
  h4: {
    color: Colors.copyDark,
    fontSize: 20,
    fontWeight: '300',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  h5: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },
  h6: {
    fontSize: 16,
    fontWeight: '400',
  },
  errorContainer: {
    paddingHorizontal: 15,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '300',
    color: Colors.red
  },
  avatarContainer: {
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
  avatarImageContainer: {
    height: 120,
    alignItems: 'center'
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    padding: 20,
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
    alignItems: 'center',
    backgroundColor: Colors.brandPrimary,
    height: 70,
    justifyContent: 'center',
  },
  textContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  technology: {
    marginHorizontal: 4,
    marginVertical: 8,
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
    alignItems: 'center',
    backgroundColor: Colors.brandPrimary,
    bottom: 0,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
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
