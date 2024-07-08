import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import AppHeaderBackArrow from '../components/appHeaderBackArrow';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {ResultModal} from '../components/modals/resultModal';


const PerformanceScreen = () => {
  const [sortedArray, setSortedArray] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState();
  const [resultModal, setResultModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [isLoading,setIsLoading]=useState(false);

  useEffect(() => {
    setIsLoading(true)
    getPerformanceDetails();
  }, []);

  const getPerformanceDetails = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const branchLocation = await AsyncStorage.getItem('branchLocation');
      const result = await axios.get(
        `http://10.10.27.131:9000/api/mobile/orders/getPerformanceDetails/${branchLocation}`,
      );
      console.log(result.data.message);
      if (result.data.success == 200) {
        const fetchData = result.data.message.sort(
          (a, b) => b.totalEarnings - a.totalEarnings,
        );
        const rankData = fetchData.map((item, index) => ({
          ...item,
          rank: index + 1,
        }));
        const userRecord = rankData.filter(
          item => item.BranchUser_id == user_id,
        );
        const earnings = userRecord.reduce(
          (sum, item) => sum + item.totalEarnings,
          0,
        );
        console.log(earnings);
        setTotalEarnings(earnings);
        console.log(userRecord);
        setSortedArray(rankData);
        setIsLoading(false);
      } else if (result.data.success == 101) {
        setModalMessage(result.data.message);
        setResultModal(true);
        setIsLoading(false);
      } else {
        setModalMessage(result.data.message);
        setResultModal(true);
        setIsLoading(false);
      }
    } catch (error) {
      setModalMessage(error.message);
      setResultModal(true);
      setIsLoading(false);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={[styles.cell, {flex: 1}]}>{item.rank}</Text>
      <Text style={[styles.cell, {flex: 2}]}>{item.FirstName}</Text>
      <Text style={[styles.cell, {flex: 3, textAlign: 'center'}]}>
        {item.CompletedOrders}
      </Text>
      <Text style={[styles.cell, {flex: 3, textAlign: 'center'}]}>
        {item.totalEarnings}
      </Text>
    </View>
  );

  return (
    <View>
      <View>
        <AppHeaderBackArrow prevScreen={'BottomTabNavigator'} />
      </View>
      {isLoading?(
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={40} />
      <Text style={{color: '#0A4851', fontSize: 14}}>Loading...</Text>
    </View>):(
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>Your Earnings</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <ResultModal
              show={resultModal}
              function={setResultModal}
              message={modalMessage}
            />
          </View>
          {totalEarnings != undefined && (
            <TouchableOpacity style={styles.earnCardView}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <View style={{margin: 10, justifyContent: 'flex-start'}}>
                  <MaterialIcons
                    name="attach-money"
                    color={'#20DED2'}
                    size={50}
                  />
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{fontSize: 20, color: '#044B55', margin: 4}}>
                    {totalEarnings}
                  </Text>
                  <Text style={{fontSize: 18, color: '#52919A'}}>
                    Total Ernings
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View>
          <Text style={styles.titleText}>Your performances</Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeaderBox}>
            <Text style={[styles.tableHeader, {flex: 1}]}>Rank</Text>
            <Text style={[styles.tableHeader, {flex: 2}]}>User Name</Text>
            <Text style={[styles.tableHeader, {flex: 3}]}>
              Completed Orders
            </Text>
            <Text style={[styles.tableHeader, {flex: 3}]}>Total Earnings</Text>
          </View>
          {sortedArray.length > 0 ? (
            <View style={styles.tableData}>
              <FlatList
                data={sortedArray}
                keyExtractor={item => item.rank.toString()}
                renderItem={renderItem}
              />
            </View>
          ) : (
            <Text>No new records</Text>
          )}
        </View>
      </View>)}
      {/* <View style={{alignItems:'center',justifyContent:'center'}}>
      <Fontisto name="line-chart" color={'#20DED2'} size={70}/>
      </View> */}
    </View>
  );
};

export default PerformanceScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    
  },
  tableContainer: {
    paddingVertical: 30,
    //borderColor:'black',
    //borderWidth:1
  },
  tableTitleBox: {
    backgroundColor: '#044B55',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 16,
    elevation: 2,
    marginTop: 20,
    marginBottom: 20,
  },
  headingTitleText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '500',
  },
  tableHeaderBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 1,
  },
  tableHeader: {
    fontSize: 14,
    color: '#52919A',
    flex: 1,
    fontWeight: '600',
  },
  tableData: {
    marginTop: 15,
  },
  cell: {
    fontSize: 14,
    textAlign: 'left',
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 2,
    elevation: 1,
    borderRadius: 10,
    borderColor: '#52919A',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  earnCardView: {
    width: '80%',
    height: '55%',
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#12ABA2',
    elevation: 10,
    margin: 10,
    alignSelf: 'center',
  },
  titleText: {
    color: '#044B55',
    fontSize: 25,
    fontWeight: '500',
    marginTop: 20,
    marginLeft: 20,
  },
});
