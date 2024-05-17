import {StyleSheet} from 'react-native';

const ProfileStyles = StyleSheet.create({
  topView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginHorizontal: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 30,
    fontWeight: '500',
    color: '#044B55',
  },
  infoText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#044B55',
    marginHorizontal: 25,
    margin: 6,
  },

  profileimageView: {
    backgroundColor: '#044B55',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  addIcon: {
    width: 30,
    height: 30,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#52919A',
    margin: 10,
    borderRadius: 40,
  },
  modalText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '400',
  },

  bottomView: {
    borderWidth: 0.1,
    borderColor: '#52919A',
    borderRadius: 30,
    borderBottomWidth: 0,
    borderLeftWidth: 0.1,
    borderRightWidth: 0.1,
    marginTop: 15,
    //backgroundColor:'#fff'
  },
  preferenceText: {
    fontSize: 22,
    fontWeight: '400',
    color: '#044B55',
    marginHorizontal: 25,
    margin: 6,
  },
  infoiconView: {
    //backgroundColor: '#20DED2',
    width: 60,
    height: 45,
    borderRadius: 26,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemView: {
    borderColor: '#B9DADA',
    borderWidth: 1.5,
    borderRadius: 30,
    height: 52,
    marginHorizontal: 8,
    margin: 7,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#044B55',
    marginHorizontal: 10,
  },
  valueText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#52919A',
    marginHorizontal: 10,
  },
  insidetextView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default ProfileStyles;
