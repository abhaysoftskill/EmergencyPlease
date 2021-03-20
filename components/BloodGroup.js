import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, Checkbox, TouchableRipple, RadioButton, Menu, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DropDown from 'react-native-paper-dropdown';


const SelectBloodGroup = (props) => {
    const hideDialog = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  const [bloodGroup, setBloodGroup] = useState('A');
  const [bloodGroupType, setBloodGroupType] = useState('+ve');

  const bloodGroupList = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'AB', value: 'AB' },
    { label: 'O', value: 'O' },
  ];
  const bloodGroupTypeList = [
    { label: '+ve', value: '+ve' },
    { label: '-ve', value: '-ve' },
  ];

  const [checked, setChecked] = React.useState('first');
  return (
    <Provider>
      <Portal>
        <Dialog visible={true} onDismiss={hideDialog}  dismissable={false}>
          <Dialog.Title>Select Blood Group</Dialog.Title>
          <Dialog.Content style={{ height: 230 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ width: 150 }} >
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  {bloodGroupList.map((e, i) => <View key={i} style={{ flexDirection: 'row', }}>
                    <View style={{ width: 40, height: 50, justifyContent: 'center' }} >
                      <RadioButton
                        value={e.value}
                        status={bloodGroup === e.value ? 'checked' : 'unchecked'}
                        onPress={() => setBloodGroup(e.value)}
                      />
                    </View>
                    <View style={{ width: 40, height: 50, justifyContent: 'center' }} >
                      <Text style={{ fontSize: 16, color: '#888' }}>{e.value}</Text>
                    </View>
                  </View>
                  )}
                </View>
              </View>
              <View style={{ width: 80}} >
              <View style={{ flex: 1, flexDirection: 'column' }}>
              {bloodGroupTypeList.map((e, i) => <View key={i} style={{ flexDirection: 'row' }}>
                <View style={{ width: 40, height: 50, justifyContent: 'center' }} >
                  <RadioButton
                    value={e.value}
                    status={bloodGroupType === e.value ? 'checked' : 'unchecked'}
                    onPress={() => setBloodGroupType(e.value)}
                  />
                </View>
                <View style={{ width: 40, height: 50, justifyContent: 'center' }} >
                  <Text style={{ fontSize: 16, color: '#888' }}>{e.label}</Text>
                </View>
              </View>
              )}
            </View>
                </View>
            </View>

           
          </Dialog.Content>
          <Dialog.Actions>
          <Button mode={'contained'} color={'#ea3a3a'} style={{marginRight:30}} onPress={() => { props.closeOption()}}>Cancel</Button>
            <Button  mode={'contained'} color={'#17841c'}  onPress={() =>  props.selectBloodGroup({bloodGroup, bloodGroupType}) }>Submit</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default SelectBloodGroup;