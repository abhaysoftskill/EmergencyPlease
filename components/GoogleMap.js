import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Button,
  PermissionsAndroid
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { mapDarkStyle, mapStandardStyle } from '../model/mapData';
// import StarRating from '../components/StarRating';

import { useTheme } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS } from 'react-native-permissions';
import { getCurrentLocation } from '../services/getCurrentLocation';
import LinearGradient from 'react-native-linear-gradient';
import EmergencyService from '../services/emergencyServices';
import { cos } from 'react-native-reanimated';
import { useSelector } from 'react-redux';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const GoogleMap = ({ route, navigation }) => {
  const theme = useTheme();
  const { coordinates } = useSelector(state => state.currentLocationReducer);

  const [showMap, setShowMap] = useState(false);
  const [region, setRegion] = useState(coordinates);
  const [requestData, setRequestData] = useState();
  const [locationStatus, setLocationStatus] = useState('');
  const latitudeDelta = 0.08;
  const longitudeDelta = 0.08;
  useEffect(() => {
    {
      region && EmergencyService.nearestEmergencyRequest(region.longitude, region.latitude, route.params.serviceName).then((res) => {

        setShowMap(true);
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
        console.log(res)
        console.log(res[0].geometry.coordinates)
        setRequestData(res)
        // [0].geometry.coordinates
      }, error => {
        console.error('onRejected function called: ' + error.message);
        return;
      })
    }
  }, [region]);
  // useEffect(() => {
  //   const requestLocationPermission = async () => {
  //     if (Platform.OS === 'ios') {
  //       getOneTimeLocation();
  //       subscribeLocationLocation();
  //     } else {
  //       try {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //           {
  //             title: 'Location Access Required',
  //             message: 'This App needs to Access your location',
  //           },
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           //To Check, If Permission is granted
  //           getOneTimeLocation();
  //           subscribeLocationLocation();
  //         } else {
  //           // setLocationStatus('Permission Denied');
  //         }
  //       } catch (err) {
  //         console.warn('err' + err);
  //       }
  //     }
  //   };
  //   check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
  //     .then(result => {
  //       requestLocationPermission();

  //     })
  //     .catch(error => {
  //       //console.log('error' + error)
  //     });
  //   return () => {
  //     Geolocation.clearWatch(watchID);
  //   };
  // }, []);


  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        let regionCord = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta
        };

        setRegion(regionCord);

      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  }
  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change

        setLocationStatus('You are Here');
        //console.log(position);
        let regionCord = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta
        };
        setRegion(regionCord);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };
  // const initialMapState = {
  //   markers,

  // };

  // const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {

      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (requestData && index >= requestData.length) {
        index = requestData.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {

        if (mapIndex !== index) {
          mapIndex = index;

          const  coordinate  = requestData[index].geometry.coordinates;
          console.log(index)
          console.log(coordinate)

          _map.current.animateToRegion(
            {
              latitude: parseFloat(coordinate[0]),
              longitude: parseFloat(coordinate[1]),
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = requestData && requestData.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  }

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>

      {!showMap && <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Image
          source={require('../assets/loading.gif')}
          style={{ width: 200, height: 100 }}
          resizeMode="cover"
        />
        <Text>Loading....</Text>
      </View>}
      { showMap && requestData && <MapView
        ref={_map}
        initialRegion={
          {
            latitude: parseFloat(region.latitude),
            longitude: parseFloat(region.longitude),
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta
          }
        }
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        // maxZoomLevel={16}
        // mapType='satellite'
        zoomEnabled={true}
        zoomControlEnabled={true}
        showsScale={true}
        showsUserLocation={true}
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
        <MapView.Circle
          center={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          radius={5000}
          strokeWidth={1}
          strokeColor={'red'}
          fillColor={'rgba(230,192,193,0.5)'}
        />

        {requestData && requestData.map((marker, index) => {
          console.log('************************')
          console.log(marker.geometry.coordinates[0])
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker key={index} coordinate={{
              latitude: marker.geometry.coordinates[0],
              longitude: marker.geometry.coordinates[1]
            }} onPress={(e) => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../assets/map_marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
                <View style={styles.markerNumber}>
                  <Text style={{ color: "#000" }}>{index + 1}</Text>
                </View>
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>}

      { showMap && <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={true}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {requestData && requestData.map((marker, index) => (
          <View style={[styles.card]} key={index}>
            <View style={styles.requestNumber}>
              <Text style={{ color: "#fff" }}>{index + 1}</Text>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image
                  source={require('../assets/defaultProfile.png')}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={[styles.textContent]}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{marker.userName}</Text>
                  <Text numberOfLines={1} style={[styles.cardDescription, { color: '#1a8434' }]}>{marker.bloodGrp}</Text>
                  <Text numberOfLines={1} style={[styles.cardDescription, { fontSize: 14, color: '#d21036' }]}>Before {marker.reqTime}</Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>{marker.helpingUser} Users ready to help</Text>

                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => navigation.navigate('EmergencyDetails',
                      {
                        userDetails: marker,
                        location: region,
                      })}
                  >
                    <LinearGradient
                      colors={['#f17c93', '#d21036']}
                      style={styles.signIn}
                    >


                      <Text style={[styles.textSign, {
                        color: '#fff'
                      }]}>
                        View User Details</Text>
                    </LinearGradient>
                  </TouchableOpacity>


                </View>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
      }
    </View>
  );
};

export default GoogleMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  requestNumber: {
    color: "#d21036", position: 'absolute', top: 5, right: 6,
    backgroundColor: '#d21036', width: 20, height: 20, borderRadius: 50,
    alignItems: "center", alignContent: "center", justifyContent: 'center'
  },
  markerNumber: {
    color: "#d21036", position: 'absolute', top: 10, right: 15,
    backgroundColor: '#fff', width: 20, height: 20, borderRadius: 50,
    alignItems: "center", alignContent: "center", justifyContent: 'center'
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: "row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    // height: CARD_HEIGHT,
    width: CARD_WIDTH,
    flex: 2, flexDirection: 'row',
    overflow: "hidden",
  },
  cardImage: {
    // flex: 1,
    // width: 80,
    // height: 80,
    // borderRadius:100,
    // alignSelf: "center",

    borderWidth: 0,
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 50,
    // flex: 1, flexDirection: 'row',
    marginLeft: 10
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 14,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "red",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});
