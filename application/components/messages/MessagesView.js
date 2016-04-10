import NavigationBar from 'react-native-navbar';
import Colors from '../../styles/colors';
import { messages } from '../../fixtures/fixtures';
import Conversation from './Conversation';
import _ from 'underscore';

import React, {
  View,
  Text,
  ListView,
  Component,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class MessagesView extends Component{
  constructor(props){
    super(props);
    let conversations = {};
    messages.forEach((msg) => {
      let key = msg.participants.sort().join('-');
      if (conversations[key]) { conversations[key].push(msg); }
      else { conversations[key] = [msg] }
    });
    let dataBlob = _.keys(conversations)
                    .map((key) => conversations[key]);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      })
      .cloneWithRows(dataBlob)
    };
  }
  _renderRow(rowData){
    return (
      <Conversation conversation={rowData} />
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationBar
          title={{ title: 'Messages', tintColor: 'white' }}
          tintColor={Colors.brandPrimary}
        />
        <ListView 
          dataSource={this.state.dataSource}
          contentInset={{ bottom: 49 }} 
          automaticallyAdjustContentInsets={false}
          ref='messagesList'
          renderRow={this._renderRow.bind(this)}
        />
      </View>
    );
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
