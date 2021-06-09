import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, Checkbox, TouchableRipple, RadioButton, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ModalInputs = (props) => {
  const navigation = useNavigation();
  return (
    <>
      {props.type === 'boolean' && <View style={{ flexDirection: 'row' }}>
        <View style={{ width: 120, height: 60, paddingLeft: 10, justifyContent: 'center' }} >
          <Text style={{ fontSize: 16, color: '#888' }}>{props.label}</Text>
        </View>
        <View style={{ width: 100, height: 60, flexDirection: 'row', justifyContent: 'center' }} >
          <Switch value={props.value} onValueChange={(value) => { props.changeValue(value) }} style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} />
        </View>
      </View>}
      {props.type === 'radio' && <View style={{ paddingLeft: 10,}}>
        <Text style={{ fontSize: 16, color: '#888' }}>{props.label}</Text>
        </View>}
      {props.type === 'radio' && props.data.map((e, i) => <View key={i} style={{ flexDirection: 'row'}}>
      
        <View style={{ width: 40, height: 50, justifyContent: 'center' }} >

          <RadioButton
            value={e.value}
            status={e.checked ? 'checked' : 'unchecked'}
            onPress={() => {props.changeValue(e.value, i)}}
          />
         
        </View>
        <View style={{ width: '100%', height: 50, justifyContent: 'center' }} >
          <Text style={{ fontSize: 16, color: '#888' }}>{e.label}</Text>
        </View>
      </View>)}
      {props.type === 'checkbox' && <View style={{ paddingLeft: 10,}}>
        <Text style={{ fontSize: 16, color: '#888' }}>{props.label}</Text>
        </View>}
      {props.type === 'checkbox' && props.data.map((e, i) => <View key={i} style={{ flexDirection: 'row', }}>
        <View style={{ width: 40, height: 50, justifyContent: 'center' }} >
            <Checkbox
            status={e.checked ? 'checked' : 'unchecked'}
            onPress={() => {props.changeValue(!e.checked, i)}}
          />
         
        </View>
        <View style={{ width: '100%', height: 50, justifyContent: 'center' }} >
          <Text style={{ fontSize: 16, color: '#888' }}>{e.label}</Text>
        </View>
      </View>)}
      {props.type === 'input' && <View style={{ flexDirection: 'row', }}>

        <View style={{ width: '100%', paddingLeft: 10, justifyContent: 'center' }} >
          <TextInput
            label={props.label}
            value={props.value}
            mode={'outlined'}

            onChangeText={(newvalue) => {props.changeValue(newvalue)}}
          />
        </View>
      </View>}
      {props.type === 'textarea' && <View style={{ flexDirection: 'row', }}>

        <View style={{ width: '100%', paddingLeft: 10, justifyContent: 'center' }} >
          <TextInput
           label={props.label}
           value={props.value}
           mode={'outlined'}
           multiline={true}
           onChangeText={(newvalue) => {props.changeValue(newvalue)}}
          />
        </View>
      </View>}

   
    </>
  );
};

export default ModalInputs;