import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const BackendProcessButton = props => {
  const title = props.title;
  console.log('button pressed');
  return (
    <TouchableOpacity onPress={props.function}>
      <View style={InputButtons.textInputButton}>
        <Text style={InputButtons.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BackendProcessButton;


const InputButtons = StyleSheet.create({
  textInputButton: {
    height: 48,
    width: 300,
    backgroundColor: '#044B55',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight:"500"
  },
});

