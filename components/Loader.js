import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Modal } from 'react-native';

const Loader = ({ visible = false, text = "Loading...", size = "large", color = "#3498db" }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size={size} color={color} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark semi-transparent background
  },
  loaderBox: {
    width: 120,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // Shadow effect
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
});

export default Loader;
