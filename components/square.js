import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";

const Square = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onSquarePress(props.id, props.file, props.rank)}
      style={
        (styles.square,
        props.active ? { ...props.style, ...styles.highlight } : props.style)
      }
    >
        {props.children}
      <View style={props.isPossibleMove ? styles.moveToSquare: styles.empty}>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    alignItems: "center",
    justifyContent: "center",
  },

  highlight: {
    backgroundColor: "yellow",
  },

  moveToSquare: {
    backgroundColor: "gray",
    width: 15,
    height: 15,
    borderRadius: 100,
    opacity: .7,
    position: "absolute",
  },

  empty: {

  }
});

export default Square;
