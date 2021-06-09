import React, { useEffect, useState } from 'react';
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

const Welcome = ({ route, navigation }) => {
    let dateFormat = require("dateformat");

    const [gender, setGender] = React.useState('male');
    const [dob, setDOB] = React.useState(dateFormat(new Date(), "dd-mm-yyyy"));

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
    useEffect(() => {
        setData({
            ...route.params.userDetails,
            gender: gender,
            dob: dob,
            bloodGroup: bloodGroup,
            bloodGroupType: bloodGroupType
        })
    }, [dob, gender, bloodGroup, bloodGroupType])
    const updateDetails = () => {
        const updateData = {
            gender: data.gender,
            dob: data.dob,
            bloodGroup: data.bloodGroup + data.bloodGroupType,
            email:data.email
        }
        LoginService.genderdetails(updateData).then((res) => {
            setTimeout(async () => {
                Alert.alert(`Profile updated!'`, 'Re-Login with your credentials', [
                    {
                        text: 'Ok',
                        onPress: async () => {
                            try {
                                navigation.navigate('SignIn', { userDetails: data })
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
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
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
                    <View style={styles.action}>
                        <Text style={[styles.text_footer]}>Birth Date</Text>
                        {/* <Text style={[styles.text_footer, { marginLeft: 40, color: '#8e8e8e', fontSize: 16 }]}>{dob}</Text> */}
                        <View>
                            <TextInput
                                placeholder=""
                                style={styles.textInput}
                                autoCapitalize="none"
                                value={dob}
                                onChangeText={(val) => {
                                    setDOB(val)
                                }}
                                returnKeyType="next"

                            // style={{ marginLeft: 50 }}
                            />
                        </View>
                        <FontAwesome
                            name="calendar"
                            color="#05375a"
                            size={20}
                            style={{ marginLeft: 50 }}
                            onPress={() => setShowCalendar(true)}
                        />
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
            {showCalendar && <DateCalendar selectDate={(e) => { console.log(e), setDOB(e), setShowCalendar(false) }} closeOption={() => setShowCalendar(false)} />}
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
        fontSize: 18
    },
    action: {
        flex:1,
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
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