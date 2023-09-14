import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PickUpscreen from './screens/PickUpscreen';
import CartScreen from './screens/CartScreen';


const StackNavigator = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name="PickUp" component={PickUpscreen} options={{headerShown:false}}/>
      <Stack.Screen name="Cart" component={CartScreen} options={{headerShown:false}}/>
      {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})