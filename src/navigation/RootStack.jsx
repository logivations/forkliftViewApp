import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RouteNames from '../constants/route.names';
import ConnectionScreen from '../screens/ConnectionScreen';
import WebViewScreen from '../screens/WebViewScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={RouteNames.CONNECTION_PROPERTIES} screenOptions={{ headerShown: false }}>
                <Stack.Screen name={RouteNames.CONNECTION_PROPERTIES} component={ConnectionScreen}/>
                <Stack.Screen name={RouteNames.WEB_VIEW} component={WebViewScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;