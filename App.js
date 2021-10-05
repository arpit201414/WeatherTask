import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import CountryStack from "./src/navigation/countryStack";

const App = () => {
  return (
    <NavigationContainer>
      <CountryStack />
    </NavigationContainer>
  )
}


export default App;