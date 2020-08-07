import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, LayoutAnimation } from "react-native";

import GameScreen from "./screens/gameScreen";
import HomeScreen from "./screens/homeScreen";
import MatchMakingScreen from "./screens/matchMakingScreen";

import io from "socket.io-client";
import GameFinderScreen from "./screens/gameFinderScreen";
const socket = io("https://2d9768e4ce05.ngrok.io");

export default function App() {
  //console.log(socket);
  //Given the page name, switch the page that is loaded.
  const handlePageChange = (pageName, playerColor) => {
    LayoutAnimation.spring();
    if (pageName === "home") {
      setContent(
        <HomeScreen socket={socket} onPageChange={handlePageChange} />
      );
    } else if (pageName === "matchmaking") {
      setContent(
        <MatchMakingScreen socket={socket} onPageChange={handlePageChange} />
      );
    } else if (pageName === "game") {
      setContent(
        <GameScreen
          socket={socket}
          playerColor={playerColor}
          onPageChange={handlePageChange}
        />
      );
    } else if (pageName === "gamefinder") {
      setContent(
        <GameFinderScreen socket={socket} onPageChange={handlePageChange} />
      );
    }
  };

  //State to keep track of what page should be loaded.
  const [content, setContent] = useState(
    <HomeScreen socket={socket} onPageChange={handlePageChange} />
  );

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
    alignItems: "center",
    justifyContent: "center",
  },
});
