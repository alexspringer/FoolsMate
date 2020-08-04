import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";

const GameFinderScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={() => props.onPageChange("home")}>
        <Text style={styles.text}> back </Text>
      </TouchableOpacity>
      <Text style={styles.text}>Available Games: </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  touchable: {
    height: 40,
    width: 180,
    bottom: 0,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    margin: 5,
    borderBottomWidth: 4,
    borderBottomStartRadius: 45,
    borderBottomEndRadius: 45,
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
  },
});

export default GameFinderScreen;
