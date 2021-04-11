import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MyRequestsCard from '../components/myRequestsCard';
import EmergencyService from '../services/emergencyServices';

const MyRequests = ({ route, navigation }) => {
  const [myRequestData, setMyRequestData] = useState([])

  const renderItem = ({ item }) => {
    return (
      <MyRequestsCard
        itemData={item}
        keyExtractor={item => item.id}
      />
    );
  };

  const requestData = () => {
    EmergencyService.myEmergencyRequest(route.params.userDetails.id).then((res) => {
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
          keyExtractor={(item, index) => index}
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
