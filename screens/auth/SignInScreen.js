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
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../../components/context';

import LoginService from '../../services/loginServices';
import { LocalizationContext } from '../../translations/LocalizationContext';

const SignInScreen = ({ route, navigation }) => {
    const [data, setData] = useState({
        username: route.params.userDetails.phonenumber || route.params.userDetails.email,
        phonenumber: route.params.userDetails.phonenumber,
        email: route.params.userDetails.email,
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const [loading, setLoading] = useState(false)
    const { colors } = useTheme();

    const { signIn } = useContext(AuthContext);
    const { translations } = useContext(LocalizationContext);

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
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

    const loginHandle = (data) => {
        setLoading(true)
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (EMAIL_REGEXP.test(data.username)) {
            LoginService.loginViaEmail({
                "email": data.username,
                "password": data.password
            }).then((res) => {
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

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome! {route.params.userDetails.firstname}</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <View>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>{translations.ENTEREMAILID}/ {translations.ENTERPHONENUMBER}</Text>
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
                            defaultValue={`${data.username}`}
                            editable={false}
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
                            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                        </Animatable.View>
                    }


                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>{translations.USEPASSWORD}</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder={translations.ENTERYOURPASSWORD}
                            placeholderTextColor="#666666"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            editable={!loading}
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
                    </View>
                    {data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                        </Animatable.View>
                    }


                    <TouchableOpacity>
                        <Text style={{ color: '#FF6347', marginTop: 15 }} onPress={() => navigation.navigate('ForgotPassword')}>{translations.FORGOTPASSWORD}?</Text>
                    </TouchableOpacity>
                    {loading && <View style={{
                        flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-between',
                        marginTop: 10
                    }}>
                        <Image
                            source={require('../../assets/loading.png')}
                            // style={{ width: 200, height: 100 }}
                            resizeMode="cover"
                        />
                        <Text>{translations.PLEASEWAIT}....</Text>
                    </View>}

                    {!loading && <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignIn')}
                            style={[styles.signIn, {
                                borderColor: '#FF6347',
                                borderWidth: 1,
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#FF6347'
                            }]}>{translations.BACK}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { loginHandle(data) }}
                            disabled={data.username.toString().length >= 3 && data.password.length >= 3 ? false : true}
                        >
                            <LinearGradient
                                colors={data.username.toString().length >= 3 && data.password.length >= 3 ? ['#FFA07A', '#FF6347'] : ['#ccc', '#ccc']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>{translations.LOGININ}</Text>
                            </LinearGradient>
                        </TouchableOpacity>


                    </View>}
                </View>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

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
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // paddingVertical: 50,
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 60,
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
        flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-between',
        // alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'

    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
