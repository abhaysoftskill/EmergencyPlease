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
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { RadioButton, Button} from 'react-native-paper';
import DateCalendar from '../../components/Calendar';
import SelectBloodGroup from '../../components/BloodGroup';

const FamilyFriendsDetails = ({ route, navigation }) => {
    let dateFormat = require("dateformat");
    const [data, setData] = React.useState({
        ...route.params.userDetails,
        emergencyContacts:emergencyContacts
    });
   
    const [tab, setTab] = useState('family');
  
    const emergencyContactsDetails = {
        "family": [
            { "name": "", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false },
        ],
        "friends": [
            { "name": "", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false },
        ]
    }
  
    const [emergencyContacts, setEmergencyContacts] = React.useState(emergencyContactsDetails)
  
    const textInputChange = (val,contactType,type,index) => {
        
        emergencyContactsDetails[contactType][index][type] = val
        const temp = JSON.parse(JSON.stringify(emergencyContacts))
        
        temp[contactType][index][type] = val
        setEmergencyContacts(temp)
       
    }
       
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
          
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
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
                    </View>
                    
                    {tab === 'family' && emergencyContacts['family'].map((e, index) => (
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
                                    onChangeText={(val) => textInputChange(val,'family',"name",index)}
                                />
                                {/* {!e.edit && <FontAwesome
                                    name="pencil"
                                    color="#05375a"
                                    size={20}
                                    style={{ marginRight: 10 }}
                                    onPress={() => updateData(true,'family',"edit",index)}
                                />} */}
       
                                {data.check_textInputChange ?
                                    <Animatable.View
                                        animation="bounceIn"
                                    >
                                        <Feather
                                            name="check-circle"
                                            color="green"
                                            size={20}
                                        />
                                    </Animatable.View>
                                    : null}
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
                                    keyboardType="decimal-pad"
                                    onChangeText={(val) => textInputChange(val,'family',"contact",index)}
                                />

                                {data.check_textInputChange ?
                                    <Animatable.View
                                        animation="bounceIn"
                                    >
                                        <Feather
                                            name="check-circle"
                                            color="green"
                                            size={20}
                                        />
                                    </Animatable.View>
                                    : null}
                            </View>
                        </React.Fragment>

                    ))}
                    {tab === 'friends' && emergencyContactsDetails['friends'].map((e, index) => (
                        <React.Fragment key={index}>
                            <View style={styles.action} >
                                <Text style={[styles.text_sequence,]}>{index + 1}</Text>
                                <TextInput
                                    placeholder={'Enter ' + `${index + 1}` + ' Friend Name'}
                                    // placeholder={'Enter' + index + 'Family Member'}
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    value={e.name}
                                    editable={e.edit}
                                    onChangeText={(val) => textInputChange(val)}
                                />
                                 {e.edit && <FontAwesome
                                    name="pencil"
                                    color="#05375a"
                                    size={20}
                                    style={{ marginRight: 10 }}
                                />}
                                {data.check_textInputChange ?
                                    <Animatable.View
                                        animation="bounceIn"
                                    >
                                        <Feather
                                            name="check-circle"
                                            color="green"
                                            size={20}
                                        />
                                    </Animatable.View>
                                    : null}
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
                                    value={e.contact}
                                    editable={e.edit}
                                    keyboardType="decimal-pad"
                                    onChangeText={(val) => textInputChange(val)}
                                />
                                {data.check_textInputChange ?
                                    <Animatable.View
                                        animation="bounceIn"
                                    >
                                        <Feather
                                            name="check-circle"
                                            color="green"
                                            size={20}
                                        />
                                    </Animatable.View>
                                    : null}
                            </View>
                        </React.Fragment>
                    ))}



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
                          //  onPress={() => { console.log(emergencyContacts) }}
                            onPress={() => {console.log(data), navigation.navigate('EmergencyDetails', { userDetails: data }) }}
                           
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
        marginTop:40
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