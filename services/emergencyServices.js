import AsyncStorage from "@react-native-community/async-storage";
import request from "../common/api_client";
import qs from "qs"
const emergencyRequest = async (formData) => {
    let data = qs.stringify(formData)
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/request/add`,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': `Bearer ${userToken}`,
        }
    });
}
const nearestEmergencyRequestCount = async (region) => {
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/request/requestcounts?lat=${region.latitude}&lng=${region.longitude}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}
const nearestEmergencyRequest = (lng,lat,type) => {
    return request({
        url: `/emergencyrequest/near?lng=${lng}&lat=${lat}&requestType=${type}`,
        method: 'GET',
        handleHeaders: 2
    });
}
const myEmergencyRequest = async () => {
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/request/me`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}

const myTodayRequest = async () => {
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/request/mytodayrequestcount`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}
const getAppUpdateVersion = async () => {
    userToken = await AsyncStorage.getItem('userToken');
      return request({
        url: `/users/appversions`,
        method: 'GET',
        handleHeaders: 2
    });  
}
const services = async () => {
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/service/all`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}
const nearservices = async (lng,lat) => {
    userToken = await AsyncStorage.getItem('userToken');
     return request({
        url: `/service/nearservices?lng=${lng}&lat=${lat}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}

const emergencyContacts = async () => {
    userToken = await AsyncStorage.getItem('userToken');
     return request({
        url: `/contacts/all`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}
const stories = async () => {
    userToken = await AsyncStorage.getItem('userToken');
     return request({
        url: `/stories/all`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}
const notifications = async () => {
    userToken = await AsyncStorage.getItem('userToken');
    let userDetailsData = await AsyncStorage.getItem('userDetails');
        let data = JSON.parse(userDetailsData);
        console.log()
     return request({
        url: `/notification/byusertype/${data.userType}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}

const settings = async () => {
    userToken = await AsyncStorage.getItem('userToken');
     return request({
        url: `/settings/all`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}
const getuserprofile = async () => {
    userToken = await AsyncStorage.getItem('userToken');
     return request({
        url: `/user/getuserprofile`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}
const EmergencyService = {
    myEmergencyRequest,
    emergencyRequest,
    nearestEmergencyRequestCount,
    nearestEmergencyRequest,
    getAppUpdateVersion,
    services,
    nearservices,
    emergencyContacts,
    stories,
    notifications,
    myTodayRequest,
    settings,
    getuserprofile
};

export default EmergencyService;