import {StyleSheet} from 'react-native';

const HomeStyles = StyleSheet.create({
  topView: {
    backgroundColor: '#128F87',
    //flex: 1,
    height: '33%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageView:{
    backgroundColor:'#fff',
    width:120,
    height:120,
    borderRadius:60,
    alignSelf: 'center',
    marginTop:10
  },
  bottomView: {
    borderRadius: 30,
    marginBottom: 50,
    marginTop:60
  },
  helloText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    alignSelf: 'center',
    marginTop:10
  },
  welcomeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 30,
    alignSelf: 'center',
    marginTop:10,
  },
  topCard:{
    position:'absolute', //to overlap
    flexDirection:'row',
    width: '85%',
    height: '8%',
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#12ABA2',
    elevation: 10,
    //margin:10,
    marginTop:250,
    alignSelf:'center',
    padding:20
  },
  homeImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
 
  // topcardInsideView:{
  //   flex:1,
  //   flexDirection:'row',
  //   flexWrap:'wrap',
  //   justifyContent:'space-around',
  //   alignItems:'center'
  // },
  card: {
    width: '40%',
    height: '60%',
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
    fontSize:20,
    color:'#044B55'
  },
  earnView:{
   width: '45%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //margin: 2,
    shadowColor: '#12ABA2',
    elevation: 10,
    flexDirection:'row'
  }
});

export default HomeStyles;