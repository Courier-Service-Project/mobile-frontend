import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import AppHeaderBackArrow from '../components/appHeaderBackArrow';
import OrderStyles from '../styles/OrderDetailsScreenStyles';
import {ScrollView} from 'react-native-virtualized-view';
import OrderIdView from '../components/OrderDetails/OrderIdView';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {ResultModal} from '../components/modals/resultModal';

const OrderDetailsScreen = ({route}) => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const {order_id} = route.params;
  const {screen_type} = route.params;

  const [orderDetails, setOrderDetails] = useState();
  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [resultModal, setResultModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  //navigation for calculate price button
  const calculatePriceNavigation = () => {
    navigation.navigate('CalculatePriceScreen1', {order_id: order_id});
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
    setIsLoading(true);
    try {
      const result = await axios.get(
        `http://10.10.27.131:9000/api/mobile/orders/getOrderDetails/${order_id}`,
      );
      if (result.data.success == 200) {
        setOrderDetails(result.data.message[0]);
      } else if (result.data.success == 101) {
        setModalMessage(result.data.message);
        setResultModal(true);
      } else {
        setModalMessage(result.data.message);
        setResultModal(true);
      }
    } catch (error) {
      setModalMessage(error.message);
      setResultModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{width: window.width, height: window.height}}>
      <View>
        <AppHeaderBackArrow prevScreen={'BottomTabNavigator'} />
      </View>

      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={40} />
          <Text style={{color: '#0A4851', fontSize: 14}}>Loading ...</Text>
        </View>
      ) : (
        <ScrollView style={{marginBottom: 50}}>
          <View>
            <OrderIdView order_id={order_id} />
          </View>

          {/*sender details view */}
          <View>
            <ResultModal
              show={resultModal}
              function={setResultModal}
              message={modalMessage}
            />

            <View style={{marginHorizontal: 25}}>
              <Text style={OrderStyles.senderText}>Sender details</Text>

              {orderDetails && (
                <View style={OrderStyles.senderView}>
                  <View style={OrderStyles.insideTextView}>
                    <View style={{flex: 1}}>
                      <Text style={OrderStyles.titleText}>Name</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={OrderStyles.valueText}>
                        :- {orderDetails.FN}
                      </Text>
                      <Text style={[OrderStyles.valueText, {marginLeft: 10}]}>
                        {orderDetails.LN}
                      </Text>
                    </View>
                  </View>
                  <View style={OrderStyles.insideTextView}>
                    <View style={{flex: 1}}>
                      <Text style={OrderStyles.titleText}>pickup Address</Text>
                    </View>
                    <View style={{flexDirection: 'column', flex: 1}}>
                      <Text style={OrderStyles.valueText}>
                        :- {orderDetails.Pickup_StreetNo},
                      </Text>
                      <Text style={[OrderStyles.valueText, {marginLeft: 15}]}>
                        {orderDetails.Pickup_Street},
                      </Text>
                      <Text style={[OrderStyles.valueText, {marginLeft: 15}]}>
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
                        :- {orderDetails.Pickup_District}
                      </Text>
                    </View>
                  </View>
                  <View style={OrderStyles.insideTextView}>
                    <View style={{flex: 1}}>
                      <Text style={OrderStyles.titleText}>Home Town</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={OrderStyles.valueText}>
                        :- {orderDetails.Pickup_City}
                      </Text>
                    </View>
                  </View>
                  <View style={OrderStyles.insideTextView}>
                    <View style={{flex: 1}}>
                      <Text style={OrderStyles.titleText}>Contact No</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={OrderStyles.valueText}>
                        :- {orderDetails.M}
                      </Text>
                    </View>
                  </View>
                  <View style={OrderStyles.insideTextView}>
                    <View style={{flex: 1}}>
                      <Text style={OrderStyles.titleText}>
                        Order Place Date
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={OrderStyles.valueText}>
                        :-{' '}
                        {new Date(
                          orderDetails.orderPlaceDate,
                        ).toLocaleDateString()}
                      </Text>
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
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={OrderStyles.valueText}>
                        :- {orderDetails.FirstName}
                      </Text>
                      <Text style={[OrderStyles.valueText, {marginLeft: 10}]}>
                        {orderDetails.LastName}
                      </Text>
                    </View>
                  </View>
                  <View style={OrderStyles.insideTextView}>
                    <View style={{flex: 1}}>
                      <Text style={OrderStyles.titleText}>
                        Delivery Address
                      </Text>
                    </View>
                    <View style={{flexDirection: 'column', flex: 1}}>
                      <Text style={OrderStyles.valueText}>
                        :- {orderDetails.StreetNo},
                      </Text>
                      <Text style={[OrderStyles.valueText, {marginLeft: 15}]}>
                        {orderDetails.Street},
                      </Text>
                      <Text style={[OrderStyles.valueText, {marginLeft: 15}]}>
                        {orderDetails.City}
                      </Text>
                    </View>
                  </View>
                  <View style={OrderStyles.insideTextView}>
                    <View style={{flex: 1}}>
                      <Text style={OrderStyles.titleText}>
                        Delivery District
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={OrderStyles.valueText}>
                        :- {orderDetails.DiliveryDistrict}
                      </Text>
                    </View>
                  </View>
                  <View style={OrderStyles.insideTextView}>
                    <View style={{flex: 1}}>
                      <Text style={OrderStyles.titleText}>Home Town</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={OrderStyles.valueText}>
                        :- {orderDetails.City}
                      </Text>
                    </View>
                  </View>
                  <View style={OrderStyles.insideTextView}>
                    <View style={{flex: 1}}>
                      <Text style={OrderStyles.titleText}>Contact No</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={OrderStyles.valueText}>
                        :- {orderDetails.mobile}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
          {screen_type != 'ps' ? (
            <View style={OrderStyles.buttonView}>
              {/* <TouchableOpacity
          style={OrderStyles.updateStatusView}
          onPress={statusUpdateNavigation}>
          <Text style={OrderStyles.buttonText}>Update Status</Text>
        </TouchableOpacity> */}

              <TouchableOpacity
                style={OrderStyles.priceButtonView}
                onPress={calculatePriceNavigation}>
                <Text style={OrderStyles.buttonText}>Calculate Price</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text></Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default OrderDetailsScreen;
