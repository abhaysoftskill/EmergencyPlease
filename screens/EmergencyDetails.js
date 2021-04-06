import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Button
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
// import Swiper from 'react-native-swiper';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FAB } from 'react-native-paper';
import Animated from 'react-native-reanimated';
// import StarRating from '../components/StarRating';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import LaunchNavigator from 'react-native-launch-navigator';
import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS } from 'react-native-permissions';
import { PermissionsAndroid, Platform } from 'react-native';
import Moment from 'moment'; // Import momentjs
const googleApiKey = 'AIzaSyCGLgQXcqtOT_DzZI4gavScYkaqFc5EuTw';
const EmergencyDetails = ({ route, navigation }) => {
    Moment.locale('IST');
    const { coordinates } = useSelector(state => state.currentLocationReducer);

    const userDetails = route.params.userDetails;
    console.log(userDetails)
    const theme = useTheme();
    let instance, defaultSelectedApp, defaultLaunchMode, launchModes;
    const [readyToHelp, setReadyToHelp] = useState(false)

    const navigateLocation = () => {
        if (Platform.OS === "android") {
            LaunchNavigator.setGoogleApiKey(googleApiKey);
            defaultSelectedApp = LaunchNavigator.APP.GOOGLE_MAPS;
            launchModes = {
                [LaunchNavigator.LAUNCH_MODE.MAPS]: 'Maps',
                [LaunchNavigator.LAUNCH_MODE.TURN_BY_TURN]: 'Turn-by-turn',
                [LaunchNavigator.LAUNCH_MODE.TRANSPORT_MODE]: 'DRIVING',
                [LaunchNavigator.LAUNCH_MODE.GEO]: 'geo: protocol',
            };
            defaultLaunchMode = LaunchNavigator.LAUNCH_MODE.MAPS;

            LaunchNavigator.navigate([route.params.userDetails.geometry.coordinates[0], route.params.userDetails.geometry.coordinates[1]], {
                start: `${coordinates.latitude}, ${coordinates.longitude}`
            })
                .then(() => console.log("Launched navigator"))
                .catch((err) => console.error("Error launching navigator: " + err));
        }
    }


    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
            <View style={styles.sliderContainer}>
                <Image
                    source={require('../assets/defaultProfile.png')}
                    style={styles.userprofile}
                    resizeMode="cover"
                />

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}>
                    <View style={{ flex: 1 }}>
                        <View>
                            <Text style={styles.userName}>{userDetails.userDetails[0].firstname} {userDetails.userDetails[0].lastname}</Text>
                        </View>
                    </View>
                    {/* <View style={{ flex: 1 }}>
                        <View style={styles.userInfo}>
                            <Text style={{ color: '#444' }}>{'Address: - Bhandara Road Warthi - Bhandara 441906'}</Text>
                        </View>
                    </View> */}
                </View>
            </View>

            <View style={styles.categoryContainer}>
                <TouchableOpacity
                    style={styles.categoryBtn}
                    onPress={() =>
                        navigation.navigate('CardListScreen', { title: 'Restaurant' })
                    }>
                    <View style={styles.categoryIcon}>
                        <Text style={styles.text} size={35} color="#FF6347">{Moment(userDetails.userDetails[0].dob).local().fromNow().split(" ")[0]} </Text>
                    </View>
                    <Text style={styles.categoryBtnTxt}>Age</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.categoryBtn}
                    onPress={() =>
                        navigation.navigate('CardListScreen', { title: 'Fastfood Center' })
                    }>
                    <View style={styles.categoryIcon}>
                        <Text style={styles.text} size={35} color="#FF6347">{userDetails.userDetails[0].bloodGroup}</Text>
                    </View>
                    <Text style={styles.categoryBtnTxt}>Blood Group</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBtn} onPress={() => { }}>
                    <View style={styles.categoryIcon}>
                        <Text style={styles.text} size={35} color="#FF6347">{userDetails.userDetails[0].userGender}</Text>
                    </View>
                    <Text style={styles.categoryBtnTxt}>Gender</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsWrapper}>
                <Text
                    style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#333',
                    }}>
                    Immidiate Contact
        </Text>
            </View>
            <View style={[styles.categoryContainer, { marginTop: 10 }]}>
                {/* {userDetails.immidiateContact.map(data => { */}
                <TouchableOpacity style={styles.categoryBtn} onPress={() => { }}>
                    <View style={[styles.categoryIcon2,{borderColor: `${(userDetails.userDetails[0].familyContacts.length > 0 ? '#FF6347' : '#fdeae7')}`, backgroundColor: `${(userDetails.userDetails[0].familyContacts.length > 0 ? '#d9f1df' : '#e5e5e5')}`}]}>
                        <Fontisto name="holiday-village" size={35} color={`${(userDetails.userDetails[0].familyContacts.length > 0 ? '#FF6347' : '#8d8c8c')}`} />
                        <View style={[styles.friendsCount, { backgroundColor: `${(userDetails.userDetails[0].familyContacts.length > 0 ? '#FF6347' : '#ccc')}` }]}>
                            <Text style={{ color: "#fff" }}>{userDetails.userDetails[0].familyContacts.length}</Text>
                        </View>
                    </View>
                    <Text style={[styles.categoryBtnTxt, { color: "#FF6347" }]}>Family</Text>
                </TouchableOpacity>
                {/* })} */}
                <TouchableOpacity style={styles.categoryBtn} onPress={() => { }}>
                    <View style={[styles.categoryIcon2, { borderColor: `${(userDetails.userDetails[0].familyContacts.length > 0 ? '#1a8434' : '#ccc')}`, 
                    backgroundColor: `${(userDetails.userDetails[0].familyContacts.length > 0 ? '#d9f1df' : '#e5e5e5')}` }]}>
                        <Ionicons name="md-people" size={35}  color={`${(userDetails.userDetails[0].familyContacts.length > 0 ? '#1a8434' : '#8d8c8c')}`} />
                        <View style={[styles.friendsCount, { backgroundColor: `${(userDetails.userDetails[0].familyContacts.length > 0 ? '#FF6347' : '#ccc')}` }]}>
                            <Text style={{ color: "#fff" }}>{userDetails.userDetails[0].friendsContacts.length}</Text>
                        </View>
                    </View>
                    <Text style={[styles.categoryBtnTxt, { color: "#1a8434" }]}>Friend</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBtn} onPress={() => { }}>
                    <View style={[styles.categoryIcon2, { borderColor: `${(userDetails.userDetails[0].familyContacts.length > 0 ? '#d21036' : '#ccc')}`, 
                    backgroundColor: `${(userDetails.userDetails[0].familyContacts.length > 0 ? '#f5d4db' : '#e5e5e5')}` }]}>
                        <Fontisto name="user-secret" size={35}  color={`${(userDetails.userDetails[0].familyContacts.length > 0 ? '#d21036' : '#8d8c8c')}`}/>
                        <View style={[styles.friendsCount,{ backgroundColor: `${(userDetails.userDetails[0].familyContacts.length > 0 ? '#FF6347' : '#ccc')}` }]}>
                            <Text style={{ color: "#fff" }}>{userDetails.userDetails[0].officeContacts.length}</Text>
                        </View>
                    </View>
                    <Text style={[styles.categoryBtnTxt, { color: "#d21036" }]}>Office</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.button}>
                {!readyToHelp && <Text style={[{
                    paddingHorizontal: 15, textAlign: 'center',
                    color: '#d21036', marginBottom:10
                }]}>Once you Ready to help, You will get navigate option to search user fast using good map.
                </Text>}

                {readyToHelp && <Text style={[{
                    paddingHorizontal: 15, textAlign: 'center',
                    color: '#1a8434', marginBottom:10
                }]}>We are appreciated for your help, you can connect with other nearest emergency warrior
                </Text>}

                {readyToHelp && <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => { navigateLocation() }}
                >
                    <LinearGradient
                        colors={['#f17c93', '#d21036']}
                        style={styles.signIn}
                    >


                        <Text style={[styles.textSign, {
                            color: '#fff'
                        }]}>
                             Navigate to Google Map</Text>
                    </LinearGradient>
                </TouchableOpacity>
                }
                {!readyToHelp && <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => { setReadyToHelp(true) }}
                >
                    <LinearGradient
                        colors={['#1a8434', '#1a8434']}
                        style={styles.signIn}
                    >


                        <Text style={[styles.textSign, {
                            color: '#fff'
                        }]}>
                             <Text>Ready to Help</Text></Text>
                    </LinearGradient>
                </TouchableOpacity>
                }

            </View>
        </ScrollView>
    );
};

export default EmergencyDetails;
const scaleStyle = {
    transform: [
        {
            scale: 1,
        },
    ],
};
const styles = StyleSheet.create({
    friendsCount: {
        color: "#d21036", position: 'absolute', top: -6, right: 6,
        backgroundColor: '#d21036', width: 20, height: 20, borderRadius: 50,
        alignItems: "center", alignContent: "center", justifyContent: 'center'
    },

    markerWrap: {
        left: '50%',
        marginLeft: -15,
        marginTop: -30,
        position: 'absolute',
        top: '50%'
    },
    marker: {
        width: 30,
        height: 30,
    },
    userprofile: {
        borderWidth: 0,
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: 10
    },

    userInfo: {
        // flex: 1,
        // flexDirection: 'row',
        // padding: 10,
        // // borderLeftWidth: 0,
        // // borderBottomRightRadius: 8,
        // // borderTopRightRadius: 8,
        // // backgroundColor: '#fff',
        fontSize: 16,
        color: '#444',
    },
    userName: {
        fontSize: 20,
        color: '#444',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
    },
    mapContainer: {
        height: 200,
        width: '100%',
        marginTop: 10,
        marginBottom: 20

    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    sliderContainer: {
        // height: 200,
        width: '100%',
        marginTop: 10,

        // padding: 10,
        // justifyContent: 'center',
        // alignSelf: 'center',
        borderRadius: 8,
        flex: 2,
        flexDirection: 'row',
    },

    wrapper: {},

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
    },
    categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center',
    },
    categoryIcon: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        // backgroundColor: '#fdeae7' /* '#FF6347' */,
        borderRadius: 50,
        borderColor: 'green',
    },
    text: {
        fontSize: 19,
        textTransform:'capitalize'
    },
    categoryIcon2: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#fdeae7' /* '#FF6347' */,
        borderRadius: 50,
        borderColor: 'red',
    },
    categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        color: '#de4f35',
    },
    cardsWrapper: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
    },

    cardDetails: {
        fontSize: 12,
        color: '#444',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '95%',
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
