import React, { useState } from 'react';
import { Switch, Text, View, Alert, Keyboard } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, Checkbox, TouchableRipple, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LoginService from '../../services/loginServices';
import EmergencyService from '../../services/emergencyServices';

const ConfirmRequest = (props) => {
  console.log(props.data.userDetails);
  console.log(props.geometry);
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

  const onToggleSwitch = () => setIsSelf(!isSelf);
  const [data, setData] = React.useState({
    name: '',
    phonenumber: '',
    landmark: ''
  });

  const submitRequest = () => {
    let updateData = {
      "userid": props.data.userDetails.id,
      "emergencyType": props.data.service_name,
      "geometry": {
        "type": "point",
        "coordinates": [
          props.geometry.latitude,
          props.geometry.longitude
        ]
      },
      "landmark": data.landmark,
      "helpFor": data
    }
    Keyboard.dismiss()

    EmergencyService.emergencyRequest(updateData).then((res) => {
      Alert.alert('Request Success!', 'Your emergency request added, soon you will get help', [
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
    }, error => {
      console.error('onRejected function called: ' + error.message);
      Alert.alert('Login Fail!', error.message, [
        { text: 'Retry' }
      ]);
      return;
    })
  }
  return (
    <Provider>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} dismissable={false}>
          <Dialog.Title>{props.data.service_title} Request</Dialog.Title>
          <Dialog.Content >
            <View style={{
              flexDirection: 'row', flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              marginBottom: 20
            }}>
              <Text>Others</Text>
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
            <Button mode={'contained'} color={'#ea3a3a'} onPress={() => { props.closeOption() }} style={{ marginRight: 30 }}>Cancel</Button>
            <Button mode={'contained'} color={'#17841c'} onPress={() => submitRequest()}>Submit</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default ConfirmRequest;