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

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../../components/context';


import LoginService from '../../services/loginServices';
import OTPVerification from './OTPVerification';

const SignIn = ({ navigation }) => {

    const [data, setData] = useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const [otpVerification, setotpVerification] = useState(false)
    const [userDetails, setUserDetails] = useState()
    const { colors } = useTheme();

    const { signIn } = useContext(AuthContext);
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    const textInputChange = (val) => {
        if (EMAIL_REGEXP.test(val)) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        }
        else {
            if (val.trim().length == 10) {
                setData({
                    ...data,
                    username: val,
                    check_textInputChange: true,
                    isValidUser: true
                });
            } else {
                setData({
                    ...data,
                    username: val,
                    check_textInputChange: false,
                    isValidUser: false
                });
            }
        }

    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
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
        if (EMAIL_REGEXP.test(userName)) {
            LoginService.checkemail(userName).then((res) => {
                // window.location.href = '/org/admin/bases';
                //signIn(res)
                Keyboard.dismiss()
                //    setUserDetails(res.user)
                //     setotpVerification(true)

                if (res == 'No record') {
                    //     let navigationExtras: NavigationExtras = { state: { email: this.f.phonenumber.value } };
                    //     this.route.navigate(['/register'], navigationExtras);
                    navigation.navigate('SignUpScreen', { email: userName })
                }
                else {
                    res.user.email = userName;
                    setUserDetails(res.user)
                    setotpVerification(true)

                }
            }, error => {
                console.error('onRejected function called: ' + error.message);
            })
        }
        else {
            LoginService.checkphonenumber(userName).then((res) => {
                Keyboard.dismiss()
                if (res == 'No record') {
                    //     let navigationExtras: NavigationExtras = { state: { email: this.f.phonenumber.value } };
                    //     this.route.navigate(['/register'], navigationExtras);
                    navigation.navigate('SignUpScreen', { phonenumber: userName })
                }
                else {
                    res.user.phonenumber = userName;
                    setUserDetails(res.user)
                    setotpVerification(true)
                }

            }, error => {
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

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome! </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text, marginBottom: 30
                }]}>Enter Email ID/ Phone Number</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Enter Email ID/ Phone Number"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
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
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Username must be Phone Number or Email ID.</Text>
                    </Animatable.View>
                }


                {/* <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
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
            </View> */}
                {/* { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
             */}

                {/* <TouchableOpacity>
                <Text style={{color: '#FF6347', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity> */}
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { loginHandle(data.username, data.password) }}
                        disabled={data.isValidUser && data.username != '' ? false : true}
                    >
                        <LinearGradient
                            colors={['#FFA07A', '#FF6347']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Next</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#FF6347',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#FF6347'
                    }]}>Sign Up</Text>
                </TouchableOpacity> */}
                </View>
                <View style={styles.banner}>
                    <Image
                        source={require('../../assets/banners/banner1.png')}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </Animatable.View>

            {otpVerification && <OTPVerification closeOption={() => setotpVerification(false)} visible={otpVerification} userDetails={userDetails} />}

        </View>
    );
};

export default SignIn;

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
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
