import React from 'react';
import {StyleSheet} from 'react-native';

const textInputs = StyleSheet.create({
  textInputFeildContainer: {
    backgroundColor: '#D8FDFB',
    width: 344,
    alignSelf: 'center',
    borderRadius: 30,
    padding:20
  },
  textInputFeild: {
    textAlign: 'left',
    backgroundColor: '#82B8BF',
    paddingLeft:20,
    height: 48,
    width: 250,
    borderRadius: 25,
    fontSize: 18,
    color: '#B9DADA',
    margin: 20,
    alignSelf: 'center',
  },
  textInputTextContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textInputButton: {
    height: 40,
    width: 250,
    backgroundColor: '#044B55',
    color: '#fff',
    fontSize: 18,
  },
  textInputError: {
    fontSize: 18,
    color: 'red',
    marginTop: 0,
  },
  textInputWrapper: {
    margin: 10,
  },
  forgotPasswordTextContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 100,
  },
  forgotPasswordText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
  },
});

export default textInputs;
