import {StyleSheet} from 'react-native';

const HomeStyles = StyleSheet.create({
  topView: {
    height: 288,
    backgroundColor: '#128F87',
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
    shadowColor: '#128F87',
    elevation: 10,
    marginBottom: 22,
  },
  Homeimage: {
    alignSelf: 'center',
    //marginTop: 10,
  },
  topText1: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 33,
    marginLeft: 25,
    marginTop: 30,
  },
  topText2: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 35,
    alignSelf: 'flex-end',
    marginRight: 30,
    marginTop: 8,
  },
  cardView: {
    backgroundColor: '#B9DADA',
    width: 378,
    height: 68,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  cardInsideView: {
    backgroundColor: '#20DED2',
    width: 80,
    height: 68,
    borderRadius: 20,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    alignSelf: 'center',
    marginLeft: 8,
    fontSize: 25,
    fontWeight: '500',
    color: '#044B55',
  },
  cardTextView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    //flex: 1,
    alignSelf: 'center',
  },
});
export default HomeStyles;

