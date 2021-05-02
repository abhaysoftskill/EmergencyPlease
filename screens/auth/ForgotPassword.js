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

const ForgotPassword = ({ route, navigation }) => {
    const [data, setData] = useState({
        username:'',
        check_usernameInputChange: false,
        isValidUser: true,
        isValidPassword: true,
    });
    const [loading, setLoading] = useState(false)
    const { colors } = useTheme();

    const { signIn } = useContext(AuthContext);
    const usernameInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_usernameInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_usernameInputChange: false,
                isValidUser: false
            });
        }
    }


    const submitEmail = (data) => {

        setLoading(true)
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (EMAIL_REGEXP.test(data.username)) {
            LoginService.forgotPassword(data.username).then((res) => {
                Alert.alert('Token Generated successfully !', 'Please check forgot password token in your register email id.', [
                    {
                      text: 'Update Password',
                      onPress: async () => {
                        try {
                            setLoading(false)
                          navigation.navigate('ResetPassword')
                        } catch (e) {
                            console.log(e);
                        }
                       
                    }
                    }

                ])
            }, error => {
                setLoading(false)

                Alert.alert('Something went wrong!', error.message, [
                    { text: 'Retry' }
                ]);
                return;
            })

        }
     

    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
            <View style={styles.logoHeader}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
         <View style={styles.header}>
                <Text style={styles.text_header}>Forgot Password!</Text>
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
                        onChangeText={(val) => usernameInputChange(val)}
                        autoCapitalize="none"
                        defaultValue={`${data.username}`}
                        
                    />
                    {data.check_usernameInputChange ?
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

               
                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop:10
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
                        onPress={() => { submitEmail(data) }}
                        disabled={data.username.toString().length >= 3 ? false : true}
                    >
                        <LinearGradient
                            colors={data.username.toString().length >= 3 ?['#FFA07A', '#FF6347'] : ['#ccc','#ccc']}
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

export default ForgotPassword;
const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        zIndex:0
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
