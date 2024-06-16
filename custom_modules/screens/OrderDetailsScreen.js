import React, {useEffect, useState} from 'react';
import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import AppHeaderBackArrow from '../components/appHeaderBackArrow';
import OrderStyles from '../styles/OrderDetailsScreenStyles';
import {ScrollView} from 'react-native-virtualized-view';
import OrderIdView from '../components/OrderDetails/OrderIdView';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const OrderDetailsScreen = ({route}) => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const {order_id} = route.params;
  const {screen_type} = route.params;

  const [orderDetails, setOrderDetails] = useState();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();

  //navigation for calculate price button
  const calculatePriceNavigation = () => {
    navigation.navigate('CalculatePriceScreen1', {order_id: order_id});
  };

  //navigation for status update button
  const statusUpdateNavigation = () => {
    navigation.navigate('StatusUpdateScreen', {order_id: order_id});
  };

  useEffect(() => {
    setShow(true);
    setMessage('Loading Screen');
    getOrderDetails();
  }, []);

  useEffect(() => {
    setShow(false);
    setMessage('');
  }, [orderDetails]);

  const getOrderDetails = async () => {
    try {
      const result = await axios.get(
        `http://10.10.27.131:9000/api/mobile/orders/getOrderDetails/${order_id}`,
      );
      setOrderDetails(result.data.message[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={{width: window.width, height: window.height}}>
      <View>
        <AppHeaderBackArrow prevScreen={'BottomTabNavigator'} />
      </View>
      <ScrollView>
        <View>
          <OrderIdView order_id={order_id} />
        </View>

        {/*sender details view */}
        <View>
          <View style={{marginHorizontal: 25}}>
            {show == true && <Text>Loading data</Text>}
            <Text style={OrderStyles.senderText}>Sender details</Text>
            {orderDetails && (
              <View style={OrderStyles.senderView}>
                <View style={OrderStyles.insideTextView}>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.titleText}>Name</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.valueText}>
                      {orderDetails.FN} {orderDetails.LN}
                    </Text>
                  </View>
                </View>
                <View style={OrderStyles.insideTextView}>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.titleText}>pickup Address</Text>
                  </View>
                  <View style={{flexDirection: 'column', flex: 1}}>
                    <Text style={OrderStyles.valueText}>
                      {orderDetails.Pickup_StreetNo},
                    </Text>
                    <Text style={OrderStyles.valueText}>
                      {orderDetails.Pickup_Street},
                    </Text>
                    <Text style={OrderStyles.valueText}>
                      {orderDetails.Pickup_City}
                    </Text>
                  </View>
                </View>
                <View style={OrderStyles.insideTextView}>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.titleText}>Pickup District</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.valueText}>
                      {orderDetails.Pickup_District}
                    </Text>
                  </View>
                </View>
                <View style={OrderStyles.insideTextView}>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.titleText}>Home Town</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.valueText}>
                      {orderDetails.Pickup_City}
                    </Text>
                  </View>
                </View>
                <View style={OrderStyles.insideTextView}>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.titleText}>Contact No</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.valueText}>{orderDetails.M}</Text>
                  </View>
                </View>
                <View style={OrderStyles.insideTextView}>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.titleText}>Order Place Date</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.valueText}>{orderDetails.orderPlaceDate}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>

        {/*reciever details view */}
        <View>
          <View style={{marginHorizontal: 25, marginTop: 20}}>
            <Text style={OrderStyles.senderText}>Receiver details</Text>
            {orderDetails && (
              <View style={OrderStyles.senderView}>
                <View style={OrderStyles.insideTextView}>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.titleText}>Name</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.valueText}>
                      {orderDetails.FirstName} {orderDetails.LastName}
                    </Text>
                  </View>
                </View>
                <View style={OrderStyles.insideTextView}>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.titleText}>Delivery Address</Text>
                  </View>
                  <View style={{flexDirection: 'column', flex: 1}}>
                    <Text style={OrderStyles.valueText}>
                      {orderDetails.StreetNo},
                    </Text>
                    <Text style={OrderStyles.valueText}>
                      {orderDetails.Street},
                    </Text>
                    <Text style={OrderStyles.valueText}>
                      {orderDetails.City}
                    </Text>
                  </View>
                </View>
                <View style={OrderStyles.insideTextView}>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.titleText}>Delivery District</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.valueText}>
                      {orderDetails.DiliveryDistrict}
                    </Text>
                  </View>
                </View>
                <View style={OrderStyles.insideTextView}>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.titleText}>Home Town</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.valueText}>
                      {orderDetails.City}
                    </Text>
                  </View>
                </View>
                <View style={OrderStyles.insideTextView}>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.titleText}>Contact No</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={OrderStyles.valueText}>
                      {orderDetails.mobile}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
        {screen_type != 'ps'?
        <View style={OrderStyles.buttonView}>
        <TouchableOpacity
          style={OrderStyles.updateStatusView}
          onPress={statusUpdateNavigation}>
          <Text style={OrderStyles.buttonText}>Update Status</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={OrderStyles.priceButtonView}
          onPress={calculatePriceNavigation}>
          <Text style={OrderStyles.buttonText}>Calculate Price</Text>
        </TouchableOpacity>
      </View>:<Text></Text>
        
      }
        
      </ScrollView>
    </View>
  );
};

export default OrderDetailsScreen;
