import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/8580730/pexels-photo-8580730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/8774448/pexels-photo-8774448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay={0.5}
        // autoPlayInerval={10}
        circleLoop
        doColor={"#13274f"}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
          borderRadius: 6,
          width: "90%",
          margin: 25,
          marginTop:0
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
