import React from 'react';
import {
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Globals from '../../styles/globals';

const LeftButton = ({ navigator }) => {
  return (
    <TouchableOpacity style={Globals.backButton} onPress={()=>{
      navigator.pop();
    }}>
      <Icon name="ios-arrow-back" size={25} color="#ccc" />
    </TouchableOpacity>
  );
};

export default LeftButton;
