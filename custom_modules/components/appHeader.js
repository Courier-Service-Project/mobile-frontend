import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const AppHeader = () => {
  return (
    <View style={style.headerConatiner}>
      <Text style={style.headerText}>XPress</Text>
    </View>
  );
};

const AppHeaderActivityTab = () => {
  return (
    <View>
      <View style={style.headerConatiner}>
        <Text style={style.headerText}>XPress</Text>
      </View>
      <View style={{backgroundColor: '#ffffff'}}>
        <View style={style.headerBody}>
          <Text style={style.headerBodyText}>Your Activities</Text>
        </View>
      </View>
    </View>
  );
};

export {AppHeader, AppHeaderActivityTab};

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
  headerBody: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  headerBodyText: {
    fontSize: 30,
    color: '#044B55',
    fontWeight: '400',
  },
});
