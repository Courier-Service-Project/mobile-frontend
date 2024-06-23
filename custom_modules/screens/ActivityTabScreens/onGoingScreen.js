import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ActitvityStyles from '../../styles/activityScreenStyles';
import {
  QuestionModal,
  ResultModalSuccessNavigation,
  ResultModal,
} from '../../components/modals/resultModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OngoingOrderScreen = () => {
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [error, setError] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setshowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const isFocusedOnGoingScreen = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [mergeSort, setMergeSort] = useState([]);
  const window = Dimensions.get('window');

  useEffect(() => {
    if (isFocusedOnGoingScreen) {
      getOnDeliveryOrders();
    }
  }, [isFocusedOnGoingScreen]);

  useEffect(() => {
    if (ongoingOrders.length > 0) {
      // if (!Array.isArray(ongoingOrders)) {
      //   console.error('ongoingOrders is not an array:', ongoingOrders);
      //   return;
      // }
      sortingList();
    }
  }, [ongoingOrders]);

  const sortingList = () => {
    const emmergencyOrders = ongoingOrders.filter(
      order => order.Emmergency === 'T',
    );
    const normalOrders = ongoingOrders.filter(
      order => order.Emmergency === 'F',
    );
    setMergeSort([...emmergencyOrders, ...normalOrders]);
  };

  const getOnDeliveryOrders = async () => {
    const userId=await AsyncStorage.getItem('user_id');
    try {
      const result = await axios.get(
        `http://10.10.27.131:9000/api/mobile/orders/getOnDiliveryOrders/${userId}`,
      );
      console.log(result.data.message);
      if (result.data.success == 200) {
        console.log(result.data.message);
        setOngoingOrders(result.data.message);
      } else {
        setMergeSort([])
        console.log(result.data.message);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const orderDetailsNavigation = order_id => {
    navigation.navigate('OrderDetailsScreen', {
      order_id: order_id,
      screen_type: 'ps',
    });
  };

  const handleFinishOrderPress = async order_id => {
    console.log(order_id);
    setSelectedOrderId(order_id);
    setModalMessage('Are you sure you want to finish this order?');
    setShowQuestionModal(true);
  };

  const handleConfirm = async order_id => {
    await updateOnDiliveryState(order_id);
  };
  const cancelConfirm = () => {
    setShowQuestionModal(false);
  };

  const updateOnDiliveryState = async order_id => {
    setIsLoading(true);
    console.log('im inside the function');
    try {
      const result = await axios.patch(
        `http://10.10.27.131:9000/api/mobile/orders/updateOnDiliveryState/${order_id}`,
      );
      if (result.data.success == 200) {
        console.log(result.data);
        setShowQuestionModal(false);
        setShowSuccessModal(true);
        getOnDeliveryOrders();
        setIsLoading(false);
      } else if (result.data.success == 101) {
        //setModalMessage(result.data.message);
        setshowErrorModal(true);
        setIsLoading(false);
      } else {
        //setModalMessage(result.data.message);
        setshowErrorModal(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setshowErrorModal(true);;
      setIsLoading(false);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        marginBottom: 10,
        backgroundColor: '#ffffff',
        width: window.width,
        height: window.height,
      }}>
      <View>
        <QuestionModal
          show={showQuestionModal}
          message={modalMessage}
          order_id={selectedOrderId}
          function={handleConfirm}
          cancelFunction={cancelConfirm}
        />

        <ResultModalSuccessNavigation
          show={showSuccessModal}
          message={'Order Completed Successfully'}
          function={setShowSuccessModal} // Close the modal when Continue is pressed
        />

        <ResultModal
          show={showErrorModal}
          message={'Order Not Completed Successfully'}
          function={setshowErrorModal} 
        />
      </View>

      {isLoading ? ( // Show activity indicator when loading
        <ActivityIndicator size="large" />
      ) : mergeSort.length ? (
        <FlatList
          data={mergeSort}
          keyExtractor={item => item.Order_id.toString()}
          renderItem={({item}) => (
            <View style={ActitvityStyles.LayoutContainer}>
              <View style={ActitvityStyles.OrderDetailsContiner}>

                 <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',marginRight:10}}>
                <View style={ActitvityStyles.OrderDeatailsMainRow}>
                  <Text style={ActitvityStyles.OrderDetailsMainRowKey}>
                    Order ID:
                  </Text>
                  <Text style={ActitvityStyles.OrderDetailsMainValue}>
                    {item.Order_id}
                  </Text>
                </View>

                <View style={ActitvityStyles.OrderDeatailsMainRow}>
                  <Text style={ActitvityStyles.OrderDetailsRowKey}>
                    Pickup Date:
                  </Text>
                  <Text style={ActitvityStyles.OrderDetailsRowKey}>
                    {new Date(item.pickup_Date).toLocaleDateString()}
                  </Text>
                </View>

                </View>

                <View style={ActitvityStyles.OrderDeatailsRow}>
                  <Text style={ActitvityStyles.OrderDetailsRowKey}>
                    Order Type:
                  </Text>
                  {item.Emmergency === 'T' ? (
                    <Text
                      style={[
                        ActitvityStyles.OrderDetailsRowValue,
                        {color: 'red'},
                      ]}>
                      Emmergency
                    </Text>
                  ) : (
                    <Text style={ActitvityStyles.OrderDetailsRowValue}>
                      Normal Order
                    </Text>
                  )}
                </View>

                <View style={ActitvityStyles.OrderDeatailsRow}>
                  <Text style={ActitvityStyles.OrderDetailsRowKey}>
                    Pickup District:
                  </Text>
                  <Text style={ActitvityStyles.OrderDetailsRowValue}>
                    {item.Pickup_District}
                  </Text>
                </View>

                <View style={ActitvityStyles.OrderDeatailsRow}>
                  <Text style={ActitvityStyles.OrderDetailsRowKey}>
                    Delivery District:
                  </Text>
                  <Text style={ActitvityStyles.OrderDetailsRowValue}>
                    {item.DiliveryDistrict}
                  </Text>
                </View>
              </View>

              <View style={ActitvityStyles.buttonContainer}>
                <View>
                  <TouchableOpacity
                    style={[
                      ActitvityStyles.Button,
                      {backgroundColor: '#E92020'},
                    ]}
                    onPress={() => {
                      handleFinishOrderPress(item.Order_id);
                    }}>
                    <Text style={ActitvityStyles.ButtonText}>Finish Order</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={[
                      ActitvityStyles.Button,
                      {backgroundColor: '#044B55'},
                    ]}
                    onPress={() => orderDetailsNavigation(item.Order_id)}>
                    <Text style={ActitvityStyles.ButtonText}>
                      Order Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={{textAlign: 'center', marginTop: 20}}>
          No ongoing orders are avilable
        </Text>
      )}
    </View>
  );
};

export default OngoingOrderScreen;
