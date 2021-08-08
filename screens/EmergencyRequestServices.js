import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, StatusBar } from 'react-native';
import { data } from '../model/data';
import Card from '../components/Card';
import AmbulanceRequest from './requests/Ambulance';
import BloodGroup from './requests/BloodGroup';
import EmergencyService from '../services/emergencyServices';
import { useSelector } from 'react-redux';
import EmergencyServiceModal from './requests/EmergencyServiceModal';
import Loader from '../components/Loading';

const EmergencyRequestServices = ({ route, navigation }) => {
  const { service_type_id } = useSelector(state => state.serviceReducer);
  const [ShowEmergencyServiceModal, setShowEmergencyServiceModal] = useState(false)
  const [EmergencyServiceData, setEmergencyServiceData] = useState([])
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
    
    if (service?.service_modal && service?.service_modal_data) {
     let modalData = JSON.parse(service?.service_modal_data)
    //  console.log(typeof(JSON.parse(modalData)))

      setEmergencyServiceData({
        "service_id": service._id,
        "service_name": service.service_name,
        "service_name_alias" :service.service_name_alias,
        "modalData": modalData
      })
    setShowEmergencyServiceModal(true)

    }
    else{
    navigation.navigate('EmergencyReport', { 
      "service_id": service._id,
      "service_name": service.service_name,
      "service_name_alias" :service.service_name_alias,
      "userDetails": route.params.userDetails });
    }
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
    EmergencyService.requestservicebyservicetype(service_type_id).then((res) => {
      setServices(res)
      // console.log(res)
    }, error => {
      return;
    })
    const unsubscribe = navigation.addListener("blur", () => {
      setServiceName('')
      // setServices({})
    })
    // this will help to clear the state when navigate the screen
    return unsubscribe;
  }, [navigation])
  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
    {!services && <Loader />}
        <FlatList
          data={services?.services}
          renderItem={renderItem}
          keyExtractor={item => item.service_name}
        />
        {serviceName === "ambulance_request" && <AmbulanceRequest closeOption={() => setServiceName('')} userDetails={route.params.userDetails} visible={serviceName === "ambulance_request" ? true : false} />}
        {serviceName === "blood_donor" && <BloodGroup closeOption={() => setServiceName('')} userDetails={route.params.userDetails} visible={serviceName === "blood_donor" ? true : false} />}

      </View>
      {ShowEmergencyServiceModal && <EmergencyServiceModal
        title="Emergency Service Type"
        ShowEmergencyServiceModal={ShowEmergencyServiceModal}
        closeOption={() => setShowEmergencyServiceModal(false)}
        userDetails={route.params.userDetails}
        data={EmergencyServiceData}
        visible={true} />}

    </>
  );
};

export default EmergencyRequestServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center'
  },
});
