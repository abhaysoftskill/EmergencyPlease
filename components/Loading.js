
import React, { useContext } from 'react';
import { View, Animated, Text,Image } from 'react-native';
import { LocalizationContext } from '../translations/LocalizationContext';

 const Loader = () => {
    const { translations } = useContext(LocalizationContext);

    return(
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            //  marginTop: 20,
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,0.8)',
            height: '100%',
            left: 0,
            right: 0,
            zIndex: 99

        }}>
            <Image
                source={require('../assets/loading.png')}
                resizeMode="cover"
            />
            <Text>{translations.PLEASEWAIT}....</Text>
        </View>
    )
}

export default Loader;