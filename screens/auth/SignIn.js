import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Keyboard,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme, Button } from 'react-native-paper';

import { AuthContext } from '../../components/context';


import LoginService from '../../services/loginServices';
import OTPVerification from './OTPVerification';
import { LocalizationContext } from '../../translations/LocalizationContext';

const SignIn = ({ navigation }) => {
    const [data, setData] = useState({
        username: '',
        password: '',
        check_phonenumberInputChange: false,
        check_emailInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const [otpVerification, setotpVerification] = useState(false)
    const [userDetails, setUserDetails] = useState()
    const [loading, setLoading] = useState(false)
    const [loginOption, setLoginOption] = useState(0)
    const { colors } = useTheme();
    const active = '#ccc';
    const inactive = '#3c4043';
    const activePhone = '#089bc7';
    const activeEmail = '#f68c08';
    const { signIn } = useContext(AuthContext);
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    const textInputChange = (val) => {
        if (EMAIL_REGEXP.test(val)) {
            setData({
                ...data,
                username: val,
                check_emailInputChange: true,
                isValidUser: true
            });
        }
        else {
            if (val.trim().length == 10) {
                setData({
                    ...data,
                    username: val,
                    check_phonenumberInputChange: true,
                    isValidUser: true
                });
            } else {
                setData({
                    ...data,
                    username: val,
                    check_phonenumberInputChange: false,
                    isValidUser: false
                });
            }
        }

    }


    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password) => {
        Keyboard.dismiss()
        setLoading(true)
        if (EMAIL_REGEXP.test(userName)) {
            LoginService.checkemail(userName).then((res) => {
                // window.location.href = '/org/admin/bases';
                Keyboard.dismiss()
                //    setUserDetails(res.user)
                //     setotpVerification(true)

                if (res == 'No  user found') {
                    //     let navigationExtras: NavigationExtras = { state: { email: this.f.phonenumber.value } };
                    //     this.route.navigate(['/register'], navigationExtras);
                    setLoading(false)
                    navigation.navigate('SignUpScreen', { email: userName })
                }
                else {

                    setLoading(false)
                    setUserDetails(res)
                    setotpVerification(true)

                }
            }, error => {
                setLoading(false)
                // console.error('onRejected function called: ' + error.message);
            })
        }
        else {
            LoginService.checkphonenumber(userName).then((res) => {
                setLoading(true)
                Keyboard.dismiss()
                if (res == 'No  user found') {
                    //     let navigationExtras: NavigationExtras = { state: { email: this.f.phonenumber.value } };
                    //     this.route.navigate(['/register'], navigationExtras);
                    setLoading(false)
                    navigation.navigate('SignUpScreen', { phonenumber: userName })
                }
                else {

                    setLoading(false)
                    setUserDetails(res)
                    setotpVerification(true)
                }

            }, error => {
                setLoading(false)
                console.error('onRejected function called: ' + error.message);
            })

        }

        // const foundUser = Users.filter( item => {
        //     return userName == item.username && password == item.password;
        // } );

        // if ( data.username.length == 0 || data.password.length == 0 ) {
        //     Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
        //         {text: 'Okay'}
        //     ]);
        //     return;
        // }

        // if ( foundUser.length == 0 ) {
        //     Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        //         {text: 'Okay'}
        //     ]);
        //     return;
        // }
        // signIn(foundUser);
    }
    const { translations } = useContext(LocalizationContext);
    return (
        <View style={styles.container}>

            <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>{translations.WELCOME} </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >



                {loginOption !== 0 && <Text style={[styles.text_footer, {
                    color: colors.text, marginBottom: 30
                }]}>
                    {loginOption != 0 && loginOption == 1 ? `${translations.ENTEREMAILID}` : loginOption == 2 ? `${translations.ENTERPHONENUMBER}` : null}
                </Text>}

                {loginOption !== 0 && <View style={styles.action}>
                    <FontAwesome
                        name={loginOption == 1 ? "phone" : "envelope"}
                        color={colors.text}
                        size={20}
                    />
                    {loginOption != 0 && loginOption == 1 && <TextInput
                        placeholder={`${translations.ENTERPHONENUMBER}`}
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text, fontSize: 20,
                        }]}
                        maxLength={10}
                        autoCapitalize="none"
                        keyboardType={'phone-pad'}
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />}
                    {loginOption != 0 && loginOption == 2 && <TextInput
                        placeholder={`${translations.ENTEREMAILID}`}
                        placeholderTextColor="#666666"
                        keyboardType={'email-address'}
                        style={[styles.textInput, {
                            color: colors.text, fontSize: 15,
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />}
                    {data.check_phonenumberInputChange || data.check_emailInputChange ?
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
                }
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Username must be Phone Number or Email ID.</Text>
                    </Animatable.View>
                }


                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    bottom: 100,
                    height: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 99
                }}>
                    <Image
                        source={require('../../assets/loading.png')}
                        // style={{ width: 200, height: 100 }}
                        resizeMode="cover"
                    />
                    <Text>{translations.PLEASEWAIT}....</Text>
                </View>}
                {!loading && loginOption !== 0 && <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { loginHandle(data.username, data.password) }}
                        disabled={data.isValidUser && data.username == ''}

                    >
                        <LinearGradient
                            colors={data.isValidUser && data.username != '' ? ['#01A2D8', '#0582ac'] : ['#a3d9eb', '#a3d9eb']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>{translations.LOGININ}</Text>
                        </LinearGradient>
                    </TouchableOpacity>


                </View>}
                <View
                    style={{
                        marginTop: 50,
                        flexDirection: "row", flexWrap: "wrap",
                        justifyContent: 'center'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setLoginOption(1); setData({
                                ...data,
                                username: '',
                                check_phonenumberInputChange: false,
                                check_emailInputChange: false
                            })
                        }}
                    >
                        <View
                            style={[styles.box, {
                                margin: 5, borderColor: loginOption == 1 ? inactive : activePhone,
                                borderBottomWidth: 5,
                                borderRadius: 10, borderWidth: 1, width: 150, height: 150, alignItems: 'center', justifyContent: 'center'
                            }]}
                        >
                            <FontAwesome
                                name="phone"
                                color={loginOption == 1 ? inactive : activePhone}
                                size={30}
                                style={{ marginBottom: 10, marginTop: 10 }}
                            />
                            <Text style={[{
                                flexShrink: 1,
                                color: loginOption == 1 ? inactive : activePhone, marginBottom: 30, fontSize: 15, textAlign: 'center'
                            }]}>{translations.USEPHONENUMBER}</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setLoginOption(2); setData({
                                ...data,
                                username: '',
                                check_emailInputChange: false,
                                check_phonenumberInputChange: false
                            })
                        }}
                    >
                        <View
                            style={[styles.box, {
                                margin: 5, borderBottomWidth: 5,
                                borderColor: loginOption == 2 ? inactive : activeEmail, borderRadius: 10, borderWidth: 1, width: 150, height: 150, alignItems: 'center', justifyContent: 'center'
                            }]}
                        >
                            <FontAwesome
                                name="envelope"
                                color={loginOption == 2 ? inactive : activeEmail}
                                size={30}
                                style={{ marginBottom: 10, marginTop: 10 }}
                            />
                            <Text style={[{
                                flexShrink: 1,
                                color: loginOption == 2 ? inactive : activeEmail, marginBottom: 30, fontSize: 15, textAlign: 'center'
                            }]}>{translations.USEEMAILID}</Text>
                        </View>

                    </TouchableOpacity>
                </View>
                <View style={styles.banner}>
                    <Image
                        source={require('../../assets/banners/banner1.png')}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </Animatable.View>

            <OTPVerification closeOption={() => setotpVerification(false)} visible={otpVerification} userDetails={userDetails} />

        </View>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6347'
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: 'space-between',
        borderWidth: 1
    },

    box: {
        width: 50,
        alignContent: "space-around",
        height: 50,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    banner: {
        height: 200,
        width: '100%',
        alignSelf: 'center',
        marginTop: 20
    },
    footer: {
        flex: 3,
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
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
