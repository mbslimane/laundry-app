import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PickUpscreen from './screens/PickUpscreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';


const StackNavigator = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name="PickUp" component={PickUpscreen} options={{headerShown:false}}/>
      <Stack.Screen name="Cart" component={CartScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Order" component={OrderScreen} options={{headerShown:false}}/>
      {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})