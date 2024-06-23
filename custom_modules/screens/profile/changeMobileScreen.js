import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import AppHeaderBackArrow from '../../components/appHeaderBackArrow';
import BackendProcessButton from '../../components/buttons';
import {ResultModalSuccessNavigation} from '../../components/modals/resultModal';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import validatePhoneNumber from '../../modules/Validations/mobileNumberValidation';

const ChangeMobileScreen = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigationProfile = () => {
    navigation.navigate('BottomTabNavigator', {screen: 'ProfileScreen'});
  };

  const handleSave = async () => {
    const validationMessage = validatePhoneNumber(mobile);
    console.log(mobile);

    if (validationMessage === true) {
      const user_id = await AsyncStorage.getItem('user_id');
      const Mobile = {mobile: mobile};

      try {
        const result = await axios.patch(
          `http://10.10.27.131:9000/api/mobile/users/updateMobile/${user_id}`,
          Mobile,
        );
        console.log(result.data.message);
        setErrorMessage('');
        setShowSuccessModal(true);
      } catch (error) {
        setErrorMessage('An error occurred while updating the mobile number.');
      }
    } else {
      console.log(mobile);
      setErrorMessage(validationMessage);
    }
  };

  return (
    <View>
      <View>
        <AppHeaderBackArrow prevScreen={'BottomTabNavigator'} />
      </View>
      <View>
        <View style={styles.profileView}>
          <Text style={styles.profileText}>Profile</Text>
        </View>
        <View>
          <Text style={styles.titleText}>Enter your mobile number </Text>
          <View style={styles.numberContainer}>
            <TextInput
              placeholder="Add mobile number"
              style={styles.textinput}
              keyboardType="numeric"
              value={mobile}
              onChangeText={setMobile}
            />
            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
          </View>
        </View>
      </View>
      <View>
        <BackendProcessButton title={'Save'} function={handleSave} />
      </View>
      <ResultModalSuccessNavigation
        show={showSuccessModal}
        message={'Number Updated Successfully'}
        function={navigationProfile}
      />
    </View>
  );
};

export default ChangeMobileScreen;

const styles = StyleSheet.create({
  profileView: {
    margin: 20,
    marginBottom: 15,
  },
  profileText: {
    fontSize: 30,
    fontWeight: '500',
    color: '#044B55',
  },
  titleText: {
    fontSize: 20,
    color: '#044B55',
    marginLeft: 20,
  },
  numberContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    backgroundColor: '#fffffff',
    borderRadius: 20,
    margin: 20,
    padding: 20,
    paddingBottom: 30,
    shadowColor: '#D8FDFB',
    shadowRadius: 4,
    elevation: 5,
    shadowOpacity: 0.25,
    borderWidth: 3,
    borderColor: '#128F87',
    borderBottomWidth: 0,
    shadowOffset: {width: 0, height: 2},
  },
  textinput: {
    fontSize: 18,
    color: '#52919A',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
