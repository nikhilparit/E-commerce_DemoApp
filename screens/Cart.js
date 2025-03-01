import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useCart } from "../screens/CartContext";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons"; // For icons
import Toast from "react-native-toast-message";

export default function Cart() {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const navigation = useNavigation();

  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [fullName,setFullName] = useState("");

  // Calculate Grand Total
  const grandTotal = cartItems.reduce((total, item) => total + item.price, 0);

  const handleBuyNow = () => {
    setShowForm(true);
  };

  const handleContinue = () => {
    if (!address || !mobile ||!fullName) {
      Toast.show({
             type: "error",
             text1: "Please fill all fields.",
           });
      return;
    }
     Toast.show({
            type: "success",
            text1: "Success",
            text2:"Order placed successfully!"
          });
    clearCart();
    navigation.navigate("Drawer", { screen: "Product" });
  };

  const handleDeleteItem = (id) => {
    removeFromCart(id);
  };

  return (
    <View style={styles.container}>
      {/* Header with Shopping Cart Icon */}
      <View style={styles.header}>
        <MaterialIcons name="shopping-cart" size={28} color="black" />
        <Text style={styles.title}>Shopping Cart</Text>
      </View>

      {/* Cart List */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemText}>{item.title}</Text>
              <Text style={styles.price}>₹ {item.price} /-</Text>
            </View>
            {/* Delete Icon */}
            <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Grand Total */}
      <Text style={styles.total}>Grand Total: ₹ {grandTotal} /-</Text>

      {/* Buy Now Button */}
      {!showForm && cartItems.length > 0 && (
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      )}

      {/* Address Form */}
      {showForm && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>Enter Your Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Full name"
            keyboardType="phone-pad"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Address"
            multiline
            value={address}
            onChangeText={setAddress}
          />

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
  
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  title: { fontSize: 22, fontWeight: "bold", marginLeft: 10 },

  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  itemDetails: {
    flex: 1,
  },
  itemText: { fontSize: 16, fontWeight: "500" },
  price: { fontSize: 16, fontWeight: "bold", color: "#2E8B57" },

  total: { fontSize: 18, fontWeight: "bold", marginVertical: 10, textAlign: "right" },

  buyNowButton: {
    backgroundColor: "#007bc1",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },

  form: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    marginTop: 10,
  },
  formTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  continueButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});


