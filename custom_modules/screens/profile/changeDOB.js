import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppHeaderBackArrow from '../../components/appHeaderBackArrow';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const ChangeDOBScreen = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onChange = async (event, selectedDate) => {
    const user_id = await AsyncStorage.getItem('user_id');
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    

    try {
      const dob={
        currentDate  
      }
      const result = await axios.patch(
        `http://10.10.27.131:9000/api/mobile/users/updateDob/${user_id}`,dob
      );
      console.log(result.data.message);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('An error occurred while updating the birthday.');
      console.log(error.message);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <View>
        <AppHeaderBackArrow prevScreen={'BottomTabNavigator'} />
      </View>
      <View style={styles.profileView}>
        <Text style={styles.profileText}>Profile</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={{flexDirection: 'row', margin: 20}}>
            <Text style={styles.titleText}>Select your birthday</Text>
            <TouchableOpacity onPress={showDatepicker}>
              <FontAwesome6
                name="calendar-days"
                color={'#128F87'}
                size={26}
                marginRight={15}
              />
            </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
              onTouchCancel={() => setShow(false)}
            />
          )}
          <View>
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChangeDOBScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 20,
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
  content: {
    padding: 20,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    color: '#044B55',
    marginLeft: 20,
    marginRight: 30,
  },
  profileText: {
    fontSize: 30,
    fontWeight: '500',
    color: '#044B55',
    margin: 20,
  },
  selectedDateText: {
    fontSize: 18,
    color: '#044B55',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
