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
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../firebase"

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  //   console.log(cart);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "we are loading your location"
  );
  const [items, setItems] = useState([]);
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

    const fetchProducts = async () => {
      const colRef = collection(db, 'types');
      const docsSnap = await getDocs(colRef);
      docsSnap.docs.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: "#f0f0f0",
          flex: 1,
          marginTop: 25,
          paddingBottom: 30,
        }}
      >
        {/* Location and Profile */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
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
          <Pressable onPress={()=>navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 7 }}>
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
        <View style={{ paddingBottom: 30 }}>
          {product.map((item, index) => (
            <Dressitem item={item} key={index} />
          ))}
        </View>
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginBottom: 40,
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

          <Pressable onPress={() => navigation.navigate("PickUp")}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Preceed to pick up
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});