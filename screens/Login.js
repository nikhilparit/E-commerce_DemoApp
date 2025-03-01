import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Please enter both email / user name and password",
      });
      return;
    }

    try {
      await AsyncStorage.setItem("userEmail", email); // Save email to storage
      navigation.navigate("Drawer", { screen: "Product" }); // Navigate to Product page inside Drawer
    } catch (error) {
      Toast.show({ type: "error", text1: "Failed to save email" });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: { width: 300, height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, paddingHorizontal: 15, backgroundColor: "white", marginBottom: 15 },
  loginButton: { width: 300, height: 50, backgroundColor: "#4A90E2", justifyContent: "center", alignItems: "center", borderRadius: 10 },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default Login;
