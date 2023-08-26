import {
  StyleSheet,
  Text,
  SafeAreaView,
  Alert,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Carousel from "../component/Carousel";
import Services from "../component/Services";
import Dressitem from "../component/Dressitem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
//   console.log(cart);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "we are loading your location"
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services are not enabled",
        "Please enable the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow the app to access location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("console pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => console.log("Ok pressed"),
          },
        ]
      );
    }
    const { coords } = await Location.getCurrentPositionAsync();

    // console.log(coords)
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // console.log (response)
      for (let item of response) {
        let address = `${item.street} ${item.city} `;
        setDisplayCurrentAddress(address);
      }
    }
  };

  const product = useSelector((state) => state.product.product);

  const dispatch = useDispatch();

  useEffect(() => {
    if (product.length > 0) return;  

    const fetchProducts = () => {
      services.map((service) => dispatch(getProducts(service)));
    }; 
    fetchProducts();
  }, []);
  
//   console.log(product)    

  const services = [
    {
      id: 1,
      name: "T-shirts",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgwKetFrrEjifk3j56E06IBizAyNt3_RNNXw&usqp=CAU",
      quantity: 0,
      price: 200,
    },
    {
      id: 2,
      name: "Jeans",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPm3VwhCKXJFgSi_q_fATylJqVGp2VdaEeig&usqp=CAU",
      quantity: 0,
      price: 200,
    },
    {
      id: 3,
      name: "Under-Wear",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE4x4QQuN_ya8P9U7K_VI2nW4u-chu5DJkEOpB8UVJDNxxN3wBI6xBvbLTDa0gIKSdIZg&usqp=CAU",
      quantity: 0,
      price: 200,
    },
    {
      id: 4,
      name: "Dresse",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaCsPTP6Yur2AbNP0gztrzyfjwQX0joO2_xXbhkbg3Y7FMREvmVImDJJup6e5mLa0gDZw&usqp=CAU",
      quantity: 0,
      price: 200,
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: "#f0f0f0", flex: 1, marginTop: 25 }}>
      {/* Location and Profile */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Ionicons
          style={{ color: "#fd5c63" }}
          name="location-outline"
          size={30}
          color="black"
        />
        <View style={{ paddingLeft: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
          <Text>{displayCurrentAddress}</Text>
        </View>
        <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{
              uri: "https://lh3.googleusercontent.com/a/AAcHTtdu8KyZKYlmgmHrKzAK7w8Gdznq58A_7fEmurkTTn2LwJg=s288-c-no",
            }}
          />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View
        style={{
          margin: 10,
          //   marginBottom:-10,
          padding: 10,
          flexDirection: "row",
          borderWidth: 0.5,
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 5,
          borderColor: "#C0C0C0",
        }}
      >
        <TextInput
          placeholder="Search for Items "
          style={{ display: "flex" }}
        />
        <AntDesign
          style={{ display: "flex" }}
          name="search1"
          size={20}
          color="#fd5c63"
        />
      </View>
      <Carousel />
      <Services />
      {product.map((item, index) => (
        <Dressitem item={item} key={index} />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
