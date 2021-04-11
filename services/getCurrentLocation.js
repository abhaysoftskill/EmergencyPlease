import React, { useState, useEffect } from 'react';

import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS } from 'react-native-permissions';
import { PermissionsAndroid, Platform } from 'react-native';

export const getCurrentLocation =  async () => {
  const [location, setLocation] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
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
           getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            // setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn('err' + err);
        }
      }
    };
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        requestLocationPermission();

      })
      .catch(error => {
        //console.log('error' + error)
      });
    return () => {
       Geolocation.clearWatch(watchID);
    };
  }, []);


  const getOneTimeLocation =  () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        };
        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
        setLocation(region);
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

        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
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

  return location;

};


export const sendData = async ()  => {
  // const [currentLongitude, setCurrentLongitude] = useState('');
  // const [currentLatitude, setCurrentLatitude] = useState('');
  // const [locationStatus, setLocationStatus] = useState('');
  // const [location, setLocation] = useState('');
  let currentLongitude = ''
  let currentLatitude = ''
  let locationStatus = ''
  let location = ''
  const getOneTimeLocation =  async () => {
    // setLocationStatus('Getting Location ...');
    locationStatus = 'Getting Location ...'
    await Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        };
               //getting the Longitude from the location json
        currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        currentLatitude =
          JSON.stringify(position.coords.latitude);

          location = region
        //Setting Longitude state
        // setCurrentLongitude(currentLongitude);
        //currentLongitude = 
        //Setting Longitude state
       // setCurrentLatitude(currentLatitude);
       // setLocation(region);
      },
      (error) => {
       // setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
    return location
  }

  let rr = await getOneTimeLocation()
 // return getOneTimeLocation()
}
