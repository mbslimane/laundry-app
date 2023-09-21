import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
    const user = auth.currentUser.email ;
    const navgation = useNavigation();
    const signOutUser = () =>{
        signOut(auth).then(() => {
            navgation.replace("Login");
        }).catch(err => {
            console.log(err)
        })
    }
  return (
    <SafeAreaView style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text>welcome {user}</Text>

    <Pressable onPress={signOutUser}>
        <Text style={{paddingVertical:15, paddingHorizontal:25, backgroundColor:'blue' ,color:'white'}}>Sign Out</Text>
    </Pressable>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})