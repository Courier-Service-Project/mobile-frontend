import React, {useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import OrderHeaderBackArrow from '../components/OrderHeaderBackArrow';
import {ScrollView} from 'react-native-virtualized-view';
import OrderIdView from '../components/OrderDetails/OrderIdView';
import StatusUpdateStyles from '../styles/StatusUpdateScreenStyles';
import {useNavigation} from '@react-navigation/native';
//import updateStatusImage from '../icons/statusImage.png';

const StatusUpdateScreen = ({route}) => {
  const window = useWindowDimensions();
  //for radio button selection
  const [selectedRadio, setSelectedRadio] = useState();
  const navigation = useNavigation();
  const {order_id} = route.params;

  return (
    <View style={{width: window.width, height: window.height}}>
      <View>
        <OrderHeaderBackArrow
          prevScreen={'OrderDetailsScreen'}
          order_id={order_id}
        />
      </View>
      <ScrollView>
        <View st>
          <View>
            <OrderIdView order_id={order_id} />
          </View>

          <View style={{marginHorizontal: 25}}>
            <View style={StatusUpdateStyles.orderStatusView}>
              <Text style={StatusUpdateStyles.statusText}>Order Status </Text>

              <View style={{marginTop: 25}}>
                <TouchableOpacity
                  style={StatusUpdateStyles.statusItemView}
                  onPress={() => setSelectedRadio(1)}>
                  <View style={{flex: 1, marginHorizontal: 25}}>
                    <Text style={StatusUpdateStyles.itemText}>Pending</Text>
                  </View>
                  <View style={{marginHorizontal: 25}}>
                    <View style={StatusUpdateStyles.radio}>
                      {selectedRadio == 1 ? (
                        <View style={StatusUpdateStyles.radioInsideView}></View>
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={StatusUpdateStyles.statusItemView}
                  onPress={() => setSelectedRadio(2)}>
                  <View style={{flex: 1, marginHorizontal: 25}}>
                    <Text style={StatusUpdateStyles.itemText}>Picked Up</Text>
                  </View>
                  <View style={{marginHorizontal: 25}}>
                    <View style={StatusUpdateStyles.radio}>
                      {selectedRadio == 2 ? (
                        <View style={StatusUpdateStyles.radioInsideView}></View>
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={StatusUpdateStyles.statusItemView}
                  onPress={() => setSelectedRadio(3)}>
                  <View style={{flex: 1, marginHorizontal: 25}}>
                    <Text style={StatusUpdateStyles.itemText}>On Delivery</Text>
                  </View>
                  <View style={{marginHorizontal: 25}}>
                    <View style={StatusUpdateStyles.radio}>
                      {selectedRadio == 3 ? (
                        <View style={StatusUpdateStyles.radioInsideView}></View>
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={StatusUpdateStyles.statusItemView}
                  onPress={() => setSelectedRadio(4)}>
                  <View style={{flex: 1, marginHorizontal: 25}}>
                    <Text style={StatusUpdateStyles.itemText}>Delivered</Text>
                  </View>
                  <View style={{marginHorizontal: 25}}>
                    <View style={StatusUpdateStyles.radio}>
                      {selectedRadio == 4 ? (
                        <View style={StatusUpdateStyles.radioInsideView}></View>
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* 
        <View style={StatusUpdateStyles.bottomImageView}>
          <Image source={updateStatusImage}/>
        </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default StatusUpdateScreen;
