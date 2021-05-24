

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Animated,
    Alert,
    Dimensions
} from 'react-native';
import { ActivityIndicator, Button, Colors, IconButton } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

// import Swiper from 'react-native-swiper';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { readCurrentLocation } from '../../../redux/actions/currentLocationActions';
const latitudeDelta = 0.09;
const longitudeDelta = 0.09;
import LaunchNavigator from 'react-native-launch-navigator';
const googleApiKey = 'AIzaSyCJPqnfIgpcbwydCoTmIIjyTpfNjX9AgWk';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const CovidVaccineCenters = ({ route, navigation }) => {
    const theme = useTheme();
    const { coordinates } = useSelector(state => state.currentLocationReducer);
    const stateDispatch = useDispatch();
    const [showMap, setShowMap] = useState(false);
    const [confirm_message, setConfirm_message] = useState(false);
    const [region, setRegion] = useState();
    // const [coordinates, setCoordinates] = useState();
    const onRegionChange = updateRegion => {
        if (updateRegion.latitude.toFixed(6) === region.latitude.toFixed(6)
            && updateRegion.longitude.toFixed(6) === region.longitude.toFixed(6)) { return; }
        setRegion(updateRegion)
    }



    useEffect(() => {
        // Change the state every second or the time given by User.
        // const interval = setInterval(() => {
        //   setShowBlink((showBlink) => !showBlink);
        // }, 1000);
        // return () => clearInterval(interval);

        if (coordinates?.length == 0) {
            stateDispatch(readCurrentLocation())
        }
        else if (coordinates) {
            setRegion({
                latitude: coordinates.latitude,
                latitudeDelta: latitudeDelta,
                longitude: coordinates.longitude,
                longitudeDelta: longitudeDelta
            })
            // setRegion(coordinates)
            setShowMap(true)
        }
    }, [coordinates]);

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

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
        console.log(mapEventData)
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
    return (
        <View style={styles.cardsWrapper} >
            <View style={styles.mapContainer}>

                {showMap && <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={region}
                    // onRegionChangeComplete={onRegionChange}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                >
                    <MapView.Circle
                        center={{
                            latitude: coordinates.latitude,
                            longitude: coordinates.longitude,
                        }}
                        radius={5000}
                        strokeWidth={1}
                        strokeColor={'red'}
                        fillColor={'rgba(192,230,192,0.5)'}
                    />
                </MapView>}
                {route.params.hospitalList && route.params.hospitalList.map((marker, index) => {
                    console.log('%%%%%%%%%%%%%%%%')
                    console.log(marker)
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
                            <Animated.View style={[styles.vaccineMarkerWrap]}>
                                <Animated.Image
                                    source={require('../../../assets/vaccine_center/green_center.png')}
                                    style={[styles.vaccinemarker, scaleStyle]}
                                    resizeMode="cover"
                                />
                                <View style={styles.markerNumber}>
                                    <Text style={{ color: "#000" }}>{index + 1}</Text>
                                </View>
                            </Animated.View>
                        </MapView.Marker>
                    );
                })}
                {showMap && <Animated.View style={[styles.markerWrap]}>
                    <Animated.Image
                        source={require('../../../assets/map_marker.png')}
                        style={[styles.marker]}
                        resizeMode="cover"
                    />
                    <Text style={styles.markerText}> You are Here</Text>
                </Animated.View>}

                {showMap && <IconButton
                    icon={require('../../../assets/current_location.png')}
                    color={Colors.gray500}
                    size={30}
                    onPress={() => setRegion({
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                        latitudeDelta: latitudeDelta,
                        longitudeDelta: longitudeDelta,
                    })}
                    style={[
                        {
                            position: 'absolute',
                            bottom: 160,
                            right: 10,
                            //  zIndex: 1,
                            backgroundColor: '#fab3ad'
                        }
                    ]}
                />}

                {showMap && <Animated.ScrollView
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
                                <View style={{ flex: 1, flexDirection: 'row' }}>
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

                                    </View>
                                </View>
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
            </View>

        </View>
    );
};

export default CovidVaccineCenters;

const styles = StyleSheet.create({
    signIn: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 0
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    userprofile: {
        borderWidth: 0,
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: 10
    },
    userInfo: {
        flex: 2,
        flexDirection: 'row',
        padding: 10,
        // borderLeftWidth: 0,
        // borderBottomRightRadius: 8,
        // borderTopRightRadius: 8,
        // backgroundColor: '#fff',
    },
    userName: {
        fontSize: 16,
        color: '#444',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
    },
    footer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom: 20,
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
    },
    mapContainer: {
        height: '96.3%',
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerWrap: {
        left: '50%',
        marginLeft: -15,
        marginTop: -30,
        position: 'absolute',
        top: '50%'
    },
    vaccineMarkerWrap: {
        left: '50%',
        marginLeft: -15,
        marginTop: -30,
        position: 'absolute',
        top: '50%',
    },
    markerText: {
        marginLeft: -25,
        color: '#d21036'
    },
    marker: {
        width: 30,
        height: 30,
    },
    vaccinemarker: {
        width: 60,
        height: 60,
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
        paddingBottom:2
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
        paddingHorizontal: 10,
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


});
