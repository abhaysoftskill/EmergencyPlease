import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Alert, Modal, Text } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Switch,
    RadioButton
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import modalStyles from '../../model/languageStyleModal';

import { AuthContext } from '../../components/context';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EmergencyService from '../../services/emergencyServices';
import { checkVersion } from 'react-native-check-version';
import { useDispatch } from 'react-redux';
import { serviceTypeAdd } from '../../redux/actions/actions';
import { LocalizationContext } from '../../translations/LocalizationContext';
export function DrawerContent({ props, navigation }) {
    const {translations, appLanguage, setAppLanguage} = useContext(
        LocalizationContext,
      );
    const paperTheme = useTheme();
    const [userDetails, setUserDetails] = useState({})
    const { signOut, toggleTheme } = React.useContext(AuthContext);
    const [services, setServices] = useState();
    const [versionNo, setVersionNo] = useState('');
    const [showLanguage, setShowLanguage] = useState(false);
    const [language, setLanguage] = useState(appLanguage);

    const stateDispatch = useDispatch();
    useEffect(() => {
        setTimeout(async () => {
            // setIsLoading(false);
            try {
                let userDetailsData = await AsyncStorage.getItem('userDetails');
                setUserDetails(JSON.parse(userDetailsData));

            } catch (e) {
                console.log(e);
            }

        }, 1000);
        return () => setUserDetails({});

    }, []);
    useEffect(() => {
        EmergencyService.serviceTypes().then((res) => {
            setServices(res.service_type)
        }, error => {
            return;
        })
        async function fetchVerson() {
            const version = await checkVersion();
            setVersionNo(version?.version)
            if (version.needsUpdate) {
                console.log(`App has a ${version.updateType} update pending.`);
            }
            console.log(version)
        }
        fetchVerson();
        return () => setServices('');

    }, [])
    const handleSetLanguage = async language => {
        setLanguage(language)
        setAppLanguage(language);
        setShowLanguage(false)
      };
    return (
        <View style={{ flex: 1 }}>
            <Drawer.Section>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Avatar.Image
                            backgroundColor={'#fff'}
                            source={require('../../assets/defaultProfile.png')}
                            size={50}
                        />
                        <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                            <Title style={styles.title}>{userDetails.firstname + " " + userDetails.lastname}</Title>
                            <Caption style={styles.caption}>({userDetails.phonenumber}) {' '}
                                <Text style={[userDetails.mobileverify ? styles.verifiedCaption : styles.notVerifiedCaption]}>
                                    ({userDetails.mobileverify ? 'Verified' : 'Not Verified'})</Text></Caption>

                        </View>
                    </View>
                    <View>
                        <Caption style={{ fontSize: 14 }}>{userDetails.email}<Text style={[userDetails.email_verified ? styles.verifiedCaption : styles.notVerifiedCaption]}>
                            {' '} ({userDetails.email_verified ? 'Verified' : 'Not Verified'})</Text></Caption>
                    </View>

                </View>
            </Drawer.Section>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Drawer.Section title="Emergency Contacts">
                        {/* <Text>{JSON.stringify(userDetails.familyContacts)}</Text> */}
                        <View style={[styles.categoryContainer, { marginTop: 10 }]}>
                            <TouchableOpacity style={styles.categoryBtn} >

                                <View style={[styles.categoryIcon2, { borderColor: `${(userDetails?.familyContacts?.length > 0 ? '#FF6347' : '#fdeae7')}`, backgroundColor: `${(userDetails?.familyContacts?.length > 0 ? '#d9f1df' : '#e5e5e5')}` }]}>
                                    <Fontisto name="holiday-village" size={35} color={`${(userDetails?.familyContacts?.length > 0 ? '#FF6347' : '#8d8c8c')}`} />
                                    <View style={[styles.friendsCount, { backgroundColor: `${(userDetails?.familyContacts?.length > 0 ? '#FF6347' : '#ccc')}` }]}>
                                        <Text style={{ color: "#fff" }}>{userDetails?.familyContacts?.length}</Text>
                                    </View>
                                </View>
                                <Text style={[styles.categoryBtnTxt, { color: "#FF6347" }]}>Family</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.categoryBtn} >
                                <View style={[styles.categoryIcon2, {
                                    borderColor: `${(userDetails?.friendsContacts?.length > 0 ? '#1a8434' : '#ccc')}`,
                                    backgroundColor: `${(userDetails?.friendsContacts?.length > 0 ? '#d9f1df' : '#e5e5e5')}`
                                }]}>
                                    <Ionicons name="md-people" size={35} color={`${(userDetails?.friendsContacts?.length > 0 ? '#1a8434' : '#8d8c8c')}`} />
                                    <View style={[styles.friendsCount, { backgroundColor: `${(userDetails?.friendsContacts?.length > 0 ? '#FF6347' : '#ccc')}` }]}>
                                        <Text style={{ color: "#fff" }}>{userDetails?.friendsContacts?.length}</Text>
                                    </View>
                                </View>
                                <Text style={[styles.categoryBtnTxt, { color: "#1a8434" }]}>Friend</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.categoryBtn} >
                                <View style={[styles.categoryIcon2, {
                                    borderColor: `${(userDetails?.officeContacts?.length > 0 ? '#d21036' : '#ccc')}`,
                                    backgroundColor: `${(userDetails?.officeContacts?.length > 0 ? '#f5d4db' : '#e5e5e5')}`
                                }]}>
                                    <Fontisto name="user-secret" size={35} color={`${(userDetails?.officeContacts?.length > 0 ? '#d21036' : '#8d8c8c')}`} />
                                    <View style={[styles.friendsCount, { backgroundColor: `${(userDetails?.officeContacts?.length > 0 ? '#FF6347' : '#ccc')}` }]}>
                                        <Text style={{ color: "#fff" }}>{userDetails?.officeContacts?.length}</Text>
                                    </View>
                                </View>
                                <Text style={[styles.categoryBtnTxt, { color: "#d21036" }]}>Office</Text>
                            </TouchableOpacity>
                        </View>


                        {/* <View style={styles.banner}>
                            <Image
                                source={require('../../assets/banners/banner1.png')}
                                resizeMode="cover"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </View> */}
                    </Drawer.Section>
                    <Drawer.Section title="Language">
                        <View style={{paddingHorizontal:15, paddingVertical:15,  flexDirection:'row'}}>
                            <Text style={{fontSize:15,  width:'90%',flex: 3, color:'#FF6347'}} onPress={() => setShowLanguage(!showLanguage)}>
                                {language}
                               </Text>
                               <Text  style={{ textAlign:'right', flex: 1}} onPress={() => setShowLanguage(!showLanguage)}><FontAwesome
                            name="caret-down"
                            color="#05375a"
                            size={20}
                           
                        /></Text>
                        </View>

                    </Drawer.Section>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showLanguage}
                        onRequestClose={() => {
                            setShowLanguage(!showLanguage)
                        }}>

                        <View style={modalStyles.centeredView}>
                            <View style={modalStyles.modalView}>
                                  {/* <Icon style={{ position: 'absolute', top: 0, right: 0, padding: 2, backgroundColor: '#ccc', borderRadius: 50, margin: 10 }}
                            name='close' onPress={() => closeVerifyEmail()}
                        /> */}
            
                                <Text style={modalStyles.title}>Choose a different language</Text>
                                <Icon
                            name="close"
                            color={'#000'}
                            size={25}
                            onPress={() =>{setShowLanguage(false)}}
                            style={{position: 'absolute', zIndex:999, top: 5, right: 5, padding: 2, backgroundColor: '#ccc', borderRadius: 50, }}
                        />
                                <View style={{ alignItems:'flex-start'}} >
                                    <RadioButton.Group
                                        onValueChange={value => {handleSetLanguage(value)}}
                                        value={language}
                                    >
                                        {translations.getAvailableLanguages().map(item => ( <View key={item} style={{ flexDirection: 'row',alignItems:'center', justifyContent:'flex-start' }}>
                                            <RadioButton value={item} 
                                            status={language === item ? 'checked' : 'unchecked'} 
                                            />
                                        <Text style={{ marginLeft: 10  }}>{item}</Text>

                                        </View>
                                        ))}
                                       
                                    </RadioButton.Group>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Drawer.Section title="Rewards & Badges">
                        <Text style={{ fontSize: 50, textAlign: 'center', color: '#DAA520', borderBottomWidth: 3, borderBottomColor: '#DAA520', borderTopWidth: 3, borderTopColor: '#DAA520' }}>0 <Text style={{ fontSize: 30 }}>₹</Text></Text>
                        <View style={[styles.badgeContainer]}>
                            <View>
                                <Image
                                    source={require('../../assets/badges/badge1.png')}
                                    resizeMode="contain"
                                    style={{ height: 80, width: 75 }}

                                />
                                <View style={styles.badgeCount}>
                                    <Text style={{ color: "#fff" }}>{0}</Text>
                                </View>
                            </View>
                            <View>
                                <Image
                                    source={require('../../assets/badges/badge2.png')}
                                    resizeMode="contain"
                                    style={{ height: 80, width: 75 }}

                                />
                                <View style={styles.badgeCount}>
                                    <Text style={{ color: "#fff" }}>{0}</Text>
                                </View>
                            </View>
                            <View>
                                <Image
                                    source={require('../../assets/badges/badge3.png')}
                                    resizeMode="contain"
                                    style={{ height: 80, width: 75 }}

                                />
                                <View style={styles.badgeCount}>
                                    <Text style={{ color: "#fff" }}>0</Text>
                                </View>
                            </View>

                        </View>
                    </Drawer.Section>
                    {/* <Drawer.Section title="Services">
                        <View style={{ padding: 10 }}>
                            {services && services.map((service, index) => {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity onPress={() => {
                                            stateDispatch(serviceTypeAdd(service._id)),
                                                service.service_type == 'covid_19' ? navigation.navigate('Covid19', { serviceTypeID: service._id }) : navigation.navigate('Dashboard', { serviceTypeID: service._id })
                                        }}>

                                            <View style={styles.card} >
                                                <View style={styles.cardImgWrapper}>
                                                    <Image
                                                        source={{ uri: `https://emergencyplease.com/api/src/uploads/${service.service_type}.jpg` }}
                                                        resizeMode="cover"
                                                        style={styles.cardImg}
                                                    />
                                                    <View style={styles.cardInfo}>
                                                        <Text style={styles.cardTitle}>{service.service_type_alias}</Text>
                                                    </View>
                                                </View>

                                            </View>

                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                            )}
                        </View>
                    </Drawer.Section> */}
                </View>

            </DrawerContentScrollView>

            {/* <Drawer.Section title="Preferences">
                <TouchableRipple onPress={() => { toggleTheme() }}>
                    <View style={styles.preference}>
                        <Text>Dark Theme</Text>
                        <View pointerEvents="none">
                            <Switch value={paperTheme.dark} />
                        </View>
                    </View>
                </TouchableRipple>
            </Drawer.Section> */}

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <FontAwesome
                            name="comments"
                            color="#05375a"
                            size={20}
                        />
                    )}
                    label="Feedback"
                    onPress={() => { navigation.navigate('Feedback')
                    }}
                    style={{ backgroundColor: '#e8e8e8' }}

                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {
                        Alert.alert('Sign Out!', 'Do you want to Sign Out?', [
                            {
                                text: 'Yes',
                                onPress: async () => {
                                    try {
                                        signOut()
                                    } catch (e) {
                                        console.log(e);
                                    }

                                }
                            },
                            { text: 'Cancel', onPress: () => { return } },
                        ]);
                    }}
                />
            </Drawer.Section>
            <Drawer.Section >
                <View style={styles.preference}>
                    <Text style={{ fontSize: 10, textAlign: 'left', width: '100%', color: '#ccc' }}>Version No : - {versionNo}</Text>
                </View>
                {/*  <View style={styles.preference}>
                    <Text>Last Visit : -</Text>
                </View> */}
                <View style={styles.vision}>
                    <Text style={{ fontSize: 10, textAlign: 'right', width: '100%', color: '#ccc' }}>Vision By - Mano-Bharat</Text>
                </View>
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    banner: {
        height: 200,
        width: '100%',
        alignSelf: 'center',
    },
    friendsCount: {
        color: "#d21036", position: 'absolute', top: -6, right: 6,
        backgroundColor: '#d21036', width: 20, height: 20, borderRadius: 50,
        alignItems: "center", alignContent: "center", justifyContent: 'center'
    },
    categoryContainer: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    badgeContainer: {
        // flex:1,
        flexDirection: 'row',
        alignSelf: 'center',
        alignContent: 'center',
        padding: 10,
        width: '95%',

    },
    categoryBtn: {
        flex: 1,
        width: '100%',
        marginHorizontal: 10,
        paddingVertical: 10,
        alignSelf: 'center',

    },
    categoryIcon: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        // backgroundColor: '#fdeae7' /* '#FF6347' */,
        borderRadius: 50,
        borderColor: 'green',
    },
    categoryIcon2: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#fdeae7' /* '#FF6347' */,
        borderRadius: 50,
        borderColor: 'red',
    },
    categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        color: '#de4f35',
    },
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    verifiedCaption: {
        fontSize: 14,
        lineHeight: 14,
        color: 'green'

    },
    notVerifiedCaption: {
        fontSize: 14,
        lineHeight: 14,
        color: 'red'
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        // borderTopColor: '#f4f4f4',
        // borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2,
        paddingHorizontal: 16,
    },


    //Service Card
    card: {
        height: 100,
        // marginVertical: 10,
        flexDirection: 'column',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        paddingVertical: 5
    },
    cardImgWrapper: {
        // borderBottomWidth:20,
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        // borderRadius: 8,
        // borderBottomRightRadius: 0,
        // borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    cardInfo: {
        position: 'absolute',
        bottom: 10,
        right: 0,
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        backgroundColor: 'rgba(255,255,255,0.7)',


    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#f60101'
    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },
    badgeCount: {
        color: "#d21036", position: 'absolute', top: 5, right: 6,
        backgroundColor: '#d21036', width: 20, height: 20, borderRadius: 50,
        alignItems: "center", alignContent: "center", justifyContent: 'center'
    },
    vision: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2,
        paddingHorizontal: 16,
        alignItems: 'flex-end',
    }
});