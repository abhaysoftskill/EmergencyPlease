import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { RadioButton } from 'react-native-paper';
import DateCalendar from '../../components/Calendar';
import SelectBloodGroup from '../../components/BloodGroup';
import { authStack } from '../../utils/navigations/Routes';
import LoginService from '../../services/loginServices';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';
import Loader from '../../components/Loading';
import { AuthContext } from '../../components/context';

const Welcome = ({ route, navigation }) => {
    let dateFormat = require("dateformat");
    const { signIn } = useContext(AuthContext);

const [gender, setGender] = React.useState('male');
    // const [dob, setDOB] = React.useState(dateFormat(new Date(), "dd-mm-yyyy"));
    const [dob, setDOB] = useState(new Date(Date.parse(new Date())));
    const [showBloodGroup, setShowBloodGroup] = useState(false);
    const [bloodGroup, setBloodGroup] = useState('A');
    const [bloodGroupType, setBloodGroupType] = useState('+ve');
    const [showCalendar, setShowCalendar] = React.useState(false);
    const [data, setData] = React.useState({
         ...route.params.userDetails,
        gender: gender,
        dob: dob,
        bloodGroup: bloodGroup,
        bloodGroupType: bloodGroupType
    });
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setData({
             ...route.params.userDetails,
            gender: gender,
            dob: dob,
            bloodGroup: bloodGroup,
            bloodGroupType: bloodGroupType
        })
       
    }, [dob, gender, bloodGroup, bloodGroupType])

    const loginPhonenumber = () => {
        setLoading(true)

        LoginService.loginviaotppassword({
            "phonenumber": data.phonenumber,
        }).then((res) => {
            // phonenumberVerified();
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
    const updateDetails = () => {
        const updateData = {
            gender: data.gender,
            dob: data.dob,
            bloodGroup: data.bloodGroup + data.bloodGroupType,
            email: data.email
        }
        LoginService.genderdetails(updateData).then((res) => {
            setTimeout(async () => {
                Alert.alert(`Profile updated successfully!'`, 'Welcome to Emergency Please.', [
                    {
                        text: 'Thank You',
                        onPress: async () => {
                            try {
                                loginPhonenumber()
                                // navigation.navigate('SignIn', { userDetails: data })
                            } catch (e) {
                                console.log(e);
                            }

                        }
                    }

                ])
            }, 2000);

        }, error => {
            Alert.alert('Profile updated!', error.message, [
                { text: 'Retry' }
            ]);
            return;
        })
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'android');
        setShow(false);

        setDOB(currentDate);
      };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };

      
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
           {loading && <Loader />}
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
                <Text style={styles.text_header}>{data.firstname + " " + data.lastname}</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <Text style={styles.text_footer}>Gender</Text>
                    <View style={styles.action}>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ width: 40, height: 50, justifyContent: 'center' }} >
                                <RadioButton
                                    value={'male'}
                                    status={gender === 'male' ? 'checked' : 'unchecked'}
                                    onPress={() => setGender('male')}
                                />
                            </View>
                            <View style={{ width: 100, height: 50, justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16, color: '#888' }}>{'Male'}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ width: 40, height: 50, justifyContent: 'center' }} >
                                <RadioButton
                                    value={'female'}
                                    status={gender === 'female' ? 'checked' : 'unchecked'}
                                    onPress={() => setGender('female')}
                                />
                            </View>
                            <View style={{ width: 100, height: 50, justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16, color: '#888' }}>{'Female'}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.dobAction}>
                    <Text style={[styles.text_footer]}>Birth Date</Text>
                        <Text style={[styles.text_footer]}>{Moment(dob).format('DD-MM-YYYY')}</Text>
                        <View><FontAwesome
                            name="calendar"
                            color="#05375a"
                            size={20}
                            style={{marginRight:50}}
                            onPress={showDatepicker}
                        /></View>
                            {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
                         {/* <DatePicker
                            style={styles.datePickerStyle}
                            date={data.dob} // Initial date from state
                            mode="date" // The enum of date, datetime and time
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            // minDate="01-01-2016"
                            // maxDate="01-01-2019"
                            // current={Moment(new Date(), "DD-MM-YYYY").subtract(13, 'years').format('YYYY-MM-DD')}
                            minDate={Moment(new Date(), "DD-MM-YYYY").subtract(80, 'years').format('DD-MM-YYYY')}
                            maxDate={Moment(new Date(), "DD-MM-YYYY").subtract(13, 'years').format('DD-MM-YYYY')}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    //display: 'none',
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginLeft: 36,
                                },
                            }}
                            onDateChange={(date) => {
                                console.log(date)
                                setDOB(date)
                            }}
                        />  */}
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={dob}
                                mode={mode}
                                is24Hour={false}
                                display="default"
                                onChange={onChange}
                                minimumDate={new Date(1901, 0, 1)}
                                maximumDate={new Date()}
                               
                            />
                        )}
                         
                    </View>
                    <View style={styles.action}>
                        <Text style={styles.text_footer}>Blood Group</Text>
                        <Text style={[styles.text_footer, { marginLeft: 40, color: '#8e8e8e', fontSize: 16 }]}>{bloodGroup} {bloodGroupType}</Text>
                        <FontAwesome
                            name="user-md"
                            color="#05375a"
                            size={20}
                            style={{ marginLeft: 85 }}
                            onPress={() => setShowBloodGroup(true)}
                        />
                    </View>

                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            Please add your correct information, It will help while emergency
                            <Text style={styles.color_textPrivate}>{" "}and</Text>
                            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Read Terms of Services</Text>
                        </Text></View>
                    <View style={[styles.button, {
                        flex: 1,
                        flexDirection: 'row-reverse',
                    }]}>

                        <TouchableOpacity
                            style={styles.signIn, styles.signButton}
                            // onPress={() => { navigation.navigate('FamilyFriends', { userDetails: data }) }}
                            onPress={() => { updateDetails() }}
                        >
                            <LinearGradient
                                colors={['#FFA07A', '#FF6347']}
                                style={[styles.signIn]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Submit</Text>
                            </LinearGradient>

                        </TouchableOpacity>


                    </View>

                </ScrollView>
            </Animatable.View>

            {showCalendar && <DateCalendar selectDate={(e) => { console.log(e), setDOB(e), setShowCalendar(false) }} closeOption={() => setShowCalendar(false)} showCalendar={showCalendar} />}
            {showBloodGroup && <SelectBloodGroup selectBloodGroup={(e) => { setBloodGroup(e.bloodGroup), setBloodGroupType(e.bloodGroupType), setShowBloodGroup(false) }} closeOption={() => setShowBloodGroup(false)} />}

        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6347'
    },
    datePickerStyle: {
        marginLeft: 50
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    dobAction:{
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        justifyContent:'space-between'
    },
    textInput: {
        // flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        // alignItems: 'center',
        marginTop: 10,

    },
    signIn: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

    },
    signButton: {
        width: '100%',
        marginLeft: 30,
        marginTop: 30

    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    },
    color_textPrivate: {
        color: 'grey'
    }
});