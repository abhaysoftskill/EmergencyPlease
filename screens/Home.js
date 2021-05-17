import React, { useState, useEffect, useReducer } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { Alert, Dimensions, Image, ImageBackground, Modal, Pressable, RefreshControl, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, TextInput, Snackbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import EmergencyService from '../services/emergencyServices';

import { useDispatch, useSelector } from 'react-redux';
import { readCurrentLocation } from '../redux/actions/currentLocationActions';
import { checkVersion } from 'react-native-check-version';
import modalStyles from '../model/loginValidationModal';
import LoginService from '../services/loginServices';
import { Icon } from 'native-base';
import { AuthContext } from '../components/context';
import RequestStatus from './RequestStatus';
const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;

const Home = ({ navigation }) => {
    const { coordinates } = useSelector(state => state.currentLocationReducer);
    const stateDispatch = useDispatch();
    const isFocused = useIsFocused();
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [closeAlert, setCloseAlert] = useState(true);
    const [RequestDataCount, setRequestDataCount] = useState();
    const [userDetails, setUserDetails] = useState([])
    const [emailVerified, setEmailVerified] = useState(null)
    const [emailID, setEmailID] = useState('')
    const [verifyCode, setVerifyCode] = useState('')
    const coveredArea = 5;
    const { signOut, toggleTheme } = React.useContext(AuthContext);
    const [myRequestData, setMyRequestData] = useState([])

    const requestData = async () => {
        let userDetailsData = await AsyncStorage.getItem('userDetails');
        EmergencyService.nearestEmergencyRequestCount(coordinates).then((res) => {
            setRequestDataCount(res)
            setLoading(false)
        }, error => {
            return;
        })
        EmergencyService.settings().then((res) => {
            AsyncStorage.setItem('epAppSettings', JSON.stringify(res));
        }, error => {
            return;
        })

        EmergencyService.getuserprofile().then((res) => {
            setEmailID(res.email);
            if (new Date(new Date(new Date())) > (new Date(res.updated_at) + 60000) && !res.email_verified) {
                setEmailVerified(res.email_verified)
            }
            AsyncStorage.setItem('userDetails', JSON.stringify(res));
        }, error => {
            return;
        })

        EmergencyService.myEmergencyRequest().then((res) => {
            setMyRequestData(res.requests)
          }, error => {
            return;
          })
    }
    useEffect(() => {
        async function fetchVerson() {
            const version = await checkVersion();
            if (version.needsUpdate) {
                console.log(`App has a ${version.updateType} update pending.`);
            }
        }
        fetchVerson()
    }, [])
    useEffect(() => {
        if (coordinates?.length == 0) {
            stateDispatch(readCurrentLocation())
        }
        else if (coordinates) {
            requestData()
        }
    }, [coordinates])

    // useEffect(() => {
    //     { region && requestData()}
    // }, [region])
    // const [showBlink, setShowBlink] = useState(true);
    // useEffect(() => {
    //     // Change the state every second or the time given by User.
    //     const interval = setInterval(() => {
    //         setShowBlink((showBlink) => !showBlink);
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        setTimeout(async () => {
            try {
                let userDetailsData = await AsyncStorage.getItem('userDetails');

                let data = JSON.parse(userDetailsData);
                setEmailVerifyModalVisible(!data.email_verified)

                setUserDetails(data);
                // if (data.userGender == "" || data.bloodGroup == "") {
                //     navigation.navigate('EditDetails', { userDetails: data })

                // }
                // else if (data.familyContacts.length == 0) {
                //     navigation.navigate('EditfamilyDetails', { userDetails: data })

                // }

            } catch (e) {
                console.log(e);
            }

        }, 1000);
    }, [isFocused]);
    const _scrollView = React.useRef(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setCloseAlert(true)
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    const [emailVerifyModalVisible, setEmailVerifyModalVisible] = useState(false)
    const [verifyLoading, setVerifyLoading] = useState(false);
    const resendEmailVerifiy = () => {
        let updateData = {
            email: emailID,
        }
        LoginService.resendEmailVerifyToken(updateData).then((res) => {
            setVerifyLoading(false);
            Alert.alert('Re-Send Email Verification code!', `Code send to ${emailID}, please check and verify`, [
                {
                    text: 'Done',
                }
            ]);
        }, error => {
            setVerifyLoading(false)
            Alert.alert('Request save fail!', error.message, [
                { text: 'Retry' }
            ]);
            return;
        })
    }
    const verifyEmail = () => {
        let updateData = {
            email: emailID,
            verification_token: verifyCode
        }
        LoginService.emailVerify(updateData).then((res) => {
            setVerifyLoading(false);
            setEmailVerifyModalVisible(false);
            Alert.alert('Email Verified Success!', '', [
                {
                    text: 'Done',
                    onPress: async () => {
                        try {
                            navigation.navigate('MyRequests',
                                {

                                })
                        } catch (e) {
                            console.log(e);
                        }

                    }
                }
            ]);
        }, error => {
            setVerifyLoading(false)
            Alert.alert('Request save fail!', error.message, [
                { text: 'Retry' }
            ]);
            return;
        })
    }
    const closeVerifyEmail = () => {
        Alert.alert('Confirmation!', 'If you press YES, you have to Re-login with your register and verified email.', [
            {
                text: 'OK', onPress: async () => {
                    try {
                        await AsyncStorage.removeItem('userToken');
                        await AsyncStorage.removeItem('userDetails');
                        signOut()

                    } catch (e) {
                        console.log(e);
                    }
                    // dispatch({ type: 'LOGOUT' });
                    // navigation.navigate('Dashboard')
                }
            },
            { text: 'Retry', onPress: () => { return } },

        ])

    }
    return (
        <ImageBackground
            source={require("../assets/banners/banner1.png")}
            // resizeMethod={'auto'}
            style={[styles.fixed, styles.containter]}
            imageStyle={{
                resizeMode: "contain",
                bottom: -300
            }}
        >
            <Modal
                animationType="fade"
                transparent={true}
                visible={emailVerifyModalVisible}
                onRequestClose={() => {
                    setEmailVerifyModalVisible(!emailVerifyModalVisible)
                }}>

                <View style={modalStyles.centeredView}>
                    <View style={modalStyles.modalView}>
                        <Text style={modalStyles.title}>Your Registered Email Not Verified !</Text>
                        <Paragraph style={modalStyles.modalText}>{`Please verify your ${emailID} email id.`}</Paragraph>
                        {/* <Button style={{position:'absolute', top:0, right:0}} mode={'contained'} color={'#ccc'} onPress={() => closeVerifyEmail()} > Close</Button> */}
                        <Icon style={{ position: 'absolute', top: 0, right: 0, padding: 2, backgroundColor: '#ccc', borderRadius: 50, margin: 10 }}
                            name='close' onPress={() => closeVerifyEmail()}
                        />
                        <View style={modalStyles.action}>

                            <TextInput
                                placeholder="Enter Verification Code"
                                placeholderTextColor="#666666"
                                style={[modalStyles.textInput]}
                                keyboardType={"number-pad"}
                                onChangeText={(val) => setVerifyCode(val)}
                            />
                        </View>
                        {verifyLoading && <View>
                            <Image
                                source={require('../assets/loading.png')}
                                resizeMode="cover"
                            />
                            <Text>Please Wait....</Text>
                        </View>}
                        {!verifyLoading && <View style={{ flexDirection: 'row', marginTop: 20 }}>

                            <Button mode={'contained'} color={'#ea3a3a'} style={{ marginRight: 10 }} onPress={() => { setVerifyLoading(true), resendEmailVerifiy() }}>Resend</Button>
                            <Button mode={'contained'} color={'#17841c'} style={{ marginRight: 10 }} onPress={() => { setVerifyLoading(true), verifyEmail() }}>Verify</Button>
                            {/* <Button style={{position:'absolute', top:0}} mode={'contained'} color={'#ccc'} onPress={() => closeVerifyEmail()} > Close</Button> */}

                        </View>}
                    </View>
                </View>
            </Modal>
            <ScrollView style={[styles.fixed, styles.scrollview]}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={requestData}
                    />
                }>
             {!loading  && closeAlert && <RequestStatus myRequestData={myRequestData} CloseAlert={() => setCloseAlert(false)}/>}

                <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
                <View style={styles.optionContainer}>
                    {!RequestDataCount && loading && <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 300
                    }}>
                        <Image
                            source={require('../assets/loading.png')}
                            // style={{ width: 200, height: 100 }}
                            resizeMode="cover"
                        />
                        <Text>Loading....</Text>
                    </View>}
                    {!loading && <View style={{
                        alignContent: 'center',
                        padding: 10, flexDirection: "row", justifyContent: 'space-between'
                    }}>
                        <View style={[styles.innerContainer, styles.Card], { borderWidth: 1, borderRadius: 5, borderBottomWidth: 10, borderBottomColor: '#FF6347' }}>

                            <View style={[styles.contentTitle], { alignItems: 'center' }}>
                                <Title style={[styles.requestCount], { paddingVertical: 5 }}>{RequestDataCount?.requests.totalRequestCount}</Title>
                                <Title style={{ fontSize: 16, paddingHorizontal: 20, backgroundColor: '#FF6347', color: '#fff' }}>Total</Title>
                            </View>

                        </View>
                        <View style={[styles.innerContainer, styles.Card], { borderWidth: 1, borderRadius: 5, borderBottomWidth: 10, borderBottomColor: '#05375a' }}>

                            <View style={[styles.contentTitle], { alignItems: 'center' }}>
                                <Title style={[styles.requestCount], { paddingVertical: 5 }}>{RequestDataCount?.requests.todayRequestCount}</Title>
                                <Title style={{ fontSize: 16, paddingHorizontal: 20, backgroundColor: '#05375a', color: '#fff' }}>Today</Title>
                            </View>

                        </View>
                        <View style={[styles.innerContainer, styles.Card], { borderWidth: 1, borderRadius: 5, borderBottomWidth: 10, borderBottomColor: 'green' }}>

                            <View style={[styles.contentTitle], { alignItems: 'center' }}>
                                <Title style={[styles.requestCount], { paddingVertical: 5 }}>{RequestDataCount?.requests.activeRequestCount}</Title>
                                <Title style={{ fontSize: 16, paddingHorizontal: 20, backgroundColor: 'green', color: '#fff' }}>Active</Title>
                            </View>

                        </View>

                    </View>}

                    {!loading && <View style={{
                        alignItems: 'center',
                        flex: 1, padding: 10, flexDirection: "row",
                    }}>

                        <View style={[styles.innerContainer, styles.Card], { width: 130, height: 130, borderWidth: 1, borderRadius: 500, backgroundColor: '#fff' }}>

                            <View style={[styles.contentTitle], { height: '100%', alignItems: 'center', backgroundColor: '#00000000' }}>
                                <Title style={[styles.requestCount], { fontSize: 30, paddingTop: 30, paddingBottom: 5, backgroundColor: '#00000000' }}>{RequestDataCount?.requests.nearRequest.length}</Title>
                                <Text style={{ fontSize: 13, }}>in 5 km </Text>
                                <Title style={{ fontSize: 16, borderBottomWidth: 5, position: 'absolute', bottom: 0, width: '100%', textAlign: 'center', paddingHorizontal: 13, backgroundColor: 'green', color: '#fff' }}>Nearest</Title>
                            </View>

                        </View>


                        <View style={[styles.innerContainer, styles.Card], { marginHorizontal: 10, height: 100, width: 200, borderWidth: 1, borderRadius: 5, borderBottomWidth: 10, borderBottomColor: 'green' }}>

                            <View style={[styles.contentTitle], { alignItems: 'center', height: '100%' }}>
                                <Paragraph>Requested for Help in <Text style={{ fontWeight: "bold", color: "#ae1302" }}>{coveredArea}km</Text></Paragraph>
                                <Button icon="walk" mode="contained" color="red" style={{ position: 'absolute', bottom: 10 }}
                                    onPress={() => navigation.navigate('EmergencyCall',
                                        {
                                            RequestDataCount: RequestDataCount,
                                        })}
                                    disabled={RequestDataCount?.requests.nearRequest.length == 0}
                                >
                                    Click Here </Button>
                            </View>

                        </View>


                    </View>}

                    {!loading && <TouchableOpacity
                        onPress={() => navigation.navigate('EmergencyServices',
                            {
                                userDetails: userDetails,
                            })}

                    >
                        <Card style={[styles.needHelp]}>
                            <Card.Content>
                                <View style={styles.innerContainer}>
                                    <Ionicons name="md-person" size={55} color="#fff" />

                                    <View style={{ color: '#fff' }}>
                                        <Title style={{ color: '#fff' }}>I Need Help</Title>
                                        <Paragraph style={{ color: '#fff' }}>Request to Emergency Team</Paragraph>
                                    </View>
                                    <View style={styles.navigate} >
                                        <Ionicons name="md-radio" size={40} color="#fff" />
                                    </View>
                                </View>
                            </Card.Content>

                        </Card>
                    </TouchableOpacity>}
                    {!loading && <TouchableOpacity
                        onPress={() => navigation.navigate('MyRequests',
                            {
                                // roomId:'abhayTest'
                                userDetails: userDetails,
                            })}

                    >
                        <Card style={[styles.myRequest]}>
                            <Card.Content>
                                <View style={styles.innerContainer}>
                                    <Ionicons name="ios-person-circle-outline" size={55} color="#fff" />

                                    <View style={{ color: '#fff' }}>
                                        <Title style={{ color: '#fff' }}>My Request</Title>
                                        <Paragraph style={{ color: '#fff' }}>Requested for Emergency     </Paragraph>
                                    </View>
                                    <View style={styles.navigate} >
                                        <Ionicons name="md-walk" size={40} color="#fff" />
                                    </View>
                                </View>
                            </Card.Content>

                        </Card>
                    </TouchableOpacity>}

                </View>
            
            </ScrollView>
        </ImageBackground>
    )
}

export default Home;

const styles = StyleSheet.create({
    requestCount: { fontSize: 30 },
    containter: {
        width: Dimensions.get("window").width, //for full screen
        height: Dimensions.get("window").height //for full screen
    },
    fixed: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    scrollview: {
        backgroundColor: 'transparent'
    },
    friendsCount: {
        color: "#d21036", position: 'absolute', top: -12, right: -15,
        backgroundColor: 'green', height: 20, borderRadius: 50, paddingHorizontal: 10,
        alignItems: "center", alignContent: "center", justifyContent: 'center'
    },
    border: {
        borderColor: 'red',
        borderWidth: 2,
        alignSelf: 'flex-start'
    },
    innerContainer: {
        flexDirection: 'row',
        alignSelf: 'center',

    },
    banner: {
        height: 200,
        width: '100%',
        alignSelf: 'center',
        marginTop: 20
    },
    blink: {
        borderWidth: 2,
        borderColor: 'red'
    },
    noblink: {
        borderWidth: 2,
        borderColor: '#fff'
    },
    avtar: {
        flex: 1.2
    },
    contentTitle: {
        flex: 3,
        paddingLeft: 10

    },
    navigate: {
        flex: 1.3,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,


    },

    navigateIcon: {
        fontSize: 50
    },
    container: {
        flex: 1,
        padding: 10,
        borderWidth: 2,
    },
    optionContainer: {
        // borderColor:'red',
        // height:'100%',
        flex: 1,
    },
    noReported: {
        marginTop: '10%',
        textAlign: 'center',
        color: 'red',
        fontSize: 18,
        marginBottom: '10%',
        borderBottomWidth: 2,
        borderColor: 'red',
        padding: 10

    },
    Card: {
        borderColor: '#05375a',
        borderWidth: 1,
        marginTop: '5%',
        marginBottom: '5%',
        borderBottomWidth: 10
    },
    needHelp: {
        marginTop: '10%',
        backgroundColor: '#FF6347',
        color: '#fff'
    },
    myRequest: {
        marginTop: '10%',
        backgroundColor: 'green',
        color: '#fff'
    },
    Title: {
        borderColor: 'red',
        borderWidth: 2,
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        borderColor: '#ccc',
        borderWidth: 2,
        height: 100,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: '#d4a60a',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 1, y: -2 },
        // height: CARD_HEIGHT,
        width: CARD_WIDTH,
        // flex: 2, flexDirection: 'row',
        overflow: "hidden",
        borderWidth: 1
    },
    scrollView: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        paddingVertical: 10,
        zIndex: 1
    },
})

