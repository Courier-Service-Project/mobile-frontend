import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import CalculatePrice from '../../styles/CalculatePriceStyles';
import OrderIdView from '../../components/OrderDetails/OrderIdView';
import BackendProcessButton from '../../components/buttons';
import {useNavigation} from '@react-navigation/native';
import OrderHeaderBackArrow from '../../components/OrderHeaderBackArrow';
import axios from 'axios';
import {
  ResultModal,
  ResultModalSuccessNavigation,
} from '../../components/modals/resultModal';

const CalculatePriceScreen1 = ({route}) => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const [emmergency, setEmmergency] = useState();
  const [distanceCost, setDistanceCost] = useState();
  const [weight, setWeight] = useState();
  const [errorModal, setErrorModal] = useState(false);
  const [navigationModal, setNavigationModal] = useState(false);
  const [modalMessage, setModalMessage] = useState();

  const {order_id} = route.params;

  useEffect(() => {
    sendRequest();
  }, []);

  const sendRequest = async () => {
    try {
      const result = await axios.get(
        `http://10.10.27.131:9000/api/mobile/orders/getOrderTypeCost/${order_id}`,
      );
      setEmmergency(result.data.message[0].Emmergency);
      setDistanceCost(result.data.message[0].Distance_Cost);
    } catch (error) {
      console.log(error.message);
    }
  };

  const weightPrice = weight => {
    return parseFloat(weight) * 2;
  };

  const updateTotalPrice = async weight => {
    const weightCost = weightPrice(weight);
    try {
      const body = {
        weightCost,
      };
      const result = await axios.patch(
        `http://10.10.27.131:9000/api/mobile/orders/updateWeightCost/${order_id}`,
        body,
      );
      if (result.data.success == 200) {
        setModalMessage(result.data.message);
        setNavigationModal(true);
      } else if (result.data.success == 101) {
        setModalMessage(result.data.message);
        setErrorModal(true);
      } else {
        setModalMessage(result.data.message);
        setErrorModal(true);
      }
    } catch (error) {
      setModalMessage(error.message);
      setErrorModal(true);
    }
  };

  const screenNavigation = () => {
    setNavigationModal(false);
    navigation.navigate('CalculatePriceScreen2', {order_id: order_id,emmergency:emmergency});
  };

  const updatePriceAndStatus = () => {
    if (weight) {
      if (/^\d+$/.test(weight)) {
        updateTotalPrice(weight);
      } else {
        setModalMessage('Price should contain only digits!');
        setErrorModal(true);
      }
    } else {
      setModalMessage("Price shouldn't be null!");
      setErrorModal(true);
    }
    //navigation.navigate('CalculatePriceScreen2',{order_id:order_id});
  };

  return (
    <View style={{width: window.width, height: window.height}}>
      <View>
        <OrderHeaderBackArrow
          prevScreen={'OrderDetailsScreen'}
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
          function={setErrorModal}
        />
      </View>
      <ScrollView>
        <View>
          <OrderIdView order_id={order_id} />
        </View>
        <View style={{marginTop: 25}}>
          <View style={CalculatePrice.calculatePriceView}>
            {emmergency && (
              <View style={CalculatePrice.ItemView}>
                <View style={CalculatePrice.insideView}>
                  <View style={CalculatePrice.insideTitleTextView}>
                    <Text style={CalculatePrice.insideTitleText}>
                      Order Type
                    </Text>
                  </View>
                  <View style={CalculatePrice.insideValueView}>
                    {emmergency == 'T' ? (
                      <Text style={CalculatePrice.insideValueText}>
                        Emmergency
                      </Text>
                    ) : (
                      <Text style={CalculatePrice.insideValueText}>Normal</Text>
                    )}
                  </View>
                </View>
              </View>
            )}

            <View style={CalculatePrice.ItemView}>
              <View style={CalculatePrice.insideView}>
                <View style={CalculatePrice.insideTitleTextView}>
                  <Text style={CalculatePrice.insideTitleText}>
                    Distance Cost
                  </Text>
                </View>
                <View style={CalculatePrice.insideValueView}>
                  <Text style={CalculatePrice.insideValueText}>
                    {distanceCost}
                  </Text>
                </View>
              </View>
            </View>

            <View style={CalculatePrice.ItemView}>
              <View style={CalculatePrice.insideView}>
                <TextInput
                  onChangeText={text => {
                    setWeight(text);
                  }}
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
                function={updatePriceAndStatus}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CalculatePriceScreen1;
