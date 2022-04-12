import { FlatList } from "react-native";
import React from "react";
import SingleMovieCard from "./SingleMovieCard";

export default function SearchPageList({ items,type }) {    
  return (
    <FlatList
      numColumns={4}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <SingleMovieCard type={type} item={item} />}
    />
  );
}
