import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../../components/context';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
export function DrawerContent(props) {

    const paperTheme = useTheme();
    const [userDetails, setUserDetails] = useState([])
    const { signOut, toggleTheme } = React.useContext(AuthContext);
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
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                            backgroundColor= {'#fff'}
                                source={require('../../assets/defaultProfile.png')}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{userDetails.firstname + " " + userDetails.lastname}</Title>
                                <Caption style={styles.caption}>({userDetails.phonenumber})</Caption>
                            </View>
                        </View>

                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                            <Title style={{ fontSize: 14 }}>{userDetails.email}</Title>
                            <Caption style={[userDetails.emailverify ? styles.verifiedCaption : styles.notVerifiedCaption]}>({userDetails.emailverify ? 'Verified' : 'Not Verified'})</Caption>
                        </View>
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}phonenumber
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Bookmarks"
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="settings-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('SettingScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        /> */}
                    </Drawer.Section>
                    <Drawer.Section title="Emergency Contacts">

                    <View style={[styles.categoryContainer, { marginTop: 10 }]}>
                {/* {userDetails.immidiateContact.map(data => { */}
                <TouchableOpacity style={styles.categoryBtn} onPress={() => { }}>
                    <View style={styles.categoryIcon2}>
                        <Fontisto name="holiday-village" size={35} color="#FF6347" />
                        <View style={[styles.friendsCount, { backgroundColor: '#FF6347' }]}>
                            <Text style={{ color: "#fff" }}>2</Text>
                        </View>
                    </View>
                    <Text style={[styles.categoryBtnTxt, { color: "#FF6347" }]}>Family</Text>
                </TouchableOpacity>
                {/* })} */}
                <TouchableOpacity style={styles.categoryBtn} onPress={() => { }}>
                    <View style={[styles.categoryIcon2, { borderColor: '#1a8434', backgroundColor: '#d9f1df' }]}>
                        <Ionicons name="md-people" size={35} color="#1a8434" />
                        <View style={[styles.friendsCount, { backgroundColor: '#FF6347' }]}>
                            <Text style={{ color: "#fff" }}>2</Text>
                        </View>
                    </View>
                    <Text style={[styles.categoryBtnTxt, { color: "#1a8434" }]}>Friend</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBtn} onPress={() => { }}>
                    <View style={[styles.categoryIcon2, { borderColor: '#d21036', backgroundColor: '#f5d4db' }]}>
                        <Fontisto name="user-secret" size={35} color="#d21036" />
                        <View style={styles.friendsCount}>
                            <Text style={{ color: "#fff" }}>2</Text>
                        </View>
                    </View>
                    <Text style={[styles.categoryBtnTxt, { color: "#d21036" }]}>Office</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.banner}>
                    <Image
                        source={require('../../assets/banners/banner1.png')}
                        resizeMode="cover"
                        style={{width:'100%', height:'100%'}}
                    />
                </View>
                    </Drawer.Section>
                </View>
               
            </DrawerContentScrollView>
            <Drawer.Section title="Preferences">
                <TouchableRipple onPress={() => { toggleTheme() }}>
                    <View style={styles.preference}>
                        <Text>Dark Theme</Text>
                        <View pointerEvents="none">
                            <Switch value={paperTheme.dark} />
                        </View>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    banner:{
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
    categoryBtn: {
        flex: 1,
        width: '100%',
        marginHorizontal: 10,
        paddingVertical:10,
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
        paddingHorizontal:15,
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
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});