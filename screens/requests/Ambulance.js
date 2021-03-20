import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, Checkbox, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AmbulanceRequest = (props) => {
  console.log(props)
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  const [paidService, setPaidService] = useState(false);
  const [freeService, setFreeService] = useState(true);
  // const submitService = () => {
  //   setVisible(false);
  //   navigation.navigate('Map', { itemData: '' });
  // }
  return (
    <Provider>
      {/* <Button onPress={showDialog}>Show Dialog</Button> */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} dismissable={false}>
          <Dialog.Title>Ambulance Service Type</Dialog.Title>
          <Dialog.Content style={{ height: 120 }}>
            {/* <View>
            <Text  style={{flexDirection: 'column', borderWidth:1, width:100}}>teest</Text>
            <Switch value={true} style={{flexDirection:'column'}} />
            </View> */}
            <View style={{ flex: 1, flexDirection: 'column' }}>
              {/* <View style={{ width: 100, height: 100, flexDirection:'row', justifyContent:'center'}} > */}
                <View style={{  flexDirection: 'row' }}>
                  <View style={{ width: 120,  height:60, justifyContent:'center'}} >
                    <Text style={{fontSize:16, color:'#888'}}>Paid Service</Text>
                  </View>
                  <View style={{ width: 100,  height:60, flexDirection:'row', justifyContent:'center'}} >
                    <Switch value={paidService} onValueChange={(value) => { setPaidService(!paidService) }} style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} />
                  </View>
                </View>

                <View style={{  flexDirection: 'row'}}>
                  <View style={{ width: 120, height:60,justifyContent:'center'}} >
                    <Text style={{fontSize:16, color:'#888'}}>Free Service</Text>
                  </View>
                  <View style={{ width: 100, height:60, flexDirection:'row', justifyContent:'center'}} >
                    <Switch value={freeService} onValueChange={(value) => { setFreeService(!freeService)}} style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} />
                  </View>
                </View>

            </View>
          </Dialog.Content>
          <Dialog.Actions>
          <Button mode={'contained'} color={'#ea3a3a'} onPress={() => { props.closeOption()}} style={{marginRight:30}}>Cancel</Button>
            <Button mode={'contained'} color={'#17841c'} onPress={() =>  {setVisible(false); navigation.navigate('EmergencyReport', { service_name:"ambulance_request",service_title:"Ambulance", serviceType :{paidService : paidService, freeService:freeService}, userDetails: props.userDetails })}}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default AmbulanceRequest;