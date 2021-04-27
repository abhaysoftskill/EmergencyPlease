import React,{useState, useEffect} from 'react';
import { View, Text, Button, FlatList, StyleSheet, Linking } from 'react-native';
import { emergencyContactsNumber } from '../../model/data';
import EmerContactCard from './EmerContactCard';
// import Card from '../components/Card';


const EmergencyContacts = ({route, navigation }) => {

  const [serviceName, setServiceName] = useState('')
  

  const makeCall = (e) => {
    let phoneNumber = ''

    if(Platform.OS === 'android'){
        phoneNumber = `tel:${e.number}`
    }
    else {
        phoneNumber = `telprompt:${e.number}`
    }

    Linking.openURL(phoneNumber);
};
const renderItem = ({ item }) => {
    return (
      <EmerContactCard
        itemData={item}
        onPress={() => makeCall(item)}
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
          data={emergencyContactsNumber}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
        

      </View>
    </>
  );
};

export default EmergencyContacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center'
  },
});
