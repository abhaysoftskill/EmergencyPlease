import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { Dimensions, Image, ImageBackground, RefreshControl, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, TextInput, Snackbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import EmergencyService from '../services/emergencyServices';

import { useDispatch, useSelector } from 'react-redux';
import { readCurrentLocation } from '../Redux/actions/currentLocationActions';
import { checkVersion } from 'react-native-check-version';
const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;

const Home = ({ navigation }) => {
    const { coordinates } = useSelector(state => state.currentLocationReducer);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [RequestCount, setRequestCount] = useState();
    const [RequestDataCount, setRequestDataCount] = useState();
    const [userDetails, setUserDetails] = useState([])
    const coveredArea = 5;

    const requestData = () => {
        EmergencyService.nearestEmergencyRequestCount(coordinates).then((res) => {
            setRequestDataCount(res)
            setRequestCount(res.accident_reported + res.ambulance_request + res.heart_attack + res.blood_donor);
            setLoading(false)
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
            dispatch(readCurrentLocation())
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
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

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

            <ScrollView style={[styles.fixed, styles.scrollview]}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={requestData}
                    />
                }>

                <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
                <View style={styles.optionContainer}>
                    {!RequestCount && loading && <View style={{
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
                        <Text>{RequestCount}Loading....</Text>
                    </View>}

                    {!RequestCount && !loading && <Text style={styles.noReported}>Today's Great day No Emergency Yet Reported</Text>}

                    {!loading && RequestCount != 0 && <TouchableOpacity
                        onPress={() => navigation.navigate('EmergencyCall',
                            {
                                RequestDataCount: RequestDataCount,
                            })}
                        disabled={RequestCount == 0}

                    >
                        <Card style={styles.Card}>
                            <Card.Content>
                                <View style={styles.innerContainer}>
                                    {RequestCount <= 1 ? <Ionicons name="md-person" size={55} color="#05375a" /> : <Ionicons name="md-people-sharp" size={55} color="#05375a" />}

                                    <View style={styles.contentTitle}>
                                        <Title style={{ color: '#05375a' }}>{RequestCount <= 1 ? `${RequestCount} Person` : `${RequestCount} Person's`}</Title>
                                        <Paragraph>Requested for Help in <Text style={{ fontWeight: "bold", color: "#ae1302" }}>{coveredArea}km</Text></Paragraph>
                                    </View>
                                    <View style={styles.navigate} >
                                        <Ionicons name="md-arrow-forward-circle-sharp" size={55} color="green" />
                                    </View>
                                </View>
                            </Card.Content>

                        </Card>
                    </TouchableOpacity>}
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
        // flexDirection: 'row'
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

