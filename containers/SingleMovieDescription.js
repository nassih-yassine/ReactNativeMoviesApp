import {
  View,
  ScrollView,
  Text,
  Image,
  Button,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import HomePageList from "../components/HomePageList";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/firebase";

export default function SingleMovieDescription({ route }) {
  const id = "" + route.params.movie.id;
  const type = route.params.type;
  const navigation = useNavigation()
  //const SIMILAR_URL = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=a9bb0de657be8be618a98bb9d2e14309&language=en-US&page=1`;
  //const RECOMMENDATION_URL = `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=a9bb0de657be8be618a98bb9d2e14309&language=en-US&page=1`;

  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similar, setSimilar] = useState("")
  const [recommendation, setRecommendation] = useState("")

  useEffect(() => {
    console.log(id)
    setSimilar(`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=a9bb0de657be8be618a98bb9d2e14309&language=en-US&page=1`)
    setRecommendation( `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=a9bb0de657be8be618a98bb9d2e14309&language=en-US&page=1`)
    async function fetchDescription() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=a9bb0de657be8be618a98bb9d2e14309&language=en-US`
      );
      setGenres([])
      setGenres(data.genres);
      setLoading(false);
    }
    auth.onAuthStateChanged(user => {
      if (!user) {
        navigation.replace("Home")
      }
    })
    fetchDescription();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        barStyle="light-content"
        hidden={false}
        translucent={true}
        animated={true}
        backgroundColor="transparent"
      />
      <View>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://image.tmdb.org/t/p/w300" + route.params.movie.poster_path,
          }}
        />
        
      </View>
      {/** */}
      <View style={styles.infoContainer}>
        <View style={styles.uper}>
          {loading ? (
            <></>
          ) : route.params.movie.adult == "true" ? (
            <View style={styles.votesContainer}>
              <Text style={styles.votesText}>+18</Text>
            </View>
          ) : (
            <></>
          )}
          {loading ? (
            <></>
          ) : (
            //replace it with a scroll view
            genres.map((elem) => (
              <View style={styles.votesContainer} key={elem.id}>
                <Text style={styles.votesText}>{elem.name}</Text>
              </View>
            ))
          )}

          <View style={styles.votesContainer}>
            <Text style={styles.votesText}>
              <Icon name="star" size={10} color="#FACC15" />
              {route.params.movie.vote_average}
            </Text>
          </View>
        </View>
        {/** */}
        {route.params.movie.original_title ? (
          route.params.movie.original_title === route.params.movie.title ? (
            <Text style={styles.titleText}>{route.params.movie.title}</Text>
          ) : (
            <View>
              <Text style={styles.titleText}>{route.params.movie.title}</Text>
              <Text style={styles.subTitleText}>
                {route.params.movie.original_title}
              </Text>
            </View>
          )
        ) : route.params.movie.original_name === route.params.movie.name ? (
          <Text style={styles.titleText}>{route.params.movie.name}</Text>
        ) : (
          <View>
            <Text style={styles.titleText}>{route.params.movie.name}</Text>
            <Text style={styles.subTitleText}>
              {route.params.movie.original_name}
            </Text>
          </View>
        )}
        {/** */}
        {route.params.movie.release_date ? (
          <Text style={styles.date}>Released: {route.params.movie.release_date}</Text>
        ) : (
          <Text style={styles.date}>First air time: {route.params.movie.first_air_date}</Text>
        )}
        {/** */}
        <View style={styles.overview}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.overviewText}>{route.params.movie.overview}</Text>
        </View>
        
        {
          loading ? <></>:
          <>
          {/**Similar movies */}
          <HomePageList url={similar} type={type} title="Similar" />
          {/**Recomendation */}
          <HomePageList
            url={recommendation}
            type={type}
            title="Recommendations"
          /></>
        }
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {},
  uper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  infoContainer: {
    padding: 10,
  },
  votesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#374151",
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  votesText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 10,
  },
  titleText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 20,
  },
  subTitleText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 15,
    alignItems: "center",
  },
  overview: {
    paddingVertical: 20,
    flex: 1,
  },
  overviewTitle: {
    color: "#3730A3",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
  },
  overviewText: {
    fontWeight: "600",
    fontSize: 14,
  },
  image: {
    width: Dimensions.width,
    height: 580,
    backgroundColor: "gray",
  },
  date :{
    fontSize : 10
  },
});
