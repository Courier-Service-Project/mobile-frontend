import {StyleSheet} from 'react-native';

const CalculatePrice = StyleSheet.create({
  calculatePriceView: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#B9DADA',
    marginHorizontal: 25,
  },
  ItemView: {
    backgroundColor: '#B9DADA',
    height: 45,
    borderRadius: 20,
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  insideView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  insideValueView: {
    backgroundColor: '#20DED2',
    borderRadius: 20,
    height: 45,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insideTitleText: {
    color: '#044B55',
    fontSize: 20,
    fontWeight: '400',
  },
  insideTitleTextView: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginLeft:30
  },
  insideValueText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
  },
  inputText: {
    fontSize: 20,
    marginLeft: 25,
  },
});

export default CalculatePrice;
