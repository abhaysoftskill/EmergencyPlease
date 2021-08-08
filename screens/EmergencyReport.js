

import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Animated,
    Alert
} from 'react-native';
import { ActivityIndicator, Button, Colors, IconButton } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

// import Swiper from 'react-native-swiper';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfirmRequest from './requests/Conform';
import { useSelector } from 'react-redux';
import EmergencyService from '../services/emergencyServices';
import AsyncStorage from '@react-native-community/async-storage';
import { LocalizationContext } from '../translations/LocalizationContext';
const latitudeDelta = 0.02;
const longitudeDelta = 0.02;

const EmergencyReport = ({ route, navigation }) => {
    const { translations } = useContext(LocalizationContext);
    // const userDetails = route.params.userDetails;
    const userDetails = route.params.userDetails;
    const theme = useTheme();
    const { coordinates } = useSelector(state => state.currentLocationReducer);
    const [showMap, setShowMap] = useState(false);
    const [confirm_message, setConfirm_message] = useState(false);
    const [region, setRegion] = useState(coordinates);
    const [updateRegion, setUpdateRegion] = useState({});
    const [loading, setLoading] = useState(false);
    // const [coordinates, setCoordinates] = useState();
    const onRegionChange = updateRegion => {
        if (updateRegion.latitude.toFixed(6) === region.latitude.toFixed(6)
            && updateRegion.longitude.toFixed(6) === region.longitude.toFixed(6)) { return; }
        setUpdateRegion(updateRegion)
    }


    useEffect(() => {
        // Change the state every second or the time given by User.
        // const interval = setInterval(() => {
        //   setShowBlink((showBlink) => !showBlink);
        // }, 1000);
        // return () => clearInterval(interval);
        if (coordinates) {
            setRegion(coordinates)
            setShowMap(true)
        }
        return () => { setShowMap(false) };
    }, [coordinates]);

    const confirmLocation = async () => {
        let epAppSettings = await AsyncStorage.getItem('epAppSettings');
        let userDetailsData = await AsyncStorage.getItem('userDetails');
        let AppSettings = JSON.parse(epAppSettings)
        let userDetails = JSON.parse(userDetailsData)
        if (userDetails.userType == 'supersystemadmin') {
            setLoading(false);
            setConfirm_message(true);
        }
        else {
            EmergencyService.myTodayRequest()
                .then((res) => {
                    setTimeout(async () => {
                        if (res.count <= AppSettings.settings[0].settings.daily_request_limit) {
                            setLoading(false);
                            setConfirm_message(true);
                        }
                        else {
                            setLoading(false);

                            Alert.alert('Daily Request Limit Exceeded !', 'You reached request limit, Please contact Emergency Please Team.', [
                                {
                                    text: 'Okay',
                                    onPress: async () => {
                                        try {
                                            navigation.navigate('Dashboard')
                                        } catch (e) {
                                            console.log(e);
                                        }

                                    }
                                }
                            ]);
                        }
                    }, 2000);

                }, error => {
                    return;
                })
        }
    }
let updateRegionLength = Object.keys(updateRegion).length ;
    return (
        <View style={styles.cardsWrapper} >
            {/* <Text>{JSON.stringify(updateRegion)}</Text> */}
            <View style={styles.mapContainer}>
                {showMap && <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={updateRegionLength > 0 ? updateRegion : region}
                    onRegionChangeComplete={onRegionChange}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                >
                     <MapView.Circle
                        center={{
                            latitude:  coordinates.latitude,
                            longitude: coordinates.longitude,
                        }}
                        radius={5000}
                        strokeWidth={1}
                        strokeColor={'#088de1'}
                        fillColor={'rgba(135,205,248,0.5)'}
                    />
                     
                    <MapView.Circle
                        center={{
                            latitude: updateRegionLength > 0? updateRegion.latitude : coordinates.latitude,
                            longitude: updateRegionLength > 0? updateRegion.longitude : coordinates.longitude,
                        }}
                        radius={5000}
                        strokeWidth={1}
                        strokeColor={'red'}
                        fillColor={'rgba(230,192,193,0.5)'}
                    />
                     <MapView.Marker coordinate={{
                     latitude: coordinates.latitude,
                     longitude: coordinates.longitude,
                }}>
                    <Animated.View >
                        <Animated.Image
                            source={require('../assets/current_map_marker.png')}
                            style={[{width:30, height:30}, scaleStyle]}
                            resizeMode="cover"
                        />
                        <Text style={styles.markerText}> {translations.ME}</Text>
                    </Animated.View>
                </MapView.Marker>
                </MapView>}
                {Object.keys(updateRegion).length > 0  && <Animated.View style={[styles.markerWrap]}>
                    <Animated.Image
                        source={require('../assets/map_marker.png')}
                        style={[styles.marker, scaleStyle]}
                        resizeMode="cover"
                    />
                    <Text style={styles.markerText}> {translations.HELPLOCATION}</Text>
                </Animated.View>}
               
                {showMap && <SafeAreaView style={styles.footer}>
                    <Button icon="location-enter" mode="contained" onPress={() => { setLoading(true), confirmLocation() }} color='#05375a' size=''
                    >
                        Confirm Location  </Button>
                </SafeAreaView>}
                {showMap && <IconButton
                    icon={require('../assets/current_location.png')}
                    color={Colors.gray500}
                    size={30}
                    onPress={() =>{ setRegion({
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                        latitudeDelta: latitudeDelta,
                        longitudeDelta: longitudeDelta,
                    }); setUpdateRegion({})}}
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
                {confirm_message && <ConfirmRequest loading={(e) => setLoading(e)}
                    closeOption={() => setConfirm_message(false)}
                    data={route.params} geometry={updateRegion || region} />}

            </View>
            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                //  marginTop: 20,
                position: 'absolute',
                backgroundColor: 'rgba(255,255,255,0.8)',
                height: '100%',
                left: 0,
                right: 0,
                zIndex: 99

            }}>
                <Image
                    source={require('../assets/loading.png')}
                    // style={{ width: 200, height: 100 }}
                    resizeMode="cover"
                />
                <Text>Please Wait....</Text>
            </View>}
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
        color: '#d21036'
    },
    marker: {
        width: 30,
        height: 30,
    },

});
