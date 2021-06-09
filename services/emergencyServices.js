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
const nearestEmergencyRequest = (lng, lat, type) => {
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
const serviceTypes = async () => {
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/servicetype/all`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
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
const servicebyservicetype = async (serviceID) => {

    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/service/servicebyservicetype/${serviceID}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}

const nearservices = async (lng, lat) => {
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/service/nearservices?lng=${lng}&lat=${lat}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}

const nearservicesbyservicetype = async (serviceID,lng, lat) => {
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/service/nearservicesbyservicetype/${serviceID}?lng=${lng}&lat=${lat}`,
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

// Services for special service 
//COVID-19 State, Districs wise Hospitals

const getStates = async () => {
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/state/all`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}
const getStatesById = async (id) => {
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/state/id/${id}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}

const getDistrict = async () => {
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/district/all`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}
const getDistrictById = async (id) => {
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/district/id/${id}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}

const getDistrictByState = async (id) => {
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/district/bystate/${id}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}
const getHospitalByPincode = async (code) => {
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/hospital/pincode/${code}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}

const getHospitalByDistrict = async (code) => {
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/hospital/district/${code}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}
const getHospitalVisit = async (hospitalID) => {
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/hospitalvisit/${hospitalID}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
}

const addhospitalvisit = async (formData) => {
    let data = qs.stringify(formData)
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/hospitalvisit/add`,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': `Bearer ${userToken}`,
        }
    });
}

const readyToHelp = async (requestId) => {
    // let data = qs.stringify(formData)
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `/help/readytohelp/${requestId}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': `Bearer ${userToken}`,
        }
    });
}


const EmergencyService = {
    myEmergencyRequest,
    emergencyRequest,
    nearestEmergencyRequestCount,
    nearestEmergencyRequest,
    getAppUpdateVersion,
    serviceTypes,
    services,
    servicebyservicetype,
    nearservicesbyservicetype,
    nearservices,
    emergencyContacts,
    stories,
    notifications,
    myTodayRequest,
    settings,
    getuserprofile,

    getStates,
    getStatesById,
    getDistrict,
    getDistrictById,
    getDistrictByState,
    getHospitalByPincode,
    getHospitalByDistrict,

    getHospitalVisit,
    addhospitalvisit,
    readyToHelp
};

export default EmergencyService;