import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { CartProvider } from "./screens/CartContext"; // Import Cart Provider

// Importing navigation of app
import StackScreen from "./navigation/Stack";

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <StackScreen />
        <Toast />
      </NavigationContainer>
    </CartProvider>
  );
}
