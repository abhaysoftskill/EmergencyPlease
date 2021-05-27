import request from "../common/api_client";
import qs from "qs"
import AsyncStorage from "@react-native-community/async-storage";
const checkphonenumber = (phonenumber) => {
    return request({
        url: `/user/checkphonenumber/${phonenumber}`,
        method: 'GET',
        handleHeaders: 2
    });
}
const checkemail = (email) => {
    return request({
        url: `/user/checkemail/${email}`,
        method: 'GET',
        handleHeaders: 2
    });

}
const login = (formData) => {

    return request({
        url: `/user/authenticate`,
        method: 'POST',
        data: formData,
        handleHeaders: 2
    });
}
const loginViaEmail = (formData) => {
    let data = qs.stringify(formData)
    return request({
        url: `/user/loginviaemail`,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    });
}
const loginViaPhonenumber = (formData) => {
    let data = qs.stringify(formData)
    return request({
        url: `/user/loginviaphonenumber`,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    });
}

const register = (formData) => {
    let data = qs.stringify(formData)
    return request({
        url: `/user/signup`,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    });
}
const updateProfile = (formData) => {
    return request({
        url: `/user/update/${formData.id}`,
        method: 'PUT',
        data: formData,
        handleHeaders: 2
    });
}


const emailVerify = async (formData) => {
    let data = qs.stringify(formData)
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `user/verify`,
        method: 'PATCH',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': `Bearer ${userToken}`,
        }
    });
}

const resendEmailVerifyToken = async (formData) => {
    //  let data = qs.stringify(formData)
   let data = qs.stringify(formData, null, { encodeURI: qs.unescape });

    console.log(data)
    console.log(data.replace("%40", "@"));
let temp = data.replace("%40", "@")

    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `user/send/verification/email`,        
        method: 'POST',
        temp,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': `Bearer ${userToken}`,
        }
    });
}
const forgotPassword = (email) => {
    return request({
        url: `user/reset/password?email=${email}`,
        method: 'GET',
        handleHeaders: 2
    });
}
const restPasword = async (formData) => {
    let data = qs.stringify(formData)
    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `user/reset/password`,
        method: 'PATCH',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': `Bearer ${userToken}`,
        }
    });
}

const LoginService = {
    checkphonenumber,
    checkemail,
    login,
    loginViaEmail,
    loginViaPhonenumber,
    register,
    updateProfile,
    emailVerify,
    resendEmailVerifyToken,
    forgotPassword,
    restPasword
};

export default LoginService;