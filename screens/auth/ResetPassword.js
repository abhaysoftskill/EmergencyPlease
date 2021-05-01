import React, { useContext, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Image,
    Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../../components/context';

import LoginService from '../../services/loginServices';

const ResetPassword = ({ route, navigation }) => {
    const [data, setData] = useState({
        username: '',
        password: '',
        resetToken: '',
        check_emailInputChange: false,
        passwordTextEntry: true,
        confirm_passwordTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const [loading, setLoading] = useState(false)
    const { colors } = useTheme();

    const { signIn } = useContext(AuthContext);
    const [passwordCorrect, setPasswordCorrect] = React.useState('');
    const emailInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_emailInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_emailInputChange: false,
                isValidUser: false
            });
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

    const loginHandle = (data) => {

        // const foundUser = Users.filter(item => {
        //     return userName == item.username && password == item.password;
        // });
        setLoading(true)
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (EMAIL_REGEXP.test(data.username)) {
            LoginService.loginViaEmail({
                "email": data.username,
                "password": data.password
            }).then((res) => {
                // console.log({userDetails: res[0],
                //     userToken: res[1],})
                // window.location.href = '/org/admin/bases';

                signIn({
                    userDetails: res.user,
                    userToken: res.token
                })
                setLoading(false)

                // Keyboard.dismiss()
                // setotpVerification(true)
            }, error => {
                setLoading(false)

                Alert.alert('Login Fail!', error.message, [
                    { text: 'Retry' }
                ]);
                return;
            })

        }
        else {
            LoginService.loginViaPhonenumber({
                "phonenumber": data.username,
                "password": data.password
            }).then((res) => {
                // console.log({userDetails: res[0],
                //     userToken: res[1],})
                // window.location.href = '/org/admin/bases';
                signIn({
                    userDetails: res[0],
                    userToken: res[1]
                })
                setLoading(false)

                // Keyboard.dismiss()
                // setotpVerification(true)
            }, error => {
                setLoading(false)
                Alert.alert('Login Fail!', error.message, [
                    { text: 'Retry' }
                ]);
                return;
            })

        }


        // if (data.username.length == 0 || data.password.length == 0) {
        //     Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
        //         { text: 'Okay' }
        //     ]);
        //     return;
        // }

        // if (foundUser.length == 0) {
        //     Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        //         { text: 'Okay' }
        //     ]);
        //     return;
        // }
        // signIn(foundUser);
    }
    const updatePasswordTextEntry = () => {
        setData({
            ...data,
            passwordTextEntry: !data.passwordTextEntry
        });
    }

    const updateConfirmPasswordTextEntry = () => {
        setData({
            ...data,
            confirm_passwordTextEntry: !data.confirm_passwordTextEntry
        });
    }
    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_passwordTextEntry: val
        });
        if (data.password == val) {
            setPasswordCorrect(true);
        } else {
            setPasswordCorrect(false);
        }
    }
    const ref_input5 = useRef();
    const ref_input6 = useRef();
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Reset Password!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Registered Email ID</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Enter Registered Email ID"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        defaultValue={`${data.username}`}

                    />
                    {data.check_emailInputChange ?
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
                        <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                    </Animatable.View>
                }
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>New Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Enter New Password"
                        secureTextEntry={data.securePasswordEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                        returnKeyType="next"
                        onSubmitEditing={() => ref_input6.current.focus()}
                        ref={ref_input5}
                    />
                    <TouchableOpacity
                        onPress={updatePasswordTextEntry}
                    >
                        {data.securePasswordEntry ?
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

                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Confirm New Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Confirm New Password"
                        secureTextEntry={data.confirm_passwordTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleConfirmPasswordChange(val)}
                        ref={ref_input6}
                    />
                    <TouchableOpacity
                        onPress={updateConfirmPasswordTextEntry}
                    >
                        {data.confirm_passwordTextEntry ?
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

                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Reset Password Token</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Reset Password Token"
                        style={styles.textInput}
                        autoCapitalize="none"
                    />
                       {data.resetToken ?
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

                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10
                }}>
                    <Image
                        source={require('../../assets/loading.png')}
                        // style={{ width: 200, height: 100 }}
                        resizeMode="cover"
                    />
                    <Text>Loading....</Text>
                </View>}

                {!loading && <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { loginHandle(data) }}
                        disabled={data.firstname.trim().length >= 3 && data.lastname.trim().length >= 3 && 
                            EMAIL_REGEXP.test(data.email) && 
                            data.phonenumber.trim().length == 10 &&  passwordCorrect != '' 
                            && passwordCorrect ? false : true}
                    >
                        <LinearGradient
                            colors={data.username.toString().length >= 3 ? ['#FFA07A', '#FF6347'] : ['#ccc', '#ccc']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Submit</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignIn')}
                        style={[styles.signIn, {
                            borderColor: '#FF6347',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#FF6347'
                        }]}>Back</Text>
                    </TouchableOpacity>
                </View>}
            </Animatable.View>
        </View>
    );
};

export default ResetPassword;
const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        zIndex: 0
    },
    container: {
        flex: 1,
        backgroundColor: '#FF6347'
    },
    logoHeader: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
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
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
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
