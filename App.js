/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useReducer, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
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
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { AuthContext } from './components/context';

import AsyncStorage from '@react-native-community/async-storage';

import RootStackScreen from './utils/navigations/Routes';

import GoogleMap from './components/GoogleMap';
import UserDetails from './components/UserDatails';
import { Navigator } from './utils/navigations/Navigator';
import { DrawerContent } from './screens/sidemenu/DrawerContent';
import MainTabScreen from './screens/tabs/MainTabScreen';

import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './screens/auth/Welcome';
// import persistStore from 'redux-persist/es/persistStore';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import store from './Redux/store';
import CheckConnection from './utils/CheckConnection';
import { Image } from 'react-native-animatable';

const RootStack = createStackNavigator();
const ErrorCard = () => {
  return (
    <View style={styles.errorContainer}>
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
  // const persistedStore = persistStore(store);
 
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
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
      console.log(userDetails)

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
  
  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken,userDetails;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        // userDetails = await AsyncStorage.getItem('userDetails');
        // setUserData(JSON.parse(userDetails))

      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);
  let network = CheckConnection();
  if (network === false) {
    return <ErrorCard />;
  }
  return (
    <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistedStore}> */}
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {/* <Navigator /> */}
         
             {/* { ( loginState.userToken !== null && 
                loginState.userToken !== 'undefined'  && 
                userData.userGender == "" &&
                userData.bloodGroup == "" ? <RootStackScreen /> :
                ( loginState.userToken !== null && loginState.userToken !== 'undefined' && userData.userGender != "" &&
                userData.bloodGroup != ""? (
                  <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                  
                    <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
                  </Drawer.Navigator>
                ) : 
                <RootStackScreen />
                )
              )} */}
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
      {/* <GoogleMap /> */}
      {/* <UserDetails /> */}
      {/* <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
         
          <View style={styles.body}>
           <Text>Abhay</Text>
            <GoogleMap />
           
           
          </View>
        
        </ScrollView>
      </SafeAreaView> */}
    </PaperProvider>
    {/* </PersistGate> */}
  </Provider>  
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    justifyContent: 'center',
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

export default App;
