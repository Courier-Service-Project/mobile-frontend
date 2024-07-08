import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {AppHeader} from '../components/appHeader';
import ProfileStyles from '../styles/ProfileScreenStyles';
import BackendProcessButton from '../components/buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import imagePlaceHolder from '../icons/addPhoto.png';
import Modal from 'react-native-modal';
import {
  ResultModal,
  ResultModalSuccess,
  QuestionModal,
} from '../components/modals/resultModal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [modalMessage, setModalMessage] = useState('');
  const [showErrorModal, setshowErrorModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteConfirmationVisible, setDeleteSuccessVisible] = useState(false);
  const [updateSuccessVisible, setUpdateSuccessVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const window = useWindowDimensions();
  const isFocousedProfile = useIsFocused();

  const navigationLogin = () => {
    navigation.navigate('Login');
  };

  const imagePick = async () => {
    setIsModalVisible(false);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      console.log(image);
      try {
        await uploadImage(image);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(()=>{
    console.log(`userData state has changed ${userData}`);
    console.log(userData.profileImageUrl)
    AsyncStorage.removeItem('profileImageUrl');
    if(userData.profileImageUrl==null){
      AsyncStorage.setItem('profileImageUrl', 'NIF')
    }else{
      AsyncStorage.setItem('profileImageUrl', userData.profileImageUrl)
    }
    
  },[userData])

  const uploadImage = async image => {
    setIsImageLoading(true);
    const formData = new FormData();
    formData.append('myimage', {
      uri: image.path,
      name: 'profile.jpg',
      type: image.mime,
    });

    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const result = await axios.post(
        `http://10.10.27.131:9000/api/mobile/users/uploadImage/${user_id}`,
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );
      if (result.data.success == 200) {
        await getProfileDetails();
        setUpdateSuccessVisible(true);
        setModalMessage(result.data.message);
      } else if (result.data.success == 101) {
        console.log(result.data.message);
        setModalMessage(result.data.message);
        setshowErrorModal(true);
      } else {
        setModalMessage(result.data.message);
        setshowErrorModal(true);
      }
    } catch (error) {
      console.log(error.message);
      setModalMessage(error.message);
      setshowErrorModal(true);
    } finally {
      setIsImageLoading(false);
    }
  };

  const deleteImage = async () => {
    setShowQuestionModal(false);
    setIsImageLoading(true);
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const result = await axios.delete(
        `http://10.10.27.131:9000/api/mobile/users/deleteImage/${user_id}`,
      );
      if (result.data.success == 200) {
        console.log(result.data.message);
        await getProfileDetails();
        await AsyncStorage.removeItem('profileImageUrl');
        await AsyncStorage.setItem('profileImageUrl', 'NIF');
        setUpdateSuccessVisible(true);
        setModalMessage(result.data.message);
      } else if (result.data.success == 101) {
        console.log(result.data.message);
        setModalMessage(result.data.message);
        setshowErrorModal(true);
      } else {
        setModalMessage(result.data.message);
        setshowErrorModal(true);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleDelete = () => {
    setModalMessage('Are you sure you want to delete profile image?');
    setShowQuestionModal(true);
    setIsModalVisible(false);
  };

  const confirmDelete = async () => {
    setIsModalVisible(false);
    setShowQuestionModal(false);
    await deleteImage();
  };

  const cancelDelete = () => {
    setShowQuestionModal(false);
    setIsModalVisible(false);
  };

  const imageSelectModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (isFocousedProfile) {
      setIsScreenLoading(true);
      getProfileDetails();
    }
  }, [isFocousedProfile]);

  const getProfileDetails = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const result = await axios.get(
        `http://10.10.27.131:9000/api/mobile/users/getProfileDetails/${user_id}`,
      );
      //console.log(result.data.message[0]);
      await setUserData(result.data.message[0]);
      setIsScreenLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsScreenLoading(false);
    }
  };

  const changeNameNavigation = () => {
    navigation.navigate('ChangeNameScreen');
  };

  const ChangeEmailNavigation = () => {
    navigation.navigate('ChangeEmailScreen');
  };

  const ChangeMobileNavigation = () => {
    navigation.navigate('ChangeMobileScreen');
  };

  const ChangeDOBNavigation = () => {
    navigation.navigate('ChangeDOBScreen');
  };

  return (
    <View style={{width: window.width, height: window.height}}>
      <View>
        <AppHeader />
      </View>

      <Modal isVisible={isScreenLoading}>
        <View style={ProfileStyles.activityIndicatorModal}>
          <ActivityIndicator size={40} />
          <Text style={{color: '#fff', fontSize: 14}}>Loading ...</Text>
        </View>
      </Modal>

      <ScrollView style={{marginBottom: 50}}>
        <View style={ProfileStyles.topView}>
          <View>
            <Text style={ProfileStyles.profileText}>Profile</Text>
          </View>
          <TouchableOpacity
            style={ProfileStyles.profileimageView}
            onPress={imageSelectModal}>
            <Image
              style={
                userData.profileImageUrl
                  ? ProfileStyles.profileImage
                  : ProfileStyles.addIcon
              }
              source={
                userData.profileImageUrl
                  ? {uri: userData.profileImageUrl}
                  : imagePlaceHolder
              }
            />
          </TouchableOpacity>
        </View>

        <Modal isVisible={isImageLoading}>
          <View style={ProfileStyles.activityIndicatorModal}>
            <ActivityIndicator size={40} />
            <Text style={{color: '#fff', fontSize: 14}}>Loading ...</Text>
          </View>
        </Modal>

        <Modal isVisible={isModalVisible} style={ProfileStyles.modal}>
          <View style={ProfileStyles.modalContent}>
            <TouchableOpacity
              onPress={imagePick}
              style={ProfileStyles.modalItem}>
              <Text style={ProfileStyles.modalText}>Select From Photos</Text>
            </TouchableOpacity>

            {userData.profileImageUrl && (
              <TouchableOpacity
                onPress={handleDelete}
                style={ProfileStyles.modalItem}>
                <Text style={[ProfileStyles.modalText, {color: 'red'}]}>
                  Remove Photo
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={imageSelectModal}
              style={ProfileStyles.modalItem}>
              <Text style={ProfileStyles.modalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <ResultModalSuccess
          show={updateSuccessVisible}
          message={modalMessage}
          function={setUpdateSuccessVisible}
        />

        <ResultModalSuccess
          show={deleteConfirmationVisible}
          message={modalMessage}
          function={setDeleteSuccessVisible}
        />

        <ResultModal
          show={showErrorModal}
          message={modalMessage}
          function={setshowErrorModal}
        />

        <QuestionModal
          show={showQuestionModal}
          message={modalMessage}
          function={confirmDelete}
          cancelFunction={cancelDelete}
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
              <TouchableOpacity
                onPress={() => {
                  changeNameNavigation();
                }}>
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
              <TouchableOpacity
                onPress={() => {
                  ChangeEmailNavigation();
                }}>
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
              <TouchableOpacity
                onPress={() => {
                  ChangeMobileNavigation();
                }}>
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
                    {`${new Date(userData.DOB).getFullYear().toString()}-${(
                      new Date(userData.DOB).getMonth() + 1
                    ).toString()}-${new Date(userData.DOB)
                      .getDate()
                      .toString()}`}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  ChangeDOBNavigation();
                }}>
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
