import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {AppHeader} from '../components/appHeader';
import ProfileStyles from '../styles/ProfileScreenStyles';

import BackendProcessButton from '../components/buttons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const navigationLogin = () => {
    navigation.navigate('Login');
  };
  const window = useWindowDimensions();

  return (
    <View style={{width: window.width, height: window.height}}>
      <AppHeader />
      <ScrollView style={{marginBottom: 50}}>
        <View style={ProfileStyles.topView}>
          <View>
            <Text style={ProfileStyles.profileText}>Profile</Text>
          </View>
          <TouchableOpacity style={ProfileStyles.profileimageView}>
            <Feather name="camera" color={'#fff'} size={27} />
          </TouchableOpacity>
        </View>

        <View style={ProfileStyles.bottomView}>
          <Text style={ProfileStyles.infoText}>Your Info</Text>

          <TouchableOpacity style={ProfileStyles.itemView}>
            <View>
              <View style={ProfileStyles.infoiconView}>
                <Ionicons name="person-outline" color={'#044B55'} size={25} />
              </View>
            </View>
            <View style={ProfileStyles.insidetextView}>
              <View>
                <Text style={ProfileStyles.titleText}>Full Name</Text>
                <View>
                  <Text style={ProfileStyles.valueText}>
                    Pramuditha Sadeepa
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <SimpleLineIcons
                  name="arrow-right"
                  color={'#044B55'}
                  size={16}
                  marginRight={15}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={ProfileStyles.itemView}>
            <View>
              <View style={ProfileStyles.infoiconView}>
                <Fontisto name="email" color={'#044B55'} size={25} />
              </View>
            </View>
            <View style={ProfileStyles.insidetextView}>
              <View>
                <Text style={ProfileStyles.titleText}>Email</Text>
                <View>
                  <Text style={ProfileStyles.valueText}>
                    mlpramuditha1@gmail.com
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <SimpleLineIcons
                  name="arrow-right"
                  color={'#044B55'}
                  size={16}
                  marginRight={15}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={ProfileStyles.itemView}>
            <View>
              <View style={ProfileStyles.infoiconView}>
                <Ionicons
                  name="phone-portrait-outline"
                  color={'#044B55'}
                  size={25}
                />
              </View>
            </View>
            <View style={ProfileStyles.insidetextView}>
              <View>
                <Text style={ProfileStyles.titleText}>Mobile Number</Text>
                <View>
                  <Text style={ProfileStyles.valueText}>0766022718</Text>
                </View>
              </View>
              <TouchableOpacity>
                <SimpleLineIcons
                  name="arrow-right"
                  color={'#044B55'}
                  size={16}
                  marginRight={15}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={ProfileStyles.itemView}>
            <View>
              <View style={ProfileStyles.infoiconView}>
                <MaterialCommunityIcons
                  name="cake-variant-outline"
                  color={'#044B55'}
                  size={25}
                />
              </View>
            </View>
            <View style={ProfileStyles.insidetextView}>
              <View>
                <Text style={ProfileStyles.titleText}>Birthday</Text>
                <View>
                  <Text style={ProfileStyles.valueText}>15 Nov 1999</Text>
                </View>
              </View>
              <TouchableOpacity>
                <SimpleLineIcons
                  name="arrow-right"
                  color={'#044B55'}
                  size={16}
                  marginRight={15}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={ProfileStyles.itemView}>
            <View>
              <View style={ProfileStyles.infoiconView}>
                <Octicons name="people" color={'#044B55'} size={25} />
              </View>
            </View>
            <View style={ProfileStyles.insidetextView}>
              <View>
                <Text style={ProfileStyles.titleText}>Gender</Text>
                <View>
                  <Text style={ProfileStyles.valueText}>Male</Text>
                </View>
              </View>
              <TouchableOpacity>
                <SimpleLineIcons
                  name="arrow-right"
                  color={'#044B55'}
                  size={16}
                  marginRight={15}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        <View style={ProfileStyles.bottomView}>
          <Text style={ProfileStyles.preferenceText}>Your Preferences</Text>

          <TouchableOpacity style={ProfileStyles.itemView}>
            <View>
              <View style={ProfileStyles.infoiconView}>
                <MaterialIcons name="language" color={'#044B55'} size={25} />
              </View>
            </View>
            <View style={ProfileStyles.insidetextView}>
              <View>
                <Text style={ProfileStyles.titleText}>Language</Text>
                <View>
                  <Text style={ProfileStyles.valueText}>English</Text>
                </View>
              </View>
              <TouchableOpacity>
                <SimpleLineIcons
                  name="arrow-right"
                  color={'#044B55'}
                  size={16}
                  marginRight={15}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={ProfileStyles.itemView}>
            <View>
              <View style={ProfileStyles.infoiconView}>
                <Ionicons name="settings-outline" color={'#044B55'} size={25} />
              </View>
            </View>
            <View style={ProfileStyles.insidetextView}>
              <View>
                <Text style={ProfileStyles.titleText}>Additional Settings</Text>
                <View>
                  <Text style={ProfileStyles.valueText}>Account</Text>
                </View>
              </View>
              <TouchableOpacity>
                <SimpleLineIcons
                  name="arrow-right"
                  color={'#044B55'}
                  size={16}
                  marginRight={15}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 25, marginBottom: 50}}>
          <BackendProcessButton title={'Log Out'} function={navigationLogin} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
