/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useReducer, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';
const Drawer = createDrawerNavigator();

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { AuthContext } from './components/context';

import AsyncStorage from '@react-native-community/async-storage';

import RootStackScreen from './utils/navigations/Routes';
import { DrawerContent } from './screens/sidemenu/DrawerContent';
import MainTabScreen from './screens/tabs/MainTabScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './Redux/store';
import CheckConnection from './utils/CheckConnection';
import { Image } from 'react-native-animatable';
import withCodePush from './codepush';
const RootStack = createStackNavigator();
const ErrorCard = () => {
  return (
    <View style={styles.errorContainer}>
      <View>
        <Image source={require('./assets/logo.png')} style={[styles.img, {marginTop:20,marginBottom:50}]} />
      </View>
      <View>
        <Image source={require('./assets/error.png')} style={styles.img} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.errorHead}>Connection Error</Text>
        <Text style={styles.subText}>
          Please check your network connectivity and try again
        </Text>
      </View>
    </View>
  );
};
const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const initialLoginState = {
    isLoading: true,
    userDetails: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(foundUser.userToken.token);
      const userName = foundUser.userDetails.firstname + " " + foundUser.userDetails.lastname;
      const userDetails = JSON.stringify(foundUser.userDetails);

      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userDetails', userDetails);
      } catch (e) {
        console.log(e);
      }
      // // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userDetails');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);
  
//   const requestData = () => {
//     EmergencyService.nearestEmergencyRequestCount(coordinates).then((res) => {
//         setRequestDataCount(res)
//         setRequestCount(res.accident_reported + res.ambulance_request + res.heart_attack + res.blood_donor);
//         setLoading(false)
//     }, error => {
//         console.error('onRejected function called: ' + error.message);
//         return;
//     })
// }
//     useEffect(() => {
//         // Change the state every second or the time given by User.
//         const interval = setInterval(() => {
//           requestData()
//         }, 1000);
//         return () => clearInterval(interval);
//     }, []);
  useEffect(() => {
    setTimeout(async () => {
      let userToken,userDetails;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);
  let network = CheckConnection();
  if (network === false) {
    return <ErrorCard />;
  }
  return (
    <Provider store={store}>
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null && loginState.userToken !== 'undefined' ? (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            </Drawer.Navigator>
          )
            :
           
            <RootStackScreen />
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  </Provider>  
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  rootContainer: {justifyContent: 'flex-start', padding: 10},
  img: {height: 120, width: 120},
  textContainer: {
    alignItems: 'center',
  },
  title: {marginBottom: 10, fontSize: 20, fontWeight: 'bold'},
  errorHead: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 50,
    textAlign: 'center',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    height: 500,
    width: '100%',
    borderWidth: 2,
    borderColor: 'blue',
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default withCodePush(App);
