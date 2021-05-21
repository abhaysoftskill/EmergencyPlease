import React, { useState, useEffect } from 'react';
import { Image, View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import { Provider, TextInput } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import statesData from '../../../model/states';
import EmergencyService from '../../../services/emergencyServices';
const Covid19 = ({ route, navigation }) => {
  const [showStatesList, setShowStatesList] = useState(false);
  const [showDistrictList, setShowDistrictList] = useState(false);
  const [statesList, setStatesList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);
  const [state, setState] = useState('');
  const [disableState, setDisableState] = useState(false);
  const [district, setDistrict] = useState('');
  const theme = useTheme();
  const { colors } = useTheme();
  useEffect(() => {
    const stateListTemp = [];
    EmergencyService.getStates().then((res) => {
      res.states.map((e) => stateListTemp.push({ label: e.state_name, value: e._id }));
      setStatesList(stateListTemp)
    }, error => {
      return;
    })
    // EmergencyService.getStatesById('60a627bb44955a3e18625f3b').then((res) => {
    //   console.log(res)
    // }, error => {
    //   return;
    // })
    // statesData?.states.map((e) => stateListTemp.push({ label: e.state_name, value: e.state_id }));
    // console.log(stateListTemp);

    // statesData?.states.map((e) => setStatesList([...statesList, { label: e.state_name, value: e.state_id }]));
    const unsubscribe = navigation.addListener("focus", () => {
      setStatesList('')
    })
    // this will help to clear the state when navigate the screen
    return unsubscribe;
  }, [navigation])

  useEffect(() => {
    const districtListTemp = [];
    if (state != '') {
      EmergencyService.getDistrictByState('60a627bb44955a3e18625f39').then((res) => {
        res.districts.map((e) => districtListTemp.push({ label: e.district_name, value: e._id }));
        console.log(districtListTemp)
        setDistrictList(districtListTemp)
      }, error => {
        return;
      })
    }
  }, [state])

  const pincodeInputChange = (val) => {
    if (val.trim().length == 6) {
      EmergencyService.getHospitalByPincode('441906').then((res) => {
        // res.districts.map((e) => districtListTemp.push({ label: e.district_name, value: e._id }));
        console.log(res)
        setHospitalList(res)
      }, error => {
        return;
      })
    }

  }
  const handleValidUser = (val) => {
    console.log(val)
    if (val.trim().length == 6) {
      EmergencyService.getHospitalByPincode('441906').then((res) => {
        // res.districts.map((e) => districtListTemp.push({ label: e.district_name, value: e._id }));
        console.log(districtListTemp)
        // setDistrictList(districtListTemp)
      }, error => {
        return;
      })
    }
  }
  return (
    <>
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          {statesList.length > 0 && <DropDown
            label={'State'}
            placeholder={'Select State'}
            mode={'outlined'}
            value={state}
            setValue={setState}
            list={statesList}
            visible={showStatesList}
            showDropDown={() => setShowStatesList(true)}
            onDismiss={() => setShowStatesList(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />,
            }}
            activeColor={'red'}
            theme={theme}
          />}
        </View>
        {/* <Text>{JSON.stringify(districtList)}</Text> */}
        <View style={{ marginBottom: 50 }}>
          {districtList.length > 0 && <DropDown
            label={'District'}
            placeholder={'Select District'}
            mode={'outlined'}
            value={district}
            setValue={setDistrict}
            list={districtList}
            visible={showDistrictList}
            showDropDown={() => setShowDistrictList(true)}
            onDismiss={() => setShowDistrictList(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />
            }}
            activeColor={'red'}
            theme={theme}
          />}
        </View>
        <Text style={{ color: 'red', fontSize: 20, textAlign: 'center' }}>You can search by Pincode</Text>

        {/* {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null} */}

        <View style={styles.action}>

          <TextInput
            placeholderTextColor="#666666"
            keyboardType={'number-pad'}
            style={[styles.textInput, {
              color: colors.text, fontSize: 30,
              letterSpacing: 13, textAlign: 'center'
            }]}
            maxLength={6}
            autoCapitalize="none"
            onChangeText={(val) => pincodeInputChange(val)}
            // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
<Text>{JSON.stringify(hospitalList)}</Text>

        </View>


      </View>
    </>
  );
};

export default Covid19;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center'
  },
  containerStyle: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginTop: 30
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 20,
    color: '#05375a',
  },

});
