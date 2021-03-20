// import React, { Component } from 'react';
// import Scan from './scan';
// import SendSMS from 'react-native-sms'
// import SmsAndroid from 'react-native-get-sms-android';

// class SendSMSContainer extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             message: ''
//         };
//     }

//     // Function to send message
//     sendSMS = () => {
//         console.log('sendSMS');
//         // alert('clicked');
//         SendSMS.send({
//             body: 'Hello shadmna you have done well !',
//             recipients: ['9928872286', '7014859919'],
//             successTypes: ['sent', 'queued'],
//             allowAndroidSendWithoutReadPermission: true
//         }, (completed, cancelled, error) => {
//             if (completed) {
//                 console.log('SMS Sent Completed');
//             } else if (cancelled) {
//                 console.log('SMS Sent Cancelled');
//             } else if (error) {
//                 console.log('Some error occured');
//             }
//         });
//     }


//     // Function to read particular message from inbox with id
//     getSMS = () => {
//         let filter = {
//             box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
//             // the next 4 filters should NOT be used together, they are OR-ed so pick one
//             read: 0, // 0 for unread SMS, 1 for SMS already read
//             _id: 1234, // specify the msg id
//             address: '+917691008701', // sender's phone number
//             body: 'How are you shadman', // content to match
//             // the next 2 filters can be used for pagination
//             indexFrom: 0, // start from index 0
//             maxCount: 10, // count of SMS to return each time
//         };
//         SmsAndroid.list(
//             JSON.stringify(filter),
//             (fail) => {
//                 console.log('Failed with this error: ' + fail);
//             },
//             (count, smsList) => {
//                 console.log('Count: ', count);
//                 console.log('List: ', smsList);
//                 var arr = JSON.parse(smsList);

//                 arr.forEach(function (object) {
//                     console.log('Object: ' + object);
//                     console.log('-->' + object.date);
//                     console.log('-->' + object.body);
//                     alert('your message with selected id is --->' + object.body)
//                 });
//             },
//         );
//     }

//     // Function to delete particular message from inbox with id
//     deleteSMS = () => {
//         console.log('deleteSMS');
//         SmsAndroid.delete(
//             1234,
//             (fail) => {
//                 console.log('Failed with this error: ' + fail);
//             },
//             (success) => {
//                 console.log('SMS deleted successfully');
//             },
//         );
//     }

//     render() {
//         return (
//             <Scan
//                 sendSMS={this.sendSMS}
//                 getSMS={this.getSMS}
//                 deleteSMS={this.deleteSMS}
//             />
//         );
//     }
// }

// export default SendSMSContainer;

// Example to Send Text SMS on Button Click in React Native
// https://aboutreact.com/send-text-sms-in-react-native/

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

// import SMS API
// import SendSMS from 'react-native-sms';
import Communications from 'react-native-communications';
const SendSMSContainer = () => {
  const [mobileNumber, setMobileNumber] = useState('9999999999');
  const [bodySMS, setBodySMS] = useState(
    'Please follow https://aboutreact.com',
  );

  const initiateSMS = () => {
    // Check for perfect 10 digit length
    if (mobileNumber.length != 10) {
      alert('Please insert correct contact number');
      return;
    }

    Communications.textWithoutEncoding('9960732614', "Please insert correct contact number");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Example to Send Text SMS on Button Click in React Native
        </Text>
        <Text style={styles.titleTextsmall}>
          Enter Mobile Number
        </Text>
        <TextInput
          value={mobileNumber}
          onChangeText={
            (mobileNumber) => setMobileNumber(mobileNumber)
          }
          placeholder={'Enter Conatct Number to Call'}
          keyboardType="numeric"
          style={styles.textInput}
        />
        <Text style={styles.titleTextsmall}>
          Enter SMS body
        </Text>
        <TextInput
          value={bodySMS}
          onChangeText={(bodySMS) => setBodySMS(bodySMS)}
          placeholder={'Enter SMS body'}
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={initiateSMS}>
          <Text style={styles.buttonTextStyle}>
            Send Message
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SendSMSContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleTextsmall: {
    marginVertical: 8,
    fontSize: 16,
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});