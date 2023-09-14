import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { decrementQty, incrementQty } from "../ProductReducer";
import { decrementQuantity, incrementQuantity } from "../CartReducer";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  return (
    <ScrollView style={{ backgroundColor: "#f0f0f0" }}>
      <View style={{ marginTop: 50, margin: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
          <Text>Your Bucket</Text>
        </View>

        <Pressable
          style={{
            backgroundColor: "white",
            marginVertical: 10,
            padding: 14,
            borderRadius: 12,
          }}
        >
          {cart.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems:"center",
                justifyContent: "space-between",
                margin: 12,
              }}
            >
              <Text style={styles.itemName}>{item.name}</Text>
              <Pressable>
              <View>
                <Pressable style={styles.addContainer}>
                  <Pressable style={styles.increaseB}>
                    <Text
                      onPress={() => {
                        dispatch(decrementQty(item));
                        dispatch(decrementQuantity(item));
                      }}
                      style={styles.increaseT}
                    >
                      -
                    </Text>
                  </Pressable>
                  <Pressable>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      dispatch(incrementQty(item));
                      dispatch(incrementQuantity(item));
                    }}
                    style={styles.increaseB}
                  >
                    <Text style={styles.increaseT}>+</Text>
                  </Pressable>
                </Pressable>
              </View>
              </Pressable>
              <Text style={{width:80, fontSize: 16, fontWeight: "500" }}>
                DZD {item.price * item.quantity}
              </Text>
            </View>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  pressableItem: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 14,
  },

  image: { width: 70, height: 70 },

  itemName: {
    width:85,
    fontSize: 16,
    fontWeight: "500",
    // backgroundColor:"red",
  },

  itemPrice: {
    width: 80,
    fontSize: 15,
    color: "gray",
  },

  addContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width:100,
  },

  increaseB: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: "#BEBEBE",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignContent: "center",
  },

  increaseT: {
    fontSize: 20,
    color: "#088F8F",
    paddingHorizontal: 6,
    fontWeight: "600",
    textAlign: "center",
  },

  quantity: {
    fontSize: 19,
    color: "#088F8F",
    paddingHorizontal: 8,
    fontWeight: "600",

  },

  addButton: {
    borderColor: "gray",
    borderWidth: 0.8,
    marginVertical: 10,
    color: "#088f8f",
    textAlign: "center",
    padding: 5,
    borderRadius: 4,
    fontSize: 17,
    fontWeight: "bold",
  },
});
