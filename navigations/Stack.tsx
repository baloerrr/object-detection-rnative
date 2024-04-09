import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/PredictScreen";
import BottomBar from "./BottomBar";

const StackNavigator = createNativeStackNavigator();

function Stack() {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigator.Screen name="Home" component={BottomBar} />
      <StackNavigator.Screen name="About" component={AboutScreen} />
    </StackNavigator.Navigator>
  );
}

export default Stack;
