import React from 'react';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetCountry from '../screens/getCountry';
import CountryDetails from '../screens/countryDetails';

const Stack = createNativeStackNavigator();

const CountryStack = () => {
    return (
        <Stack.Navigator initialRouteName="getCountry">
            <Stack.Screen name="getCountry" component={GetCountry} />
            <Stack.Screen name="countryDetails" component={CountryDetails} />
        </Stack.Navigator>
    )
}

export default CountryStack;