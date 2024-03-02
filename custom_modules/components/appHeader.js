import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const AppHeader = () => {
  return (<View style={style.headerConatiner}>
    <Text style={style.headerText}>XPress</Text>
  </View>);
};

export default AppHeader;

const style = StyleSheet.create({
  headerConatiner: {
    height: 55,
    backgroundColor: '#128F87',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerText: {
    paddingRight: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: '800',
  },
});
