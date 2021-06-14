import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Linking, Platform, PermissionsAndroid, ActivityIndicator, ScrollView, TouchableOpacity, Share } from 'react-native';
import { emergencyContactsNumber } from '../../model/data';
import EmergencyService from '../../services/emergencyServices';
import EmerContactCard from './EmerContactCard';
import Contacts from 'react-native-contacts';
import { useSelector } from 'react-redux';
import { Paragraph, Title } from 'react-native-paper';
import PhoneContactCard from './PhoneContactCard';


const EmergencyContacts = ({ route, navigation }) => {
  const { contactsList } = useSelector(state => state.contactsReducer);
  const [serviceName, setServiceName] = useState('')
  const [emergencyContacts, setEmergencyContacts] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search')
  const [tab, setTab] = useState(1)

  const makeCall = (e) => {
    let phoneNumber = ''

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${e.contact_number}`
    }
    else {
      phoneNumber = `telprompt:${e.contact_number}`
    }

    Linking.openURL(phoneNumber);
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message: 'Please Install this app and It will help us in any emergency situations , AppLink :https://play.google.com/store/apps/details?id=com.aklogical.emergencyplease',
        url: 'https://play.google.com/store/apps/details?id=com.aklogical.emergencyplease'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const phoneRenderItem = ({ item }) => {
    return (
      <PhoneContactCard
        itemData={item}
        onPress={() => onShare()}
      />
    );
  };
  const emerRenderItem = ({ item }) => {
    return (
      <EmerContactCard
        itemData={item}
        onPress={() => makeCall(item)}
      />
    );
  };
  const updateRestContact = () => {
    setContacts(...contacts, contactsList.slice(10, contactsList.length));

  }
  const search = (text) => {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === "" || text === null) {
      // console.log(contactsList.slice(0, 10))
      setContacts(contactsList);
      // setTimeout( () => {
      //   updateRestContact();
      // },100)

    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then(contacts => {
        setContacts(contacts)
      });
    } else if (emailAddressRegex.test(text)) {
      Contacts.getContactsByEmailAddress(text).then(contacts => {
        setContacts(contacts)
      });
    } else {
      Contacts.getContactsMatchingString(text).then(contacts => {
        setContacts(contacts)
      });
    }
  }

  useEffect(async () => {
    // if (Platform.OS === "android") {
    //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    //     title: "Contacts",
    //     message: "This app would like to view your contacts."
    //   }).then(() => {
    //     loadContacts();
    //   });
    // } else {
    //   loadContacts();
    // }
    if (contactsList) {
      setContacts(contactsList);
      // setTimeout( () => {
      //   updateRestContact();
      // },10)
      // setContacts(contactsList);
      setSearchPlaceholder(`Search ${contactsList.length} contacts`);
    };
    EmergencyService.emergencyContacts().then((res) => {
      setEmergencyContacts(res);
      setLoading(false);
    }, error => {
      return;
    })
    const unsubscribe = navigation.addListener("focus", () => {
      setServiceName('')
    })

    // this will help to clear the state when navigate the screen
    return unsubscribe;
  }, [navigation, contactsList])
  return (
    <View style={styles.container}>

      {/* <SearchBar
          searchPlaceholder={searchPlaceholder}
          onChangeText={(e) => search(e)}
        /> */}
      <View
        style={{
          flexDirection: "row", flexWrap: "wrap",
          justifyContent: 'space-between',
        }}
      >

        {<TouchableOpacity
          onPress={() => setTab(1)}
        >
          <View
            style={[styles.box, {
              backgroundColor: tab == 1 ? '#FF6347' : '#fba797',
              width: 170, height: 50, alignItems: 'center', justifyContent: 'center'
            }]}
          >

            <View style={styles.innerContainer}>
              {/* <Ionicons name="md-person" size={35} color="#fff" /> */}

              <View style={{ color: '#fff' }}>
                <Title style={{ color: '#fff', fontSize: 14 }}>Emergency Contacts</Title>
              </View>
            </View>

          </View>
        </TouchableOpacity>}
        {<TouchableOpacity
          onPress={() => setTab(2)}
        >
          <View
            style={[styles.box, {
              backgroundColor: tab == 2 ? '#FF6347' : '#fba797',
              width: 170, height: 50, alignItems: 'center', justifyContent: 'center'
            }]}
          >

            <View style={styles.innerContainer}>
              {/* <Ionicons name="md-person" size={35} color="#fff" /> */}

              <View style={{ color: '#fff' }}>
                <Title style={{ color: '#fff', fontSize: 14 }}>Phone Contacts</Title>
              </View>
            </View>

          </View>
        </TouchableOpacity>}

      </View>
      {loading && <View style={styles.spinner}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>}
      {tab == 1 && <FlatList
        data={emergencyContacts?.contacts}
        renderItem={emerRenderItem}
        keyExtractor={item => item.contact_number}
      />}
      {tab == 2 && <FlatList
        data={contacts}
        renderItem={phoneRenderItem}
        keyExtractor={item => item.recordID}
      />}
    </View>
  );
};

export default EmergencyContacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center'
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    alignContent: "center",
    justifyContent: "center"
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: "center"
  }
});
