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
    try {
      await AsyncStorage.removeItem('otp');
      console.log('item removed');
    } catch (e) {
      return false;
    }
  };

  const navigationScreen = () => {
    setSuccessModalNavigation(false);
    navigation.navigate('ForgotPasswordScreen3');
  };

  //in here this will get the otp once resend button is pressed
  const resendOtp = async () => {
    deleteOtp();
    const email = await AsyncStorage.getItem('email');
    setShow(true);
    try {
      const result = await axios.post(

        'http://10.10.27.131:9000/api/mobile/users/resendOtp',

        {email},
      );
      setShow(false);
      AsyncStorage.setItem('otp', result.data.message);
      setModalMessage('Your OTP is sent to ur email');
      setSuccessModal(true);
    } catch (error) {
      setShow(false);
      setModalMessage(error.message);
      setResultModal(true);
    }
  };

  const verifyOtp = async () => {
    const backendOtp = await AsyncStorage.getItem('otp');
    if (validateOtp()) {
      if (backendOtp == otp) {
        setModalMessage('Email Verified Successfully');
        setSuccessModalNavigation(true);
      } else {
        setModalMessage('OTP is not correct.Try Again!');
        setResultModal(true);
      }
    }
  };

  return (
    <View style={{flex: 1,width:window.width,height:window.height}}>
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
       
          <View style={{marginTop:30,alignItems:'center'}}>
          <Image source={resetPasswordImage}style={passwordResetStyles.topImageView} />
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
