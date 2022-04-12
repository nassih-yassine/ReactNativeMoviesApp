import { View, StyleSheet } from "react-native";
import React from "react";
import HomePage from "./containers/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SingleMovieDescription from "./containers/SingleMovieDescription";
import SearchPage from "./containers/SearchPage";
import Login from "./containers/Login";
import Register from "./containers/Register";

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SingleMovieDescription"
            component={SingleMovieDescription}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SearchPage"
            component={SearchPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
