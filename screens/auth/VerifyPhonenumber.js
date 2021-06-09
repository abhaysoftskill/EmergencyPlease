import React, { useEffect, useState } from 'react';
import { Modal, Switch, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, Checkbox, TouchableRipple, RadioButton, Menu, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DropDown from 'react-native-paper-dropdown';
import smsService from '../../services/smsServices';
import modalStyles from '../../model/loginValidationModal';
import { Icon } from 'native-base';
import { data } from '../../model/data';
const VerifyPhonenumber = (props) => {
  // console.log(props)
  const navigation = useNavigation();
  const [visible, setVisible] = useState(props.visible);

  const showDialog = () => setVisible(true);

  const hideDialog = () => props.closeOption()
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  // const submitService = () => {
  //    props.closeOption()
  //   navigation.navigate('Map', { itemData: '' });
  // }
  const [OTP, setOTP] = React.useState('');

  const [timeLeft, setTimeLeft] = useState(0)
  const [sendOTP, setSendOTP] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sessionID, setSessionID] = useState('')

  const VerifyOTP = (param) => {
    setLoading(true)

    smsService.verifySMS(OTP, sessionID).then((res) => {
      setLoading(false)

      Alert.alert(`Phonenumber ${props.phonenumber} Verified Successfully!'`, `Your phone number verified with Emergency Please.`, [
        {
          text: 'Ok',
          onPress: async () => {
            try {
              props.phoneVerfied();
              props.closeOption();
              return
            } catch (e) {
              console.log(e);
            }

          }
        }

      ])

    }, error => {
      setLoading(false)
      console.log(error)
      Alert.alert('OTP Verify Fail!', `${error.Details} Try again or contact to support `, [
        { text: 'Retry' }
      ]);
      return;
    })

  }
  const SendOTP = (param) => {
    setLoading(true)
    var count = 0;
    const intervalId = setInterval(() => {
      count++;
      if (count > 10) {
        return clearInterval(intervalId)
      }
      else {
        return setTimeLeft(timeLeft => timeLeft - 1)
      }
    }, 1000)


    smsService.sendSMS(props.phonenumber).then((res) => {
      setLoading(false)
      setSessionID(res.Details)
      Alert.alert(`OTP ${param} Successfully!'`, 'Check you message Inbox', [
        {
          text: 'Ok',
          onPress: async () => {
            try {
              return
            } catch (e) {
              console.log(e);
            }

          }
        }

      ])

    }, error => {
      setLoading(false)

      Alert.alert('OTP Send Fail!', `Try again `, [
        { text: 'Retry' }
      ]);
      return;
    })


  }
  return (
    <Modal  // <Provider>
      animationType="fade"
      transparent={true}
      backgroundColor='red'
      visible={props.verifyContact}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              backgroundColor: '#ccc',
              width: 40,
              height: 40,
              borderRadius: 50,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              right: 0,
              top: -10,
              zIndex: 9

            }}
            onPress={() => { setSendOTP(false), props.closeOption() }} >
            <Icon
              name='close'
              color='red' />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: "flex-start" }}>
            <Text style={{ fontSize: 18 }}>Phone Number Verification </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: "flex-start", marginBottom: 20 }}>
            <Text style={{ color: 'red', fontSize: 25 }}>{props.phonenumber}</Text>
          </View>

          {sendOTP && <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <View style={{
              width: '70%',
              flexDirection: 'column',
              justifyContent: 'center',
              height: 50
            }} >
              <TextInput
                value={OTP}
                mode="outlined"
                onChangeText={otp => setOTP(otp)}
                style={{
                  backgroundColor: '#fff', width: '100%', flex: 1,
                  justifyContent: "center",
                  flex: 1,
                  marginTop: Platform.OS === 'ios' ? 0 : -12,
                  paddingLeft: 10,
                  color: '#05375a',
                }}
                keyboardType='number-pad'
                placeholder={'Enter OTP*'}
              />

            </View>
            <View style={{
              width: '30%',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }} >
              {timeLeft != 0 && <Text style={{ fontSize: 17, color: '#8e8e8e' }}>{timeLeft} Sec </Text>
              }
            </View>

          </View>}

          {<View style={{ flexDirection: 'row', marginTop: 20 }}>

            {sendOTP && <Button mode={'contained'} color={'#ea3a3a'} style={{ marginRight: 10 }}
              onPress={() => { setSendOTP(true), setTimeLeft(30), SendOTP('Resend') }}
              disabled={timeLeft != 0}>Resend OTP</Button>}
            {!sendOTP && <Button mode={'contained'} color={'#17841c'}
              style={{ marginRight: 10 }} onPress={() => { setSendOTP(true), setTimeLeft(10), SendOTP('Send') }}>Send OTP</Button>}
            {sendOTP && <Button mode={'contained'} color={'orange'} style={{ marginRight: 10 }} onPress={() => { VerifyOTP() }}>Verify OTP</Button>
            }
          </View>}
          {sendOTP && <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text style={{ color: 'red' }}>OTP sent to your phone number</Text>
          </View>}
          {loading && <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            backgroundColor: '#fff',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 999999,
            height: '100%',
          }}>
            <Image
              source={require('../../assets/loading.png')}
              // style={{ width: 200, height: 100 }}
              resizeMode="cover"
            />
            <Text>Please wait....</Text>
          </View>}
        </View>
      </View>


    </Modal>
  );
};

export default VerifyPhonenumber;