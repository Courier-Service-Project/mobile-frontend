import {StyleSheet} from 'react-native';

const OrderStyles = StyleSheet.create({
  senderText: {
    fontSize: 25,
    color: '#044B55',
    fontWeight: '400',
  },
  senderView: {
    borderWidth: 2,
    borderColor: '#B9DADA',
    backgroundColor: '#fff',
    width: '100%',
    height: 200,
    borderRadius: 20,
    justifyContent: 'space-around',
    shadowColor: '#20DED2',
    elevation: 6,
    marginTop: 20,
  },
  titleText: {
    fontSize: 20,
    color: '#000',
  },
  valueText: {
    fontSize: 20,
    color: '#128F87',
  },
  insideTextView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginHorizontal: 16,
  },
  updateStatusView: {
    width: '40%',
    height: 48,
    backgroundColor: '#20DED2',
    borderRadius: 15,
    shadowColor: '#000',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  priceButtonView: {
    width: '40%',
    height: 48,
    backgroundColor: '#044B55',
    borderRadius: 15,
    shadowColor: '#000',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 28,
    marginBottom: 26,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
  },
});

export default OrderStyles;
