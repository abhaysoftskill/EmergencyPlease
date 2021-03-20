
import React from 'react';
import { View, Animated } from 'react-native';

export const EmergencyConnect = () => {

    return(
        <View>
            <Animated.View >
                    <Animated.Image
                        source={require('../assets/banners/ambulance.jpg')}
                      
                        resizeMode="cover"
                    />
                </Animated.View>
        </View>
    )
}