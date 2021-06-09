import request from "../common/api_client";
const api_key = "279349ff-6a03-11ea-9fa5-0200cd936042"
const sendSMS = (phonenumber) => {
    console.log(phonenumber)
    return request({
        url: `https://2factor.in/API/V1/${api_key}/SMS/+91${phonenumber}/AUTOGEN`,
        method: 'GET',
        handleHeaders: 2
    });
}
const verifySMS = (otp_entered_by_user,session_id) => {
    console.log(otp_entered_by_user)
    return request({
        url: `https://2factor.in/API/V1/${api_key}/SMS/VERIFY/${session_id}/${otp_entered_by_user}`,
        method: 'GET',
        handleHeaders: 2
    });
}


const smsService = {
    sendSMS,
    verifySMS
};

export default smsService;