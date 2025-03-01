import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../screens/CartContext"; // Import Cart Context

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 20;

export default function Product() {
  const navigation = useNavigation();
  const { addToCart } = useCart(); // Get addToCart function from context
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://fakestoreapi.in/api/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Loader visible={loading} text="Fetching products..." />
      {!loading && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.productPrice}>₹ {item.price} /-</Text>

              {/* Buttons Section */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => navigation.navigate("ProductDetails", { product: item })}
                >
                  <Text style={styles.buttonText}>Info</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cartButton}
                  onPress={() => addToCart(item)} // Add item to cart
                >
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { justifyContent: "space-between", paddingHorizontal: 10 },
  productCard: {
    width: CARD_WIDTH,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    alignItems: "center",
  },
  productImage: { width: "100%", height: 120, resizeMode: "contain", borderRadius: 8 },
  productTitle: { fontSize: 14, fontWeight: "600", marginTop: 5, textAlign: "center" },
  productPrice: { fontSize: 16, color: "#2E8B57", fontWeight: "bold", marginTop: 5 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10, width: "100%" },
  infoButton: { flex: 1, backgroundColor: "#FFA500", paddingVertical: 8, borderRadius: 5, alignItems: "center", marginRight: 5 },
  cartButton: { flex: 1, backgroundColor: "#2E8B57", paddingVertical: 8, borderRadius: 5, alignItems: "center", marginLeft: 5 },
  buttonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
});
