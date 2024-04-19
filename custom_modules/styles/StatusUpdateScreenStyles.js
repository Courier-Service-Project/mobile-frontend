import {StyleSheet} from 'react-native';

const StatusUpdateStyles = StyleSheet.create({
  orderStatusView: {
    borderColor: '#B9DADA',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  statusText: {
    fontSize: 22,
    color: '#044B55',
    fontWeight: '700',
    marginTop: 10,
  },
  statusItemView: {
    backgroundColor: '#B9DADA',
    height: 45,
    borderRadius: 20,
    margin: 15,
    flexDirection: 'row',
    alignItems:'center',
    // flex:1,
    // flexWrap:'wrap'
  },
  itemText: {
    color: '#128F87',
    fontSize: 20,
    fontWeight: '500',
  },
  radio:{
    width:36,
    height:36,
    borderColor:'#128F87',
    borderWidth:1.5,
    backgroundColor:'#fff',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },
  radioInsideView:{
    width:20,
    height:20,
    backgroundColor:'#128F87',
    borderRadius:10
  }
});

export default StatusUpdateStyles;
