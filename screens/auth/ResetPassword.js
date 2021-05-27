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
import AsyncStorage from '@react-native-community/async-storage';

const ResetPassword = ({ route, navigation }) => {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
   
    const [data, setData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        resetToken: '',
        check_emailInputChange: false,
        passwordTextEntry: true,
        confirm_passwordTextEntry: true,
        check_tokenInputChange: false,
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
                email: val,
                check_emailInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
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
    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password:val,
        });
        if (data.password == val) {
            setPasswordCorrect(true);
        } else {
            setPasswordCorrect(false);
        }
    }
    const tokenInputChange = (val) => {
        if (val.trim().length >= 5) {
            setData({
                ...data,
                resetToken: val,
                check_tokenInputChange: true,
            });
        } else {
            setData({
                ...data,
                resetToken: val,
                check_tokenInputChange: false,
            });
        }
    }
 

    const resetPassword = (data) => {

        // const foundUser = Users.filter(item => {
        //     return email == item.email && password == item.password;
        // });
        setLoading(true)
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (EMAIL_REGEXP.test(data.email)) {
            let updateData = {
                "email": data.email,
                "new_password": data.password,
                "confirm_password": data.confirm_password,
                "reset_password_token": data.resetToken,
            }
            console.log(updateData)
            LoginService.restPasword(updateData).then((res) => {
                // console.log({userDetails: res[0],
                //     userToken: res[1],})
                // window.location.href = '/org/admin/bases';

                AsyncStorage.removeItem('userToken');
                AsyncStorage.removeItem('userDetails');
                setLoading(false)

                Alert.alert('Password Reset Success!', 'Password rest successfully, click ok to login.', [
                    {
                      text: 'Ok',
                      onPress: async () => {
                        try {
                          navigation.navigate('SignIn')
                        } catch (e) {
                            console.log(e);
                        }
                       
                    }
                    }

                ])
               
            }, error => {
                setLoading(false)

                Alert.alert('Password Reset Fail!', `${error.message} Check your token in reg. email id.`, [
                    { text: 'Retry' }
                ]);
                return;
            })

        }
     else{
        Alert.alert('Please enter valid email id', `${error.message} Check your email id.`, [
            { text: 'Retry' }
        ]);
     }

        // if (data.email.length == 0 || data.password.length == 0) {
        //     Alert.alert('Wrong Input!', 'email or password field cannot be empty.', [
        //         { text: 'Okay' }
        //     ]);
        //     return;
        // }

        // if (foundUser.length == 0) {
        //     Alert.alert('Invalid User!', 'email or password is incorrect.', [
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
    const ref_input1 = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
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
                        onChangeText={(val) => emailInputChange(val)}
                        autoCapitalize="none"
                        defaultValue={`${data.email}`}
                        onSubmitEditing={() => ref_input2.current.focus()}
                        ref={ref_input1}

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
                        <Text style={styles.errorMsg}>email must be 4 characters long.</Text>
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
                        secureTextEntry={data.passwordTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                        returnKeyType="next"
                        onSubmitEditing={() => ref_input3.current.focus()}
                        ref={ref_input2}
                    />
                    <TouchableOpacity
                        onPress={updatePasswordTextEntry}
                    >
                        {data.passwordTextEntry ?
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
                        ref={ref_input3}
                        onSubmitEditing={() => ref_input4.current.focus()}
                       
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
                        onChangeText={(val) => tokenInputChange(val)}
                        ref={ref_input4}
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
                        onPress={() => { resetPassword(data) }}
                        disabled={!EMAIL_REGEXP.test(data.email) && 
                            data.resetToken.trim().length < 5 && !passwordCorrect }
                    >
                        <LinearGradient
                            colors={EMAIL_REGEXP.test(data.email) && 
                                data.resetToken.trim().length >= 5 &&  passwordCorrect != '' 
                                && passwordCorrect ? ['#FFA07A', '#FF6347'] : ['#ccc', '#ccc']}
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
        flex: 15,
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
