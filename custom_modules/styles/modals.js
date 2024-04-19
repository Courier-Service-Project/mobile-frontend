import React from 'react';
import {StyleSheet} from 'react-native';

const modalStyle = StyleSheet.create({
  
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D8FDFB',
  },
  circle:{
    height:200,
    width:200,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:100,
    alignSelf:"center",
    backgroundColor:"#128f87"
  },
  modalTextContainer: {
    backgroundColor: '#D8FDFB',
  },
  subText: {
    marginTop:50,
    fontSize: 23,
    alignSelf: 'center',
    color: 'black',
  },
  mainText: {
    color: '#044B55',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 25,
    alignSelf:'center'
  },
  button:{
    marginTop:50
  }
});

export default modalStyle;
