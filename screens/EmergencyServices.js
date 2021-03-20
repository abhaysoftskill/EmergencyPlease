import React,{useState, useEffect} from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { data } from '../model/data';
import Card from '../components/Card';
import AmbulanceRequest from './requests/Ambulance';
import BloodGroup from './requests/BloodGroup';

const EmergencyServices = ({route, navigation }) => {

  const [serviceName, setServiceName] = useState('')
  const callService = (service_name) => {
    if(service_name === 'accident_reported'){
      navigation.navigate('EmergencyReport', { service_name:"accident_reported",service_title:"Accident", userDetails: route.params.userDetails});
    } else if(service_name === 'heart_attack'){
      navigation.navigate('EmergencyReport', { service_name:"heart_attack",service_title:"Heart Attack", userDetails: route.params.userDetails});
    }
    else{
      setServiceName(service_name);
    }
  }
  const renderItem = ({ item }) => {
    return (
      <Card
        itemData={item}
        onPress={() => callService(item.name)}
      />
    );
  };
  useEffect(() => {
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
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
