import {StyleSheet} from 'react-native';

const HomeStyles = StyleSheet.create({
  topView: {
    backgroundColor: '#12ABA2',
    //flex: 1,
    height: 328,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  bottomView: {
    borderRadius: 30,
    marginBottom: 50,
  },
  helloText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 30,
    marginLeft: 25,
    marginTop: 30,
  },
  welcomeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 30,
    alignSelf: 'flex-end',
    marginRight: 30,
    marginTop: 8,
  },
  homeImage: {
    width: '80%',
    //height: 150,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 15,
  },
  topCardView: {
    backgroundColor: '#187477',
    width: '90%',
    height: '30%',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 15,
    shadowColor: '#000',
    elevation: 10,
  },
  topcardInsideView:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around',
    alignItems:'center'
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    shadowColor: '#12ABA2',
    elevation: 10,
    
  },
  cardText: {
    fontSize: 19,
    color: '#044B55',
  },
  earnText:{
    fontSize:30,
    fontWeight:'700',
    color:'#fff'
  }
});

export default HomeStyles;