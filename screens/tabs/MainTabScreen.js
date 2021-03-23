import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme, Avatar} from 'react-native-paper';
import {View} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GoogleMap from '../../components/GoogleMap';
import EmergencyDetails from '../EmergencyDetails';
import Home from '../Home';
import EmergencyServices from '../EmergencyServices';
import EmergencyReport from '../EmergencyReport';
import { EmergencyConnect } from '../EmergencyConnect';
import { EmergencyCall } from '../EmergencyCall';
import { ComingSoon } from '../../components/ComingSoon';
import Details from '../update/Details';
import FamilyFriendsDetails from '../update/FamilyFriendsDetails';
import MyRequests from '../MyRequests';
import ChatRoom from '../../components/chat/ChatRoom';

const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Dashboard" activeColor="#fff" barStyle={{ backgroundColor: '#FF6347' }}>
  
    <Tab.Screen
      name="Dashboard"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Dashboard',
        tabBarColor: '#FF6347',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
     <Tab.Screen
      name="Notifications"
      component={NotificationStackScreen}
      options={{
        tabBarLabel: 'Notifications',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="SuccessStory"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Success Story',
        tabBarColor: '#694fad',
        tabBarIcon: ({color}) => (
          <Icon name="ios-book" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="EmergencyContacts"
      component={ContactsStackScreen}
      options={{
        tabBarLabel: 'Emergency Contacts',
        tabBarColor: '#d02860',
        tabBarIcon: ({color}) => (
          <Icon name="md-call" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          // fontWeight: 'bold',
          color:'#05375a'
        },
      }}>
      <HomeStack.Screen
        name="Dashboard"
        component={Home}
        options={{
          title: 'Dashboard',
          headerLeft: () => (
            <View style={{marginLeft: 10, fontWeight:100}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
           
              <TouchableOpacity
                style={{paddingHorizontal: 10, marginTop: 5}}
               >
                <Avatar.Image
                 backgroundColor= {'#fff'}
                 source={require('../../assets/defaultProfile.png')}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="Map"
        component={GoogleMap}
        options={({route}) => ({
          title:  route.params.title,
        
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              
              <TouchableOpacity
                style={{paddingHorizontal: 10, marginTop: 5}}
               >
                <Avatar.Image
                 backgroundColor= {'#fff'}
                  source={require('../../assets/defaultProfile.png')}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      
      />
       <HomeStack.Screen 
        name="EmergencyCall"
        component={EmergencyCall}
        options={({route}) => ({
          // userName: route.params.userName,
          headerBackTitleVisible: false,
          tabBarVisible: false,
          title: 'Emergency Request',
        })}
        
      />
       <HomeStack.Screen 
        name="EmergencyDetails"
        component={EmergencyDetails}
        options={({route}) => ({
          title:'User Details'
          // userName: route.params.userName,
          // headerBackTitleVisible: false
        })}
      />
        <HomeStack.Screen 
        name="EmergencyServices"
        component={EmergencyServices}
        options={({route}) => ({
          title: 'Emergency Services',
          // headerBackTitleVisible: false
        })}
      />
      <HomeStack.Screen 
        name="MyRequests"
        component={MyRequests}
        options={({route}) => ({
          title: 'My Requests',
          // headerBackTitleVisible: false
        })}
      />
      
        <HomeStack.Screen 
        name="ChatRoom"
        component={ChatRoom}
        options={({route}) => ({
          title: 'ChatRoom',
          // headerBackTitleVisible: false
        })}
      />
       <HomeStack.Screen 
        name="EmergencyReport"
        component={EmergencyReport}
        options={({route}) => ({
          title:'Confirm Location'
          // title: route.params.title,
          // headerBackTitleVisible: false
        })}
      />
       <HomeStack.Screen 
        name="EmergencyConnect"
        component={EmergencyConnect}
        options={({route}) => ({
          // title: route.params.title,
          // headerBackTitleVisible: false
        })}
      />
       <HomeStack.Screen
        name="EditDetails"
        options={{
          title: 'Update Details',
        }}
        // component={EditProfileScreen}
        component={Details}
      />
        <HomeStack.Screen
        name="EditfamilyDetails"
        options={{
          title: 'Update Emergency Contact',
        }}
        component={FamilyFriendsDetails}
      />
     {/* <HomeStack.Screen 
        name="CardItemDetails"
        component={CardItemDetails}
        options={({route}) => ({
          // title: route.params.title,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff'
        })}
      /> */}
    </HomeStack.Navigator>
  );
};

const NotificationStackScreen = ({navigation}) => {
  const {colors} = useTheme();
  return (
  <NotificationStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.background,
        shadowColor: colors.background, // iOS
        elevation: 0, // Android
      },
      headerTintColor: colors.text,
      headerTitleStyle: {
        // fontWeight: 'bold',
        color:'#05375a'
      },
    }}>
    <NotificationStack.Screen
      name="Notifications"
      // component={NotificationScreen}
      component={ComingSoon}
      options={{
        headerLeft: () => (
          <Icon.Button
          name="ios-menu"
          size={25}
          color={colors.text}
          backgroundColor={colors.background}
          onPress={() => navigation.openDrawer()}
        />
        ),
      }}
    />
  </NotificationStack.Navigator>
  )
};

const ProfileStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <ProfileStack.Screen
        name="SuccessStory"
        // component={ProfileScreen}
        component={ComingSoon}
        options={{
          title: 'Success Story',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          // headerRight: () => (
          //   <View style={{marginRight: 10}}>
          //     <MaterialCommunityIcons.Button
          //       name="account-edit"
          //       size={25}
          //       backgroundColor={colors.background}
          //       color={colors.text}
          //       // onPress={() => navigation.navigate('EditProfile')}
          //     />
          //   </View>
          // ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
        }}
        // component={EditProfileScreen}
        component={ComingSoon}
      />
        <ProfileStack.Screen
        name="EditDetails"
        options={{
          title: 'Update Details',
        }}
        // component={EditProfileScreen}
        component={Details}
      />
    </ProfileStack.Navigator>
  );
};

const ContactsStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <ProfileStack.Screen
        name="EmergencyContacts"
        // component={ProfileScreen}
        component={ComingSoon}
        options={{
          title: 'Emergency Contacts',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          // headerRight: () => (
          //   <View style={{marginRight: 10}}>
          //     <MaterialCommunityIcons.Button
          //       name="account-edit"
          //       size={25}
          //       backgroundColor={colors.background}
          //       color={colors.text}
          //       // onPress={() => navigation.navigate('EditProfile')}
          //     />
          //   </View>
          // ),
        }}
      />
    </ProfileStack.Navigator>
  );
};
