
import React from 'react';
import { View, Animated, Text } from 'react-native';

export const ComingSoon = () => {

    return(
        <View >
            <Animated.View >
                    <Animated.Image
                        source={require('../assets/banners/ambulance.jpg')}
                      
                        resizeMode="cover"
                        
                    />
                    <Text style={{position:'absolute', top:'10%', left:'10%', color:'#fff', fontSize:20}}>Updating Soon...</Text>
                </Animated.View>
        </View>
    )
}