import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import {AppHeader} from '../components/appHeader';
import ProfileStyles from '../styles/ProfileScreenStyles';
import BackendProcessButton from '../components/buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import imagePlaceHolder from '../icons/addPhoto.png';
import Modal from 'react-native-modal';
import {ResultModalSuccess} from '../components/modals/resultModal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(ProfileStyles.addIcon);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [updateSuccessVisible, setUpdateSuccessVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const window = useWindowDimensions();
  const isFocousedProfile=useIsFocused()

  const navigationLogin = () => {
    navigation.navigate('Login');
  };

  const imagePick = () => {
    setIsModalVisible(false);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setProfile(image.path);
      setProfilePic(ProfileStyles.profileImage); // Set the profile pic styles after selecting image
      setUpdateSuccessVisible(true);
    });
  };

  const confirmDelete = () => {
    deleteProfilePic();
    setDeleteConfirmationVisible(true);
  };

  const deleteProfilePic = () => {
    setIsModalVisible(false);
    setProfile(null); // Clear the profile state to delete the profile picture
    setProfilePic(ProfileStyles.addIcon); // Reset the image style to default
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if(isFocousedProfile){
      console.log("im inside use effect");
    getProfileDetails();
    }
    
  }, [isFocousedProfile]);

  const getProfileDetails = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const result = await axios.get(
        `http://10.10.27.131:9000/api/mobile/users/getProfileDetails/${user_id}`,
      );
      console.log(result.data.message[0]);
      setUserData(result.data.message[0]);
    } catch (error) {
      console.log(error.message);
    }
  };



  const changeNameNavigation=()=>{
    navigation.navigate('ChangeNameScreen')
  }

  const ChangeEmailNavigation=()=>{
    navigation.navigate('ChangeEmailScreen')
  }

  const ChangeMobileNavigation=()=>{
    navigation.navigate('ChangeMobileScreen')
  }

  const ChangeDOBNavigation =()=>{
    navigation.navigate('ChangeDOBScreen')
  }

  const ChangeGenderNavigation =()=>{
    navigation.navigate('ChangeGenderScreen')
  }

  return (
    <View style={{width: window.width, height: window.height}}>
      <View>
        <AppHeader />
      </View>
      <ScrollView style={{marginBottom: 50}}>
        <View style={ProfileStyles.topView}>
          <View>
            <Text style={ProfileStyles.profileText}>Profile</Text>
          </View>
          <TouchableOpacity
            style={ProfileStyles.profileimageView}
            onPress={toggleModal}>
            <Image
              style={profilePic}
              source={profile ? {uri: profile} : imagePlaceHolder}
            />
          </TouchableOpacity>
        </View>

        <Modal isVisible={isModalVisible} style={ProfileStyles.modal}>
          <View style={ProfileStyles.modalContent}>
            <TouchableOpacity
              onPress={imagePick}
              style={ProfileStyles.modalItem}>
              <Text style={ProfileStyles.modalText}>Select From Photos</Text>
            </TouchableOpacity>

            {profile && (
              <TouchableOpacity
                onPress={confirmDelete}
                style={ProfileStyles.modalItem}>
                <Text style={[ProfileStyles.modalText, {color: 'red'}]}>
                  Remove Photo
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={toggleModal}
              style={ProfileStyles.modalItem}>
              <Text style={ProfileStyles.modalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <ResultModalSuccess
          show={updateSuccessVisible}
          message="Successfully updated the profile picture!"
          function={setUpdateSuccessVisible}
        />

        <ResultModalSuccess
          show={deleteConfirmationVisible}
          message="Successfully deleted the profile picture!"
          function={setDeleteConfirmationVisible}
        />

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
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                  <Text style={ProfileStyles.valueText}>
                    {userData.FirstName} {userData.LastName}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={()=>{changeNameNavigation()}}>
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
                  <Text style={ProfileStyles.valueText}>{userData.Email}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={()=>{ChangeEmailNavigation()}}>
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
                  <Text style={ProfileStyles.valueText}>{userData.Mobile}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={()=>{ChangeMobileNavigation()}}>
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
                  <Text style={ProfileStyles.valueText}>
                    {`${new Date(userData.DOB).getFullYear().toString()}-${(new Date(userData.DOB).getMonth()+1).toString()}-${new Date(userData.DOB).getDate().toString()}`}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={()=>{ChangeDOBNavigation()}} >
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
                  <Text style={ProfileStyles.valueText}>{userData.Gender}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={ChangeGenderNavigation}>
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
