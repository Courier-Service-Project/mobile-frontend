import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const OrderIdView = (props) => {
  return (
    <View>
      <Text style={Styles.orderText}>Order details</Text>
      <View style={Styles.orderIdView}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={Styles.idText}>Order ID   : </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={Styles.idText}>{props.order_id}</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderIdView;

const Styles = StyleSheet.create({
    orderText: {
        fontSize: 30,
        fontWeight: '700',
        marginHorizontal: 40,
        color: '#044B55',
        marginTop: 25,
      },
      orderIdView: {
        backgroundColor: '#B9DADA',
        width: '80%',
        height: 55,
        borderRadius: 15,
        // alignItems:'center',
        // justifyContent:'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        margin: 20,
      },
      idText: {
        fontSize: 24,
        fontWeight: '700',
        // alignSelf:'center',
        color: '#044B55',
      },
})
