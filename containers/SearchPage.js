import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Loading from "../components/Loading";
import axios from "axios";
import SingleMovieCard from "../components/SingleMovieCard";

export default function SearchPage({ route, page_ }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(page_ ? page : 1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    async function fetchSearch() {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=a9bb0de657be8be618a98bb9d2e14309&query=" +
          route.params.keyword +
          "&page=" +
          "" +
          page
      );
      setTotalPages(data.total_pages);
      setResults([...data.results]);
      setLoading(false);
    }
    setSearch(route.params.keyword);
    fetchSearch();
  }, [page]);

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          value={search}
          placeholder="Search..."
          style={styles.textInput}
          onChangeText={(text) => setSearch(text)}
        />
        <Icon.Button
          name="search"
          style={styles.searchBtn}
          backgroundColor="#3730A3"
          onPress={async () => {
            setResults([]);
            setPage(1);
            setLoading(true);
            const { data } = await axios.get(
              "https://api.themoviedb.org/3/search/movie?api_key=a9bb0de657be8be618a98bb9d2e14309&query=" +
                search +
                "&page=" +
                "" +
                page
            );
            setResults([...data.results]);
            setLoading(false);
          }}
          size={20}
        />
      </View>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          ListFooterComponent={
            <View style={styles.bntContainer}>
              {page === 1 ? (
                <></>
              ) : (
                //arrow-left
                <Icon.Button
                  name="arrow-left"
                  style={styles.navBtn}
                  backgroundColor="#3730A3"
                  onPress={() => setPage(page - 1)}
                  size={15}
                />
                //arrow-right
              )}
              {page === totalPages ? (
                <></>
              ) : (
                <Icon.Button
                  name="arrow-right"
                  style={styles.navBtn}
                  backgroundColor="#3730A3"
                  onPress={() => setPage(page + 1)}
                  size={15}
                />
              )}
            </View>
          }
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SingleMovieCard type="movie" item={item} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 5,
  },
  textInputContainer: {
    flexDirection: "row",
    marginVertical: 2,
  },
  searchBtn: {
    borderRadius: 5,
    justifyContent: "center",
    flex: 1,
    color: "#3730A3",
    marginHorizontal: 1,
  },
  textInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 3,
    borderColor: "#1E293B",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 1,
  },
  bntContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  navBtn: {
    flex: 1,
    borderRadius: 10,
  },
});
