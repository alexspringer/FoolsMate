import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function Game() {
  const [board, setBoard] = useState([]);

  const loadBoardState = () => {
    var tempBoard = [];
    for (var i = 0; i < 8; ++i) {
      var row = [];
      for (var j = 0; j < 8; ++j) {
        var piece;
        if (i == 0) {
          piece = backRankSetup(j, "white");
        }

        if (i == 1) {
          piece = { type: "pawn", color: "white" };
        }

        if(1 < i && i < 6){
          piece = null;
        }

        if (i == 6) {
          piece = { type: "pawn", color: "black" };
        }

        if (i == 7) {
          piece = backRankSetup(j, "black");
        }
        row.push(piece);
      }
      tempBoard.push(row);
    }
    tempBoard.forEach(e => {console.log(e)});
    setBoard(board.concat(tempBoard));
  };

  const backRankSetup = (j, color) => {
    var piece;
    if (j == 0 || j == 7) {
      piece = { type: "rook", color: color };
    }
    if (j == 1 || j == 6) {
      piece = { type: "knight", color: color };
    }
    if (j == 2 || j == 5) {
      piece = { type: "bishop", color: color };
    }
    if (j == 3) {
      piece = { type: "queen", color: color };
    }
    if (j == 4) {
      piece = { type: "king", color: color };
    }
    return piece;
  };

  //Given the row and column index, determine if a piece should be loaded onto that square,
  //and what piece should be loaded.
  const loadPiece = (i, j) => {
    var piece;

    if (i == 0) {
      //rook
      if (j == 0 || j == 7) {
        piece = (
          <Image
            style={styles.piece}
            source={require("../assets/BlackRook.png")}
          ></Image>
        );
      }

      //knight
      if (j == 1 || j == 6) {
        piece = (
          <Image
            style={styles.piece}
            source={require("../assets/BlackKnight.png")}
          ></Image>
        );
      }

      //bishop
      if (j == 2 || j == 5) {
        piece = (
          <Image
            style={styles.piece}
            source={require("../assets/BlackBishop.png")}
          ></Image>
        );
      }

      //queen
      if (j == 3) {
        piece = (
          <Image
            style={styles.piece}
            source={require("../assets/BlackQueen.png")}
          ></Image>
        );
      }

      //king
      if (j == 4) {
        piece = (
          <Image
            style={styles.piece}
            source={require("../assets/BlackKing.png")}
          ></Image>
        );
      }
    } else if (i == 1) {
      piece = (
        <Image
          style={styles.piece}
          source={require("../assets/BlackPawn.png")}
        ></Image>
      );
    } else if (i == 6) {
      piece = (
        <Image
          style={styles.piece}
          source={require("../assets/WhitePawn.png")}
        ></Image>
      );
    } else if (i == 7) {
      //rook
      if (j == 0 || j == 7) {
        piece = (
          <Image
            style={styles.piece}
            source={require("../assets/WhiteRook.png")}
          ></Image>
        );
      }

      //knight
      if (j == 1 || j == 6) {
        piece = (
          <Image
            style={styles.piece}
            source={require("../assets/WhiteKnight.png")}
          ></Image>
        );
      }

      //bishop
      if (j == 2 || j == 5) {
        piece = (
          <Image
            style={styles.piece}
            source={require("../assets/WhiteBishop.png")}
          ></Image>
        );
      }

      //queen
      if (j == 3) {
        piece = (
          <Image
            style={styles.piece}
            source={require("../assets/WhiteQueen.png")}
          ></Image>
        );
      }

      //king
      if (j == 4) {
        piece = (
          <Image
            style={styles.piece}
            source={require("../assets/WhiteKing.png")}
          ></Image>
        );
      }
    }
    return piece;
  };

  //Build the board that the user can see.
  const createBoard = () => {
    var board = [];
    var key = 0;
    for (var i = 0; i < 8; ++i) {
      //create a row
      var row = [];
      for (var j = 0; j < 8; ++j) {
        //rows alternate between starting with a light square and dark square,
        //this if statement allows for that to happen.
        if (i % 2 == 0) {
          //Likewise, squares in a row alternate colors so this if block, allows that to happen.
          if (j % 2 == 0) {
            row.push(createSquare(key, i, j, "light"));
          } else {
            row.push(createSquare(key, i, j, "dark"));
          }
        } else {
          if (j % 2 == 0) {
            row.push(createSquare(key, i, j, "dark"));
          } else {
            row.push(createSquare(key, i, j, "light"));
          }
        }
        ++key;
      }
      //each loop through we add the row we created to the board array, which is what is ultimately returned.
      board.push(<View style={styles.boardRow}>{row}</View>);
    }
    return board;
  };

  const createSquare = (key, i, j, squareType) => {
    if (squareType === "light") {
      return (
        <TouchableOpacity
          onPress={() => console.log("light")}
          key={key}
          style={styles.lightSquare}
        >
          {loadPiece(i, j)}
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => console.log("dark")}
          key={key}
          style={styles.darkSquare}
        >
          {loadPiece(i, j)}
        </TouchableOpacity>
      );
    }
  };

  //only executes on the first render. This is where the boar is loaded.
  useEffect(() => {
    loadBoardState();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.board}>{createBoard()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "gray",
    marginTop: "20%",
  },

  board: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },

  boardRow: {
    flexDirection: "row",
  },

  darkSquare: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    width: "12.5%",
    height: 50,
  },

  lightSquare: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    width: "12.5%",
    height: 50,
  },

  piece: {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
  },
});
