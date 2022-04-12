import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleMovieCard from "./SingleMovieCard";
import Loading from "./Loading";

export default function HomePageList({ url, title, type }) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const { data } = await axios.get(url);
      setMovies([...data.results]);
      setLoading(false);
    }
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <View>
          {movies.length === 0 ? (
            <></>
          ) : (
            <View style={styles.topContainer}>
              <Text style={styles.headText}>{title}</Text>
            </View>
          )}
          <View style={styles.imagesContainer}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={movies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <SingleMovieCard type={type} item={item} />
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  imagesContainer: {
    flexDirection: "row",
  },
  headText: {
    fontWeight: "700",
    fontSize: 20,
    color: "#3730A3",
  },
  topContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  showMore: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 10,
    marginRight: 15,
  },
});
