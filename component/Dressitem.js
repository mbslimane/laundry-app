import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Dressitem = ({ item }) => {
  return (
    <View>
      <Pressable style={styles.pressable}>
        <View>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text  style={styles.itemPrice}>{item.price}  DZD</Text>
        </View>
        <Pressable style={{width:80}}>
            <Text style={styles.addButton}>
                add
            </Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default Dressitem;

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "space-between",
    margin:14
  },

  image: { width: 70, height: 70 },

  itemName:{
    width:80,
    fontSize:17,
    fontWeight:"500",
    marginBottom:7
  },

  itemPrice:{
    width:80,
    fontSize:15,
    color:"gray"
  },

  addButton:{
    borderColor:"gray",
    borderWidth:.8,
    marginVertical:10,
    color:'#088f8f',
    textAlign:"center",
    padding:5,
    borderRadius:4,
    fontSize:17,
    fontWeight:"bold"
  }
});
