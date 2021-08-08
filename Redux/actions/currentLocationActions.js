

// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';

import { check, PERMISSIONS } from 'react-native-permissions';
import { PermissionsAndroid, Platform } from 'react-native';
import { useRef } from 'react';


// Define action types
export const GET_CURRENT_LOCATION = 'GET_CURRENT_LOCATION';
export const ADD_CURRENT_LOCATION = 'ADD_CURRENT_LOCATION';
export const UPDATE_CURRENT_LOCATION = 'UPDATE_CURRENT_LOCATION';
const latitudeDelta = 0.02;
const longitudeDelta = 0.02;


export const readCurrentLocation = () => {
    let watchID;
    try {
        return dispatch => {

            const subscribeLocationLocation = () => {
                watchID= Geolocation.watchPosition(
                    (position) => {
                        //Will give you the location on location change
                        // console.log('***************')
                        // console.log(position)
                        // setLocationStatus('You are Here');
                        let regionCord = {
                            latitude: parseFloat(position.coords.latitude),
                            longitude: parseFloat(position.coords.longitude),
                            latitudeDelta: latitudeDelta,
                            longitudeDelta: longitudeDelta
                        };
                        // return regionCord
                        dispatch({
                            type: GET_CURRENT_LOCATION,
                            payload: regionCord
                        });
                        // setRegion(regionCord);
                    },
                    (error) => {
                        setLocationStatus(error.message);
                    },
                    {
                        enableHighAccuracy: false,
                        maximumAge: 1000,
                        // distanceFilter:200,
                    },
                );
            };
            const getOneTimeLocation = async () => {
                const position = await new Promise((resolve, reject) => {

                    Geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 30000,
                        maximumAge: 1000
                    });

                });
                return {
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta
                };
            }
            const requestLocationPermission = async () => {
                if (Platform.OS === 'ios') {
                    const coordinates = await getOneTimeLocation()
                    return coordinates;
                    // subscribeLocationLocation();
                } else {
                    try {
                        const granted = await PermissionsAndroid.request(
                            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                            {
                                title: 'Location Access Required',
                                message: 'This App needs to Access your location',
                            },
                        );
                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                            //To Check, If Permission is granted
                            const coordinates = await getOneTimeLocation()
                            subscribeLocationLocation();
                            return coordinates;

                        } else {
                            // setLocationStatus('Permission Denied');
                        }
                    } catch (err) {
                        console.warn(err);
                    }
                }
            };
            check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                .then(result => {
                    requestLocationPermission()
                        .then(response => {
                            dispatch({
                                type: GET_CURRENT_LOCATION,
                                payload: response
                            });

                        })
                        .catch(error => {
                            //console.log('error' + error)
                        });

                })
                .catch(error => {
                    //console.log('error' + error)
                });
            return () => {
                Geolocation.clearWatch(watchID);
            };


          

        };
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error);
    }
};