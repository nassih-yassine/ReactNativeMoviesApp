import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [userLogedIn, setUserLogedIn] = useState(false)
  const navigation = useNavigation()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home")
      }
    });
  }, [userLogedIn]);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, pw)
      .then(userCredentials => {
        const user = userCredentials.user;
        navigation.navigate("Home")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign in</Text>
  
        <View style={styles.textInputContainer}>
          <TextInput
            value={email}
            placeholder="Email"
            style={styles.textInput}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            value={pw}
            placeholder="Password"
            style={styles.textInput}
            onChangeText={(text) => setPw(text)}
          />
          <Button title="login" style={styles.btn} onPress={handleLogin} />
        </View>
    <Button title="Register" onPress={()=> navigation.navigate("Register")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    height: Dimensions.get("window").height,
    padding: 5,
    justifyContent : "center"
  },
  headerText: {
    justifyContent : "center",
    margin : 30,
    fontSize : 30,
    fontWeight:"700"
  },
  textInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#1E293B",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 1,
    marginVertical:10
  },
  textInputContainer: {
    flex: 1,
  },
  btn:{
    backgroundColor :  "#3730A3"
  }
});
