import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AppHeaderBackArrow from '../../components/appHeaderBackArrow';
import BackendProcessButton from '../../components/buttons';

const ChangeGenderScreen = () => {
  return (
    <View>
      <View>
        <AppHeaderBackArrow prevScreen={'BottomTabNavigator'} />
      </View>
      <View>
        <View style={styles.profileView}>
          <Text style={styles.profileText}>Profile</Text>
        </View>
        <Text style={styles.titleText}>Select Gender</Text>
        <Text style={styles.subText}>Please select your gender</Text>
      </View>
      <View style={styles.valueContainer}>
        <View style={styles.InputContainer}>
          <TouchableOpacity>
            <Text style={styles.insidetext}>FEMALE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.InputContainer}>
          <TouchableOpacity>
            <Text style={styles.insidetext}>MALE</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View>
        <BackendProcessButton title={'Save'} />
      </View> */}
    </View>
  );
};

export default ChangeGenderScreen;

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
  subText: {
    color: '#52919A',
    marginTop: 8,
    marginLeft: 20,
    fontSize: 18,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  InputContainer: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  insidetext: {
    fontSize: 18,
    color: '#044B55',
  },
});
