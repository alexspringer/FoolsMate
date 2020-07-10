import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Text, View, Image, TouchableOpacity } from "react-native";

export default function Game() {
  const [board, setBoard] = useState([]);
  const [visualBoard, setVisualBoard] = useState([]);

  const [startPosition, setStartPosition] = useState();
  const [endPosition, setEndposition] = useState();

  //A square has a rank and file, basically row and column
  //A square has a visual representation
  //A square can have a piece
  //A square can be selected
  function Square(file, rank, color, piece) {
    this.file = file;
    this.rank = rank;
    this.piece = piece;
    this.isSelected = false;
    if (piece) {
      if (color == "light") {
        this.visual = (
          <TouchableOpacity
            style={styles.lightSquare}
            onPress={() => handleSquarePress(file, rank)}
          >
            {this.piece.image}
          </TouchableOpacity>
        );
      } else {
        this.visual = (
          <TouchableOpacity
            style={styles.darkSquare}
            onPress={() => handleSquarePress(file, rank)}
          >
            {this.piece.image}
          </TouchableOpacity>
        );
      }
    } else {
      if (color == "light") {
        this.visual = (
          <TouchableOpacity
            style={styles.lightSquare}
            onPress={() => handleSquarePress(file, rank)}
          ></TouchableOpacity>
        );
      } else {
        this.visual = (
          <TouchableOpacity
            style={styles.darkSquare}
            onPress={() => handleSquarePress(file, rank)}
          ></TouchableOpacity>
        );
      }
    }
  }

  function Piece(type, color, image) {
    this.type = type;
    this.color = color;
    this.image = image;
  }

  const loadBoard = () => {
    var flag = true;
    var tempBoard = [];
    var visualBoard = [];

    //each row and column of a chess board have 8 squares.
    for (var i = 0; i < 8; ++i) {
      var row = [];
      var visualRow = [];
      flag = !flag;
      for (var j = 0; j < 8; ++j) {
        var square;

        //light square
        if (!flag) {
          square = new Square(i, j, "light", loadPiece(i, j));
          flag = !flag;
        }

        //dark square
        else {
          square = new Square(i, j, "dark", loadPiece(i, j));
          flag = !flag;
        }
        row.push(square);
        visualRow.push(square.visual);
      }
      visualBoard.push(<View style={styles.boardRow}>{visualRow}</View>);
      tempBoard.push(row);
    }
    setBoard(board.concat(tempBoard));
    setVisualBoard(visualBoard);
  };

  const loadPiece = (i, j) => {
    var piece;

    //white backrank
    if (i == 0) {
      //rooks
      if (j == 0 || j == 7) {
        piece = new Piece("rook", "white", loadPieceImage("white", "rook"));
      }
      //knights
      if (j == 1 || j == 6) {
        piece = new Piece("knight", "white", loadPieceImage("white", "knight"));
      }
      //bishops
      if (j == 2 || j == 5) {
        piece = new Piece("bishop", "white", loadPieceImage("white", "bishop"));
      }
      //queen
      if (j == 3) {
        piece = new Piece("queen", "white", loadPieceImage("white", "queen"));
      }
      //king
      if (j == 4) {
        piece = new Piece("king", "white", loadPieceImage("white", "king"));
      }
    }

    //white pawns
    else if (i == 1) {
      piece = new Piece("pawn", "white", loadPieceImage("white", "pawn"));
    }

    //black pawns
    else if (i == 6) {
      piece = new Piece("pawn", "black", loadPieceImage("black", "pawn"));
    }

    //black backrank
    else if (i == 7) {
      //rooks
      if (j == 0 || j == 7) {
        piece = new Piece("rook", "black", loadPieceImage("black", "rook"));
      }
      //knights
      if (j == 1 || j == 6) {
        piece = new Piece("knight", "black", loadPieceImage("black", "knight"));
      }
      //bishops
      if (j == 2 || j == 5) {
        piece = new Piece("bishop", "black", loadPieceImage("black", "bishop"));
      }
      //queen
      if (j == 3) {
        piece = new Piece("queen", "black", loadPieceImage("black", "queen"));
      }
      //king
      if (j == 4) {
        piece = new Piece("king", "black", loadPieceImage("black", "king"));
      }
    }
    //no piece
    else {
      piece = null;
    }
    return piece;
  };

  const loadPieceImage = (color, type) => {
    var image;
    if (color == "white") {
      if (type == "pawn") {
        image = (
          <Image
            style={styles.piece}
            source={require("../assets/WhitePawn.png")}
          ></Image>
        );
      } else if (type == "rook") {
        image = (
          <Image
            style={styles.piece}
            source={require("../assets/WhiteRook.png")}
          ></Image>
        );
      } else if (type == "knight") {
        image = (
          <Image
            style={styles.piece}
            source={require("../assets/WhiteKnight.png")}
          ></Image>
        );
      } else if (type == "bishop") {
        image = (
          <Image
            style={styles.piece}
            source={require("../assets/WhiteBishop.png")}
          ></Image>
        );
      } else if (type == "king") {
        image = (
          <Image
            style={styles.piece}
            source={require("../assets/WhiteKing.png")}
          ></Image>
        );
      } else if (type == "queen") {
        image = (
          <Image
            style={styles.piece}
            source={require("../assets/WhiteQueen.png")}
          ></Image>
        );
      }
    } else {
      if (type == "pawn") {
        image = (
          <Image
            style={styles.piece}
            source={require("../assets/BlackPawn.png")}
          ></Image>
        );
      } else if (type == "rook") {
        image = (
          <Image
            style={styles.piece}
            source={require("../assets/BlackRook.png")}
          ></Image>
        );
      } else if (type == "knight") {
        image = (
          <Image
            style={styles.piece}
            source={require("../assets/BlackKnight.png")}
          ></Image>
        );
      } else if (type == "bishop") {
        image = (
          <Image
            style={styles.piece}
            source={require("../assets/BlackBishop.png")}
          ></Image>
        );
      } else if (type == "king") {
        image = (
          <Image
            style={styles.piece}
            source={require("../assets/BlackKing.png")}
          ></Image>
        );
      } else if (type == "queen") {
        image = (
          <Image
            style={styles.piece}
            source={require("../assets/BlackQueen.png")}
          ></Image>
        );
      }
    }
    return image;
  };

  const handleSquarePress = (i, j) => {
    var tempBoard = board.slice();
    //console.log(tempBoard[i][j].piece.type);
    console.log(tempBoard);
    /*tempBoard[i][j].visual(
      <TouchableOpacity
        style={styles.lightSquare}
        onPress={() => handleSquarePress(file, rank)}
      >
        {this.piece.image}
      </TouchableOpacity>
    );*/
    //setBoard(tempBoard);
  };

  const temp = (i, j) => {
    var tempBoard = board;
    tempBoard[i][j] = tempBoard[startPosition[0]][startPosition[1]];
    tempBoard[startPosition[0]][startPosition[1]] = null;
    setBoard(tempBoard);
  }

  return (
    <View style={styles.screen}>
      <Button onPress={()=>loadBoard()}color="red" title="start game"/>
      <Text>{startPosition}</Text>
      <View style={styles.board}>{visualBoard}</View>
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

  selectedSquare: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
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
