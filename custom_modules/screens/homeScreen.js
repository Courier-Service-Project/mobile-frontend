import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import HomeStyles from '../styles/homeScreenStyles';
import HomeImage from '../icons/Home.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-virtualized-view';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { ResultModal } from '../components/modals/resultModal';


const HomeScreen = () => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [orderStatusCount, setOrderStatusCount] = useState([]);
  const [modalMessage,setModalMessage]=useState()
  const [resultModal,setResultModal]=useState(false);

  useEffect(() => {
    if (isFocused) {
      getOrderStateCounts();
    }
  }, [isFocused]);

  const getOrderStateCounts = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const branchLocation = await AsyncStorage.getItem('branchLocation');
    try {
      const result = await axios.get(
        `http://10.10.27.131:9000/api/mobile/orders/getOrderStateCount/${user_id}/${branchLocation}`,
      );
      setOrderStatusCount(result.data.message);
      console.log(result.data.message);
      console.log(result.data.message[4][0].DiliveryProvince);
      AsyncStorage.setItem(
        'lastDiliveryProvince',
        result.data.message[4][0].DiliveryProvince,
      );
      //console.log(orderStatusCount[0][0].pendingCount)
    } catch (error) {
      setModalMessage(error.message);
      setResultModal(true);
    }
  };

  const performanceScreenNavigation = () => {
    navigation.navigate('PerformanceScreen');
  };


  return (
    <View style={{width: window.width, height: window.height}}>
      <View style={HomeStyles.topView}>
        <View>
          <Text style={HomeStyles.welcomeText}>Welcome To XPress!</Text>
          <Text style={HomeStyles.helloText}>Pramuditha Sadeepa</Text>
          <View style={HomeStyles.imageView}>
            <Image source={HomeImage} style={HomeStyles.homeImage}/>
            </View>
        </View>
        <View>
              <ResultModal
                show={resultModal}
                function={setResultModal}
                message={modalMessage}
              />
            </View>
      </View>

      <TouchableOpacity style={HomeStyles.topCard} onPress={performanceScreenNavigation}>
        <Text style={{fontSize: 18, color: '#044B55'}}>
            Your Performances
          </Text>
          <View style={{marginTop: 5, marginLeft: 10}}>
            <SimpleLineIcons name="arrow-right" color={'#20DED2'} size={16} />
          </View>
        
      </TouchableOpacity>

      <ScrollView>
        {orderStatusCount.length>0 && (
          <View style={HomeStyles.bottomView}>
            <ScrollView style={{marginBottom: 50}}>
              {/* set bottom card view */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  marginTop: 30,
                }}>
                <TouchableOpacity style={HomeStyles.card}>
                  <View>
                    <MaterialIcons
                      name="pending-actions"
                      color={'#20DED2'}
                      size={40}
                    />
                  </View>
                  <Text style={HomeStyles.cardText}>Pending Orders</Text>
                  <Text style={HomeStyles.cardText}>
                    {orderStatusCount[0][0].pendingCount}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={HomeStyles.card}>
                  <AntDesign name="profile" color={'#20DED2'} size={40} />
                  <Text style={HomeStyles.cardText}>Selected Orders</Text>
                  <Text style={HomeStyles.cardText}>
                    {orderStatusCount[1][0].selectedCount}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={HomeStyles.card}>
                  <MaterialCommunityIcons
                    name="truck-check-outline"
                    color={'#20DED2'}
                    size={40}
                  />
                  <Text style={HomeStyles.cardText}>Ongoing Orders</Text>
                  <Text style={HomeStyles.cardText}>
                    {orderStatusCount[2][0].onGoingCount}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={HomeStyles.card}>
                  <MaterialIcons name="done-all" color={'#20DED2'} size={40} />
                  <Text style={HomeStyles.cardText}>Completed Orders</Text>
                  <Text style={HomeStyles.cardText}>
                    {orderStatusCount[3][0].completedCount}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
