import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const ProductDetails = ({ route }) => {
  const { product } = route.params; // Get product details passed from navigation

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹ {product.price} /-</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#F5F5F5", // Light gray background
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: width * 0.9, // Responsive card width
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Shadow for Android
  },
  image: {
    width: width * 0.35, // Small-sized image
    height: width * 0.35, // Maintain aspect ratio
    resizeMode: "contain",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: "#E63946",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    lineHeight: 20,
  },
});

export default ProductDetails;
