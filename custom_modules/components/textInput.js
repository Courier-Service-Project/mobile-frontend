import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import userIcon from '../icons/userIcon.png';
import passwordIcon from '../icons/passwordIcon.png';
import mailIcon from '../icons/mailIcon.png'



const NameInput = props => {
  return (
    <View style={styles.textInputTextContainer}>
      <TextInput
        style={styles.textInputFeild}
        placeholder={props.title}
        placeholderTextColor={'#fff'}
        underlineColorAndroid="transparent"
        onChangeText={text => props.function(text)}
        value={props.value}
      />
      <Image source={userIcon} style={styles.imageStyle} />
    </View>
  );
};

const PasswordInput = props => {
  return (
    <View style={styles.textInputTextContainer}>
      <TextInput
        style={styles.textInputFeild}
        placeholder={props.title}
        secureTextEntry={true}
        placeholderTextColor={'#fff'}
        underlineColorAndroid="transparent"
        onChangeText={text => props.function(text)}
        value={props.value}
      />

      <Image source={passwordIcon} style={styles.imageStyle} />
    </View>
  );
};

const EmailInput = props => {
  return (
    <View style={styles.textInputTextContainer}>
      <TextInput
        style={styles.textInputFeild}
        placeholder={props.title}
        placeholderTextColor={'#fff'}
        underlineColorAndroid="transparent"
        onChangeText={text => props.function(text)}
        value={props.value}
      />

      <Image source={mailIcon} style={styles.imageStyle} />
    </View>
  );
};

export {NameInput, PasswordInput,EmailInput};

const styles = StyleSheet.create({
  textInputFeild: {
    textAlign: 'left',
    backgroundColor: '#82B8BF',
    paddingLeft: 20,
    height: 48,
    width: 200,
    borderRadius: 25,
    fontSize: 20,
    color: '#fff',
    //margin: 20,
  },
  textInputTextContainer: {
    //flex:1,
    marginTop: 25,
    alignSelf: 'center',
    borderRadius: 25,
    height: 48,
    backgroundColor: '#82B8BF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: 300,
  },
  imageStyle: {
    resizeMode: 'contain',
    height: 25,
    width: 25,
  },
});
