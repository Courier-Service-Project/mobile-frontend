import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActitvityStyles from '../../styles/activityScreenStyles';
import {ScrollView} from 'react-native-virtualized-view';
import {
  ResultModal,
  ResultModalSuccess,
} from '../../components/modals/resultModal';
import {useIsFocused} from '@react-navigation/native';

const PendingScreen = () => {

  const window = useWindowDimensions();
  const isFocoused = useIsFocused();

  const [pendingOrders, setPendingOrders] = useState([{}]);
  const [mergeSort, setMergeSort] = useState([]);
  const [orderProvince, setOrderProvince] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showResultModal, setResultModal] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);

  useEffect(() => {
    if (isFocoused) {
      sendRequest();
    }
  }, [isFocoused]);

  //in here  sortingList() will active once the pendingOrder list formed.
  //state initialization is asynchronous
  useEffect(
    () => {
      sortingList();
    },
    [pendingOrders],
    [mergeSort],
  );

  //in here it will only get the items with the same province

  const AcceptOrder = items => {
    if (orderProvince === '') {
      setOrderProvince(items.DiliveryProvince);
      updateStatusRequest(items);
      setSuccessModal(true);
      setModalMessage('Order added successfully');
      sendRequest();
    } else if (items.DiliveryProvince == orderProvince) {
      updateStatusRequest(items);
      setSuccessModal(true);
      setModalMessage('Order added successfully');
      sendRequest();
    } else {
      setResultModal(true);
      setModalMessage('Orders must be in same Province');
    }
  };

  const updateStatusRequest = async items => {
    let order_id = items.Order_id;
    let user_id = await AsyncStorage.getItem('user_id');
    const body = {
      user_id,
    };
    try {
      const result = await axios.post(
        `http://192.168.43.137:9000/api/mobile/orders/updatePendingState/${order_id}`,
        body,
      );
      if (isFocoused) {
        await sendRequest();
      }
      console.log(result.data.message);
    } catch (error) {
      setModalMessage(error.message);
      showResultModal(true);
    }
  };

  const sortingList = async () => {
    const emmergencyOrders = pendingOrders.filter(
      order => order.Emmergency === 'T',
    );
    const normalOrders = pendingOrders.filter(
      order => order.Emmergency === 'F',
    );
    setMergeSort([...emmergencyOrders, ...normalOrders]);
  };

  const sendRequest = async () => {
    let branchLocation = await AsyncStorage.getItem('branchLocation');
    try {
      const result = await axios.get(
        `http://192.168.43.137:9000/api/mobile/orders/${branchLocation}`,
      );
      if ((result.data.success == 200)) {
        setPendingOrders(result.data.message);
      } else if ((result.data.success == 100)) {
        setMergeSort([]);
        console.log('No orders found');
      }
    } catch (error) {
      console.log(error.message);
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
      <ScrollView>
        <View>
          <View>
            <ResultModal
              show={showResultModal}
              message={modalMessage}
              function={setResultModal}
            />

            <ResultModalSuccess
              show={showSuccessModal}
              message={modalMessage}
              function={setSuccessModal}
            />
          </View>
          {mergeSort.length ? (
            <FlatList
              data={mergeSort}
              renderItem={({item}) => (
                <View style={ActitvityStyles.LayoutContainer}>
                  <View style={ActitvityStyles.OrderDetailsContiner}>
                    <View style={ActitvityStyles.OrderDeatailsMainRow}>
                      <Text style={ActitvityStyles.OrderDetailsMainRowKey}>
                        Order ID:
                      </Text>
                      <Text style={ActitvityStyles.OrderDetailsMainValue}>
                        {item.Order_id}
                      </Text>
                    </View>

                    <View style={ActitvityStyles.OrderDeatailsRow}>
                      <Text style={ActitvityStyles.OrderDetailsRowKey}>
                        Order Type:
                      </Text>
                      {item.Emmergency == 'T' ? (
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
                        Dilivery District:
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
                          {backgroundColor: '#20DED2'},
                        ]}
                        onPress={() => AcceptOrder(item)}>
                        <Text style={ActitvityStyles.ButtonText}>
                          Accept Order
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={[
                          ActitvityStyles.Button,
                          {backgroundColor: '#044B55'},
                        ]}>
                        <Text style={ActitvityStyles.ButtonText}>
                          Order Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};
export default PendingScreen;
