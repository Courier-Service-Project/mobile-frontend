import React, {useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import logInImage from '../icons/logImage.png';
import textInputs from '../styles/textInputStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackendProcessButton from '../components/buttons';
import {useNavigation} from '@react-navigation/native';
import {NameInput, PasswordInput} from '../components/textInput';
import modalStyle from '../styles/modals';
import check from '../icons/check.png';
import {ResultModal} from '../components/modals/resultModal';
import {AppHeader} from '../components/appHeader';

const Login = () => {
  const window = useWindowDimensions();

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [resultModal, setResultModal] = useState(false);

  const forgotPasswordNavigation = () => {
    navigation.navigate('ForgotPasswordScreen1');
  };

  const nextNavigation = () => {
    setShowModal(false);
    navigation.navigate('BottomTabNavigator', {
      screen: 'HomeSreen',
    });
  };

  const sendData = async () => {
    userdata = {
      name,
      password,
    };

    try {
      const result = await axios.post(

        'http://10.10.27.131:9000/api/mobile/users/login',

        userdata,
      );
      const {success, message,token} = result.data;
      if (success == 200) {
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('userName', message[0].FirstName);
        AsyncStorage.setItem('branchLocation', message[0].branchLocation);
        AsyncStorage.setItem('user_id', message[0].BranchUser_id + '');
        axios.defaults.headers.common['Authorization']=`Bearer ${token}`
        setPassword('');
        setName('');
        {
          message[0].NewUser == 'T'
            ? navigation.navigate('ResetPassword')
            : setShowModal(true);
        }
      } else if (success == 101) {
        setResultModal(true);
        setModalMessage('Invalid Credentials');
        setName('');
        setPassword('');
      }
    } catch (error) {
      console.log(error.message);
      setModalMessage(error.message);
      setResultModal(true);
    }
  };

  const loginUser = () => {
    if (!name || !password) {
      setResultModal(true);
      setModalMessage('All the feilds must be filled');
    } else {
      sendData();
    }
  };

  return (
    <View style={style.loginContainer}>
      <View>
        <AppHeader />
      </View>
      <ScrollView>
        <View style={style.bodyTop}>
          <View style={style.bodyCircle}>
            <Image source={logInImage} />
          </View>
        </View>
        <View style={style.bodyMiddle}>
          <Text style={style.bodyMiddleText}>Welcome to XPress!</Text>
        </View>
        <View style={style.bodyBottom}>
          <View style={textInputs.textInputFeildContainer}>
            <View>
              <ResultModal
                show={resultModal}
                function={setResultModal}
                message={modalMessage}
              />
            </View>
            <NameInput title={'Enter name'} function={setName} value={name} />

            <View style={textInputs.textInputWrapper}>
              <PasswordInput
                title={'Enter Password'}
                function={setPassword}
                value={password}
              />
              <TouchableOpacity
                style={textInputs.forgotPasswordTextContainer}
                onPress={forgotPasswordNavigation}>
                <Text style={textInputs.forgotPasswordText}>
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 40}}>
              <BackendProcessButton title="Login" function={loginUser} />
            </View>
          </View>
        </View>
        <Modal transparent={true} visible={showModal} animationType="fade">
          <View style={modalStyle.modalContainer}>
            <View style={modalStyle.modalTextContainer}>
              <View style={modalStyle.circle}>
                <Image source={check} />
              </View>
              <View>
                <Text style={modalStyle.subText}>You have logged</Text>
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
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  loginContainer: {
    flex: 1,
    width: window.width,
    height: window.height,
  },
  bodyTop: {
    flex: 3,
    alignItems: 'center',
  },
  bodyCircle: {
    width: 250,
    height: 250,
    marginTop: 16,
    borderRadius: 125,
    backgroundColor: '#128F87',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bodyMiddle: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyMiddleText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
  },
  boddyMiddleText: {
    fontSize: 32,
    fontWeight: 700,
  },
  bodyBottom: {
    flex: 4,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
