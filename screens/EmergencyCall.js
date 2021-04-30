import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
// import { data } from '../model/data';
import Card from '../components/Card';
import StarRating from '../components/StarRating';
import { service } from '../model/data';
import EmergencyService from '../services/emergencyServices';
import AmbulanceRequest from './requests/Ambulance';

export const EmergencyCall = ({ route, navigation }) => {
    const { coordinates } = useSelector(state => state.currentLocationReducer);
    const [RequestDataCount, setRequestDataCount] = useState(route.params.RequestDataCount)
    const [serviceName, setServiceName] = useState('')
    const [serviceData, setServiceData] = useState(null)
    const [region, setRegion] = useState(coordinates);
    useEffect(() => {
        {
          region && EmergencyService.nearservices(region.longitude, region.latitude).then((res) => {
          console.log(res)
            setServiceData(res)
          }, error => {
            console.error('onRejected function called: ' + error.message);
            return;
          })
        }
      }, [region,coordinates]);
    const callService = (service_name) => {
        setServiceName(service_name);
    }
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('EmergencyRequestMap', {serviceData:item})}
            disabled={item.request.length > 0 ? false : true}
            >
                <View style={[styles.card, item.request.length > 0 ? styles.active : styles.inActive]}>
                    <View style={styles.cardImgWrapper}>
                        <View style={[styles.categoryIcon, item.request.length > 0 ? styles.active : styles.inActive]}>
                            <Text style={[styles.count,  item.request.length > 0 ? styles.active : styles.inActive]} color="green">{item.request.length}</Text>
                        </View>
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={[styles.cardTitle,item.request.length > 0 ? styles.active : styles.inActive]}>{item.service_name_alias}</Text>
                        {/* <StarRating ratings={item.ratings} reviews={item.reviews} /> */}
                        <Text numberOfLines={1} style={[styles.cardDetails,item.request.length > 0 ? styles.active : styles.inActive]}>{item.service_description}</Text>

                    </View>
                    <View style={styles.cardImgWrapper}>
                        <Image
                           source={{uri: `https://emergencyplease.com/api/src/uploads/${item.service_name}.jpg`}}
                            resizeMode="cover"
                            style={styles.cardImg}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setServiceName('')
        })
        // this will help to clear the state when navigate the screen
        return unsubscribe;
    }, [navigation])
    return (
        <>
            <View style={styles.container}>
                <View style={{ width: '90%', alignSelf: 'center', }} >

                    <FlatList
                        data={serviceData?.services}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.service_name}
                    />
                </View>
                {serviceName === "ambulance_request" && <AmbulanceRequest visible={serviceName === "ambulance_request" ? true : false} />}

            </View>

        </>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',

    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor: '#fff',
        // elevation: 5,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderBottomWidth: 2,

    },
    active:{ borderBottomColor: 'green',color: 'green',
    borderColor: 'green'},
    inActive:{ borderBottomColor: '#e5e5e5',color: '#e5e5e5',
    borderColor: '#e5e5e5'},
    categoryIcon: {
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        // backgroundColor: 'green' /* '#FF6347' */,
        borderRadius: 50,
       
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 0,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    count: {
        
        fontSize: 20,

    },
    cardDetails: {
        fontSize: 12,
        color: 'green',
    },
});
