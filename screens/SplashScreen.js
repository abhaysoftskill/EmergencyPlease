import React, { useCallback, useContext, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    Linking,
    Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { LocalizationContext } from '../translations/LocalizationContext';

const SplashScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { appLanguage, initializeAppLanguage, translations } = useContext(LocalizationContext);

    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);

        return <Text onPress={handlePress} style={{ color: '#C40201' }}>{children}</Text>;
        // return <Button title={children} onPress={handlePress} /><Text on>{children}</Text>;
    };
    useEffect(() => {
        initializeAppLanguage();
        // const timer = setTimeout(() => {
        //   navigation.navigate('Main');
        // }, 2000);

        // return () => clearTimeout(timer);
    }, [navigation, initializeAppLanguage]);
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
                animation="fadeInUpBig"
            >
                <View>
                    <Text style={[styles.title, {
                        color: colors.text
                    }]}>{translations.SPLASHTEXT}</Text>
                    <Text style={[styles.text]}>By continuing you accepts our <OpenURLButton url={'https://emergencyplease.com/termofuse'}>Terms of Use,</OpenURLButton><OpenURLButton url={'https://emergencyplease.com/privacypolicy'}> Privacy Policy</OpenURLButton> & <OpenURLButton url={'https://emergencyplease.com/subscription'}>Subscription Terms</OpenURLButton></Text>
                    {/* <Text>Language: {appLanguage}</Text> */}
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => navigation.navigate('LanguageSetting')}>
                            <LinearGradient
                                colors={['#FFA07A', '#FF6347']}
                                style={styles.signIn}
                            >
                                <Text style={styles.textSign}>{translations.CHANGELANGUAGE}</Text>
                                <MaterialIcons
                                    name="navigate-next"
                                    color="#fff"
                                    size={20}
                                />
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                            <LinearGradient
                                colors={['#118407', '#0c6604']}
                                style={styles.signIn}
                            >
                                <Text style={styles.textSign}>{translations.GETSTARTED}</Text>
                                <MaterialIcons
                                    name="navigate-next"
                                    color="#fff"
                                    size={20}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6347'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        // flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // paddingVertical: 50,
        paddingHorizontal: 20,
        paddingTop:30,
        paddingBottom:20,
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5,
        lineHeight: 22
    },
    button: {
        flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-between',
        // alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});