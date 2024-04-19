import React, {useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import AppHeaderBackArrow from '../../components/appHeaderBackArrow';
import passwordResetStyles from '../../styles/passwordReset';
import textInputs from '../../styles/textInputStyles';
import BackendProcessButton from '../../components/buttons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import modalStyle from '../../styles/modals';
import check from '../../icons/check.png';
import {PasswordInput} from '../../components/textInput';
import {ResultModal} from '../../components/modals/resultModal';
import validatePaasword from '../../modules/Validations/passwordValidation';
import passwordLock from '../../icons/passwordLock.png';

const ForgotPasswordScreen3 = () => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inputErrorMessage, setInputErrorMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [resultModal, setResultModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const nextNavigation = () => {
    navigation.navigate('Login');
  };

  const deleteAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem('otp');
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('email');
    } catch (e) {
      console.log(e);
    }
  };

  const savePassword = async () => {
    const user = await AsyncStorage.getItem('userName');
    if (!newPassword || !confirmPassword) {
      setModalMessage('All the feilds must be filled');
      setResultModal(true);
    } else {
      let result = validatePaasword(newPassword);
      if (result != true) {
        setInputErrorMessage(result);
        result = false;
      }
      if (result) {
        if (newPassword == confirmPassword) {
          const body = {
            name: user,
            password: newPassword,
          };
          try {
            const result = await axios.patch(
              `http://192.168.245.137:9000/api/mobile/users/resetForgotPassword`,
              body,
            );
            if (result.data.success == 200) {
              deleteAsyncStorage();
              setShowModal(true);
            }
          } catch (error) {
            setModalMessage(error.message);
            setResultModal(true);
          }
        } else {
          setModalMessage('Passwords are mismatching');
          setResultModal(true);
        }
      }
    }
  };

  return (
    <View style={{flex: 1, width: window.width,height:window.height}}>
      <View>
        <AppHeaderBackArrow prevScreen={'ForgotPasswordScreen2'} />
      </View>
      <ResultModal
        show={resultModal}
        message={modalMessage}
        function={setResultModal}
      />
      <ScrollView>
        <View style={passwordResetStyles.screenTop}>
          <Text style={passwordResetStyles.textTop}>Reset Password</Text>

        <View style={{marginTop:30,alignItems:'center'}}>
          <Image source={passwordLock}style={passwordResetStyles.topImageView} />
        </View>
        
          <View style={[passwordResetStyles.textSubTopicContainer]}>
            <Text style={passwordResetStyles.textSubTopic}>
              Enter New Password
            </Text>
          </View>
          <View
            style={[
              passwordResetStyles.textDiscriptionContainer,
              {marginTop: 0},
            ]}>
            <Text style={passwordResetStyles.texDiscription}>
              Your new password must be
            </Text>
            <Text style={passwordResetStyles.texDiscription}>
              different from previously
            </Text>
            <Text style={passwordResetStyles.texDiscription}>
              used password.
            </Text>
          </View>
        </View>
        <Modal transparent={true} visible={showModal} animationType="fade">
          <View style={modalStyle.modalContainer}>
            <View style={modalStyle.modalTextContainer}>
              <View style={modalStyle.circle}>
                <Image source={check} />
              </View>
              <View>
                <Text style={modalStyle.subText}>
                  Your Password has been reset
                </Text>
              </View>
              <View>
                <Text style={modalStyle.mainText}>Successfully!</Text>
              </View>
              <View style={modalStyle.button}>
                <BackendProcessButton
                  title={'continue'}
                  function={nextNavigation}
                />
              </View>
            </View>
          </View>
        </Modal>
        <View style={[passwordResetStyles.screenMiddle, {marginTop: 50,marginBottom:50}]}>
          <View style={textInputs.textInputFeildContainer}>
            <TouchableOpacity onPress={() => setInputErrorMessage('')}>
              <View style={{flexDirection: 'column', flexWrap: 'wrap'}}>
                <PasswordInput
                  title={'New Password'}
                  function={setNewPassword}
                  value={newPassword}
                />
                <View>
                  <Text style={{color: 'red', marginLeft: 13, fontSize: 18}}>
                    {inputErrorMessage}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <PasswordInput
              title={'Confirm Password'}
              function={setConfirmPassword}
              value={confirmPassword}
            />

            <View style={{marginTop: 50}}>
              <BackendProcessButton title={'Save'} function={savePassword} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPasswordScreen3;
