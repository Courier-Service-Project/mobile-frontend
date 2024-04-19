import React, {useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import AppHeaderBackArrow from '../components/appHeaderBackArrow';
import {ScrollView} from 'react-native-virtualized-view';
import OrderIdView from '../components/OrderDetails/OrderIdView';
import StatusUpdateStyles from '../styles/StatusUpdateScreenStyles';

const StatusUpdateScreen = () => {
  const window = useWindowDimensions();
  //for radio button selection
  const [selectedRadio, setSelectedRadio] = useState();
  
  return (
    <View style={{width: window.width, height: window.height}}>
      <View>
        <AppHeaderBackArrow />
      </View>
      <ScrollView>
        <View>
          <OrderIdView />
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

        <View style={StatusUpdateStyles.imageView}></View>
      </ScrollView>
    </View>
  );
};

export default StatusUpdateScreen;
