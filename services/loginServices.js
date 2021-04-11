import request from "../common/api_client";

const checkphonenumber = (phonenumber) => {
    return request({
        url: `/users/phonenumber/${phonenumber}`,
        method: 'GET',
        handleHeaders: 2
    });
}
const checkemail = (email) =>{
    return request({
        url: `/users/emailcheck/${email}`,
        method: 'GET',
        handleHeaders: 2
    });

}
const login = (formData) => {
   
    return request({
        url: `/users/authenticate`,
        method: 'POST',
        data: formData,
        handleHeaders: 2
    });
}
const loginViaEmail = (formData) => {
   
    return request({
        url: `/users/authenticatebyemail`,
        method: 'POST',
        data: formData,
        handleHeaders: 2
    });
}

const register = (formData) => {
    return request({
        url: `/users/register`,
        method: 'POST',
        data: formData,
        handleHeaders: 2
    });
}
const updateProfile = (formData) => {
    return request({
        url: `/users/update/${formData.id}`,
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
    register,
    updateProfile,
};

export default LoginService;