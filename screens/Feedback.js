import React, { useRef, useState } from 'react';
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
    Alert,
    Modal
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LoginService from '../services/loginServices';
import modalStyles from '../model/loginValidationModal';
import { Paragraph } from 'react-native-paper';
import { Icon } from 'native-base';

import { Button } from 'react-native-paper';
const Feedback = ({ route, navigation }) => {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    const [verifyContact, setVerifyContact] = useState(false)
    const [data, setData] = React.useState({
        comments: '',

    });

    const RegisterUser = () => {
        data.username = (data.firstname.slice(0, 3) + data.lastname.slice(0, 3)).toLowerCase();
        //,{ navigation.navigate('Welcome', { userDetails: data }) }
        LoginService.register(data).then((res) => {
            navigation.navigate('Welcome', { userDetails: res })
        }, error => {
            Alert.alert('Registration Fail!', error.message, [
                { text: 'Retry' }
            ]);
            return;
        })
        // navigation.navigate('Welcome', { userDetails: {
        //     "userid": "6072af04ecaefa290c5c6d55",
        //     "email": "abhaysofttech7@gmail.com",
        //     "userType": "user",
        //     "userCity": "",
        //     "mobileverify": true,
        //     "emailverify": false,
        //     "userGender": "Male",
        //     "bloodGroup": "",
        //     "familyContacts": [],
        //     "friendsContacts": [],
        //     "officeContacts": [],
        //     "firstname": "Abhay",
        //     "lastname": "Narnaware",
        //     "phonenumber": "9960732626",
        //     "dob": "1989-12-18T00:00:00.000Z"
        // } })
    }
    const ref_input1 = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();
    const ref_input6 = useRef();
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Suggestion / Feedback!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={data.firstname}
                            onChangeText={(val) => textInputFirstNameChange(val)}
                            returnKeyType="next"
                            onSubmitEditing={() => ref_input2.current.focus()}
                            ref={ref_input1}
                            multiline={true}
                            numberOfLines={5}
                            mode={'outlined'}
                        />

                    </View>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-between'}}>
                    <Ionicons name={'ios-star'} size={15} style={styles.star}  />
                    <Ionicons name={'ios-star'} size={15} style={styles.star}  />
                    <Ionicons name={'ios-star'} size={15} style={styles.star}  />
                    <Ionicons name={'ios-star'} size={15} style={styles.star}  />
                    <Ionicons name={'ios-star'} size={15} style={styles.star}  />
                        {/* <Text style={styles.text}>({props.reviews})</Text> */}
                    </View>
                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
                        <Text style={styles.color_textPrivate}>{" "}and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>

                    </View>
                    <View>
                        <Text style={{ color: '#c2015a' }}>
                            Phone number verification is mandatory*</Text>
                    </View>
                    <View style={[styles.button, {
                        flex: 1,
                        flexDirection: 'row-reverse',
                    }]}>

                        <TouchableOpacity
                            style={styles.signIn, styles.signButton}
                            onPress={() => RegisterUser()}

                        >
                            <LinearGradient
                                colors={data.comments ? ['#FFA07A', '#FF6347'] : ['#ccc', '#ccc']}
                                style={[styles.signIn]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Sign Up</Text>
                            </LinearGradient>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setPhoneVerfied(false), navigation.goBack() }}
                            style={[styles.signIn, {
                                borderColor: '#FF6347',
                                borderWidth: 1,
                                width: '30%',

                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#FF6347'
                            }]}>Back</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default Feedback;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6347'
    },
    star: {
		color: '#FF8C00'
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
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
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
        width: '50%',
        marginLeft: 30

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
    },
    phoneVerify: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,

    },
    phoneVerifyButton: {
        // width: '50%',
        marginLeft: 30

    },
    textVerify: {
        fontSize: 14,
        paddingHorizontal: 30,
        paddingVertical: 8,
        fontWeight: 'bold'
    },
});