import React, {useEffect, useState} from 'react';
import {View, Text, useWindowDimensions, ScrollView, ActivityIndicator} from 'react-native';
import CalculatePrice from '../../styles/CalculatePriceStyles';
import OrderIdView from '../../components/OrderDetails/OrderIdView';
import BackendProcessButton from '../../components/buttons';
import {useNavigation} from '@react-navigation/native';
import OrderHeaderBackArrow from '../../components/OrderHeaderBackArrow';
import axios from 'axios';
import {ResultModal, ResultModalSuccessNavigation} from '../../components/modals/resultModal';


const CalculatePriceScreen2 = ({route}) => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const {order_id} = route.params;
  const {emmergency} = route.params;
  const [distanceCost, setDistanceCost] = useState();
  const [navigationModal, setNavigationModal] = useState(false);
  const [errorModal,setErrorModal]=useState(false)
  const [modalMessage, setModalMessage] = useState();
  const [totalCost, setTotalCost] = useState();
  const [weightCost, setWeightCost] = useState();
 

  const screenNavigation = () => {
    setNavigationModal(false);
    navigation.navigate('OrderDetailsScreen', {order_id: order_id});
  };

  const openModal = () => {
    setNavigationModal(true);
  };

  useEffect(() => {
    getOrderPriceDetails();
  }, []);

  const getOrderPriceDetails = async () => {
    try {
      const result = await axios.get(
        `http://10.10.27.131:9000/api/mobile/orders/getPriceDetails/${order_id}`,
      );
      if (result.data.success == 200) {
        setDistanceCost(result.data.message[0].Distance_Cost);
        setWeightCost(result.data.message[0].Weight_Cost);
        setTotalCost(result.data.message[0].Total_Cost);
        setModalMessage(
          'Order Added to Ongoing List!',
        );
      }
      else if(result.data.success == 101){
        setModalMessage(result.data.message);
        setErrorModal(true);
      }
      else{
        setModalMessage(result.data.message);
        setErrorModal(true);
      }
    } catch (error) {
      setModalMessage(error.message);
      setErrorModal(true);
    }
  };

  return (
    <View style={{width: window.width, height: window.height}}>
      <View>
        <OrderHeaderBackArrow
          prevScreen={'CalculatePriceScreen1'}
          order_id={order_id}
        />
      </View>
      <View>
        <ResultModalSuccessNavigation
          show={navigationModal}
          message={modalMessage}
          function={screenNavigation}
        />
        <ResultModal
        show={errorModal}
        message={modalMessage}
        function={setModalMessage}
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
                  <Text
                    style={
                      CalculatePrice.insideTitleText
                    }>{`RS.${distanceCost}`}</Text>
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
                  {emmergency == 'T' ? (
                    <Text style={CalculatePrice.insideTitleText}>RS.1000</Text>
                  ) : (
                    <Text style={CalculatePrice.insideTitleText}>RS.0</Text>
                  )}
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
                  <Text
                    style={
                      CalculatePrice.insideTitleText
                    }>{`RS.${weightCost}`}</Text>
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
                  <Text
                    style={
                      CalculatePrice.insideTitleText
                    }>{`RS.${totalCost}`}</Text>
                </View>
              </View>
            </View>

            <View style={{marginTop: 30}}>
              <BackendProcessButton title={'Continue'} function={openModal} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CalculatePriceScreen2;
