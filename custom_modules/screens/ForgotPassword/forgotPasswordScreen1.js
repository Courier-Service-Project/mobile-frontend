import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import AppHeaderBackArrow from '../../components/appHeaderBackArrow';
import passwordResetStyles from '../../styles/passwordReset';
import mailImage from '../../icons/mailImage.png';
import textInputs from '../../styles/textInputStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {EmailInput, NameInput} from '../../components/textInput';
import BackendProcessButton from '../../components/buttons';
import {
  ResultModal,
  ResultModalSuccessNavigation,
} from '../../components/modals/resultModal';

//i have to start from here today
// from here i have sent an otp by mail to the relevant user.
// the i have get the otp from the backend to the frontend
// then i have to make the next inteface and get the otp and check it
// so i have stored otp and username inside asynchronous storage

const ForgotPasswordScreen1 = () => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const validateInputs = () => {
    console.log('im function');
    if (!name && !email) {
      setModalMessage('All the feilds are required');
      setShowModal(true);
      return false;
    } else if (!name) {
      setModalMessage('Name is Missing');
      setShowModal(true);
      return false;
    } else if (!email) {
      setModalMessage('Email is missing');
      setShowModal(true);
      return false;
    } else {
      return true;
    }
  };

  const screenNavigation = () => {
    setSuccessModal(false);
    navigation.navigate('ForgotPasswordScreen2');
  };

  const successProcess = results => {
    AsyncStorage.setItem('otp', results.data.message);
    AsyncStorage.setItem('userName', name);
    AsyncStorage.setItem('email', email);
    setSuccessModal(true);
    setModalMessage('Email is sent Successfully');
    setShow(false);
    setEmail('');
    setName('');
  };

  const verifyEmail = async () => {
    const body = {
      name,
      email,
    };
    if (validateInputs()) {
      setShow(true);
      try {
        const results = await axios.post(
          'http://192.168.43.137:9000/api/mobile/users/verifyEmail',
          body,
        );
        if (results.data.success == 200) {
          successProcess(results);
        } else if (results.data.success == 101) {
          setModalMessage(results.data.message);
          setShowModal(true);
          setShow(false);
        }
      } catch (error) {
        setModalMessage(error.message);
        setShowModal(true);
        setShow(false);
      }
    }
  };

  return (
    <View style={{flex: 1, width: window.width,height:window.height}}>
      <View>
        <AppHeaderBackArrow prevScreen={'Login'} />
      </View>
      <ScrollView>
        <ResultModal
          show={showModal}
          function={setShowModal}
          message={modalMessage}
        />

        <ResultModalSuccessNavigation
          show={showSuccessModal}
          function={screenNavigation}
          message={modalMessage}
        />
        <View style={passwordResetStyles.screenTop}>
          <Text style={passwordResetStyles.textTop}>Forgot Password</Text>
          <View style={passwordResetStyles.bodyCircle}>
            <Image source={mailImage} />
          </View>
          <View
            style={[
              passwordResetStyles.textDiscriptionContainer,
              {marginTop: 50},
            ]}>
            <Text style={passwordResetStyles.texDiscription}>
              {' '}
              Enter your email for the verification
            </Text>
            <Text style={passwordResetStyles.texDiscription}>
              process. We will send 4 digits
            </Text>
            <Text style={passwordResetStyles.texDiscription}>
              code to your email.
            </Text>
          </View>
        </View>
        <View style={passwordResetStyles.screenMiddle}>
          <View style={[textInputs.textInputFeildContainer, {marginTop: 50}]}>
            <NameInput title={'User Name'} function={setName} value={name} />

            <EmailInput title={'Email'} function={setEmail} value={email} />

            <View style={{marginTop: 70}}>
              <BackendProcessButton title={'SEND'} function={verifyEmail} />
            </View>
          </View>
        </View>
        <View style={passwordResetStyles.screenBottom}>
          <ActivityIndicator size={70} color="#0A4851" animating={show} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPasswordScreen1;
