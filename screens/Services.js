import React, { useState, useEffect } from 'react';
import {Image, View, Text, Button, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import StarRating from '../components/StarRating';
import EmergencyService from '../services/emergencyServices';
const Services = ({ route, navigation }) => {
  const [serviceName, setServiceName] = useState('')
  const [services, setServices] = useState({});
 
  const renderItem = (itemData) => {
    return (
     <TouchableOpacity onPress={() => {
       itemData.item.service_type == 'covid_19' ? navigation.navigate('Covid19') : navigation.navigate('Dashboard') }}>
      <View style={styles.card}>
        <View style={styles.cardImgWrapper}>
          <Image
            source={{uri: `https://emergencyplease.com/api/src/uploads/${itemData.item.service_type}.jpg`}}
            // source={require('../assets/banners/general_emergency.jpg')}
            resizeMode="cover"
            style={styles.cardImg}
          />
           <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{itemData.item.service_type_alias}</Text>
        </View>
        </View>
       
      </View>
      <View style={{backgroundColor:'red', padding:5, marginBottom:30}}>
        <Text style={{color:'#fff'}}>{itemData.item.service_type_description}</Text>
      </View>
    </TouchableOpacity>
    );
  };
  useEffect(() => {
    EmergencyService.serviceTypes().then((res) => {
      setServices(res)
    }, error => {
      return;
    })
    const unsubscribe = navigation.addListener("focus", () => {
      setServiceName('')
    })
    // this will help to clear the state when navigate the screen
    return unsubscribe;
  }, [navigation])
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={services?.service_type}
          renderItem={renderItem}
          keyExtractor={item => item.service_type}
        />

      </View>
    </>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center'
  },
  card: {
    height: 120,
    // marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    // borderBottomWidth:20,
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    // borderBottomRightRadius: 0,
    // borderTopRightRadius: 0,
    borderBottomRightRadius:0,
    borderBottomLeftRadius:0,
  },
  cardInfo: {
    position:'absolute',
    bottom:10,
    right:0,
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    backgroundColor: 'rgba(255,255,255,0.7)',
    

  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color:'#f60101'
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
