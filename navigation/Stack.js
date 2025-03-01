import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//importing screen
import DrawerScreen from "./Drawer";
import Splash from "../screens/Splash";
import Login from "../screens/Login";
import ProductDetails from "../screens/ProductDetails";
import Cart from "../screens/Cart";

const Stack = createNativeStackNavigator();

export default function StackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
       <Stack.Screen name="Drawer" component={DrawerScreen} />
       <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerTintColor: "white",
          headerShown: true,
          title: "Product Details",

          headerStyle: {
            backgroundColor: "#2196f3",
          },
        }}
      />
       <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerTintColor: "white",
          headerShown: true,
          title: "Cart",

          headerStyle: {
            backgroundColor: "#2196f3",
          },
        }}
      />
    </Stack.Navigator>
  );
}
