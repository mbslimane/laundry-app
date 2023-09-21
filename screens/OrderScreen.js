import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const OrderScreen = () => {
  return (
    <SafeAreaView style={{flex: 1 ,justifyContent:'center', alignItems:'center'}}>
      <Text>Your order passed seccessfully</Text>
    </SafeAreaView>
  )
}

export default OrderScreen