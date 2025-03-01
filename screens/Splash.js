import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";

const Splash = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={{ uri: "https://yourlogo.com/logo.png" }} 
        style={[styles.logo, { opacity: fadeAnim }]} 
      />
      <Text style={styles.text}>Welcome to MyApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A90E2",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default Splash;
