import React from 'react';
import {Image, Text, View, useWindowDimensions} from 'react-native';
import homeImage from '../icons/homeImage.png';
import {ScrollView} from 'react-native-virtualized-view';
import PendingIcon from '../icons/pendingicon.png';
import SelectedIcon from '../icons/selectedicon.png';
import OngoingIcon from '../icons/ongoingicon.png';
import CompletedIcon from '../icons/completedicon.png';
import EarnIcon from '../icons/earnicon.png';
import HomecardView from '../components/HomeScreen/cardView';
import HomeStyles from '../styles/homeScreenStyles';

const HomeScreen = () => {
  const window = useWindowDimensions();
  return (
    <View style={{flex: 1, width: window.width, height: window.height}}>
      <View style={HomeStyles.topView}>
        <View>
          <Text style={HomeStyles.topText1}>Hello </Text>
          <Text style={HomeStyles.topText2}>Welcome To XPress</Text>
        </View>
        <View>
          <Image source={homeImage} style={HomeStyles.Homeimage} />
        </View>
      </View>

      <ScrollView>
        <HomecardView icon={PendingIcon} name="Pending Orders" value={20} />
        <HomecardView icon={SelectedIcon} name="Selected Orders" value={5} />
        <HomecardView icon={OngoingIcon} name="Ongoing Orders" value={1} />
        <HomecardView icon={CompletedIcon} name="Completed Orders" value={2} />
        <HomecardView
          icon={EarnIcon}
          name="Total earnings"
          value={'Rs.' + 2000}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

