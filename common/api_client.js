import axios from "axios";
import { BASE_API_URL } from "./constants";

export const request = function (options) {
    // console.log(options)
    // const authHeaders = JSON.parse(localStorage.getItem('authorization_headers'));
    const client = axios.create({
        baseURL: BASE_API_URL,
        headers: options.headers
    });

    const onSuccess = function (response) {
        const resp = response.data;
        // console.log('Success %%%%%%%%%%')

        if (resp.hasOwnProperty("success")) {
            console.log(resp)
            return resp;
        }
        else {
            console.log(resp)
            return resp
            //return { ...resp, success: true }
        }
    };

    const onError = function (error) {
        // console.log('Error %%%%%%%%%%')

        if (error.response) {
            if (error.response.status === 401 && options.handleHeaders !== 1) {
                // window.location.href = '/auth/signin';
            }
        }
        //Check API and return response in accepted state with error data and success equals false flag to avoid catch block in all api requests.
        return Promise.reject(error.response ? error.response.data : { message: "something went wrong", success: false } || error.message || error.errors);
    };

    return client(options)
        .then(onSuccess)
        .catch(onError);
};

export default request;