import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import errorIcon from '../../icons/errorIcon.png';
import rightImage from '../../icons/rightImage.png';

const ResultModal = props => {
  return (
    <Modal transparent={true} visible={props.show} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View style={style.modalContainer}>
          <Image source={errorIcon} style={{width: 70, height: 70}} />
          <Text style={style.resultText}>Error !</Text>
          <View>
            <Text style={style.subText}>{props.message}</Text>
          </View>
          <TouchableOpacity
            style={style.button}
            onPress={() => props.function(false)}>
            <Text style={style.textButton}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const ResultModalSuccess = props => {
  return (
    <Modal transparent={true} visible={props.show} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View style={style.modalContainer}>
          <Image source={rightImage} style={{width: 70, height: 70}} />
          <Text style={style.resultText}>Success !</Text>
          <View>
            <Text style={style.subText}>{props.message}</Text>
          </View>
          <TouchableOpacity
            style={style.button}
            onPress={() => props.function(false)}>
            <Text style={style.textButton}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const ResultModalSuccessNavigation = props => {
  return (
    <Modal transparent={true} visible={props.show} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View style={style.modalContainer}>
          <Image source={rightImage} style={{width: 70, height: 70}} />
          <Text style={style.resultText}>Success !</Text>
          <View>
            <Text style={style.subText}>{props.message}</Text>
          </View>
          <TouchableOpacity style={style.button} onPress={props.function}>
            <Text style={style.textButton}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export {ResultModal, ResultModalSuccessNavigation, ResultModalSuccess};

const style = StyleSheet.create({
  modalContainer: {
    padding: 30,
    width: 370,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    shadowColor: '#D8FDFB',
    elevation: 20,
    shadowOpacity: 0.9,
    borderWidth: 5,
    borderColor: '#D8FDFB',
    borderBottomWidth: 0,
    shadowOffset: {width: 0, height: 2},
  },
  resultText: {
    marginTop: 10,
    color: '#044D55',
    fontSize: 28,
    fontWeight: '600',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#0A4851',
    width: 300,
    height: 35,
    borderRadius: 30,
    justifyContent: 'center',
  },
  textButton: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '400',
  },
  subText: {
    marginTop: 20,
    color: '#044B55',
    fontSize: 20,
    fontWeight: '400',
  },
});
