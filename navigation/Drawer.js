import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useCart } from "../screens/CartContext";

const backgroundColor = "#2196f3";

//importing drawer screens
import Product from "../screens/Product";
const Drawer = createDrawerNavigator();

export default function DrawerScreen() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Product"
        component={Product}
        options={({ navigation }) => ({
          headerTintColor: "white",
          headerShown: true,
          title: "Product",
          headerStyle: { backgroundColor: "#2196f3" },
          drawerIcon: ({ focused }) => (
            <Icon
              name="product-hunt"
              size={20}
              color={focused ? "#0cee98" : "#007bc1"}
            />
          ),
          headerRight: () => {
            const { cartItems } = useCart(); // Get cart count

            return (
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <View style={{ marginRight: 15 }}>
                  {/* Cart Icon */}
                  <Icon name="shopping-cart" size={24} color="white" />

                  {/* Cart Count Badge */}
                  {cartItems.length > 0 && (
                    <View
                      style={{
                        position: "absolute",
                        right: -6,
                        top: -5,
                        backgroundColor: "red",
                        borderRadius: 10,
                        width: 18,
                        height: 18,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        {cartItems.length}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          },
        })}
      />
    </Drawer.Navigator>
  );
}

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [user, setuserName] = useState(null);
  const readData = async () => {
    const userName = await AsyncStorage.getItem("userEmail");
    console.log("userName", userName);
    setuserName(userName);
  };
  useEffect(() => {
    readData();
  }, [isFocused]);
  const logout = () => {
    AsyncStorage.getAllKeys().then((keys) => AsyncStorage.multiRemove(keys));
    navigation.navigate("Login");
  };
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../assets/images/blankUser.png")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 55,
              marginTop: 10,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: 14,
              color: "#4E5050",
              textAlign: "center",
              marginTop: 2,
            }}
          >
            Welcome {user}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}>
          <View
            style={{
              backgroundColor: "#2196f3",
              height: 0.8,
              flex: 1,
              alignSelf: "center",
            }}
          />
        </View>
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity onPress={() => logout()}>
        <View style={{ backgroundColor: "#2196f3", height: 30, marginTop: 10 }}>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              textAlign: "center",
              color: "white",
              position: "relative",
              top: 5,
            }}
          >
            Logout
          </Text>
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};
