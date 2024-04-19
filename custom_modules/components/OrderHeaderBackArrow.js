import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import backArrow from '../icons/backArrow.png';
import {useNavigation} from '@react-navigation/native';

const OrderHeaderBackArrow = props => {
  const navigation = useNavigation();
  console.log(props.prevScreen);
  const navigationScreen = () => {
    navigation.navigate(props.prevScreen,{order_id:props.order_id});
  };

  return (
    <View style={style.headerConatiner}>
      <TouchableOpacity onPress={navigationScreen}>
        <Image source={backArrow} style={style.headerArrow} />
      </TouchableOpacity>
      <Text style={style.headerText}>XPress</Text>
    </View>
  );
};

export default OrderHeaderBackArrow;

const style = StyleSheet.create({
  headerConatiner: {
    height: 55,
    backgroundColor: '#128F87',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    marginRight: 20,
    fontSize: 18,
    color: '#fff',
    fontWeight: '800',
  },
  headerArrow: {
    width: 24,
    height: 24,
    marginLeft: 20,
  },
});
