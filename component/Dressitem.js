import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity } from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";

const Dressitem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const product = useSelector((state) => state.product.product);
  const addItemToCart = () => {
    dispatch(addToCart(item)) //cart
    dispatch(incrementQty(item)) //product
    dispatch(incrementQuantity(item)) //cart
  };

  return (
    <View>
      <Pressable style={styles.pressable}>
        <View>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price} DZD</Text>
        </View>

        {cart.some((c) => c.id === item.id) ? (
          <View>
            <Pressable style={styles.addContainer}>
              <Pressable style={styles.increaseB}>
                <Text
                onPress={() => {
                  dispatch(decrementQty(item))
                  dispatch(decrementQuantity(item))
                }}                
                style={styles.increaseT}>-</Text>
              </Pressable>
              <Pressable >
                <Text style={styles.quantity} >{item.quantity}</Text>
              </Pressable>
              <Pressable onPress={() => {
                dispatch(incrementQty(item))
                dispatch(incrementQuantity(item))
                }} style={styles.increaseB}>
                <Text style={styles.increaseT}>+</Text>
              </Pressable>
            </Pressable>
          </View>
        ):(
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text style={styles.addButton}>add</Text>
          </Pressable>
        ) }
      </Pressable>
    </View>
  );
};

export default Dressitem;

const styles = StyleSheet.create({
  pressable: {
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
    width: 80,
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 7,
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

  increaseT:{
    fontSize:20,
    color:"#088F8F",
    paddingHorizontal:6,
    fontWeight:"600",
    textAlign:"center",
  },

  quantity: {
    fontSize:19,
    color:"#088F8F",
    paddingHorizontal:8,
    fontWeight:"600"
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
