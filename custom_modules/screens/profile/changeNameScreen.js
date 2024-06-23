import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import AppHeaderBackArrow from '../../components/appHeaderBackArrow';
import BackendProcessButton from '../../components/buttons';
import validateName from '../../modules/Validations/nameValidation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResultModalSuccessNavigation } from '../../components/modals/resultModal';
import { useNavigation } from '@react-navigation/native';


const ChangeNameScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal,setShowSuccessModal]=useState(false);
  const navigation = useNavigation();

  const navigationProfile = () => {
    navigation.navigate('BottomTabNavigator',{screen:'ProfileScreen'});
  };
  const handleSave = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const validationMessage = validateName(firstName, lastName);

    if (validationMessage === true) {
      const name = {firstName, lastName};
      try {
        const response = await axios.patch(
          `http://10.10.27.131:9000/api/mobile/users/changeName/${user_id}`,
          name,
        );
        console.log(response.data.message);
        setErrorMessage(''); // Clear the error message if the request is successful
        //Alert.alert('Success', 'Name updated successfully');
        setShowSuccessModal(true);


      } catch (error) {
        console.log(error);
        setErrorMessage('An error occurred while updating the name.');
      }
    } else {
      
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
          <Text style={styles.titleText}>Enter your name</Text>
          <Text style={styles.subText}>
            This will be showing as your contact name
          </Text>
        </View>
        <View style={styles.nameContainer}>
            <View style={styles.nameInputContainer}>
              <Text style={styles.insidetext}>First Name</Text>
              <TextInput
                style={styles.insideValText}
                value={firstName}
                onChangeText={setFirstName}
              />
              <View>
              {errorMessage.substring(0,2)=="Fi" ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}
              </View>
              
            
          </View>
          <View style={styles.nameInputContainer}>
            <Text style={styles.insidetext}>Last Name</Text>
            <TextInput
              style={styles.insideValText}
              value={lastName}
              onChangeText={setLastName}
            />
            <View>
              {errorMessage.substring(0,2)=="La" ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}
              </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonView}>
        <BackendProcessButton title={'Save'} function={handleSave} />
      </View>

      <ResultModalSuccessNavigation
        show={showSuccessModal}
        message={'Name Updated Successfully'}
        function={navigationProfile}
      />
    </View>
  );
};

export default ChangeNameScreen;

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
  subText: {
    color: '#52919A',
    marginTop: 8,
    marginLeft: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    shadowOffset: {width: 0, height: 2},
  },
  nameInputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  insidetext: {
    fontSize: 18,
    color: '#044B55',
  },
  insideValText: {
    color: '#52919A',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#52919A',
    marginTop: 5,
    paddingBottom: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonView: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
