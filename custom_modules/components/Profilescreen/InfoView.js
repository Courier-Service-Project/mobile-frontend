import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const HomecardView = props => {
  return (
    <View>
      <TouchableOpacity style={styles.cardView}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
          <View style={styles.cardInsideView}>
            <Image source={props.icon} />
          </View>
          <View style={styles.cardTextView}>
            <Text style={styles.cardNameText}>{props.name}</Text>
            <View>
              <Text style={styles.cardValueText}>{props.value}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomecardView;

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: '#CEF3F3',
    width: 388,
    height: 62,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
    shadowColor: '#12ABA2',
    elevation: 10,
    // shadowOpacity: 0.1,
  },
  cardInsideView: {
    backgroundColor: '#20DED2',
    width: 80,
    height: 62,
    borderRadius: 20,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardNameText: {
    alignSelf: 'center',
    marginHorizontal: 10,
    fontSize: 22,
    fontWeight: '500',
    color: '#044B55',
  },
  cardValueText: {
    alignSelf: 'center',
    marginHorizontal: 10,
    fontSize: 22,
    fontWeight: '500',
    color: '#044B55',
  },
  cardTextView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
});
