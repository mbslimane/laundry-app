import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { decrementQty, incrementQty } from "../ProductReducer";
import { decrementQuantity, incrementQuantity } from "../CartReducer";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  return (
    <>
      <ScrollView style={{ backgroundColor: "#f0f0f0" }}>
        {total === 0 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ marginTop: 40 }}> Your cart is Empty</Text>
          </View>
        ) : (
          <View style={{ marginTop: 50, margin: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons onPress={() => navigation.goBack()}   name="arrow-back-outline" size={24} color="black" />
              <Text>Your Bucket</Text>
            </View>

            <Pressable
              style={{
                backgroundColor: "white",
                marginVertical: 10,
                borderRadius: 12,
              }}
            >
              {cart.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 12,
                    paddingLeft: 10,
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
                  <Text style={{ width: 80, fontSize: 16, fontWeight: "500" }}>
                    DZD {item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </Pressable>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Billing details
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  marginVertical: 10,
                  padding: 10,
                  borderRadius: 12,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ color: "gray", fontSize: 16 }}>
                    Items Total
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    DZD {total}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ color: "gray", fontSize: 16 }}>
                    Dlivery Fee | 1.2KM
                  </Text>
                  <Text
                    style={{
                      color: "#088f8f",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    FREE
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 5,
                    borderBottomWidth: 0.7,
                    borderBottomColor: "gray",
                    paddingBottom: 10,
                  }}
                >
                  <Text style={{ color: "gray", fontSize: 16 }}>
                    Free Delivery on Your order
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ color: "gray", fontSize: 16 }}>
                    Selected Date
                  </Text>
                  <Text
                    style={{
                      color: "#088f8f",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    {route.params.pickUpDate[0]}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ color: "gray", fontSize: 16 }}>
                    N° Of days
                  </Text>
                  <Text
                    style={{
                      color: "#088f8f",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    {route.params.no_of_days}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 5,
                    borderBottomWidth: 0.7,
                    borderBottomColor: "gray",
                    paddingBottom: 10,
                  }}
                >
                  <Text style={{ color: "gray", fontSize: 16 }}>
                    Selected Pick Up Time
                  </Text>
                  <Text
                    style={{
                      color: "#088f8f",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    {route.params.selectedTime}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    To Pay
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {" "}
                    DZD {total + 200}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            margin: 15,
            marginTop: 0,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length} items | {total} DZD
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              Extra charges might apply
            </Text>
          </View>

          <Pressable onPress={() => navigation.navigate("")}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Place Order
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
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
    // margin: 14,
  },

  image: { width: 70, height: 70 },

  itemName: {
    width: 100,
    fontSize: 16,
    fontWeight: "500",
  },

  itemPrice: {
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
