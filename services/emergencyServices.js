import AsyncStorage from "@react-native-community/async-storage";
import request from "../common/api_client";
import qs from "qs"
const emergencyRequest = async (formData) => {
    let data = qs.stringify(formData)
    userToken = await AsyncStorage.getItem('userToken');
    console.log(formData)
    console.log(data)

    return request({
        url: `/request/add`,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGF5c29mdHRlY2hAZ21haWwuY29tIiwiX2lkIjoiNjA4YTFhYzQwNTRjMTJjMThjNjNmOTBjIiwiaWF0IjoxNjE5Njc3MjczLCJleHAiOjE2MzAwNDUyNzN9.AIUt4cjhcCdx0AH4ZXrB20WPym65vPpYtfVPMar-l3Q`,
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
const EmergencyService = {
    myEmergencyRequest,
    emergencyRequest,
    nearestEmergencyRequestCount,
    nearestEmergencyRequest,
    getAppUpdateVersion,
    services
};

export default EmergencyService;