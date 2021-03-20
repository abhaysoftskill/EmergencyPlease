import React,{useState, useEffect} from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import MyRequestsCard from '../components/myRequestsCard';
import { data } from '../model/data';
import EmergencyService from '../services/emergencyServices';
import AmbulanceRequest from './requests/Ambulance';
import BloodGroup from './requests/BloodGroup';

const MyRequests = ({route, navigation }) => {
  const [myRequestData, setMyRequestData] = useState([])
  
  const renderItem = ({ item }) => {
    return (
      <MyRequestsCard
        itemData={item}
        onPress={() => callService(item.name)}
      />
    );
  };
 
  const requestData = () => {
    EmergencyService.myEmergencyRequest(route.params.userDetails.id).then((res) => {
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
      setMyRequestData(res)
    }, error => {
        console.error('onRejected function called: ' + error.message);
        return;
    })
}
useEffect(() => {
  requestData()
}, [])
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={myRequestData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
};

export default MyRequests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center'
  },
});
