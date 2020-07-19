import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import GameScreen from "./screens/gameScreen";
import HomeScreen from "./screens/homeScreen";
import MatchMakingScreen from "./screens/matchMakingScreen";

export default function App() {

  //Given the page name, switch the page that is loaded.
  const handlePageChange = (pageName) => {
    if (pageName == "home") {
      setContent(<HomeScreen onPageChange={handlePageChange} />);
    } else if (pageName == "matchmaking") {
      setContent(<MatchMakingScreen  onPageChange={handlePageChange}/>);
    } else if (pageName == "game") {
      setContent(<GameScreen onPageChange={handlePageChange} />);
    }
  };

  //State to keep track of what page should be loaded.
  const [content, setContent] = useState(<HomeScreen onPageChange={handlePageChange}/>);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
