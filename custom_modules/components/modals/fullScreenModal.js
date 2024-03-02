import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import modalStyle from '../../styles/modals';
import check from '../../icons/check.png';

const FullScreenModal = props => {
  return (
    <Modal transparent={true} visible={props.showModal} animationType="fade">
      <View style={modalStyle.modalContainer}>
        <View style={modalStyle.modalTextContainer}>
          <View style={modalStyle.circle}>
            <Image source={check} />
          </View>
          <View>
            <Text style={modalStyle.subText}>{props.title}</Text>
          </View>
          <View>
            <Text style={modalStyle.mainText}>Successfully!</Text>
          </View>
          <View style={modalStyle.button}>
            <TouchableOpacity
              style={buttonStyles.textInputButton}
              onPress={props.function}>
              <Text style={buttonStyles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FullScreenModal;
const buttonStyles = StyleSheet.create({
  textInputButton: {
    height: 48,
    width: 300,
    backgroundColor: '#044B55',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '500',
  },
});
