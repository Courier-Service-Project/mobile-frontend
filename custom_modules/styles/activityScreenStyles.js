import {StyleSheet} from 'react-native';

const ActitvityStyles = StyleSheet.create({
  LayoutContainer: {
    flexDirection: 'column',
    padding: 20,
    marginTop: 20,
    backgroundColor: '#9AD1D1',
    borderRadius: 20,
    marginRight: 20,
    marginLeft: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  OrderDetailsContiner: {
    flexDirection: 'column',
  },
  OrderDeatailsRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  OrderDeatailsMainRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  OrderDetailsMainRowKey: {
    fontSize: 22,
    color: '#044B55',
    fontWeight: '600',
  },
  OrderDetailsMainValue: {
    fontSize: 22,
    color: '#044B55',
    fontWeight: '600',
  },
  OrderDetailsRowKey: {
    fontSize: 18,
    color: '#044B55',
    fontWeight: '500',
  },
  OrderDetailsRowValue: {
    fontSize: 18,
    color: '#000',
    fontWeight: '300',
    marginLeft:10
  },

  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 5,
  },
  Button: {
    height: 40,
    width: 150,
    borderRadius: 15,
    marginLeft: 20,
    justifyContent: 'center',
  },
  ButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    alignSelf: 'center',
  },
});

export default ActitvityStyles;
