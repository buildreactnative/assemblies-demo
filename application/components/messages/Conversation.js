import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';
import NavigationBar from 'react-native-navbar';
import LeftButton from '../accounts/LeftButton';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import moment from 'moment';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { DEV, API } from '../../config';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const Message = ({ user, message, navigator }) => {
  return (
    <View style={messageStyles.container}>
      <TouchableOpacity>
        <Image
          style={messageStyles.icon}
          source={{uri: user.avatar? user.avatar : DefaultAvatar }}
        />
      </TouchableOpacity>
      <View style={messageStyles.messageBox}>
        <View style={messageStyles.row}>
          <Text style={messageStyles.author}>{`${user.firstName} ${user.lastName}`}</Text>
          <Text style={messageStyles.sent}>{moment(new Date(message.createdAt)).fromNow()}</Text>
        </View>
        <View style={messageStyles.messageView}>
          <Text style={messageStyles.messageText}>{message.text}</Text>
        </View>
      </View>
    </View>
  )
};

export default class Conversation extends Component{
  constructor(){
    super();
    this.createMessage = this.createMessage.bind(this);
    this.state = {
      msg: '',
      messages: [{text: 'hello'}]
    }
  }
  _loadMessages(userId){
    let { user, currentUser } = this.props;
    console.log('USER IDS', user.id, currentUser.id);
    let query = {
      "$or": [
        { "senderId": userId, "recipientId": currentUser.id },
        { "recipientId": userId, "senderId": currentUser.id }
      ],
      "$sort": { "createdAt": -1 },
      "$limit": 10
    }
    let url = `${API}/messages?${JSON.stringify(query)}`;
    console.log('URL', url);
    fetch(url)
    .then(response => response.json())
    .then(messages => this.setState({ messages }))
    .catch(err => console.log('ERR:', err))
    .done();
  }
  componentWillReceiveProps({user}){
    if (user.id !== this.props.user.id){
      this._loadMessages(user.id);
    }
  }
  componentWillMount(){
    this._loadMessages(this.props.user.id);
  }
  createMessage(){
    /* TODO: create message */
    let { msg } = this.state;
    let { currentUser, user } = this.props;
    fetch(`${API}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        senderId: currentUser.id,
        recipientId: user.id,
        text: msg,
        createdAt: new Date().valueOf(),
      })
    })
    .then(response => response.json())
    .then(data => this.setState({ msg: '', messages: [ data, ...this.state.messages ]}))
    .catch(err => console.log('ERR:', err))
    .done();
  }
  render(){
    let { user, navigator, currentUser } = this.props;
    let { msg, messages } = this.state;
    let titleConfig = { title: `${user.firstName} ${user.lastName}`, tintColor: 'white' };
    return(
      <View style={styles.container}>
        <NavigationBar
          tintColor={Colors.brandPrimary}
          title={titleConfig}
          leftButton={<LeftButton navigator={navigator}/>}
        />
        <InvertibleScrollView
          inverted={true}
          contentContainerStyle={{paddingTop: 10}}
          ref="scroll">
          {messages.map((msg, idx) => (
            <Message
              message={msg}
              user={msg.senderId === currentUser.id ? currentUser : user}
              key={idx}
              navigator={navigator}
            />
          ))}
        </InvertibleScrollView>

        <View style={styles.inputBox}>
          <TextInput
            multiline={true}
            value={this.state.msg}
            placeholder='Say something...'
            placeholderTextColor={Colors.bodyTextLight}
            onChange={(e) => this.setState({msg: e.nativeEvent.text})}
            style={styles.input}
          />
          <TouchableOpacity
            style={ msg ? styles.buttonActive : styles.buttonInactive }
            underlayColor='#D97573'
            onPress={this.createMessage}>
            <Text style={ msg ? styles.submitButtonText : styles.inactiveButtonText }>Send</Text>
          </TouchableOpacity>
        </View>
        <KeyboardSpacer topSpacing={-50}/>
      </View>
    )
  }
};

let messageStyles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  icon: {
    marginTop: 10,
    marginLeft: 13,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageBox: {
    flex: 1,
    alignItems: 'stretch',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 2,
    marginTop: 10
  },
  messageView: {
    backgroundColor: 'white',
    flex: 1,
    paddingRight: 15
  },
  messageText: {
    fontSize: 16,
    fontWeight: '300',
  },
  author:{
    fontSize: 12,
    fontWeight: '700'
  },
  sent:{
    fontSize: 12,
    fontWeight: '300',
    color: '#9B9B9B',
    marginLeft: 10,
    color: '#9B9B9B',
    fontWeight: '300',
    marginLeft: 10
  }
})

let styles = StyleSheet.create({
  inputBox: {
    marginBottom: 50,
    height: 60,
    left: 0,
    right: 0,
    backgroundColor: '#F3EFEF',
    backgroundColor: Colors.inactive,
    flexDirection: 'row',
  },
  input: {
    height: 40,
    padding: 8,
    flex: 1,
    marginRight: 5,
    fontSize: 14,
    borderColor: '#E0E0E0',
    margin: 10,
    borderColor: '#b4b4b4',
    borderRadius: 8,
    color: Colors.bodyText,
    backgroundColor: 'white',
  },
  buttonActive: {
    flex: 0.4,
    backgroundColor: "#E0514B",
    backgroundColor: Colors.brandPrimary,
    borderRadius: 6,
    justifyContent: 'center',
    margin: 10,
  },
  buttonInactive: {
    flex: 0.4,
    backgroundColor: "#eeeeee",
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 6,
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight,
  },
  sentText:{
    fontSize: 14,
    padding: 10,
    marginRight: 15,
    fontWeight: '300',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  backButtonText: {
    color: 'white',
  },
  fromContainer:{
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fromText:{
    fontSize: 16,
    fontWeight: '500',
  },
  messageTextContainer:{
    flex: 1,
  },
  messageText:{
    fontSize: 18,
    fontWeight: '300',
    paddingHorizontal: 15,
  },
  messageContainer:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile:{
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    height: 70,
    backgroundColor: Colors.brandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
  },
  submitButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  },
  inactiveButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    color: '#999'
  }
});
