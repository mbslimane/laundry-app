import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Services = () => {

    const services = [
        {
            id: "0",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6QlwGcyHOeXABy_Tl76xhz8l50rca6Z4s0Q&usqp=CAU",
            name: "Washing"

        },
        {
            id: "1",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6QlwGcyHOeXABy_Tl76xhz8l50rca6Z4s0Q&usqp=CAU",
            name: "Laundry"

        },
        {
            id: "2",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_7gnAciQ0Lz3S-X0yu1WsUZMaMM9oiCVM7DaNBxhXWwGjLNkSYUTvshvssUHVnBXbTTg&usqp=CAU",
            name: "wash & Iron"

        },
        {
            id: "3",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6QlwGcyHOeXABy_Tl76xhz8l50rca6Z4s0Q&usqp=CAU",
            name: "Shoses"

        },
        {
            id: "4",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_7gnAciQ0Lz3S-X0yu1WsUZMaMM9oiCVM7DaNBxhXWwGjLNkSYUTvshvssUHVnBXbTTg&usqp=CAU",
            name: "Carpet"

        }

    ]


  return (
    <View>
        <Text style={{ fontSize:16, fontWeight:"500" ,marginBottom:7}}>Services available</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        {services.map((service,index) => (
            <Pressable style={{margin:10 , backgroundColor:"white", padding:20, borderRadius:7}} key={index}>
                <Image source={{uri:service.image}} style={{width:70, height:70}} />
                <Text style={{textAlign:'center', marginTop:6}}>{service.name}</Text>
            </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({})