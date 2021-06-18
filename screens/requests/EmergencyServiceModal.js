import React, { useState } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, Checkbox, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ModalInputs from './ModalInputs';
import { data } from '../../model/data';

const EmergencyServiceModal = (props) => {
  console.log(props.data)
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
  const [serviceData, setServiceData] = useState(props.data)
  const [modalData, setModalData] = useState(JSON.parse(props.data.modalData) || [])

  const updateValue = (type, value, index, changeIndex) => {
    let updateData = [...modalData];
    let newdata = { ...updateData[index] };
    if (type == 'radio') {
      let updateD = newdata.data.map(item => ({ ...item, checked: false }))
      updateD[changeIndex].checked = true;
      updateData[index] = { "type": "radio", "label": newdata.label, "flex": newdata.flex, "data": updateD }
      setModalData(updateData);

    }
    else if (type == 'checkbox') {
      newdata.data[changeIndex].checked = value
      updateData[index] = newdata;
      setModalData(updateData);

    }
    else {
      newdata.value = value;
      updateData[index] = newdata;
      setModalData(updateData);
    }

  }

  return (
    <Provider>
      {/* <Button onPress={showDialog}>Show Dialog</Button> style={{ maxHeight: '100%', minHeight:100, height:200 }} */}
      <Portal>
        <Dialog visible={props.ShowEmergencyServiceModal} onDismiss={hideDialog} dismissable={false}>
          <Dialog.Title style={{ color: '#FF6347' }}>{props.title}</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView >
              <View style={{ flex: 1, flexDirection: 'column' }}>
                {modalData && modalData.map((e, index) => {
                  return <ModalInputs key={index} type={e.type} value={e.value} label={e.label} data={e.data} changeValue={(newvalue, changeIndex) => { updateValue(e.type, newvalue, index, changeIndex) }} />

                })}

              </View>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>

            <Button mode={'contained'} color={'#ea3a3a'} onPress={() => { props.closeOption() }} style={{ marginRight: 30 }}>Cancel</Button>
            <Button mode={'contained'} color={'#17841c'} onPress={() => {
              let tempJSON = []
              modalData.map((e) => {
                if(e.type == 'radio'){
                  if(e.data.length > 0){
                    e.data.map((d) => {
                       if(d.checked == true){
                         return tempJSON.push({label:e.label, value: d.value})
                       }else return
                    })
                  }
                }
              })
              setVisible(false); navigation.navigate('EmergencyReport', {
                service_id: props.data.service_id,
                service_name: props.data.service_name,
                service_name_alias: props.data.service_name_alias,
                details: tempJSON,
                userDetails: props.userDetails
              })
            }}>Done</Button>

          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default EmergencyServiceModal;