import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme, Avatar } from 'react-native-paper';
import { View } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EmergencyDetails from '../EmergencyDetails';
import Home from '../Home';
import EmergencyServices from '../EmergencyServices';
import EmergencyReport from '../EmergencyReport';
import { EmergencyCall } from '../EmergencyCall';
import { ComingSoon } from '../../components/ComingSoon';
import Details from '../update/Details';
import FamilyFriendsDetails from '../update/FamilyFriendsDetails';
import MyRequests from '../MyRequests';
import EmergencyContacts from '../EmergencyContacts/EmergencyContacts';
import EmergencyRequestMap from '../EmergencyRequestMap';
import { SuccessStories } from '../SuccessStories/SuccessStories';
import { Notifications } from '../Notifications/Notifications';
import SplashScreen from '../SplashScreen';
import SpecialServices from '../SpecialServices/SpecialServices';
import Covid19 from '../SpecialServices/Covid19/Covid19';
import CovidVaccineCenters from '../SpecialServices/Covid19/CovidVaccineCenters';
import Services from '../Services';

const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const StoryStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="SpecialServices" activeColor="#fff" barStyle={{ backgroundColor: '#FF6347' }}>
    {/* <Tab.Screen
      name="SpecialServices"
      component={SpecialServices}
      options={{
        tabBarLabel: 'Special Services',
        tabBarColor: '#FF6347',
        tabBarIcon: ({ color }) => (
          <Icon name="heart" color={color} size={26} />
        ),
      }}
    /> */}
    <Tab.Screen
      name="Dashboard"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Dashboard',
        tabBarColor: '#FF6347',
        tabBarIcon: ({ color }) => (
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
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="SuccessStory"
      component={StoryStackScreen}
      options={{
        tabBarLabel: 'Users Story',
        tabBarColor: '#694fad',
        tabBarIcon: ({ color }) => (
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
        tabBarIcon: ({ color }) => (
          <Icon name="md-call" color={color} size={26} />
        ),
      }}


    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
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
          color: '#05375a'
        },
      }}>
      <HomeStack.Screen
        name="Services"
        component={Services}
        options={{
          title: 'Services',
          headerLeft: () => (
            <View style={{ marginLeft: 10, fontWeight: 100 }}>
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
            <View style={{ flexDirection: 'row', marginRight: 10 }}>

              <TouchableOpacity
                style={{ paddingHorizontal: 10, marginTop: 5 }}
              >
                <Avatar.Image
                  backgroundColor={'#fff'}
                  source={require('../../assets/defaultProfile.png')}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
 <HomeStack.Screen
        name="SpecialServices"
        component={SpecialServices}
        options={{
          title: 'Special Services',
          headerLeft: () => (
            <View style={{ marginLeft: 10, fontWeight: 100 }}>
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
            <View style={{ flexDirection: 'row', marginRight: 10 }}>

              <TouchableOpacity
                style={{ paddingHorizontal: 10, marginTop: 5 }}
              >
                <Avatar.Image
                  backgroundColor={'#fff'}
                  source={require('../../assets/defaultProfile.png')}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="Covid19"
        component={Covid19}
        options={{
          title: 'Covid-19 Vaccination Center',
          headerLeft: () => (
            <View style={{ marginLeft: 10, fontWeight: 100 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          )

        }}
      />

      <HomeStack.Screen
        name="CovidVaccineCenters"
        component={CovidVaccineCenters}
        options={{
          title: 'Covid Vaccine Centers',
        }}
      />

      <HomeStack.Screen
        name="Dashboard"
        component={Home}
        options={{
          title: 'Emergency Dashboard',
          headerLeft: () => (
            <View style={{ marginLeft: 10, fontWeight: 100 }}>
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
            <View style={{ flexDirection: 'row', marginRight: 10 }}>

              <TouchableOpacity
                style={{ paddingHorizontal: 10, marginTop: 5 }}
              >
                <Avatar.Image
                  backgroundColor={'#fff'}
                  source={require('../../assets/defaultProfile.png')}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <HomeStack.Screen
        name="EmergencyRequestMap"
        component={EmergencyRequestMap}
        options={({ route }) => ({
          title: 'Emergency Request Location',

          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>

              <TouchableOpacity
                style={{ paddingHorizontal: 10, marginTop: 5 }}
              >
                <Avatar.Image
                  backgroundColor={'#fff'}
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
        options={({ route }) => ({
          // userName: route.params.userName,
          headerBackTitleVisible: false,
          tabBarVisible: false,
          title: 'Emergency Requests',
        })}

      />
      <HomeStack.Screen
        name="EmergencyDetails"
        component={EmergencyDetails}
        options={({ route }) => ({
          title: 'User Details'
          // userName: route.params.userName,
          // headerBackTitleVisible: false
        })}
      />
      <HomeStack.Screen
        name="EmergencyServices"
        component={EmergencyServices}
        options={({ route }) => ({
          title: 'Emergency Services',
          // headerBackTitleVisible: false
        })}
      />
      <HomeStack.Screen
        name="MyRequests"
        component={MyRequests}
        options={({ route }) => ({
          title: 'My Requests',
          // headerBackTitleVisible: false
        })}
      />


      <HomeStack.Screen
        name="EmergencyReport"
        component={EmergencyReport}
        options={({ route }) => ({
          title: 'Confirm Location'
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
      <HomeStack.Screen
        name="SplashScreen"
        options={{ headerShown: false }}
        component={SplashScreen}
      />
    </HomeStack.Navigator>
  );
};

const NotificationStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
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
          color: '#05375a'
        },
      }}>
      <NotificationStack.Screen
        name="Notifications"
        component={Notifications}
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

const StoryStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <StoryStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <StoryStack.Screen
        name="SuccessStory"
        // component={ProfileScreen}
        component={SuccessStories}
        options={{
          title: 'Users Story',
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
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
      <StoryStack.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
        }}
        // component={EditProfileScreen}
        component={ComingSoon}
      />
      <StoryStack.Screen
        name="EditDetails"
        options={{
          title: 'Update Details',
        }}
        // component={EditProfileScreen}
        component={Details}
      />
    </StoryStack.Navigator>
  );
};

const ContactsStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <StoryStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <StoryStack.Screen
        name="EmergencyContacts"
        // component={ProfileScreen}
        component={EmergencyContacts}
        options={{
          title: 'Emergency Contacts',
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
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
    </StoryStack.Navigator>
  );
};
