import {
  ActivityIndicator,
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(()=>{
    setLoading(true)
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(!authUser){
        setLoading(false)
      }
      if(authUser){
        navigation.navigate("Home")
        // setLoading(false)
      }
    });
    return unsubscribe;
  },[])

  const login = () => {
    signInWithEmailAndPassword(auth,email,password).then((userCredential) =>{
      console.log("...............",userCredential)
      const user = userCredential.user;
      console.log("user details", user)
    })
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", margin: 10 }}>
      {loading? (
        <View style={{justifyContent:"center", alignItems:"center",flexDirection:"row"}}>
          <ActivityIndicator size={50} color={"red"}/>
          <Text style={{fontSize:18, fontWeight:"bold",paddingLeft:20}}>Loading, please wait</Text>
        </View>
      ):(
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
              Sign In{" "}
            </Text>
            <Text style={{ fontSize: 16 }}>Sign In To Your account</Text>
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
              secureTextEntry={true}
              style={{
                marginLeft: 10,
                fontSize: 16,
                flex: 1,
                borderBottomWidth: 0.7,
                borderBottomColor: "gray",
              }}
            />
          </View>

          <Pressable
            style={{
              margin: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              onPress={() => login()}
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
              Login
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
              Don't have an acount ? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      )}
    </SafeAreaView>
    
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
