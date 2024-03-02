import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import passwordResetStyles from '../styles/passwordReset';
import AppHeaderBackArrow from '../components/appHeaderBackArrow';
import textInputs from '../styles/textInputStyles';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import validatePaasword from '../modules/Validations/passwordValidation';
import {PasswordInput} from '../components/textInput';
import BackendProcessButton from '../components/buttons';
import FullScreenModal from '../components/modals/fullScreenModal';
import { ResultModal } from '../components/modals/resultModal';


const ResetPassword = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showResultModal, setResultModal] = useState(false);
  const [modalMessage, setModalMessage] = useState();
  const [inputFeldErrorMessage, setInputFeildErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigationScreen = () => {
    navigation.navigate('Login');
  };

  const sendData = async () => {
    let token = await AsyncStorage.getItem('token');
    let userName = await AsyncStorage.getItem('userName');
    console.log(token);
    const data = {
      token,
      oldPassword,
      newpassword,
      userName,
    };
    try {
      const result = await axios.patch(
        'http://10.10.13.237:9000/api/mobile/users/resetPassword',
        data,
      );
      if (result.data.success == 200) {
        setShowModal(true);
      } else if (result.data.success == 101) {
        setResultModal(true);
        setModalMessage('Old password is not correct');
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      }
    } catch (error) {
      setModalMessage(error.message);
    }
  };

  const resetPassword = () => {
    console.log('hello world');
    if (!oldPassword || !newpassword || !confirmNewPassword) {
      setResultModal(true);
      setModalMessage('All the feilds must be filled!');
      //Alert.alert('All the feilds must be filled!');
    } else {
      var result = validatePaasword(newpassword);
      setInputFeildErrorMessage(result);
      if (result != true) {
        result = false;
      }
      if (result) {
        if (newpassword == confirmNewPassword) {
          sendData();
        } else {
          setResultModal(true);
          setModalMessage('Passwords are mismatched');
          //Alert.alert('New Password is not correct!');
        }
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <FullScreenModal
        title={'Password has been reset'}
        function={navigationScreen}
        showModal={showModal}
      />
      <View>
        <AppHeaderBackArrow prevScreen={'Login'} />
      </View>
      <ScrollView>
        <View style={passwordResetStyles.screenTop}>
          <Text style={passwordResetStyles.textTop}>Change Password</Text>
          <View style={passwordResetStyles.textDiscriptionContainer}>
            <Text style={passwordResetStyles.texDiscription}>
              You must reset your password
            </Text>
            <Text style={passwordResetStyles.texDiscription}>
              in your first login
            </Text>
          </View>
        </View>
        <ResultModal
          show={showResultModal}
          message={modalMessage}
          function={setResultModal}
        />
        <View style={[passwordResetStyles.screenMiddle, {marginTop: 40}]}>
          <View style={textInputs.textInputFeildContainer}>
            <PasswordInput
              title={'Old Password'}
              function={setOldPassword}
              value={oldPassword}
            />
            <TouchableOpacity onPress={() => setInputFeildErrorMessage('')}>
              <View style={{flexDirection: 'column', flexWrap: 'wrap'}}>
                <PasswordInput
                  title={'New Password'}
                  function={setNewPassword}
                  value={newpassword}
                />

                <View>
                  <Text style={{color: 'red', marginLeft: 13, fontSize: 18}}>
                    {inputFeldErrorMessage}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <PasswordInput
              title={'Confirm Password'}
              function={setConfirmNewPassword}
              value={confirmNewPassword}
            />
            <View style={{marginTop: 60}}>
              <BackendProcessButton
                title="Reset Password"
                function={resetPassword}
              />
            </View>
          </View>
        </View>
        <View style={passwordResetStyles.screenBottom}></View>
      </ScrollView>
    </View>
  );
};

export default ResetPassword;
