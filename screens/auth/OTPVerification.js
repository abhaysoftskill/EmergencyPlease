import React, { useContext, useEffect, useState } from 'react';
import { Alert, Modal, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, Checkbox, TouchableRipple, RadioButton, Menu, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DropDown from 'react-native-paper-dropdown';

import modalStyles from '../../model/emailVerifyModal';
import { Icon } from 'native-base';
import smsService from '../../services/smsServices';
import LoginService from '../../services/loginServices';
import { AuthContext } from '../../components/context';
import { LocalizationContext } from '../../translations/LocalizationContext';
const OTPVerification = (props) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(props.visible);
  const {translations} = useContext(LocalizationContext);

  const showDialog = () => setVisible(true);

  const hideDialog = () => props.closeOption()
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  const [paidService, setPaidService] = useState(false);
  const [freeService, setFreeService] = useState(true);
  // const submitService = () => {
  //    props.closeOption()
  //   navigation.navigate('Map', { itemData: '' });
  // }
  const [showDropDown, setShowDropDown] = useState(false);
  const [showTypeDropDown, setShowTypeDropDown] = useState(false);
  const [bloodGroup, setBloodGroup] = useState('A');
  const [bloodGroupType, setBloodGroupType] = useState('+ve');

  const [checked, setChecked] = React.useState('first');
  const [OTP, setOTP] = React.useState('');

  const [timeLeft, setTimeLeft] = useState(0)
  const [sendOTP, setSendOTP] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sessionID, setSessionID] = useState('')
  const { signIn } = useContext(AuthContext);

  // useEffect(() => {

  //   // exit early when we reach 0
  //   if (!timeLeft) return;

  //   // save intervalId to clear the interval when the
  //   // component re-renders
  //   const intervalId = setInterval(() => {
  //     setTimeLeft(timeLeft - 1);
  //   }, 1000);

  //   // clear interval on re-render to avoid memory leaks
  //   return () => clearInterval(intervalId);
  //   // add timeLeft as a dependency to re-rerun the effect
  //   // when we update it
  // }, [timeLeft])
  const phonenumberVerified = () => {
    let updateData = {
      phonenumber: props.userDetails?.phonenumber,
      reqtype: 'login'
    }
    LoginService.otprequest(updateData).then((res) => {
      // console.log(res)
    }, error => {
      setLoading(false)
      return;
    })

  }
  const loginPhonenumber = () => {
    setLoading(true)

    LoginService.loginviaotppassword({
      "phonenumber": props.userDetails?.phonenumber,
    }).then((res) => {
      phonenumberVerified();
      setLoading(false)
      signIn({
        userDetails: res.user,
        userToken: res.token
      })
    }, error => {
      setLoading(false)
      Alert.alert('Login Fail!', error.message, [
        { text: 'Retry' }
      ]);
      return;
    })
  }


  const VerifyOTP = (param) => {
    setLoading(true)
    smsService.verifySMS(OTP, sessionID).then((res) => {
      setLoading(false)

      Alert.alert(`Phonenumber ${props.userDetails?.phonenumber} Verified Successfully!'`, `Your phone number verified with Emergency Please.`, [
        {
          text: 'Ok',
          onPress: async () => {
            try {
              props.closeOption();
              loginPhonenumber()
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


    smsService.sendSMS(props.userDetails?.phonenumber).then((res) => {
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
      visible={props.visible}
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
            onPress={() => {
              setTimeLeft(30),
                setSendOTP(false), props.closeOption()
            }} >
            <Icon
              name='close'
              color='red' />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: "flex-start", marginBottom: 20 }}>
            <Text style={{ fontSize: 18 }}>{translations.WELCOME} {translations.BACK}, </Text>
            <Text style={{ color: 'red', fontSize: 18 }}>{props.userDetails?.firstname}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: "flex-start", marginBottom: 20 }}>
            <Text style={{ color: 'red', fontSize: 25 }}>{props.userDetails?.phonenumber}</Text>
          </View>
          {sendOTP && <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ width: '70%', flexDirection: 'column', justifyContent: 'center', height: 50 }} >
              <TextInput
                value={OTP}
                mode='outlined'
                onChangeText={text => setOTP(text)}
                style={{
                  backgroundColor: '#fff', width: '100%', flex: 1,
                  justifyContent: "center"
                }}
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

          {<View style={{ flexDirection: 'row', marginTop: 50 }}>

            {sendOTP && <Button mode={'contained'} color={'#ea3a3a'} style={{ marginRight: 10 }}
              onPress={() => { setSendOTP(true), setTimeLeft(30), SendOTP('Resend') }}
              disabled={timeLeft != 0}>{translations.OTPRESEND}</Button>}

            {sendOTP && <Button mode={'contained'} color={'orange'} style={{ marginRight: 10 }} onPress={() => { VerifyOTP() }}>{translations.OTPVERIFY}</Button>
            }

            {!sendOTP && <Button mode={'contained'} color={'#f39405'}
              style={{ marginRight: 10 }} onPress={() => { setSendOTP(false), setTimeLeft(30), navigation.navigate('SignInScreen', { userDetails: props.userDetails }), props.closeOption() }}>{translations.USEPASSWORD}</Button>}
            {!sendOTP && <Button mode={'contained'} color={'#17841c'}
              style={{ marginRight: 10 }} onPress={() => { setSendOTP(true), setTimeLeft(30), SendOTP('Send') }}>{translations.OTPSEND}</Button>}
          </View>}
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={{ color: '#d2086f' }}>{translations.OTPSENDTOMOBILE}</Text>
          </View>
          {/* {verifyLoading && <View>
                            <Image
                                source={require('../../assets/loading.png')}
                                resizeMode="cover"
                            />
                            <Text>Please Wait....</Text>
                        </View>} */}
        </View>
      </View>

      {/* <Button onPress={showDialog}>Show Dialog</Button> */}
      {/* <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} dismissable={false}>
          <Dialog.Title>Welcome Back, <Text style={{ color: 'red' }}>{props.userDetails.firstname}</Text></Dialog.Title>
          <Dialog.Content style={{ height: 230 }}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text>OTP has been sent to your registered mobile number</Text>
            </View>
            <View style={{
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
                  value={text}
                  onChangeText={text => setText(text)}
                  style={{
                    backgroundColor: '#fff', width: '100%', flex: 1,
                    justifyContent: "center"
                  }}
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

            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 50
            }}>
              <View style={{
                width: '40%',
                flexDirection: 'column',
                justifyContent: 'center',
                height: 50
              }} >
                <Button mode={'outlined'}
                  labelStyle={{ fontSize: 10, paddingTop: 3, paddingBottom: 3 }}
                  disabled={timeLeft > 0}
                  onPress={() => {
                     props.closeOption()
                    // navigation.navigate('EmergencyReport', { service_name: "Blood Donor", serviceType: { bloodGroup: bloodGroup, bloodGroupType: bloodGroupType } });
                  }}>Resend OTP</Button>
              </View>
              <View style={{
                width: '60%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }} >
                <Button mode={'outlined'} color={'#17841c'}
                  labelStyle={{ fontSize: 12, paddingTop: 3, paddingBottom: 3 }}
                  onPress={() => {
                     props.closeOption()
                    navigation.navigate('SignInScreen', { userDetails: props.userDetails });
                  }}>Use password</Button>

              </View>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode={'contained'} color={'#ea3a3a'} style={{ marginRight: 30 }} onPress={() => { props.closeOption() }}>Cancel</Button>
            <Button mode={'contained'} color={'#17841c'}
              onPress={() => {
                 props.closeOption()
                // navigation.navigate('EmergencyReport', { service_name: "Blood Donor", serviceType: { bloodGroup: bloodGroup, bloodGroupType: bloodGroupType } });
              }}
              disabled={text != '' ? false : true}
              >
              Validate
              </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal> */}
      {/* </Provider> */}
    </Modal>
  );
};

export default OTPVerification;