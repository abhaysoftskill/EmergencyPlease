import React from 'react';

const { NavigationContainer } = require("@react-navigation/native")
const { routeStack, authStack } = require("./Routes")


export const Navigator = () =>{
    return (
        <NavigationContainer>
            {/* {routeStack()} */}
            {authStack()}
        </NavigationContainer>
    )
}