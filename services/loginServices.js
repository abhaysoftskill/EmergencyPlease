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
const loginviaotppassword = (formData) => {
    let data = qs.stringify(formData)
    return request({
        url: `/user/loginviaotppassword`,
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

const genderdetails = async (formData) => {
    let data = qs.stringify(formData)
    return request({
        url: `user/update/registergenderdetails`,
        method: 'PATCH',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
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
     let data = qs.stringify(formData)
    // let data = qs.stringify(formData, null, { encodeURI: qs.unescape });

    // let temp = data.replace("%40", "@")
    // console.log(temp)

    userToken = await AsyncStorage.getItem('userToken');
    return request({
        url: `user/send/verification/email`,
        method: 'POST',
        data,
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


const otprequest = async (formData) => {
    let data = qs.stringify(formData)
   return request({
       url: `otprequest/add`,
       method: 'POST',
       data,
       headers: {
           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
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
    restPasword,
    genderdetails,

    otprequest,
    loginviaotppassword
};

export default LoginService;