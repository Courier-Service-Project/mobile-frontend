import React from 'react';
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
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  const window = useWindowDimensions();
  return (
    <View style={{width: window.width, height: window.height}}>
      
        {/*gradient for home screen top view */}
        <LinearGradient
          colors={['#156E72', '#188E8F', '#1DC8C5', '#044B55']}
          style={HomeStyles.topView}>
          <View>
            <Text style={HomeStyles.helloText}>Hello Pramuditha,</Text>
            <Text style={HomeStyles.welcomeText}>Welcome To XPress!</Text>
          </View>
          <View>
            <Image source={HomeImage} style={HomeStyles.homeImage} />
          </View>
        </LinearGradient>

        <View style={HomeStyles.bottomView}>
          <ScrollView style={{marginBottom: 50}}>

            {/* set bottom card view */}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                marginTop: 20,
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
              </TouchableOpacity>

              <TouchableOpacity style={HomeStyles.card}>
                <AntDesign name="profile" color={'#20DED2'} size={40} />
                <Text style={HomeStyles.cardText}>Selected Orders</Text>
              </TouchableOpacity>

              <TouchableOpacity style={HomeStyles.card}>
                <MaterialCommunityIcons
                  name="truck-check-outline"
                  color={'#20DED2'}
                  size={40}
                />
                <Text style={HomeStyles.cardText}>Ongoing Orders</Text>
              </TouchableOpacity>

              <TouchableOpacity style={HomeStyles.card}>
                <MaterialIcons name="done-all" color={'#20DED2'} size={40} />
                <Text style={HomeStyles.cardText}>Completed Orders</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity style={HomeStyles.earnView}>
                <View style={{flex:1,alignItems:'center'}}>
                <MaterialIcons
                  name="attach-money"
                  color={'#20DED2'}
                  size={80}
                />
                </View>
                <View style={{flex:1}}>
                <Text style={HomeStyles.earnText}>Total Earnings</Text>
                </View>
              </TouchableOpacity> */}
            </View>
          </ScrollView>
        </View>
      
    </View>
  );
};

export default HomeScreen;
