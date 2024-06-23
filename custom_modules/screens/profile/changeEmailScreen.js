import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import AppHeaderBackArrow from '../../components/appHeaderBackArrow';
import BackendProcessButton from '../../components/buttons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResultModalSuccessNavigation } from '../../components/modals/resultModal';
import { useNavigation } from '@react-navigation/native';
import validateEmail from '../../modules/Validations/emailValidation';

const ChangeEmailScreen = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigation = useNavigation();

  

  const navigationProfile = () => {
    navigation.navigate('BottomTabNavigator',{screen:'ProfileScreen'});
  };

  const handleSave = async () => {
    const validationMessage=validateEmail(email)
    console.log(email)

    if (validationMessage === true) {
      const user_id = await AsyncStorage.getItem('user_id');
      console.log(email);
      const email1 = { email: email };
      
      try {
        const response = await axios.patch(
          `http://10.10.27.131:9000/api/mobile/users/updateEmail/${user_id}`,
          email1
        );
        console.log(response.data.message);
        setErrorMessage(''); // Clear the error message if the request is successful
        setShowSuccessModal(true);
      } catch (error) {
        console.log(error);
        setErrorMessage('An error occurred while updating the email.');
      }
    } else {
      console.log(email);
      setErrorMessage(validationMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <AppHeaderBackArrow prevScreen={'BottomTabNavigator'} />
      </View>
      <View>
        <View style={styles.profileView}>
          <Text style={styles.profileText}>Profile</Text>
        </View>
        <View>
          <Text style={styles.titleText}>Change your e-mail here</Text>
          <View style={styles.emailContainer}>
            <TextInput
              placeholder='Add E-mail'
              style={styles.textinput}
              value={email}
              onChangeText={setEmail}
            />
            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.buttonView}>
        <BackendProcessButton title={'Save'} function={handleSave} />
      </View>
      <ResultModalSuccessNavigation
        show={showSuccessModal}
        message={'Email Updated Successfully'}
        function={navigationProfile}
      />
    </View>
  );
};

export default ChangeEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  emailContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    backgroundColor: '#ffffff',
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
    shadowOffset: { width: 0, height: 2 },
  },
  textinput: {
    fontSize: 18,
    color: '#52919A',
  },
  buttonView: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
