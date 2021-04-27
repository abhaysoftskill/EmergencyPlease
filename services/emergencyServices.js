import request from "../common/api_client";

const emergencyRequest = (formData) => {
    return request({
        url: `/emergencyrequest`,
        method: 'POST',
        data: formData,
        handleHeaders: 2
    });
}
const nearestEmergencyRequestCount = (region) => {
    return request({
        url: `/emergencyrequest/nearCount?lat=${region.latitude}&lng=${region.longitude}`,
        method: 'GET',
        handleHeaders: 2
    });
}
const nearestEmergencyRequest = (lng,lat,type) => {
    return request({
        url: `/emergencyrequest/near?lng=${lng}&lat=${lat}&requestType=${type}`,
        method: 'GET',
        handleHeaders: 2
    });
}
const myEmergencyRequest = (userID) => {
    return request({
        url: `/emergencyrequest/${userID}`,
        method: 'GET',
        handleHeaders: 2
    });
}
const getAppUpdateVersion = () => {
    return request({
        url: `/users/appversions`,
        method: 'GET',
        handleHeaders: 2
    });  
}
const EmergencyService = {
    myEmergencyRequest,
    emergencyRequest,
    nearestEmergencyRequestCount,
    nearestEmergencyRequest,
    getAppUpdateVersion
};

export default EmergencyService;