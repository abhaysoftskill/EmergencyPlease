import request from "../common/api_client";

const checkphonenumber = (phonenumber) => {
    return request({
        url: `/user/phonenumber/${phonenumber}`,
        method: 'GET',
        handleHeaders: 2
    });
}
const checkemail = (email) =>{
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
    return request({
        url: `/user/loginviaemail`,
        method: 'POST',
        data: formData,
        handleHeaders: 2
    });
}
const loginViaPhonenumber = (formData) => {
    return request({
        url: `/user/loginviaphonenumber`,
        method: 'POST',
        data: formData,
        handleHeaders: 2
    });
}

const register = (formData) => {
    return request({
        url: `/user/signup`,
        method: 'POST',
        data: formData,
        handleHeaders: 2
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