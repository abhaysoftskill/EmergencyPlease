import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EmergencyService from '../../services/emergencyServices';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loading';

const EmergencyEvents = ({ navigation }) => {
  const theme = useTheme();
  const [events, setEvents] = useState([])
  const { coordinates } = useSelector(state => state.currentLocationReducer);
  const [loading, setLoading] =useState(false)
  const [region, setRegion] = useState(coordinates);
  useEffect(() => {
    setLoading(true)
    EmergencyService.getnearestevents(region.longitude, region.latitude).then((res) => {
        setEvents(res.events);
    setLoading(false)
    }, error => {
      setLoading(false)
        return;
    })
    const unsubscribe = navigation.addListener("focus", () => {
      setEvents([])
    })

    // this will help to clear the state when navigate the screen
    return unsubscribe;
}, [navigation])

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={styles.sliderContainer}>
        {loading && <Loader/>}
        {!loading && <Swiper
          autoplay
          horizontal={true}
          // height={100}
          key={events.length}
          activeDotColor="#FF6347">
          {events.length > 0 && events.map((e,i) => (
            <View style={styles.slide} key={i}>
              <Image
                source={{ uri: `https://emergencyplease.com/api/src/uploads/eventtemplate/blood_donation_1.jpg` }}

                resizeMode="stretch"
                style={styles.sliderImage}
              />
            </View>
          ))}
        
        </Swiper>}
      </View>
      <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 14,
            color: '#333',
            paddingHorizontal: 10

          }}>
          Event nearest to your place
        </Text>


      </View>
    </View>
  );
};

export default EmergencyEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: '100%',
    width: '100%',
    paddingHorizontal:10,
    // marginTop: 10,
    // justifyContent: 'center',
    // alignSelf: 'center',
    // borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'transparent',
    // borderRadius: 8,
    // borderWidth:1
  },
  sliderImage: {
    height: '100%',
    // width: '100%',
    // alignSelf: 'center',
    // borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fdeae7' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#de4f35',
  },
  cardsWrapper: {
    // marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 999,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.75)'
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },

  cardInfo: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,

    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});