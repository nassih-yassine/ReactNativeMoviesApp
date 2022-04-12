import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  StatusBar,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import HomePageList from "../components/HomePageList";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/firebase";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [userLogedIn, setUserLogedIn] = useState(false);
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
        setUserLogedIn(false);
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLogedIn(true);
      }
    });
  }, [userLogedIn]);

  //Urls
  const POPULAR_MOVIES =
    "https://api.themoviedb.org/3/movie/popular?api_key=a9bb0de657be8be618a98bb9d2e14309&language=en-US&page=1";
  const TOP_RATED =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=a9bb0de657be8be618a98bb9d2e14309&language=en-US&page=1";
  const TRENDING_NOW =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=a9bb0de657be8be618a98bb9d2e14309";
  const UPCOMING =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=a9bb0de657be8be618a98bb9d2e14309&language=en-US&page=1";
  const POPULAR_TV =
    "https://api.themoviedb.org/3/tv/popular?api_key=a9bb0de657be8be618a98bb9d2e14309&language=en-US&page=1";
  const LATEST_TV =
    "https://api.themoviedb.org/3/tv/top_rated?api_key=a9bb0de657be8be618a98bb9d2e14309&language=en-US&page=1";
  //End urls

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topButtons}>
        {userLogedIn ? (
          <Button title="logout" onPress={handleSignOut} />
        ) : (
          <>
            <Button
              title="login"
              onPress={() => navigation.navigate("Login")}
            />
            <Button
              title="register"
              onPress={() => navigation.navigate("Register")}
            />
          </>
        )}
      </View>

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
          onPress={() => {
            search === ""
              ? console.log("empty")
              : navigation.navigate("SearchPage", {
                  keyword: search,
                });
          }}
          size={20}
        />
      </View>
      <View>
        <HomePageList url={POPULAR_MOVIES} type="movie" title="Most Popular" />
      </View>
      <View>
        <HomePageList url={TRENDING_NOW} type="movie" title="Trending Now" />
      </View>
      <View>
        <HomePageList url={TOP_RATED} type="movie" title="Top Rated" />
      </View>
      <View>
        <HomePageList url={UPCOMING} type="movie" title="Up Coming" />
      </View>
      <View>
        <HomePageList url={POPULAR_TV} type="tv" title="Popular Tv Show" />
      </View>
      <View>
        <HomePageList url={LATEST_TV} type="tv" title="Top Rated Tv Show" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 5,
    paddingTop: StatusBar.currentHeight,
  },
  textInputContainer: {
    flexDirection: "row",
    marginVertical: 2,
    flex: 1,
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
  headText: {
    fontWeight: "700",
    fontSize: 20,
  },
  indigoText: {
    color: "#3730A3",
  },
  topButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});
