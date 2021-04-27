import React, { useRef } from 'react';
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
import LoginService from '../../services/loginServices';

const SignUpScreen = ({ route, navigation }) => {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    const [data, setData] = React.useState({
        firstname: '',
        lastname: '',
        password: '',
        confirm_password: '',
        phonenumber: route.params.phonenumber,
        email:route.params.email
    });
    const [passwordCorrect, setPasswordCorrect] = React.useState('');
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
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }
    const login = () =>{
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
                <Text style={styles.text_header}>Register Now!</Text>
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
                            name="user-circle"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Last Name"
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
                            name="phone"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Phone Number"
                            style={styles.textInput}
                            autoCapitalize="none"
                            defaultValue={data.phonenumber}
                            editable={route.params.phonenumber? false : true}
                            keyboardType='decimal-pad'
                            ref={ref_input3}
                            returnKeyType="next"
                            onSubmitEditing={() => ref_input4.current.focus()}
                            onChangeText={(val) => textInputPhoneNumberChange(val)}
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
                            placeholder="Enter Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
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

                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Confirm Your Password"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                            ref={ref_input6}
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
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

                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our
                </Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
                        <Text style={styles.color_textPrivate}>{" "}and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>
                    </View>
                    <View style={[styles.button, {
                        flex: 1,
                        flexDirection: 'row-reverse',
                    }]}>

                        <TouchableOpacity
                            style={styles.signIn, styles.signButton}
                            onPress={() => login()}
                            disabled={data.firstname.trim().length >= 3 && data.lastname.trim().length >= 3 && 
                                EMAIL_REGEXP.test(data.email) && 
                                data.phonenumber.trim().length == 10 &&  passwordCorrect != '' 
                                && passwordCorrect ? false : true}
                        >
                            <LinearGradient
                              colors={data.firstname.trim().length >= 3 && data.lastname.trim().length >= 3 && 
                                EMAIL_REGEXP.test(data.email) && 
                                data.phonenumber.trim().length == 10 &&  passwordCorrect != '' 
                                && passwordCorrect ?['#FFA07A', '#FF6347'] : ['#ccc','#ccc']}
                                style={[styles.signIn]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Sign Up</Text>
                            </LinearGradient>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
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

export default SignUpScreen;

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
    }
});