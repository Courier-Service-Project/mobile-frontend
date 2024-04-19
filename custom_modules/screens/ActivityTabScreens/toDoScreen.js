import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import ActitvityStyles from '../../styles/activityScreenStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const ToDoScreen = () => {
  const isFocoused = useIsFocused();
  const [todoList, setTodoList] = useState([{}]);
  const [sortTodoList, setSortTodoList] = useState([]);

  useEffect(() => {
    if (isFocoused) {
      sendToDoRequest();
    }
  }, [isFocoused]);

  useEffect(
    () => {
      if (isFocoused && todoList.length > 0) {
        sortOrders();
      }
    },
    [todoList],
    [isFocoused],
    [sortTodoList],
  );

  const sortOrders =  () => {
    const normalOrders = todoList.filter(order => order.Emmergency == 'F');
    const emmergencyOrders = todoList.filter(order => order.Emmergency == 'T');
    setSortTodoList([...emmergencyOrders, ...normalOrders]);
  };

  const sendToDoRequest = async () => {
    try {
      const branchLocation = await AsyncStorage.getItem('branchLocation');
      const user_id = await AsyncStorage.getItem('user_id');
      const result = await axios.get(
        `http://192.168.43.137:9000/api/mobile/orders/getToDoOrders/${branchLocation}/${user_id}`,
      );
      //console.log(result.data.message);
      if (result.data.success == 200) {
        setTodoList(result.data.message);
      } else if (result.data.success == 101) {
        setSortTodoList([]);
        //sortOrders();
        //Alert.alert('No order found');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const cancelOrder = async order_id => {
    try {
      const result = await axios.patch(
        `http://192.168.43.137:9000/api/mobile/orders/cancelToDoOrder/${order_id}`,
      );
      console.log(result.data.message);
      if (isFocoused) {
        await sendToDoRequest();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  

  return (
    <View style={{flex: 1, marginBottom: 10, backgroundColor: '#ffffff'}}>
      <ScrollView>
        {sortTodoList.length ? (
          <FlatList
            data={sortTodoList}
            renderItem={({item}) => (
              <View style={ActitvityStyles.LayoutContainer}>
                <View style={ActitvityStyles.OrderDetailsContiner}>
                  <View style={ActitvityStyles.OrderDeatailsMainRow}>
                    <Text style={ActitvityStyles.OrderDetailsMainRowKey}>
                      Order_id:
                    </Text>
                    <Text style={ActitvityStyles.OrderDetailsMainValue}>
                      {item.Order_id}
                    </Text>
                  </View>

                  <View style={ActitvityStyles.OrderDeatailsRow}>
                    <Text style={ActitvityStyles.OrderDetailsRowKey}>
                      Order Type
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
                        Noraml Order
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
                  <TouchableOpacity
                    style={[
                      ActitvityStyles.Button,
                      {backgroundColor: '#20DED2'},
                    ]}>
                    <Text style={ActitvityStyles.ButtonText}>
                      Confirm Order
                    </Text>
                  </TouchableOpacity>

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
                    ]}>
                    <Text style={ActitvityStyles.ButtonText}>
                      Change Status
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={{fontSize: 24, color: 'red'}}>
            No orders are avilable
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ToDoScreen;
