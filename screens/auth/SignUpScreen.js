import React, { useContext, useRef, useState } from 'react';
import {
    View, Text, TouchableOpacity, Dimensions, TextInput,
    Platform, StyleSheet, ScrollView, StatusBar, Alert, Modal
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LoginService from '../../services/loginServices';
import { Button } from 'react-native-paper';
import VerifyPhonenumber from './VerifyPhonenumber';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Image } from 'react-native';
import smsService from '../../services/smsServices';
import { LocalizationContext } from '../../translations/LocalizationContext';
import Loader from '../../components/Loading';
const CELL_COUNT = 6;
const SignUpScreen = ({ route, navigation }) => {
    const { translations } = useContext(LocalizationContext);
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    const [verifyContact, setVerifyContact] = useState(false)
    const [data, setData] = React.useState({
        username: '',
        firstname: '',
        lastname: '',
        password: '',
        confirm_password: '',
        phonenumber: route.params.phonenumber,
        email: route.params.email,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        familyContacts: [
            { "name": "", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false },
        ],
        friendsContacts: [
            { "name": "", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false },
        ],
        officeContacts: [
            { "name": "", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false },
            { "name": "", "contact": "", "edit": false },
        ],
        check_textInputFirstNameChange: false,
    });

    const [securePasssword, setSecurePasssword] = React.useState({
        secureTextEntry: true,
        confirm_secureTextEntry: true
    });
    const [passwordCorrect, setPasswordCorrect] = React.useState('');
    const [phoneVerfied, setPhoneVerfied] = React.useState(false);
    const textInputFirstNameChange = (val) => {
        setData({
            ...data,
            firstname: val,
        });
    }
    const textInputLastNameChange = (val) => {
        setData({
            ...data,
            lastname: val,
        });
    }
    const textInputPhoneNumberChange = (val) => {
        setData({
            ...data,
            phonenumber: val,
        });
    }
    const textInputEmailChange = (val) => {
        setData({
            ...data,
            email: val,
        });
    }


    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
        if (data.password == val) {
            setPasswordCorrect(true);
        } else {
            setPasswordCorrect(false);
        }
    }

    const updateSecureTextEntry = () => {
        setSecurePasssword({
            ...securePasssword,
            secureTextEntry: !securePasssword.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setSecurePasssword({
            ...securePasssword,
            confirm_secureTextEntry: !securePasssword.confirm_secureTextEntry
        });
    }
    const RegisterUser = () => {
        data.username = (data.firstname.slice(0, 3) + data.lastname.slice(0, 3)).toLowerCase();
        //,{ navigation.navigate('Welcome', { userDetails: data }) }
        // console.log(data)
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

    const [register, setRegister] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const [timeLeft, setTimeLeft] = useState(0)
    const [sessionID, setSessionID] = useState('')
    const [loading, setLoading] = useState(false)

    const SendOTP = (param) => {
        var count = 0;
        const intervalId = setInterval(() => {
            count++;
            if (count > 30) {
                return clearInterval(intervalId)
            }
            else {
                return setTimeLeft(timeLeft => timeLeft - 1)
            }
        }, 1000)


        smsService.sendSMS(data.phonenumber).then((res) => {
            setLoading(false)
            setSessionID(res.Details)
            Alert.alert(`OTP ${param} Successfully!'`, 'Check Your Message Inbox', [
                {
                    text: 'Ok',
                    onPress: async () => {
                        try {
                            return
                        } catch (e) {
                            console.log(e);
                        }

                    }
                }

            ])

        }, error => {
            setLoading(false)

            Alert.alert('OTP Send Fail!', `Try again `, [
                { text: 'Retry' }
            ]);
            return;
        })


    }
    const VerifyOTP = (param) => {
        // console.log('verify')
        setLoading(true)
        // setPhoneVerified(true)

        smsService.verifySMS(value, sessionID).then((res) => {
            setLoading(false)

            Alert.alert(`Phonenumber ${data.phonenumber} Verified Successfully!'`, `Your phone number verified with Emergency Please.`, [
                {
                    text: 'Ok',
                    onPress: async () => {
                        try {
                            // loginPhonenumber()
                            phonenumberVerified();

                            setPhoneVerified(true)
                            return
                        } catch (e) {
                            console.log(e);
                        }

                    }
                }

            ])

        }, error => {
            setLoading(false)
            Alert.alert('OTP Verify Fail!', `${error.Details} Try again or contact to support `, [
                { text: 'Retry' }
            ]);
            return;
        })

    }
    const loginPhonenumber = () => {
        setLoading(true)

        LoginService.loginviaotppassword({
            "phonenumber": data.phonenumber,
        }).then((res) => {
            phonenumberVerified();
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
    const phonenumberVerified = () => {
        let updateData = {
            phonenumber: data.phonenumber,
            reqtype: 'register'
        }
        LoginService.otprequest(updateData).then((res) => {
            // console.log(res)
        }, error => {
            setLoading(false)
            return;
        })

    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 40 }}>
                    <Animatable.Image
                        animation="bounceIn"
                        duraton="1500"
                        source={require('../../assets/logo.png')}
                        style={styles.logo}
                        resizeMode="stretch"
                    />
                </View>

            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <View>
                        {loading && <Loader />}
                        <Text style={styles.title}>{data.phonenumber}
                            {phoneVerified && <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>}
                        </Text>
                        {!register && <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <Image
                                source={require('../../assets/alert.png')}
                                resizeMode="cover"
                                style={{ width: 50, height: 50 }}
                            />
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#c0066d' }}>Your phone number is not registered with Emergency Please, Click on Register</Text>
                        </View>}
                        {!register && <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                            <TouchableOpacity
                                style={styles.signIn, styles.signButton}
                                onPress={() => setRegister(true)}
                                onPress={() => { setTimeLeft(30), setRegister(true), SendOTP('Send') }}

                            >
                                <LinearGradient
                                    colors={['#FFA07A', '#FF6347']}
                                    style={[styles.signIn]}
                                >
                                    <Text style={[styles.textSign, {
                                        color: '#fff'
                                    }]}>Register</Text>
                                </LinearGradient>

                            </TouchableOpacity>
                        </View>}
                        {register && !phoneVerified &&
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                                    <Image
                                        source={require('../../assets/password.png')}
                                        resizeMode="cover"
                                        style={{ width: 100, height: 100 }}
                                    />
                                </View>
                                <Text style={{ textAlign: 'center', fontWeight: '700' }}>Please enter OTP code we send to your phone.</Text>
                                <CodeField
                                    ref={ref}
                                    {...props}
                                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                                    value={value}
                                    onChangeText={setValue}
                                    cellCount={CELL_COUNT}
                                    rootStyle={styles.codeFieldRoot}
                                    keyboardType="number-pad"
                                    textContentType="oneTimeCode"
                                    renderCell={({ index, symbol, isFocused }) => (
                                        <Text
                                            key={index}
                                            style={[styles.cell, isFocused && styles.focusCell]}
                                            onLayout={getCellOnLayoutHandler(index)}>
                                            {symbol || (isFocused ? <Cursor /> : null)}
                                        </Text>
                                    )}
                                />
                                <View style={styles.textPrivate}>
                                    <Text style={styles.color_textPrivate}>
                                        By signing up you agree to our
                                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold', color: '#c0066d' }]}>{" "}Terms of service</Text>
                                        <Text style={styles.color_textPrivate}>{" "}and</Text>
                                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold', color: '#c0066d' }]}>{" "}Privacy policy</Text></Text>

                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                                    <TouchableOpacity
                                        style={styles.signIn, styles.signButton}
                                        onPress={() => VerifyOTP()}
                                        disabled={value.trim().length == 6 &&
                                            data.phonenumber.trim().length == 10 ? false : true}
                                    >
                                        <LinearGradient
                                            colors={value.trim().length == 6 &&
                                                data.phonenumber.trim().length == 10 ? ['#118407', '#0c6604'] : ['#ccc', '#ccc']}
                                            style={[styles.signIn]}
                                        >
                                            <Text style={[styles.textSign, {
                                                color: '#fff'
                                            }]}>Verify</Text>
                                        </LinearGradient>

                                    </TouchableOpacity>
                                </View>

                                {<Button mode={'text'} color={'#ea3a3a'}
                                    onPress={() => { setTimeLeft(30), SendOTP('Resend') }}
                                    disabled={timeLeft != 0}>{timeLeft != 0 ? timeLeft + 'Sec' : translations.OTPRESEND}</Button>}
                            </View>}
                        {/* User Details Form *************************** */}
                        {phoneVerified && <View>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="user-o"
                                    color="#05375a"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Your Name *"
                                    placeholderTextColor="#fda5a5"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    value={data.firstname}
                                    onChangeText={(val) => textInputFirstNameChange(val)}
                                    returnKeyType="next"
                                    onSubmitEditing={() => ref_input2.current.focus()}
                                    ref={ref_input1}
                                />
                                {data.check_textInputFirstNameChange ?
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
                                    name="user-circle"
                                    color="#05375a"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Your Last Name *"
                                    placeholderTextColor="#fda5a5"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    value={data.lastname}
                                    onChangeText={(val) => textInputLastNameChange(val)}
                                    returnKeyType="next"
                                    onSubmitEditing={() => ref_input3.current.focus()}
                                    ref={ref_input2}
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
                            <View style={styles.action}>
                                <FontAwesome
                                    name="envelope"
                                    color="#05375a"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Your Email ID"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    defaultValue={data.email}
                                    editable={route.params.email ? false : true}
                                    onChangeText={(val) => textInputEmailChange(val)}
                                    returnKeyType="next"
                                    onSubmitEditing={() => ref_input5.current.focus()}
                                    ref={ref_input4}
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

                            <View style={styles.action}>
                                <Feather
                                    name="lock"
                                    color="#05375a"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Enter Your Password *"
                                    placeholderTextColor="#fda5a5"
                                    secureTextEntry={securePasssword.secureTextEntry ? true : false}
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    onChangeText={(val) => handlePasswordChange(val)}
                                    returnKeyType="next"
                                    onSubmitEditing={() => ref_input6.current.focus()}
                                    ref={ref_input5}
                                />
                                <TouchableOpacity
                                    onPress={updateSecureTextEntry}
                                >
                                    {securePasssword.secureTextEntry ?
                                        <Feather
                                            name="eye-off"
                                            color="grey"
                                            size={20}
                                        />
                                        :
                                        <Feather
                                            name="eye"
                                            color="grey"
                                            size={20}
                                        />
                                    }
                                </TouchableOpacity>
                            </View>

                            <View style={styles.action}>
                                <Feather
                                    name="lock"
                                    color="#05375a"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Confirm Your Password *"
                                    placeholderTextColor="#fda5a5"
                                    secureTextEntry={securePasssword.confirm_secureTextEntry ? true : false}
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                                    ref={ref_input6}
                                />
                                <TouchableOpacity
                                    onPress={updateConfirmSecureTextEntry}
                                >
                                    {securePasssword.confirm_secureTextEntry ?
                                        <Feather
                                            name="eye-off"
                                            color="grey"
                                            size={20}
                                        />
                                        :
                                        <Feather
                                            name="eye"
                                            color="grey"
                                            size={20}
                                        />
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                                <TouchableOpacity
                                    style={styles.signIn, styles.signButton}
                                    onPress={() => RegisterUser()}
                                    disabled={phoneVerified && data.firstname.trim().length >= 3 && data.lastname.trim().length >= 3 &&
                                        data.phonenumber.trim().length == 10 && passwordCorrect != ''
                                        && passwordCorrect ? false : true}
                                >
                                    <LinearGradient
                                        colors={phoneVerified && data.firstname.trim().length >= 3 && data.lastname.trim().length >= 3 &&
                                            data.phonenumber.trim().length == 10 && passwordCorrect != ''
                                            && passwordCorrect ? ['#118407', '#0c6604'] : ['#ccc', '#ccc']}
                                        style={[styles.signIn]}
                                    >
                                        <Text style={[styles.textSign, {
                                            color: '#fff'
                                        }]}>Sign Up</Text>
                                    </LinearGradient>

                                </TouchableOpacity>
                            </View>
                        </View>}
                    </View>

                    {/* <VerifyPhonenumber phoneVerfied={() => setPhoneVerfied(true)} verifyContact={verifyContact} phonenumber={data.phonenumber} closeOption={() => setVerifyContact(false)} /> */}
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignUpScreen;
const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6347'
    },
    logo: {
        width: height_logo,
        height: height_logo,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    header: {
        flex: 1,
        // justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        // position: 'relative',
    },
    footer: {
        // flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        // position: 'relative',
        // top: 30,
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
        borderRadius: 50,

    },
    signButton: {
        width: '100%',
        // marginLeft: 30

    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        marginTop: 10
    },
    color_textPrivate: {
        color: 'grey',
        textAlign: 'center'
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


    ////////////////////Verification 
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#fa94c4',
        textAlign: 'center',

    },
    focusCell: {
        borderColor: '#c8035f',
    },
});