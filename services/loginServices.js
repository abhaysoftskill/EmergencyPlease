

// checkphonenumber(formData) {
//     return request({
//         url: '/auth/',
//         method: 'POST',
//         data: formData,
//         handleHeaders: 2
//     });
// }

import request from "../common/api_client";

const checkphonenumber = (phonenumber) => {
    // return this.http.get(`${SERVER_URL}/users/phonenumber/${phonenumber}`);
    // const headers = {
    //     "access-token": accessToken,
    //     "client": client,
    //     "uid": uId,
    //     "cache-control": "max-age=0, private, must-revalidate",
    //     "content-type": "application/json; charset=utf-8",
    //     "expiry": "1606917294",
    //     "token-type": "Bearer"
    // }
    return request({
        url: `/users/phonenumber/${phonenumber}`,
        method: 'GET',
        // data: formData,
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
    console.log('$$$$$$$$$$$$$$$$$$$$$')
    console.log(formData)
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