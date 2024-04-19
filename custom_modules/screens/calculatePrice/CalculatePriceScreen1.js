import React,{useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import CalculatePrice from '../../styles/CalculatePriceStyles';
import OrderIdView from '../../components/OrderDetails/OrderIdView';
import BackendProcessButton from '../../components/buttons';
import {useNavigation} from '@react-navigation/native';
import OrderHeaderBackArrow from '../../components/OrderHeaderBackArrow';

const CalculatePriceScreen1 = ({route}) => {
  const window = useWindowDimensions();
  const navigation = useNavigation();

  const screenNavigation = () => {
    navigation.navigate('CalculatePriceScreen2',{order_id:order_id});
  };
  const {order_id} = route.params;

  return (
    <View style={{width: window.width, height: window.height}}>
      <View>
        <OrderHeaderBackArrow
          prevScreen={'OrderDetailsScreen'}
          order_id={order_id}
        />
      </View>
      <ScrollView>
        <View>
          <OrderIdView order_id={order_id} />
        </View>
        <View style={{marginTop: 25}}>
          <View style={CalculatePrice.calculatePriceView}>
            <View style={CalculatePrice.ItemView}>
              <View style={CalculatePrice.insideView}>
                <View style={CalculatePrice.insideTitleTextView}>
                  <Text style={CalculatePrice.insideTitleText}>Order Type</Text>
                </View>
                <View style={CalculatePrice.insideValueView}>
                  <Text style={CalculatePrice.insideValueText}>Emergency</Text>
                </View>
              </View>
            </View>

            <View style={CalculatePrice.ItemView}>
              <View style={CalculatePrice.insideView}>
                <View style={CalculatePrice.insideTitleTextView}>
                  <Text style={CalculatePrice.insideTitleText}>Distance</Text>
                </View>
                <View style={CalculatePrice.insideValueView}>
                  <Text style={CalculatePrice.insideValueText}>25Km</Text>
                </View>
              </View>
            </View>

            <View style={CalculatePrice.ItemView}>
              <View style={CalculatePrice.insideView}>
                <TextInput
                  style={CalculatePrice.inputText}
                  placeholder="Enter Weight in grams"
                  placeholderTextColor={'#044B55'}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={{marginTop: 30}}>
              <BackendProcessButton
                title={'Calculate Price'}
                function={screenNavigation}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CalculatePriceScreen1;
