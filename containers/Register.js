import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigation } from "@react-navigation/native";


export default function Register() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwC, setPwC] = useState("");
  const navigation = useNavigation()

  const handleSignUp = () => {
    pw !== pwC
      ? console.log("mot de pass pas recemblable")
      : auth
          .createUserWithEmailAndPassword(email, pw)
          .then((userCredentials) => {
            //const user = userCredentials.user;
            navigation.navigate("Home")
            
          })
          .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register</Text>

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
        <TextInput
          value={pwC}
          placeholder="Password confirmation"
          style={styles.textInput}
          onChangeText={(text) => setPwC(text)}
        />
        <Button title="Register" style={styles.btn} onPress={handleSignUp} />
      </View>
      <Button title="Login" style={styles.btn} onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    height: Dimensions.get("window").height,
    padding: 5,
    justifyContent: "center",
  },
  headerText: {
    justifyContent: "center",
    margin: 30,
    fontSize: 30,
    fontWeight: "700",
  },
  textInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#1E293B",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 1,
    marginVertical: 10,
  },
  textInputContainer: {
    flex: 1,
  },
  btn: {
    backgroundColor: "#3730A3",
  },
});
