import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CartScreen from "./CartScreen";

const PickUpscreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivry, setDelivery] = useState([]);
  const delivryTime = [
    {
      id: "0",
      name: "Tommorrow ",
    },
    {
      id: "1",
      name: "2-3 Days",
    },
    {
      id: "2",
      name: "3-4 Days",
    },
    {
      id: "3",
      name: "4-5 Days",
    },
    {
      id: "4",
      name: "5-6 Days",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "11:00 PM",
    },
    {
      id: "2",
      time: "18:00 PM",
    },
    {
      id: "3",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];
  const navigation = useNavigation();
  const proceedToCart = () => {
    if(!selectedDate || !selectedTime || !delivry){
      const createTwoButtonAlert = () =>
      Alert.alert('Empty Or Invalid', 'Please select all the fields', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      createTwoButtonAlert()
    }

    if(selectedDate && selectedTime && delivry){
      navigation.replace("Cart")
    }
  }
  return (
    <>
    <SafeAreaView>
      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
        Enter Address
      </Text>
      <TextInput
        style={{
          padding: 40,
          borderColor: "gray",
          borderWidth: 0.7,
          paddingVertical: 80,
          borderRadius: 9,
          margin: 10,
        }}
      />
      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
        Pick Up Date
      </Text>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date("2023-09-12")}
        endDate={new Date("2023-09-22")}
        initialSelectedDate={new Date("2020-08-22")}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      />

      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
        Select Time
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {times.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => selectedTime === item.id? setSelectedTime([]) : setSelectedTime(item.id) }
            style={
              selectedTime.includes(item.id)
                ? {
                    margin: 10,
                    borderRadius: 7,
                    padding: 15,
                    borderColor: "red",
                    borderWidth: .7,
                    paddingHorizontal:50,
                  }
                : {
                    margin: 10,
                    borderRadius: 7,
                    padding: 15,
                    borderColor: "gray",
                    borderWidth: .7,
                  }
            }
          >
            <Text>{item.time}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
      Delivery Date
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {delivryTime.map((item, i) => (
          <Pressable
            key={i}
            onPress={() => delivry===item.name ? setDelivery([]): setDelivery(item.name) }
            // onPress={() => setDelivery(item.name)}
            style={delivry.includes(item.name) ? {
              margin: 10,
              borderRadius: 7,
              padding: 15,
              borderColor: "red",
              borderWidth: .7,
              paddingHorizontal:50,         
              
            }
          : {
              margin: 10,
              borderRadius: 7,
              padding: 15,
              borderColor: "gray",
              borderWidth: 0.7,
            }}
          >
            <Text>{item.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>

    
     {total === 0 ? null : (
      <Pressable
        style={{
          backgroundColor: "#088F8F",
          padding: 10,
          marginTop:"auto",
          marginBottom: 40,
          margin: 15,
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

        <Pressable onPress={proceedToCart} >
          <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
            Preceed to Cart
          </Text>
        </Pressable>
      </Pressable>
    )}
  </>
  );
};

export default PickUpscreen;

const styles = StyleSheet.create({});
