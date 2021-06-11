import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Animated,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform,
    Button,
    PermissionsAndroid,
    Modal,
    Alert
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Moment from 'moment'; // Import momentjs
import VerticalSlider from 'rn-vertical-slider';

// import StarRating from '../components/StarRating';

import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { readCurrentLocation } from '../../../redux/actions/currentLocationActions';
import modalStyles from '../../../model/covidCenterModal';
import { Icon } from 'native-base';
import LaunchNavigator from 'react-native-launch-navigator';
const googleApiKey = 'AIzaSyDJcvYM3l-gbKi3Te2w8XZhllT71uE1204';
import EmergencyService from '../../../services/emergencyServices';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const CovidVaccineCenters = ({ route, navigation }) => {
    // Moment.locale('IST');
    const theme = useTheme();
    const { coordinates } = useSelector(state => state.currentLocationReducer);
    const stateDispatch = useDispatch();

    const [showMap, setShowMap] = useState(false);
    const [region, setRegion] = useState(coordinates);
    const [requestData, setRequestData] = useState();
    const [locationStatus, setLocationStatus] = useState('');
    const latitudeDelta = 0.08;
    const longitudeDelta = 0.08;
    const [showCenterDetails, setShowCenterDetails] = useState(false)
    const [centerDetails, setCenterDetails] = useState('')
    const [activeUser, setActiveUser] = useState(0)
    const [changeUserCount, setChangeUserCount] = useState(false)
    const [hospialDetails, sethospialDetails] = useState({});
    const [updateLoading, setUpdateLoading] = useState(false)

    useEffect(() => {
        {
            region && setShowMap(true);
            return () => {
                setShowMap(false)
            };
        }
    }, [region, coordinates]);

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {

            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (requestData && index >= requestData.length) {
                index = requestData.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {

                if (mapIndex !== index) {
                    mapIndex = index;

                    const coordinate = route.params.hospitalList[index].geometry.coordinates;
                    _map.current.animateToRegion(
                        {
                            latitude: parseFloat(coordinate[0]),
                            longitude: parseFloat(coordinate[1]),
                            latitudeDelta: latitudeDelta,
                            longitudeDelta: longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
    });

    const interpolations = route.params.hospitalList && route.params.hospitalList.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return { scale };
    });

    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }

    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);
    const navigateLocation = (locCordinates) => {
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
            LaunchNavigator.navigate([locCordinates[0], locCordinates[1]], {
                start: `${coordinates.latitude}, ${coordinates.longitude}`
            })
                .then(() => console.log("Launched navigator"))
                .catch((err) => console.error("Error launching navigator: " + err));
        }
    }
    useEffect(() => {
        centerDetails !== '' && EmergencyService.getHospitalVisit(centerDetails?._id).then((res) => {
            sethospialDetails(res.hospital)
            setActiveUser(res.hospital[0]?.visits[0].people_count)
        }, error => {
            return;
        })
   

    }, [centerDetails])
    const submitCrowd = (centerDetails) => {
        setUpdateLoading(true)
        let updateData = {
            "hospital_id": centerDetails?._id,
            "people_count": activeUser,
        }
        EmergencyService.addhospitalvisit(updateData).then((res) => {

            setTimeout(async () => {
                setUpdateLoading(false)

                Alert.alert('Count Update Success!', 'Thanks for update, It will help to other people', [
                    {
                        text: 'Done',
                        onPress: async () => {
                            try {
                                setChangeUserCount(false)
                                return;
                            } catch (e) {
                                console.log(e);
                            }

                        }
                    }
                ]);
            }, 2000);

        }, error => {
            setUpdateLoading(false)

            // console.error('onRejected function called: ' + error.message);
            Alert.alert('Count Update fail!', error.message, [
                { text: 'Retry' }
            ]);
            return;
        })
    }
    return (
        <View style={styles.container}>

            {!showMap && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    source={require('../../../assets/loading.png')}
                    // style={{ width: 200, height: 100 }}
                    resizeMode="cover"
                />
                <Text>Loading....</Text>
            </View>}
            { showMap && route.params.hospitalList && <MapView
                ref={_map}
                initialRegion={
                    {
                        latitude: parseFloat(region.latitude),
                        longitude: parseFloat(region.longitude),
                        latitudeDelta: latitudeDelta,
                        longitudeDelta: longitudeDelta
                    }
                }
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                // maxZoomLevel={16}
                // mapType='satellite'
                zoomEnabled={true}
                zoomControlEnabled={true}
                showsScale={true}
                showsUserLocation={true}
            // customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
            >
                <MapView.Circle
                    center={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }}
                    radius={15000}
                    strokeWidth={1}
                    strokeColor={'red'}
                    fillColor={'rgba(230,192,193,0.5)'}
                />

                {route.params.hospitalList && route.params.hospitalList.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    return (
                        <MapView.Marker key={index} coordinate={{
                            latitude: marker.geometry.coordinates[0],
                            longitude: marker.geometry.coordinates[1]
                        }} onPress={(e) => onMarkerPress(e)}>
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                    source={require('../../../assets/vaccine_center/green_center.png')}
                                    style={[styles.marker, scaleStyle]}
                                    resizeMode="cover"
                                />
                                <View style={styles.markerNumber}>
                                    <Text style={{ color: "#000" }}>{index + 1}</Text>
                                </View>
                            </Animated.View>
                        </MapView.Marker>
                    );
                })}
            </MapView>}
            {route.params.hospitalList && <View>
                <Text style={styles.totalHospital}>Total Vaccine Center - {route.params.hospitalList.length}</Text>
            </View>}
            { showMap && <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={true}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >

                {route.params.hospitalList && route.params.hospitalList.map((marker, index) => (
                    <View style={[styles.card]} key={index}>
                        <View style={styles.requestNumber}>
                            <Text style={{ color: "#fff" }}>{index + 1}</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'stretch',
                        }}>
                            <TouchableOpacity
                                onPress={(e) => { setShowCenterDetails(true), setCenterDetails(marker) }}
                            >
                                <View style={{ flex: 1, flexDirection: 'row' }} >
                                    <Image
                                        source={require('../../../assets/hospital.png')}
                                        style={styles.cardImage}
                                        resizeMode="cover"
                                    />
                                    <View style={[styles.textContent]}>
                                        <Text numberOfLines={1} style={styles.cardtitle}>{marker.name} - ({marker.center_id}) {marker.block_name}</Text>
                                        <Text style={{ backgroundColor: '#1a8434', color: '#fff', paddingHorizontal: 5, borderRadius: 50, textAlign: 'center', marginBottom: 5, marginTop: 5 }}>{marker.address}</Text>
                                        <View>
                                            <Text numberOfLines={1} style={[styles.cardDescription, { color: '#1a8434' }]}>Pin-Code {marker.pincode}</Text>
                                            <Text numberOfLines={1} style={[styles.cardDescription, { color: '#1a8434' }]}>{marker.geometry.coordinates[0]} , {marker.geometry.coordinates[1]}</Text>
                                        </View>
                                        {/* <Text style={{ textAlign: 'center', color:'#ac0f0f'}}>Approx <Text style={{fontSize:50}}>{activeUser} </Text>Users Visited</Text> */}

                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={styles.signIn}
                                    onPress={() => { navigateLocation(marker.geometry.coordinates) }}
                                >
                                    <LinearGradient
                                        colors={['#f17c93', '#d21036']}
                                        style={styles.signIn}
                                    >


                                        <Text style={[styles.textSign, {
                                            color: '#fff'
                                        }]}>
                                            Navigate to Hospital</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>
            }

            <Modal
                animationType="fade"
                transparent={true}
                visible={showCenterDetails}
                onRequestClose={() => {
                    // setEmailVerifyModalVisible(!emailVerifyModalVisible)
                }}>

                <View style={modalStyles.centeredView}>
                    <View style={modalStyles.modalView}>
                        <Text style={modalStyles.title}>Vaccination Center Details!</Text>
                        {/* <Paragraph style={modalStyles.modalText}>{`Please verify your ${emailID} email id.`}</Paragraph> */}
                        {/* <Button style={{position:'absolute', top:0, right:0}} mode={'contained'} color={'#ccc'} onPress={() => closeVerifyEmail()} > Close</Button> */}
                        <Icon style={{ position: 'absolute', top: 0, right: 0, padding: 2, backgroundColor: '#ccc', borderRadius: 50, margin: 10,zIndex: 999 }}
                            name='close' onPress={() => { setCenterDetails(''), setShowCenterDetails(false) }}
                        />
                        <View style={modalStyles.dataContainer}>

                            <View style={modalStyles.action}>
                                <Text numberOfLines={1} style={[styles.cardtitle], { fontSize: 17, borderBottomWidth: 2, marginBottom: 10, borderBottomColor: '#d21036' }}>{centerDetails.name}</Text>
                                <Text numberOfLines={1} style={styles.cardtitle}>Center Code - ({centerDetails.center_id}) </Text>
                                <Text numberOfLines={1} style={[styles.cardDescription, { color: '#1a8434' }]}>Pin-Code {centerDetails.pincode}</Text>
                                <Text numberOfLines={1} style={styles.cardtitle}>{centerDetails.block_name}</Text>
                                <Text style={{ backgroundColor: '#1a8434', color: '#fff', paddingHorizontal: 5, borderRadius: 50, textAlign: 'center', marginBottom: 5, marginTop: 5 }}>
                                    {centerDetails.address}</Text>
                                <Text style={{ color: '#d21036', paddingHorizontal: 5, textAlign: 'left', marginBottom: 5, marginTop: 5 }}>
                                    District - {centerDetails?.district_id?.district_name}</Text>
                                <Text style={{ color: '#d21036', paddingHorizontal: 5, textAlign: 'left', marginBottom: 5, marginTop: 5 }}>
                                    State - {centerDetails?.state_id?.state_name}</Text>
                                <View>
                                    <TouchableOpacity
                                        disabled={!changeUserCount}
                                        style={styles.submitUpdate}
                                        onPress={() => { submitCrowd(centerDetails) }}
                                    >
                                        <LinearGradient
                                            colors={changeUserCount ? ['#f17c93', '#d21036'] : ['#ccc', '#ccc']}
                                            style={styles.signIn}
                                        >


                                            <Text style={[styles.textSign, {
                                                color: '#fff'
                                            }]}>
                                                Submit Your Update</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                                {updateLoading && <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10
                                }}>
                                    <Image
                                        source={require('../../../assets/loading.png')}
                                        // style={{ width: 200, height: 100 }}
                                        resizeMode="cover"
                                    />
                                    <Text>Updating data....</Text>
                                </View>}
                                <Text numberOfLines={1}
                                    style={[styles.cardDescription,
                                    { color: '#1a8434', textAlign: 'center', maxWidth: 300 }]}>Your update will help to your nearest </Text>
                                <Text numberOfLines={1}
                                    style={[styles.cardDescription,
                                    { color: '#1a8434', textAlign: 'center', maxWidth: 300 }]}>friend to visit hospital in less crowd.</Text>


                            </View>
                            <View style={modalStyles.feedbackAction}>
                                <VerticalSlider
                                    value={activeUser}
                                    disabled={false}
                                    min={0}
                                    max={1000}
                                    onChange={(value) => {
                                        setActiveUser(value)
                                        return true;
                                    }}
                                    onComplete={(value) => {
                                        setChangeUserCount(true)
                                        setActiveUser(value)

                                    }}
                                    width={50}
                                    height={200}
                                    step={1}
                                    borderRadius={5}
                                    showBackgroundShadow={true}
                                    minimumTrackTintColor={"tomato"}
                                    maximumTrackTintColor={"green"}
                                    // showBallIndicator
                                    ballIndicatorColor={"green"}
                                    ballIndicatorTextColor={"white"}
                                />
                                <Text style={{ textAlign: 'center' }}>People</Text>
                                <Text style={{ textAlign: 'center' }}>{activeUser}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ textAlign: 'center', color:'#ac0f0f'}}>Today approx <Text style={{fontSize:50}}>{activeUser} </Text>Users Visited</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CovidVaccineCenters;

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
    },
    requestNumber: {
        color: "#d21036", position: 'absolute', top: 5, right: 6,
        backgroundColor: '#d21036', width: 20, height: 20, borderRadius: 50,
        alignItems: "center", alignContent: "center", justifyContent: 'center'
    },
    expand: {
        color: "#d21036", position: 'absolute', top: 0, right: 10,
        alignItems: "center", alignContent: "center", justifyContent: 'center'
    },
    markerNumber: {
        color: "#d21036", position: 'absolute', top: 10, right: 15,
        backgroundColor: '#fff', width: 20, height: 20, borderRadius: 50,
        alignItems: "center", alignContent: "center", justifyContent: 'center'
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        // height: CARD_HEIGHT,
        width: CARD_WIDTH,
        flex: 2, flexDirection: 'row',
        overflow: "hidden",
    },
    cardImage: {
        borderWidth: 0,
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignSelf: 'center',
        width: 70,
        height: 70,
        borderRadius: 50,
        // flex: 1, flexDirection: 'row',
        marginLeft: 10
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 14,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "red",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: 'center',
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    submitUpdate: {
        width: '100%',
        height: 60,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    totalHospital: {
        backgroundColor: 'red',
        color: '#fff',
        padding: 5

    }
});
