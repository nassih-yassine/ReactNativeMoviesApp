import { Image, StyleSheet, View, Pressable } from "react-native";
import React, {useState,useEffect} from "react";
import { useNavigation } from "@react-navigation/native";

export default function SingleMovieCard({ item, type}) {
  const navigation = useNavigation();
  
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("SingleMovieDescription", {
          movie : item,
          type : type
        })
      }}
    >
      <Image
        style={styles.image}
        source={{
          uri: "https://image.tmdb.org/t/p/w300" + item.poster_path,
        }}
      />

    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 180,
    backgroundColor: "gray",
    borderRadius: 5,
    margin: 2,
  },
});
