import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, LayoutAnimation } from "react-native";

import GameScreen from "./screens/gameScreen";
import MatchMakingScreen from "./screens/matchMakingScreen";

import io from "socket.io-client";
const socket = io("https://f1ec097964c9.ngrok.io");

export default function App() {
  //Given the page name, switch the page that is loaded.
  const handlePageChange = (pageName, playerColor) => {
    LayoutAnimation.spring();
    if (pageName === "matchmaking") {
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
    }
  };

  //State to keep track of what page should be loaded.
  const [content, setContent] = useState(
    <MatchMakingScreen socket={socket} onPageChange={handlePageChange} />
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
