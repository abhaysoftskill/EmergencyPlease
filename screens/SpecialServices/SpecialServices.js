import React, { useState, useEffect } from 'react';
import {Image, View, Text, Button, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import StarRating from '../../components/StarRating';
import EmergencyService from '../../services/emergencyServices';
const SpecialServices = ({ route, navigation }) => {
  const [serviceName, setServiceName] = useState('')
  const [services, setServices] = useState({});
 
  const callService = (service) => {
    // if(service_name === 'accident_reported'){
    //   navigation.navigate('EmergencyReport', { service_name:"accident_reported",service_title:"Accident", userDetails: route.params.userDetails});
    // } else if(service_name === 'heart_attack'){
    //   navigation.navigate('EmergencyReport', { service_name:"heart_attack",service_title:"Heart Attack", userDetails: route.params.userDetails});
    // }
    // else{
    //   setServiceName(service_name);
    // }
    navigation.navigate('EmergencyReport', { service_id: service._id, service_title: service.service_name_alias, userDetails: route.params.userDetails });

  }
  const renderItem = (itemData) => {
    console.log(itemData.item.service_name)
    return (
     itemData.item.service_name != 'accidenta'  && <TouchableOpacity onPress={() => { navigation.navigate('Covid19')}}>
      <View style={styles.card}>
        <View style={styles.cardImgWrapper}>
          <Image
            source={{uri: `https://emergencyplease.com/api/src/uploads/${itemData.item.service_name}.jpg`}}
            resizeMode="cover"
            style={styles.cardImg}
          />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{itemData.item.service_name_alias}</Text>
          <StarRating ratings={itemData.item.ratings} reviews={itemData.item.reviews} />
          <Text numberOfLines={2} style={styles.cardDetails}>{itemData.item.service_description}</Text>
        </View>
      </View>
    </TouchableOpacity>
    );
  };
  useEffect(() => {
    EmergencyService.services().then((res) => {
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
          data={services?.services}
          renderItem={renderItem}
          keyExtractor={item => item.service_name}
        />

      </View>
    </>
  );
};

export default SpecialServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center'
  },
  card: {
    height: 120,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
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
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
    borderBottomWidth:3,
    borderBottomColor:'red'

  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
