import React, { useRef, useState } from 'react';
import {
    View,
    Text,

    TouchableOpacity,
    Dimensions,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
    Modal
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LoginService from '../services/loginServices';
import modalStyles from '../model/loginValidationModal';
import { Paragraph,TextInput } from 'react-native-paper';
import { Icon } from 'native-base';

import { Button } from 'react-native-paper';
import EmergencyService from '../services/emergencyServices';
import Loader from '../components/Loading';
const Feedback = ({ route, navigation }) => {
    const [verifyContact, setVerifyContact] = useState(false)
    
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);

  const shareFeedback = () => {
    setLoading(true);
    EmergencyService.shareFeedback({
        "feedback": comments,
        "rating":rating})
    .then((res) => {
        setTimeout(async () => {
            setLoading(false);

            Alert.alert('Feedback !', 'Thanks for your suggestion / feedback.', [
                {
                    text: 'Okay',
                    onPress: async () => {
                        try {
                            navigation.navigate('Dashboard')
                        } catch (e) {
                            console.log(e);
                        }

                    }
                }
            ]);
        }, 2000);

    }, error => {
        setLoading(false);
        return;
    })
  }
    const ref_input1 = useRef();
  
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
           {loading && <Loader/>}
            <View style={styles.header}>
                <Text style={styles.text_header}>Suggestion / Feedback!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <View style={styles.action}>
                       
                        <TextInput
                            placeholder="Write your Suggestion / Feedback"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={comments}
                            onChangeText={(val) => setComments(val)}
                            returnKeyType="next"
                            ref={ref_input1}
                            multiline={true}
                            numberOfLines={5}
                            mode={'outlined'}
                        />

                    </View>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-around', marginVertical:20}}>
                    <Ionicons name={'ios-star'} size={25} style={rating >= 1 ? styles.starActive : styles.starInActive} onPress={() => setRating(1)} />
                    <Ionicons name={'ios-star'} size={25} style={rating >= 2 ? styles.starActive : styles.starInActive}  onPress={() => setRating(2)} />
                    <Ionicons name={'ios-star'} size={25} style={rating >= 3 ? styles.starActive : styles.starInActive}  onPress={() => setRating(3)} />
                    <Ionicons name={'ios-star'} size={25} style={rating >= 4 ? styles.starActive : styles.starInActive}  onPress={() => setRating(4)} />
                    <Ionicons name={'ios-star'} size={25} style={rating >= 5 ? styles.starActive : styles.starInActive}  onPress={() => setRating(5)} />
                        {/* <Text style={styles.text}>({props.reviews})</Text> */}
                    </View>
                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                           Your Suggestion  and Feedback always support us to improve our services.</Text>
                      
                    </View>
                    <View style={[styles.button, {
                        flex: 1,
                        flexDirection: 'row-reverse',
                    }]}>

                        <TouchableOpacity
                            style={styles.signIn, styles.signButton}
                            onPress={() => shareFeedback()}
                            disabled={!comments && rating == 0}
                        >
                            <LinearGradient
                                colors={comments && rating > 0 ? ['#FFA07A', '#FF6347'] : ['#ccc', '#ccc']}
                                style={[styles.signIn]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Share Feedback</Text>
                            </LinearGradient>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {navigation.goBack() }}
                            style={[styles.signIn, {
                                borderColor: '#FF6347',
                                borderWidth: 1,
                                width: '30%',

                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#FF6347'
                            }]}>Back</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default Feedback;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6347'
    },
    starInActive: {
		color: '#ccc'
	}, starActive: {
		color: '#FF6347'
	},
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        // alignItems: 'center',
        marginTop: 10,

    },
    signIn: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

    },
    signButton: {
        width: '50%',
        marginLeft: 30

    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    },
    color_textPrivate: {
        color: 'grey'
    },
    phoneVerify: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,

    },
    phoneVerifyButton: {
        // width: '50%',
        marginLeft: 30

    },
    textVerify: {
        fontSize: 14,
        paddingHorizontal: 30,
        paddingVertical: 8,
        fontWeight: 'bold'
    },
});