import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  useWindowDimensions,
} from 'react-native';
import AppHeaderBackArrow from '../../components/appHeaderBackArrow';
import passwordResetStyles from '../../styles/passwordReset';
import textInputs from '../../styles/textInputStyles';
import BackendProcessButton from '../../components/buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {PasswordInput} from '../../components/textInput';
import resetPasswordImage from '../../icons/resetPassword.jpg';
import {
  ResultModal,
  ResultModalSuccess,
  ResultModalSuccessNavigation,
} from '../../components/modals/resultModal';

const ForgotPasswordScreen2 = () => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [show, setShow] = useState(false);
  const [showResultModal, setResultModal] = useState(false);
  const [showSuccessModalNavigation, setSuccessModalNavigation] =
    useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  //this is used to validate the otpfeild mainly
  //it checks if there's an empty feild
  const validateOtp = () => {
    if (!otp) {
      setModalMessage('OTP Feild should be filled');
      setResultModal(true);
      return false;
    } else {
      return true;
    }
  };

  //in here this  will delete the otp in async storage.
  const deleteOtp = async () => {
    const email = await AsyncStorage.getItem('email');
    try {
      const result = await axios.delete(
        `http://10.10.27.131:9000/api/mobile/users/deleteOtp/${email}`,
      );
      if ((result.data.success = 200)) {
        setModalMessage('Email Verified Successfully');
        setSuccessModalNavigation(true);
      } else if (result.data.success == 101) {
        setModalMessage(result.data.message);
        setResultModal(true);
      }else{
        setModalMessage(result.data.message);
        setResultModal(true);
      }
      console.log(result);
    } catch (error) {
      setModalMessage(error.message);
      setResultModal(true);
    }
  };

  const navigationScreen = () => {
    setSuccessModalNavigation(false);
    navigation.navigate('ForgotPasswordScreen3');
  };

  //in here this will get the otp once resend button is pressed
  const resendOtp = async () => {
    const email = await AsyncStorage.getItem('email');
    setShow(true);
    try {
      const result = await axios.get(
        `http://10.10.27.131:9000/api/mobile/users/resendOtp/${email}`,
      );
      if ((result.data.success == 200)) {
        setShow(false);
        setModalMessage('Your OTP is sent to ur email');
        setSuccessModal(true);
      } else if (result.data.success == 101) {
        setShow(false);
        setModalMessage(result.data.message);
        setResultModal(true);
      } else {
        setShow(false);
        setModalMessage(result.data.message);
        setResultModal(true);
      }
    } catch (error) {
      setShow(false);
      setModalMessage(error.message);
      setResultModal(true);
    }
  };

  const verifyOtp = async () => {
    if (validateOtp()) {
      let email = await AsyncStorage.getItem('email');
      try {
        const result = await axios.get(
          `http://10.10.27.131:9000/api/mobile/users/verifyOtp/${email}/${otp}`,
        );
        if (result.data.success == 200) {
          await deleteOtp();
        } else if (result.data.success == 101) {
          setModalMessage(result.data.message);
          setResultModal(true);
          console.log(result.data.message);
        } else {
          setModalMessage(result.data.message);
          setResultModal(true);
        }
      } catch (error) {
        console.log(error);
        setModalMessage(error.message);
        setResultModal(true);
      }
    }
  };

  return (
    <View style={{flex: 1, width: window.width, height: window.height}}>
      <View>
        <AppHeaderBackArrow prevScreen={'ForgotPasswordScreen1'} />
      </View>
      <ScrollView>
        <ResultModal
          show={showResultModal}
          message={modalMessage}
          function={setResultModal}
        />
        <ResultModalSuccess
          show={showSuccessModal}
          message={modalMessage}
          function={setSuccessModal}
        />
        <ResultModalSuccessNavigation
          show={showSuccessModalNavigation}
          message={modalMessage}
          function={navigationScreen}
        />
        <View style={passwordResetStyles.screenTop}>
          <Text style={passwordResetStyles.textTop}>Email Verification</Text>
        </View>

        <View style={{marginTop: 30, alignItems: 'center'}}>
          <Image
            source={resetPasswordImage}
            style={passwordResetStyles.topImageView}
          />
        </View>
        <View
          style={[passwordResetStyles.textSubTopicContainer, {marginTop: 10}]}>
          <Text style={passwordResetStyles.textSubTopic}>Get Your Code</Text>
        </View>
        <View
          style={[
            passwordResetStyles.textDiscriptionContainer,
            {marginTop: 0},
          ]}>
          <Text style={passwordResetStyles.texDiscription}>
            Enter the 4 digits code that
          </Text>
          <Text style={passwordResetStyles.texDiscription}>
            you received on your email.
          </Text>
        </View>
        <View style={[passwordResetStyles.screenMiddle, {marginTop: 20}]}>
          <View
            style={[
              textInputs.textInputFeildContainer,
              {height: 300, justifyContent: 'center'},
            ]}>
            <View style={textInputs.textInputWrapper}>
              <PasswordInput
                title={'Enter OTP'}
                function={setOtp}
                value={otp}
              />

              <View style={textInputs.textInputTextContainer}>
                <Text style={{color: '#82B8BF', fontSize: 17}}>
                  If you don’t receive code!
                </Text>
                <TouchableHighlight onPress={resendOtp}>
                  <Text style={{color: '#0A4851', fontSize: 17}}>Resend</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{marginTop: 50}}>
              <BackendProcessButton title={'Verify'} function={verifyOtp} />
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

export default ForgotPasswordScreen2;
