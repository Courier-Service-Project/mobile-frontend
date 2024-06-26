import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ActitvityStyles from '../../styles/activityScreenStyles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {ScrollView} from 'react-native-virtualized-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ResultModal} from '../../components/modals/resultModal';

const CompletedScreen = () => {
  const window = Dimensions.get('window');
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [completedOrders, setCompletedOrders] = useState([]);
  const isFocusedCompletedScreen = useIsFocused();
  const [mergeSort, setMergeSort] = useState([]);
  const [modalMessage, setModalMessage] = useState();
  const [resultModal, setResultModal] = useState(false);

  useEffect(() => {
    if (isFocusedCompletedScreen) {
      getCompletedOrders();
    }
  }, [isFocusedCompletedScreen]);

  useEffect(() => {
    if (completedOrders.length > 0) {
      sortingList();
    }
  }, [completedOrders]);

  const sortingList = () => {
    const emmergencyOrders = completedOrders.filter(
      order => order.Emmergency === 'T',
    );
    const normalOrders = completedOrders.filter(
      order => order.Emmergency === 'F',
    );
    setMergeSort([...emmergencyOrders, ...normalOrders]);
  };

  const getCompletedOrders = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      const result = await axios.get(
        `http://10.10.27.131:9000/api/mobile/orders/getCompletedOrders/${user_id}`,
      );
      console.log(result.data.message);
      if (result.data.success == 200) {
        console.log(result.data.message);
        setCompletedOrders(result.data.message);
      } else if (result.data.success == 101) {
        setMergeSort([]);
        setModalMessage(result.data.message);
        setResultModal(true);
        console.log(result.data.message);
      } else if (result.data.success == 100) {
        setMergeSort([]);
        setModalMessage(result.data.message);
        setResultModal(true);
        console.log(result.data.message);
      } else {
        setModalMessage(result.data.message);
        setResultModal(true);
      }
    } catch (error) {
      console.log(error.message);
      setModalMessage(result.data.message);
      setResultModal(true);
    }
  };

  const orderDetailsNavigation = order_id => {
    navigation.navigate('OrderDetailsScreen', {
      order_id: order_id,
      screen_type: 'ps',
    });
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
        <ResultModal
          show={resultModal}
          function={setResultModal}
          message={modalMessage}
        />
      </View>
      <ScrollView>
        {mergeSort.length ? (
          <FlatList
            data={mergeSort}
            keyExtractor={item => item.Order_id.toString()}
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
                        Dilivery Date:
                      </Text>
                      <Text style={ActitvityStyles.OrderDetailsRowKey}>
                        {new Date(item.dilivery_Date).toLocaleDateString()}
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
                        {item.Emmergency === 'T' ? (
                          <Text
                            style={[
                              ActitvityStyles.OrderDetailsRowValue,
                              {color: 'red'},
                            ]}>
                            : Emmergency
                          </Text>
                        ) : (
                          <Text style={ActitvityStyles.OrderDetailsRowValue}>
                            : Normal Order
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>

                  <View style={ActitvityStyles.OrderDeatailsRow}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: 6}}>
                        <Text style={ActitvityStyles.OrderDetailsRowKey}>
                          Total Cost  
                        </Text>
                      </View>
                      <View style={{flex: 9}}>
                        <Text style={ActitvityStyles.OrderDetailsRowValue}>
                          : Rs. {item.Total_Cost}
                        </Text>
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
                          Delivery District:
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

                <View style={{margin: 12, alignSelf: 'center'}}>
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
            )}
          />
        ) : (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No completed orders are available
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default CompletedScreen;
