import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Game() {

  const createSquares = () => {
    var board = [];
    for (var i = 0; i < 8; ++i) {
      //create a row
      var row = [];
      for (var j = 0; j < 8; ++j) {
        if (i % 2 == 0) {
          //Light square
          if (j % 2 == 0) {
            row.push(<View key={i + j} style={styles.lightSquare}></View>);
          }

          //dark square
          else {
            row.push(<View key={i + j} style={styles.darkSquare}></View>);
          }
        } else {
          //dark square
          if (j % 2 == 0) {
            row.push(<View key={i + j} style={styles.darkSquare}></View>);
          }

          //Light square
          else {
            row.push(<View key={i + j} style={styles.lightSquare}></View>);
          }
        }
      }
      board.push(<View style={styles.boardRow}>{row}</View>);
    }
    return board;
  };

  //only executes on the first render. This is where the boar is loaded.
  useEffect(() => {}, []);

  return (
    <View style={styles.screen}>
        <Image style={styles.piece} source={require("../assets/BlackPawn.png")}></Image>
      <View style={styles.board}>{createSquares()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    marginTop: "20%",
  },

  board: {
    flex: 1,
    width: "100%",
    justifyContent:"center"
  },

  boardRow: {
    flexDirection: "row",
  },

  darkSquare: {
    backgroundColor: "green",
    width: "12.5%",
    height: 50,
  },

  lightSquare: {
    backgroundColor: "#f0f0f0",
    width: "12.5%",
    height: 50,
  },

  piece: {
      backgroundColor:"transparent",
      width:60,
      height:80
  }
});
