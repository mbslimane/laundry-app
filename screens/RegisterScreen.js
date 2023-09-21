import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVsbl, setIsVsbl] = useState(false);
  const navigation = useNavigation();

  const showPassWord = () => {
    isVisible=== true ? setIsVisible(!isVisible)  : setIsVisible(!isVisible)
  };
  const showPsWrd = () => {
    isVsbl === true ? setIsVsbl(!isVsbl) : setIsVsbl(!isVsbl)
  };

  const CheckInfo =() => {
    if(email.length==0 || phoneNumber.length != 10 || password !== confirmPassword ){
        Alert.alert("Please fill all the fields correctly"), [
            {
              text: "OK",
              onPress: () => console.log("Ok pressed"),
            },
          ]
    }

    createUserWithEmailAndPassword(auth, email, password).then((userCredential) =>{
      console.log('user credential..............................', userCredential);
      const user = userCredential._tokenResponse.email;
      const myUserUId = auth.currentUser.uid;

      setDoc(doc(db,"users",`${myUserUId}`),{
        email:user,
        phone:phoneNumber,
      })
    })
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", margin: 10 }}>
        
      <KeyboardAvoidingView>
        <View
          style={{ padding: 20, backgroundColor: "white", borderRadius: 15 }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                padding: 10,
                fontSize: 20,
                fontWeight: "bold",
                color: "purple",
              }}
            >
              Register
            </Text>
            <Text style={{ fontSize: 16 }}>Create a new account</Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
              padding={10}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                marginLeft: 10,
                fontSize: 16,
                flex: 1,
                borderBottomWidth: 0.7,
                borderBottomColor: "gray",
              }}
            />
          </View>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <AntDesign name="phone" size={24} padding={10} color="black" />
            <TextInput
              placeholder="Phone number"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              style={{
                marginLeft: 10,
                fontSize: 16,
                flex: 1,
                borderBottomWidth: 0.7,
                borderBottomColor: "gray",
              }}
            />
          </View>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <Ionicons
              name="md-key-outline"
              size={24}
              color="black"
              padding={10}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={isVisible}
              style={{
                marginLeft: 10,
                fontSize: 16,
                flex: 1,
                borderBottomWidth: 0.7,
                borderBottomColor: "gray",
              }}
            />
            <Pressable onPress={() => showPassWord()}>
              {(isVisible == true )? (
                <Ionicons name="ios-eye-off-outline" size={24} color="black" />
              ) : (
                <Ionicons name="ios-eye-outline" size={24} color="black" />
              )}
            </Pressable>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <Ionicons
              name="md-key-outline"
              size={24}
              color="black"
              padding={10}
            />
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={isVsbl}
              style={{
                marginLeft: 10,
                fontSize: 16,
                flex: 1,
                borderBottomWidth: 0.7,
                borderBottomColor: "gray",
              }}
            />
            <Pressable onPress={() => showPsWrd()}>
              {(isVsbl == true )? (
                <Ionicons name="ios-eye-off-outline" size={24} color="black" />
              ) : (
                <Ionicons name="ios-eye-outline" size={24} color="black" />
              )}
            </Pressable>
          </View>

          <Pressable
          onPress={() =>{CheckInfo()}}
            style={{
              margin: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                backgroundColor: "#318ce7",
                paddingVertical: 20,
                paddingHorizontal: 60,
                color: "white",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
              Already have an acount ? Login
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
