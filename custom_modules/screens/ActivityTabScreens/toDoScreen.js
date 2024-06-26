import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import ActitvityStyles from '../../styles/activityScreenStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ResultModal} from '../../components/modals/resultModal';

const ToDoScreen = () => {
  const isFocousedToDoScreen = useIsFocused();
  const [todoList, setTodoList] = useState([{}]);
  const [sortTodoList, setSortTodoList] = useState([]);
  const [showResultModal, setResultModal] = useState(false);
  const [modalMessage, setModalMessage] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocousedToDoScreen) {
      sendToDoRequest();
    }
  }, [isFocousedToDoScreen]);

  useEffect(
    () => {
      if (isFocousedToDoScreen) {
        if (todoList.length > 0) {
          sortOrders();
        }
      }
    },
    [todoList],
    [isFocousedToDoScreen],
    [sortTodoList],
  );

  const sortOrders = async () => {
    const normalOrders = todoList.filter(order => order.Emmergency == 'F');
    const emmergencyOrders = todoList.filter(order => order.Emmergency == 'T');
    setSortTodoList([...emmergencyOrders, ...normalOrders]);
  };

  const sendToDoRequest = async () => {
    try {
      const branchLocation = await AsyncStorage.getItem('branchLocation');
      const user_id = await AsyncStorage.getItem('user_id');
      const result = await axios.get(
        `http://10.10.27.131:9000/api/mobile/orders/getToDoOrders/${branchLocation}/${user_id}`,
      );
      if (result.data.success == 200) {
        setTodoList(result.data.message);
      } else if (result.data.success == 101) {
        await setSortTodoList([]);

        // await AsyncStorage.removeItem('lastDiliveryProvince');
        // await AsyncStorage.setItem('lastDiliveryProvince', 'NPS');
        console.log(
          `Updated AsyncStorage ${await AsyncStorage.getItem(
            'lastDiliveryProvince',
          )}`,
        );
      } else {
        await setSortTodoList([]);
        setModalMessage(result.data.message);
        setResultModal(true);
      }
    } catch (error) {
      setModalMessage(error.message);
      setResultModal(true);
    }
  };

  const cancelOrder = async order_id => {
    try {
      const result = await axios.patch(
        `http://10.10.27.131:9000/api/mobile/orders/cancelToDoOrder/${order_id}`,
      );

      if (result.data.success == 200) {
        console.log(result.data.message);
        if (isFocousedToDoScreen) {
          await sendToDoRequest();
        }
      } else if (result.data.success == 101) {
        setModalMessage(result.data.message);
        setResultModal(true);
      } else {
        setModalMessage(result.data.message);
        setResultModal(true);
      }
    } catch (error) {
      console.log(error.message);
      setModalMessage(error.message);
      setResultModal(true);
    }
  };

  const orderDetailsNavigation = order_id => {
    navigation.navigate('OrderDetailsScreen', {
      order_id: order_id,
      screen_type: 'tds',
    });
  };

  return (
    <View style={{flex: 1, marginBottom: 10, backgroundColor: '#ffffff'}}>
      <View>
        <ResultModal
          show={showResultModal}
          message={modalMessage}
          function={setResultModal}
        />
      </View>
      <ScrollView>
        {sortTodoList.length ? (
          <FlatList
            data={sortTodoList}
            renderItem={({item}) => (
              <View style={ActitvityStyles.LayoutContainer}>
                <View style={ActitvityStyles.OrderDetailsContiner}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      marginRight: 10,
                    }}>
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
                        Place Date:
                      </Text>
                      <Text style={ActitvityStyles.OrderDetailsRowKey}>
                        {new Date(item.orderPlaceDate).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>

                  <View style={ActitvityStyles.OrderDeatailsRow}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: 6}}>
                        <Text style={ActitvityStyles.OrderDetailsRowKey}>
                          Order Type
                        </Text>
                      </View>
                      <View style={{flex: 9}}>
                        {item.Emmergency == 'T' ? (
                          <Text
                            style={[
                              ActitvityStyles.OrderDetailsRowValue,
                              {color: 'red'},
                            ]}>
                            : Emmergency
                          </Text>
                        ) : (
                          <Text style={ActitvityStyles.OrderDetailsRowValue}>
                            : Noraml Order
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>

                  <View style={ActitvityStyles.OrderDeatailsRow}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: 6}}>
                        <Text style={ActitvityStyles.OrderDetailsRowKey}>
                          Pickup District
                        </Text>
                      </View>
                      <View style={{flex: 9}}>
                        <Text style={ActitvityStyles.OrderDetailsRowValue}>
                          : {item.Pickup_District}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={ActitvityStyles.OrderDeatailsRow}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: 6}}>
                        <Text style={ActitvityStyles.OrderDetailsRowKey}>
                          Dilivery District:
                        </Text>
                      </View>
                      <View style={{flex: 9}}>
                        <Text style={ActitvityStyles.OrderDetailsRowValue}>
                          : {item.DiliveryDistrict}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={ActitvityStyles.OrderDeatailsRow}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 6}}>
                      <Text style={ActitvityStyles.OrderDetailsRowKey}>
                        Dilivery Province
                      </Text>
                    </View>
                    <View style={{flex: 9}}>
                      <Text style={ActitvityStyles.OrderDetailsRowValue}>
                        : {item.DiliveryProvince}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={ActitvityStyles.buttonContainer}>
                  {/* <TouchableOpacity
                    style={[
                      ActitvityStyles.Button,
                      {backgroundColor: '#20DED2'},
                    ]}>
                    <Text style={ActitvityStyles.ButtonText}>
                      Confirm Order
                    </Text>
                  </TouchableOpacity> */}

                  <TouchableOpacity
                    onPress={() => {
                      cancelOrder(item.Order_id);
                    }}
                    style={[
                      ActitvityStyles.Button,
                      {backgroundColor: '#E92020'},
                    ]}>
                    <Text style={ActitvityStyles.ButtonText}>Cancel Order</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      ActitvityStyles.Button,
                      {backgroundColor: '#044B55'},
                    ]}
                    onPress={() => {
                      orderDetailsNavigation(item.Order_id);
                    }}>
                    <Text style={ActitvityStyles.ButtonText}>
                      Order Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No Todo orders are avilable
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ToDoScreen;
