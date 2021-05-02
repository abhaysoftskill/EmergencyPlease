import React, { useEffect, useState } from 'react';
import { Modal, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, Checkbox, TouchableRipple, RadioButton, Menu, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DropDown from 'react-native-paper-dropdown';

import modalStyles from '../../model/emailVerifyModal';
import { Icon } from 'native-base';
const OTPVerification = (props) => {
  // console.log(props)
  const navigation = useNavigation();
  const [visible, setVisible] = useState(props.visible);

  const showDialog = () => setVisible(true);

  const hideDialog = () =>  props.closeOption()
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
  const [text, setText] = React.useState('');

  const [checked, setChecked] = React.useState('first');
  const [timeLeft, setTimeLeft] = useState(10)

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft])
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
            onPress={props.closeOption} >
            <Icon
              name='close'
              color='red' />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: "flex-start", marginBottom: 20 }}>
            <Text style={{ fontSize: 18 }}>Welcome Back, </Text>
            <Text style={{ color: 'red', fontSize: 18 }}>{props.userDetails?.firstname}</Text>
            </View>
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
                  props.closeOption(),
                  navigation.navigate('SignInScreen', { userDetails: props.userDetails });
                }}>Use password</Button>

            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30
          }}>
            <Button mode={'contained'} color={'#17841c'} 
              onPress={() => {
                 props.closeOption()
                // navigation.navigate('EmergencyReport', { service_name: "Blood Donor", serviceType: { bloodGroup: bloodGroup, bloodGroupType: bloodGroupType } });
              }}
              disabled={text != '' ? false : true}
              >
              Validate
              </Button>
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