import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { data } from '../model/data';
import Card from '../components/Card';
import AmbulanceRequest from './requests/Ambulance';
import BloodGroup from './requests/BloodGroup';
import EmergencyService from '../services/emergencyServices';

const EmergencyServices = ({ route, navigation }) => {
  const [serviceName, setServiceName] = useState('')
  const [services, setServices] = useState({});
 
  const callService = (service) => {
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')

 console.log(service)
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
  const renderItem = ({ item }) => {
    return (
      <Card
        itemData={item}
        onPress={() => callService(item)}
      />
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

        {serviceName === "ambulance_request" && <AmbulanceRequest closeOption={() => setServiceName('')} userDetails={route.params.userDetails} visible={serviceName === "ambulance_request" ? true : false} />}
        {serviceName === "blood_donor" && <BloodGroup closeOption={() => setServiceName('')} userDetails={route.params.userDetails} visible={serviceName === "blood_donor" ? true : false} />}

      </View>
    </>
  );
};

export default EmergencyServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center'
  },
});
