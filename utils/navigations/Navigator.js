import React from 'react';

const { NavigationContainer } = require("@react-navigation/native")
const { authStack } = require("./Routes")


export const Navigator = () =>{
    return (
        <NavigationContainer>
            {authStack()}
        </NavigationContainer>
    )
}