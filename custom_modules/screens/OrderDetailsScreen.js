import React from 'react';
import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import AppHeaderBackArrow from '../components/appHeaderBackArrow';
import OrderStyles from '../styles/OrderDetailsScreenStyles';
import {ScrollView} from 'react-native-virtualized-view';
import OrderIdView from '../components/OrderDetails/OrderIdView';

const OrderDetailsScreen = () => {

  const window = useWindowDimensions();
  return (
    <View style={{width: window.width,height:window.height}}>
      <View>
        <AppHeaderBackArrow />
      </View>
      <ScrollView>
        <View>
          <OrderIdView />
        </View>
        <View>
          <View style={{marginHorizontal: 25}}>
            <Text style={OrderStyles.senderText}>Sender details</Text>
            <View style={OrderStyles.senderView}>
              <View style={OrderStyles.insideTextView}>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.titleText}>Name</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.valueText}>Kamal Perera</Text>
                </View>
              </View>
              <View style={OrderStyles.insideTextView}>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.titleText}>pickup Address</Text>
                </View>
                <View style={{flexDirection: 'column', flex: 1}}>
                  <Text style={OrderStyles.valueText}>No 22,</Text>
                  <Text style={OrderStyles.valueText}>Main Road,</Text>
                  <Text style={OrderStyles.valueText}>Matara</Text>
                </View>
              </View>
              <View style={OrderStyles.insideTextView}>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.titleText}>Pickup District</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.valueText}>Matara</Text>
                </View>
              </View>
              <View style={OrderStyles.insideTextView}>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.titleText}>Home Town</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.valueText}>Matara</Text>
                </View>
              </View>
              <View style={OrderStyles.insideTextView}>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.titleText}>Contact No</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.valueText}>0701234568</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View>
          <View style={{marginHorizontal: 25, marginTop: 20}}>
            <Text style={OrderStyles.senderText}>Receiver details</Text>
            <View style={OrderStyles.senderView}>
              <View style={OrderStyles.insideTextView}>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.titleText}>Name</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.valueText}>Supun Perera</Text>
                </View>
              </View>
              <View style={OrderStyles.insideTextView}>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.titleText}>Delivery Address</Text>
                </View>
                <View style={{flexDirection: 'column', flex: 1}}>
                  <Text style={OrderStyles.valueText}>No 22,</Text>
                  <Text style={OrderStyles.valueText}>First Lane,</Text>
                  <Text style={OrderStyles.valueText}>Colombo</Text>
                </View>
              </View>
              <View style={OrderStyles.insideTextView}>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.titleText}>Delivery District</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.valueText}>Colombo</Text>
                </View>
              </View>
              <View style={OrderStyles.insideTextView}>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.titleText}>Home Town</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.valueText}>Colombo</Text>
                </View>
              </View>
              <View style={OrderStyles.insideTextView}>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.titleText}>Contact No</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={OrderStyles.valueText}>0701454568</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={OrderStyles.buttonView}>
          <TouchableOpacity style={OrderStyles.updateStatusView}>
            <Text style={OrderStyles.buttonText}>Update Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={OrderStyles.priceButtonView}>
            <Text style={OrderStyles.buttonText}>Calculate Price</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetailsScreen;
