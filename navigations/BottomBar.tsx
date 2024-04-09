import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/PredictScreen";
import { Platform, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const BottomTabNavigator = createBottomTabNavigator();

export default function BottomBar() {
  return (
    <BottomTabNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabelStyle: styles.label,
        tabBarStyle: [
          styles.tabContainer,
          Platform.OS === "android" && {
            shadowOffset: { height: -2, width: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
          },
        ],
        tabBarItemStyle: {
          marginBottom: 7,
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "#0071ff",
      }}
      safeAreaInsets={{
        bottom: 0,
      }}
    >
      <BottomTabNavigator.Screen
        name="Beranda"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={22}
              color={focused ? "#0071ff" : "gray"}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="message1"
              size={21}
              color={focused ? "#0071ff" : "gray"}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Akun"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={22}
              color={focused ? "#0071ff" : "gray"}
            />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    width: "90%",
    borderRadius: 12,
    left: "5%",
    bottom: 20,
    backgroundColor: "white",
    height: 60,
  },
  label: {
    fontSize: 12,
  },
});
