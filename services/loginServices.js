import request from "../common/api_client";
import qs from "qs"
const checkphonenumber = (phonenumber) => {
    return request({
        url: `/user/checkphonenumber/${phonenumber}`,
        method: 'GET',
        handleHeaders: 2
    });
}
const checkemail = (email) => {
    console.log(email)
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
    console.log(data)
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

const LoginService = {
    checkphonenumber,
    checkemail,
    login,
    loginViaEmail,
    loginViaPhonenumber,
    register,
    updateProfile,
};

export default LoginService;