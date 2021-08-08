import React, { useState } from 'react';
import { Switch, Text, View, Alert, Keyboard } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, Checkbox, TouchableRipple, TextInput } from 'react-native-paper';
import { useNavigation, useTheme } from '@react-navigation/native';
import LoginService from '../../services/loginServices';
import EmergencyService from '../../services/emergencyServices';
import { Icon, Image } from 'native-base';

const ConfirmRequest = (props) => {

  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  const [paidService, setPaidService] = useState(false);
  const [freeService, setFreeService] = useState(true);
  const [landmark, setLandmark] = useState('');
  // const submitService = () => {
  //   setVisible(false);
  //   navigation.navigate('Map', { itemData: '' });
  // }
  const [isSelf, setIsSelf] = React.useState(true);
  const [loading, setLoading] = useState(false);

  const onToggleSwitch = () => setIsSelf(!isSelf);
  const [data, setData] = React.useState({
    name: '',
    phonenumber: '',
    landmark: ''
  });

  const submitRequest = () => {
    setLoading(true);
    props.loading(true)
    let updateData = {
      "service_id": props.data.service_id,
      "requestDetails": {
        "request_service_id":props.data.service_id,
        "request_service_name":props.data.service_name,
        "request_service_name_alias":props.data.service_name_alias,
        "details":props.data.details || [],
        "requestForSelf": isSelf,
        "landMark": data.landmark,
        "forName": data.name || '',
        "forContact": data.phonenumber || '',
      },
      "geometry": {
        "type": "point",
        "coordinates": [
          props.geometry.latitude,
          props.geometry.longitude
        ]
      }
    }
    Keyboard.dismiss()
    setVisible(false)

    EmergencyService.emergencyRequest(updateData).then((res) => {
      setTimeout(async () => {
        props.loading(false)

        Alert.alert('Request Success!', 'Your emergency request added, soon you will get help, Please check My Request to keep update.', [
          {
            text: 'Done',
            onPress: async () => {
              try {
                navigation.navigate('MyRequests',
                  {
                    userDetails: props.data.userDetails,
                  })
               
              } catch (e) {
                console.log(e);
              }

            }
          }
        ]);
      }, 2000);

    }, error => {
      props.loading(false)

      // console.error('onRejected function called: ' + error.message);
      Alert.alert('Request save fail!', error.message, [
        { text: 'Retry' }
      ]);
      return;
    })
  }
  return (
    <Provider>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} dismissable={false}>
          <Dialog.Title>Request for {props.data.service_name_alias}</Dialog.Title>
          <Dialog.Content >
            <View style={{
              flexDirection: 'row',
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
              <Text style={{ color: 'red' }}>Others</Text>
              <Switch
                trackColor={{ false: "#767577", true: "green" }}
                thumbColor={isSelf ? "red" : "red"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onToggleSwitch}
                value={isSelf}
                style={{ fontSize: 18 }}
              />
              <Text>Self</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

              {props.data.service_name === 'Ambulance' && <Text style={{ fontSize: 15 }}>You are requesting for <Text style={{ color: 'red' }}>{props.data.serviceType.paidService && 'Paid Service &'} {props.data.serviceType.freeService && 'Free Service'}</Text> for {props.data.service_name} </Text>}
              {props.data.service_name === 'Blood Donor' && <Text style={{ fontSize: 15 }}>You are requesting for <Text style={{ color: 'red' }}>{props.data.serviceType.bloodGroup} {props.data.serviceType.bloodGroupType} Blood Donor.</Text> </Text>}
              {props.data.service_name === 'Accident' && <Text style={{ fontSize: 15 }}>You are requesting for <Text style={{ color: 'red' }}>Emergency help for Accident.</Text> </Text>}
              {props.data.service_name === 'Heart Attack' && <Text style={{ fontSize: 15 }}>You are requesting for <Text style={{ color: 'red' }}>Emergency help for Heart Attack.</Text> </Text>}
            </View>
            <View style={{ flexDirection: 'column', marginTop: 20 }}>
              {!isSelf && <TextInput
                label="Name*"
                mode="outlined"
                value={data.name}
                style={{ width: '100%' }}

                onChangeText={val => setData({
                  ...data,
                  name: val,
                })}
              />}
              {!isSelf && <TextInput
                label="Phone Number"
                mode="outlined"
                value={data.phonenumber}
                style={{ width: '100%' }}

                onChangeText={val => setData({
                  ...data,
                  phonenumber: val,
                })}
              />}
              <TextInput
                label="Landmark*"
                mode="outlined"
                value={data.landmark}
                style={{ width: '100%' }}

                onChangeText={val => setData({
                  ...data,
                  landmark: val,
                })}
              />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={{ fontSize: 15 }}><Text style={{ color: 'red' }}>Note: -</Text> Please drag your map location to accurate location in map</Text>

            </View>
          </Dialog.Content>
          <Dialog.Actions>
            {loading && <Text>Please Wait .....</Text>}
            {!loading && <Button mode={'contained'} color={'#ea3a3a'} onPress={() => { props.closeOption() }} style={{ marginRight: 30 }}>Cancel</Button>}
            {!loading && <Button mode={'contained'} color={'#17841c'} onPress={() => submitRequest()} disabled={!data.landmark}>Submit</Button>}
          </Dialog.Actions>

        </Dialog>
      </Portal>
    </Provider>
  );
};

export default ConfirmRequest;