import {StyleSheet} from 'react-native';

const passwordResetStyles = StyleSheet.create({
  screenTop: {
    flex: 3,
    alignItems: 'center',
  },
  textTop: {
    color: '#044B55',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 25,
    flexWrap: 'wrap',
  },
  textDiscriptionContainer: {
    marginTop: 70,
  },
  texDiscription: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'black',
  },
  textSubTopicContainer:{
    marginTop:50,
  },
  textSubTopic:{
    color:"#044B55",
    fontWeight:"400",
    fontSize:30,
    alignSelf:"center"
  },
  screenMiddle: {
    flex: 4,
  },
  screenBottom: {
    flex: 1,
  },
  bodyCircle: {
    width: 140,
    height: 130,
    marginTop: 16,
    borderRadius: 125,
    backgroundColor: '#128F87',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default passwordResetStyles;
