import React, { useEffect, useState } from 'react';
import {
    View,
    Text,

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
import { RadioButton, Button } from 'react-native-paper';
import DateCalendar from '../../components/Calendar';
import SelectBloodGroup from '../../components/BloodGroup';
import Loader from '../../components/Loading';
import EmergencyService from '../../services/emergencyServices';
import AsyncStorage from '@react-native-community/async-storage';

const FamilyFriendsDetails = ({ route, navigation }) => {
    let dateFormat = require("dateformat");
    const [tab, setTab] = useState('family');
    const [loading, setLoading] = useState(false);

    const emergencyContactsDetails1  = {
        "family": [
            { "name": "rrrr", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false }
        ],
        "friends": [
            { "name": "", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false }
        ],
        "offices": [
            { "name": "", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false }
        ]
    }
    const emergencyContactsDetails = {}
    const [userDetails, setUserDetails] = useState({})
    useEffect(() => {
        setTimeout(async () => {
            // setIsLoading(false);
            try {
                let userDetailsData = await AsyncStorage.getItem('userDetails');
                setUserDetails(JSON.parse(userDetailsData));
                setFamilyContact(JSON.parse(userDetailsData)?.familyContacts?.filter((e) => e.name != '') || [])
                setFriendsContact(JSON.parse(userDetailsData)?.friendsContacts?.filter((e) => e.name != '') || []);
                setOfficesContact(JSON.parse(userDetailsData)?.officeContacts?.filter((e) => e.name != '') || []);
            } catch (e) {
                console.log(e);
            }

        }, 1000);
        return () => setUserDetails({});

    }, []);
  
    const [familyContact, setFamilyContact] = useState(userDetails?.familyContacts?.filter((e) => e.name != '') || []);
    const [friendsContact, setFriendsContact] = useState(userDetails?.friendsContacts?.filter((e) => e.name != '') || []);
    const [officesContact, setOfficesContact] = useState(userDetails?.officeContacts?.filter((e) => e.name != '') || []);

    const textInputChange = (val, contactType, type, index) => {
        if (contactType == 'familyContact') {
            const temp = JSON.parse(JSON.stringify(familyContact))
            temp[index][type] = val
            temp[index].edit = true
            setFamilyContact(temp)
        }
        if (contactType == 'friendsContact') {
            const temp = JSON.parse(JSON.stringify(friendsContact))
            temp[index][type] = val
            temp[index].edit = true
            setFriendsContact(temp)
        }
        if (contactType == 'officesContact') {
            const temp = JSON.parse(JSON.stringify(officesContact))
            temp[index][type] = val
            temp[index].edit = true
            setOfficesContact(temp)
        }
    }

    const submitContacts = () => {
        setLoading(true)
        const familyContactDetails = familyContact.filter((e) => e.name != '' && e.contact != '');
        const friendsContactDetails = friendsContact.filter((e) => e.name != '' && e.contact != '');
        const officesContactDetails = officesContact.filter((e) => e.name != '' && e.contact != '');

        let updatedContacts = {
            family: familyContactDetails,
            friends: friendsContactDetails,
            offices: officesContactDetails
        }
        console.log(updatedContacts)
        EmergencyService.updateEmergencyContactDetails({contact:updatedContacts}).then((res) => {
            setTimeout(async () => {
                setLoading(false);
    
                Alert.alert('Emergency Contact Updated !', 'Your contacts updated successfully', [
                    {
                        text: 'Okay',
                        onPress: async () => {
                            try {
                                navigation.navigate('Dashboard')
                            } catch (e) {
                                console.log(e);
                            }
    
                        }
                    }
                ]);
            }, 2000);

        }, error => {
            setLoading(false)

            return;
        })
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6347' barStyle="light-content" />

            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    {loading && <Loader/>}
                     <View style={[styles.button, {
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 20
                    }]}>
                        <TouchableOpacity style={[styles.tabs, tab == 'family' && { backgroundColor: '#FF6347', borderWidth: 0 }]} onPress={() => { setTab('family') }}>
                            <Text style={[styles.text_footer, tab == 'family' ? { color: '#fff' } : { color: '#05375a' }]}>Family</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tabs, tab == 'friends' && { backgroundColor: '#FF6347', borderWidth: 0 }]} onPress={() => { setTab('friends') }}>
                            <Text style={[styles.text_footer, tab == 'friends' ? { color: '#fff' } : { color: '#05375a' }]}>Friends</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tabs, tab == 'offices' && { backgroundColor: '#FF6347', borderWidth: 0 }]} onPress={() => { setTab('offices') }}>
                            <Text style={[styles.text_footer, tab == 'offices' ? { color: '#fff' } : { color: '#05375a' }]}>Offices</Text>
                        </TouchableOpacity>
                    </View>

                    {tab === 'family' && familyContact.length > 0 && familyContact.map((e, index) => (
                        <React.Fragment key={index}>
                            <View style={styles.action} >
                                <Text style={[styles.text_sequence,]}>{index + 1}</Text>
                                <TextInput
                                    placeholder={'Enter ' + `${index + 1}` + ' Family Member Name'}
                                    // placeholder={'Enter' + index + 'Family Member'}
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    // value={e.name}
                                    defaultValue={e.name}
                                    // editable={e.edit}
                                    onChangeText={(val) => textInputChange(val, 'familyContact', "name", index)}
                                />
                            </View>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="phone"
                                    color="#05375a"
                                    size={20}
                                    style={{ marginRight: 10 }}
                                />
                                <TextInput
                                    placeholder="Enter Phone Number"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    defaultValue={e.contact}
                                    keyboardType="numeric"
                                    onChangeText={(val) => textInputChange(val, 'familyContact', "contact", index)}
                                />
                            </View>
                            {index + 1 == familyContact.length && familyContact.length < 3 && familyContact[index].name != '' && familyContact[index].contact != '' && <View style={[styles.button, {
                                flex: 1,
                                flexDirection: 'row-reverse',
                            }]}>

                                <TouchableOpacity
                                    style={styles.signIn, styles.signButton}
                                    onPress={() => {
                                        const temp = JSON.parse(JSON.stringify(familyContact))
                                        temp.push({ "name": "", "contact": "", "edit": false })

                                        setFamilyContact(temp)
                                    }}
                                >
                                    <LinearGradient
                                        colors={['#118407', '#0c6604']}
                                        style={[styles.signIn]}
                                    >
                                        <Text style={[styles.textSign, {
                                            color: '#fff'
                                        }]}>Add New Contact</Text>
                                    </LinearGradient>

                                </TouchableOpacity>


                            </View>
                            }
                        </React.Fragment>

                    ))}
                    {tab === 'family' && familyContact.length == 0 && <View style={[styles.button, {
                        flex: 1,
                        flexDirection: 'row-reverse',
                    }]}>

                        <TouchableOpacity
                            style={styles.signIn, styles.signButton}
                            onPress={() => {
                                const temp = JSON.parse(JSON.stringify(familyContact))
                                temp.push({ "name": "", "contact": "", "edit": false })

                                setFamilyContact(temp)
                            }}
                        >
                            <LinearGradient
                                colors={['#118407', '#0c6604']}
                                style={[styles.signIn]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Add New Contact</Text>
                            </LinearGradient>

                        </TouchableOpacity>


                    </View>
                    }
                    {tab === 'friends' && friendsContact.length > 0 && friendsContact.map((e, index) => (
                        <React.Fragment key={index}>
                            <View style={styles.action} >
                                <Text style={[styles.text_sequence,]}>{index + 1}</Text>
                                <TextInput
                                    placeholder={'Enter ' + `${index + 1}` + ' Friend Name'}
                                    // placeholder={'Enter' + index + 'Family Member'}
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    // value={e.name}
                                    defaultValue={e.name}
                                    // editable={e.edit}
                                    onChangeText={(val) => textInputChange(val, 'friendsContact', "name", index)}
                                />
                            </View>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="phone"
                                    color="#05375a"
                                    size={20}
                                    style={{ marginRight: 10 }}
                                />
                                <TextInput
                                    placeholder="Enter Phone Number"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    defaultValue={e.contact}
                                    keyboardType="numeric"
                                    onChangeText={(val) => textInputChange(val, 'friendsContact', "contact", index)}
                                />
                            </View>
                            {index + 1 == friendsContact.length && friendsContact.length < 3 && friendsContact[index].name != '' && friendsContact[index].contact != '' && <View style={[styles.button, {
                                flex: 1,
                                flexDirection: 'row-reverse',
                            }]}>

                                <TouchableOpacity
                                    style={styles.signIn, styles.signButton}
                                    onPress={() => {
                                        const temp = JSON.parse(JSON.stringify(friendsContact))
                                        temp.push({ "name": "", "contact": "", "edit": false })

                                        setFriendsContact(temp)
                                    }}
                                >
                                    <LinearGradient
                                        colors={['#118407', '#0c6604']}
                                        style={[styles.signIn]}
                                    >
                                        <Text style={[styles.textSign, {
                                            color: '#fff'
                                        }]}>Add New Contact</Text>
                                    </LinearGradient>

                                </TouchableOpacity>


                            </View>
                            }
                        </React.Fragment>

                    ))}
                    {tab === 'friends' && friendsContact.length == 0 && <View style={[styles.button, {
                        flex: 1,
                        flexDirection: 'row-reverse',
                    }]}>

                        <TouchableOpacity
                            style={styles.signIn, styles.signButton}
                            onPress={() => {
                                const temp = JSON.parse(JSON.stringify(friendsContact))
                                temp.push({ "name": "", "contact": "", "edit": false })

                                setFriendsContact(temp)
                            }}
                        >
                            <LinearGradient
                                colors={['#118407', '#0c6604']}
                                style={[styles.signIn]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Add New Contact</Text>
                            </LinearGradient>

                        </TouchableOpacity>


                    </View>
                    }
                    {tab === 'offices' && officesContact.length > 0 && officesContact.map((e, index) => (
                        <React.Fragment key={index}>
                            <View style={styles.action} >
                                <Text style={[styles.text_sequence,]}>{index + 1}</Text>
                                <TextInput
                                    placeholder={'Enter ' + `${index + 1}` + ' Family Member Name'}
                                    // placeholder={'Enter' + index + 'Family Member'}
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    // value={e.name}
                                    defaultValue={e.name}
                                    // editable={e.edit}
                                    onChangeText={(val) => textInputChange(val, 'officesContact', "name", index)}
                                />
                            </View>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="phone"
                                    color="#05375a"
                                    size={20}
                                    style={{ marginRight: 10 }}
                                />
                                <TextInput
                                    placeholder="Enter Phone Number"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    defaultValue={e.contact}
                                    keyboardType="numeric"
                                    onChangeText={(val) => textInputChange(val, 'officesContact', "contact", index)}
                                />
                            </View>
                            {index + 1 == officesContact.length && officesContact.length < 3 && officesContact[index].name != '' && officesContact[index].contact != '' && <View style={[styles.button, {
                                flex: 1,
                                flexDirection: 'row-reverse',
                            }]}>

                                <TouchableOpacity
                                    style={styles.signIn, styles.signButton}
                                    onPress={() => {
                                        const temp = JSON.parse(JSON.stringify(officesContact))
                                        temp.push({ "name": "", "contact": "", "edit": false })

                                        setOfficesContact(temp)
                                    }}
                                >
                                    <LinearGradient
                                        colors={['#118407', '#0c6604']}
                                        style={[styles.signIn]}
                                    >
                                        <Text style={[styles.textSign, {
                                            color: '#fff'
                                        }]}>Add New Contact</Text>
                                    </LinearGradient>

                                </TouchableOpacity>


                            </View>
                            }
                        </React.Fragment>

                    ))}
                    {tab === 'offices' && officesContact.length == 0 && <View style={[styles.button, {
                        flex: 1,
                        flexDirection: 'row-reverse',
                    }]}>

                        <TouchableOpacity
                            style={styles.signIn, styles.signButton}
                            onPress={() => {
                                const temp = JSON.parse(JSON.stringify(officesContact))
                                temp.push({ "name": "", "contact": "", "edit": false })

                                setOfficesContact(temp)
                            }}
                        >
                            <LinearGradient
                                colors={['#118407', '#0c6604']}
                                style={[styles.signIn]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Add New Contact</Text>
                            </LinearGradient>

                        </TouchableOpacity>


                    </View>
                    }
                    {/* {tab === 'friends' && emergencyContactsDetails['friends'].map((e, index) => (
                        <React.Fragment key={index}>
                            <View style={styles.action} >
                                <Text style={[styles.text_sequence,]}>{index + 1}</Text>
                                <TextInput
                                    placeholder={'Enter ' + `${index + 1}` + ' Friend Name'}
                                    // placeholder={'Enter' + index + 'Family Member'}
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    defaultValue={e.name}
                                    // editable={e.edit}
                                    onChangeText={(val) => textInputChange(val, 'friends', "name", index)}
                                />
                                {e.edit && <FontAwesome
                                    name="pencil"
                                    color="#05375a"
                                    size={20}
                                    style={{ marginRight: 10 }}
                                />}

                            </View>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="phone"
                                    color="#05375a"
                                    size={20}
                                    style={{ marginRight: 10 }}
                                />
                                <TextInput
                                    placeholder="Enter Phone Number"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    defaultValue={e.contact}
                                    // editable={e.edit}
                                    keyboardType="numeric"
                                    onChangeText={(val) => textInputChange(val, 'friends', "contact", index)}
                                />

                            </View>
                        </React.Fragment>
                    ))}
                    {tab === 'offices' && emergencyContactsDetails['offices'].map((e, index) => (
                        <React.Fragment key={index}>
                            <View style={styles.action} >
                                <Text style={[styles.text_sequence,]}>{index + 1}</Text>
                                <TextInput
                                    placeholder={'Enter ' + `${index + 1}` + ' Office Friend Name'}
                                    // placeholder={'Enter' + index + 'Family Member'}
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    defaultValue={e.name}
                                    // editable={e.edit}
                                    onChangeText={(val) => textInputChange(val, 'offices', "name", index)}
                                />
                                {e.edit && <FontAwesome
                                    name="pencil"
                                    color="#05375a"
                                    size={20}
                                    style={{ marginRight: 10 }}
                                />}

                            </View>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="phone"
                                    color="#05375a"
                                    size={20}
                                    style={{ marginRight: 10 }}
                                />
                                <TextInput
                                    placeholder="Enter Phone Number"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    defaultValue={e.contact}
                                    // editable={e.edit}
                                    keyboardType="numeric"
                                    onChangeText={(val) => textInputChange(val, 'offices', "contacts", index)}
                                />

                            </View>
                        </React.Fragment>
                    ))} */}



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
                            // onPress={() => {navigation.navigate('EmergencyDetails', { userDetails: data }) }}
                            onPress={() => submitContacts()}
                        >
                            <LinearGradient
                                colors={['#FFA07A', '#FF6347']}
                                style={[styles.signIn]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Submit Contacts</Text>
                            </LinearGradient>

                        </TouchableOpacity>


                    </View>

                </ScrollView>
            </Animatable.View>

        </View>
    );
};

export default FamilyFriendsDetails;

const styles = StyleSheet.create({
    tabs: {
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderTopEndRadius: 5,
        borderTopStartRadius: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#FF6347'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 40
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        fontSize: 18
    },
    text_sequence: {
        color: '#05375a',
        borderWidth: 1,
        padding: 2,
        borderRadius: 100,
        fontSize: 15,
        alignItems: 'center',
        textAlignVertical: 'center',
        height: 25,
        width: 25,
        textAlign: 'center'
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 0
    },
    textInput: {
        flex: 1,
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
        marginTop: 10

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