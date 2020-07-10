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
});

export default Square;
