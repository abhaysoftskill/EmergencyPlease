import React, { useState, useEffect, useReducer } from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { Image, ImageBackground, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native';
import EmergencyService from '../services/emergencyServices';

import { useDispatch, useSelector } from 'react-redux';
import { readCurrentLocation } from '../redux/actions/currentLocationActions';
import { serviceTypeAdd } from '../redux/actions/actions';
import strings from '../translations/translations';
import { Button } from 'react-native-paper';
import Contacts from 'react-native-contacts';
import { addContact } from '../redux/actions/contactsActions';
import Loader from '../components/Loading';

const Services = ({ navigation }) => {
  const { coordinates } = useSelector(state => state.currentLocationReducer);
  const stateDispatch = useDispatch();
  // Usestate for servicetype 
  const [services, setServices] = useState({});
  const [loading, setloading] = useState(false);

  const requestData = async () => {
    setloading(true)
    // Call service type api *******************
    EmergencyService.serviceTypes().then((res) => {
      setServices(res)
      setloading(false)

    }, error => {
      setloading(false)

      return;
    })


  }
  // const changeLanguage = () => {
  //   console.log('%%%%%%%%%%%%555')
  //   strings.setLanguage('fr')

  // }
  // const loadContacts = () => {
  //   Contacts.getAll()
  //     .then(contacts => {
  //       contacts.sort((a, b) => {
  //         if (a.displayName > b.displayName) {
  //           return 1;
  //         }
  //         if (a.displayName < b.displayName) {
  //           return -1;
  //         }
  //         return 0;
  //       });
  //       stateDispatch(addContact(contacts))

  //     })
  //     .catch(e => {
  //       // setLoading(false);
  //     });



  //   Contacts.checkPermission();
  // }
  useEffect(() => {
    //  strings.setLanguage('en')
    if (coordinates?.length == 0) {
      stateDispatch(readCurrentLocation())
    }
    else if (coordinates) {
      requestData()
    }

    // if (Platform.OS === "android") {
    //   // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    //   //   title: "Contacts",
    //   //   message: "This app would like to view your contacts."
    //   // }).then(() => {
    //   //   loadContacts();
    //   // });
    //   PermissionsAndroid.requestMultiple(
    //     [ PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     PermissionsAndroid.PERMISSIONS.READ_CONTACTS
    //     ]).then(() => {
    //       const coordinates  = useSelector(state => state.currentLocationReducer);
    //       loadContacts();
    //       return { coordinates }

    //     });
    // } else {
    //   loadContacts();
    // }
    // // return () =>  RNLocalize.removeEventListener('change', handleLocalizationChange());

  }, [coordinates])

  const getServiceList = (itemData) => {
    return (
      <TouchableOpacity onPress={() => {
        stateDispatch(serviceTypeAdd(itemData.item._id)),
          itemData.item.service_type == 'covid_19' ? navigation.navigate('Covid19', { serviceTypeID: itemData.item._id }) : navigation.navigate('Dashboard', { serviceTypeID: itemData.item._id })

      }}>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={{ uri: `https://emergencyplease.com/api/src/uploads/${itemData.item.service_type}.jpg` }}
              // source={require('../assets/banners/general_emergency.jpg')}
              resizeMode="cover"
              style={styles.cardImg}
            />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{itemData.item.service_type_alias}</Text>
            </View>
          </View>

        </View>
        <View style={{ backgroundColor: 'red', padding: 5, marginBottom: 30 }}>
          <Text style={{ color: '#fff' }}>{itemData.item.service_type_description}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  return (


    <View style={styles.container}>
      {/* <Button onPress={() => changeLanguage()} >Text</Button> */}
      {/* <Text style={styles.value}>{strings.hello}</Text> */}
      {loading && <Loader />}
      {!loading && <FlatList
        data={services?.service_type}
        renderItem={getServiceList}
        keyExtractor={item => item.service_type}
      />}

    </View>
  )
}

export default Services;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    height: '100%'
  },
  card: {
    height: 120,
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
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  cardInfo: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    backgroundColor: 'rgba(255,255,255,0.7)',


  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#f60101'
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
})

