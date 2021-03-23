

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Animated
} from 'react-native';
import { ActivityIndicator, Button, Colors, IconButton } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

// import Swiper from 'react-native-swiper';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentLocation, sendData } from '../services/getCurrentLocation';

import ConfirmRequest from './requests/Conform';


import { color } from 'react-native-reanimated';
// import Geolocation from 'react-native-geolocation-service';

import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS } from 'react-native-permissions';
import { PermissionsAndroid, Platform } from 'react-native';
import { useSelector } from 'react-redux';
const latitudeDelta = 0.02;
const longitudeDelta = 0.02;

const EmergencyReport = ({ route, navigation }) => {
    // const userDetails = route.params.userDetails;
    const userDetails = route.params.userDetails;
    const theme = useTheme();
    const { coordinates } = useSelector(state => state.currentLocationReducer);
    const [showMap, setShowMap] = useState(false);
    const [confirm_message, setConfirm_message] = useState(false);
    const [region, setRegion] = useState(coordinates);
    // const [coordinates, setCoordinates] = useState();
    const onRegionChange = updateRegion => {
        if(updateRegion.latitude.toFixed(6) === region.latitude.toFixed(6)
        && updateRegion.longitude.toFixed(6) === region.longitude.toFixed(6)){ return;}
         setRegion(updateRegion)
    }

 
    useEffect(() => {
        // Change the state every second or the time given by User.
        // const interval = setInterval(() => {
        //   setShowBlink((showBlink) => !showBlink);
        // }, 1000);
        // return () => clearInterval(interval);
        if(coordinates){
            console.log(coordinates)
          setShowMap(true)
      }
      }, [coordinates]);
 
    return (
        <View style={styles.cardsWrapper} >
            <View style={styles.mapContainer}>
                {showMap && <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={region}
                    onRegionChangeComplete={onRegionChange}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                >
                    <MapView.Circle
                        center={{
                            latitude: coordinates.latitude,
                            longitude: coordinates.longitude,
                        }}
                        radius={5000}
                        strokeWidth={1}
                        strokeColor={'red'}
                        fillColor={'rgba(230,192,193,0.5)'}
                    />
                </MapView>}
                {showMap && <Animated.View style={[styles.markerWrap]}>
                    <Animated.Image
                        source={require('../assets/map_marker.png')}
                        style={[styles.marker, scaleStyle]}
                        resizeMode="cover"
                    />
                    <Text style={styles.markerText}> You are Here</Text>
                </Animated.View>}
                {showMap && <SafeAreaView style={styles.footer}>
                    <Button icon="location-enter" mode="contained" onPress={() => setConfirm_message(true)} color='#05375a'  size=''
                   >
                        Conform Location  </Button>
                </SafeAreaView>}
                {showMap && <IconButton
                    icon={require('../assets/current_location.png')}
                    color={Colors.gray500}
                    size={30}
                    onPress={() => setRegion({
                        latitude: region.latitude,
                        longitude: region.longitude,
                        latitudeDelta: latitudeDelta,
                        longitudeDelta: longitudeDelta,
                    })}
                    style={[
                        {
                            position: 'absolute',
                            bottom: 130,
                            right: 10,
                          //  zIndex: 1,
                            backgroundColor: '#fab3ad'
                        }
                    ]}
                />}

                {!showMap && <ActivityIndicator animating={true} color={Colors.red800} />}
                {confirm_message && <ConfirmRequest closeOption={() => setConfirm_message(false)} data={route.params} geometry={region}  />}

            </View>

        </View>
    );
};

export default EmergencyReport;

const scaleStyle = {
    transform: [
        {
            scale: 1,
        },
    ],
};
const styles = StyleSheet.create({

    userprofile: {
        borderWidth: 0,
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: 10
    },
    userInfo: {
        flex: 2,
        flexDirection: 'row',
        padding: 10,
        // borderLeftWidth: 0,
        // borderBottomRightRadius: 8,
        // borderTopRightRadius: 8,
        // backgroundColor: '#fff',
    },
    userName: {
        fontSize: 16,
        color: '#444',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
    },
    footer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom: 20,
        position: 'absolute',
        width: '100%'
    },
    // cardsWrapper:{
    //     borderColor: 'red',
    //     borderWidth: 2,
    // },

    mapContainer: {
        height: '96.3%',
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerWrap: {
        // alignItems: "center",
        // justifyContent: "center",
        // width: 50,
        // height: 50,

        left: '50%',
        marginLeft: -15,
        marginTop: -30,
        position: 'absolute',
        top: '50%'
    },
    markerText: {
      marginLeft: -25,
      color:'#d21036'
    },
    marker: {
        width: 30,
        height: 30,
    },

});
