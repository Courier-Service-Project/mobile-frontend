import React from 'react';
import {View, Text, useWindowDimensions, ScrollView} from 'react-native';
import CalculatePrice from '../../styles/CalculatePriceStyles';
import OrderIdView from '../../components/OrderDetails/OrderIdView';
import BackendProcessButton from '../../components/buttons';
import {useNavigation} from '@react-navigation/native';
import OrderHeaderBackArrow from '../../components/OrderHeaderBackArrow';

const CalculatePriceScreen2 = ({route}) => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const screenNavigation = () => {
    navigation.navigate('OrderDetailsScreen', {order_id: order_id});
  };
  const {order_id} = route.params;

  return (
    <View style={{width: window.width, height: window.height}}>
      <View>
        <OrderHeaderBackArrow
          prevScreen={'CalculatePriceScreen1'}
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
                  <Text style={CalculatePrice.insideTitleText}>
                    Delivery charge
                  </Text>
                </View>
                <View style={{marginRight: 10}}>
                  <Text style={CalculatePrice.insideTitleText}>RS.3000</Text>
                </View>
              </View>
            </View>

            <View style={CalculatePrice.ItemView}>
              <View style={CalculatePrice.insideView}>
                <View style={CalculatePrice.insideTitleTextView}>
                  <Text style={CalculatePrice.insideTitleText}>
                    Emergency Charge
                  </Text>
                </View>
                <View style={{marginRight: 10}}>
                  <Text style={CalculatePrice.insideTitleText}>RS.1000</Text>
                </View>
              </View>
            </View>

            <View style={CalculatePrice.ItemView}>
              <View style={CalculatePrice.insideView}>
                <View style={CalculatePrice.insideTitleTextView}>
                  <Text style={CalculatePrice.insideTitleText}>
                    Weight charge
                  </Text>
                </View>
                <View style={{marginRight: 10}}>
                  <Text style={CalculatePrice.insideTitleText}>RS.500</Text>
                </View>
              </View>
            </View>

            <View style={CalculatePrice.ItemView}>
              <View style={CalculatePrice.insideView}>
                <View style={CalculatePrice.insideTitleTextView}>
                  <Text style={CalculatePrice.insideTitleText}>
                    Total Price
                  </Text>
                </View>
                <View style={{marginRight: 10}}>
                  <Text style={CalculatePrice.insideTitleText}>RS.4500</Text>
                </View>
              </View>
            </View>

            <View style={{marginTop: 30}}>
              <BackendProcessButton
                title={'Continue'}
                function={screenNavigation}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CalculatePriceScreen2;
