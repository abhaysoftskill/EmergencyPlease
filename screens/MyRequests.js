import { useTheme } from '@react-navigation/native';
import { Icon } from 'native-base';
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import EmergencyService from '../services/emergencyServices';
import MyRequestsCard from './myRequestsCard';

const MyRequests = ({ route, navigation }) => {
  const { colors } = useTheme();
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
    EmergencyService.myEmergencyRequest().then((res) => {
      setMyRequestData(res)
    }, error => {
      return;
    })
  }
  useEffect(() => {
    requestData()
    return () => {setMyRequestData([])}
  }, [])
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={myRequestData.requests}
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
