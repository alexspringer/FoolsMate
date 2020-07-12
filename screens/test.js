import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";

import Square from "../components/square";

const Test = (props) => {
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

  const loadPiece = (i, j) => {
    var piece;

    //white backrank
    if (i == 0) {
      //rooks
      if (j == 0 || j == 7) {
        piece = {
          type: "rook",
          color: "white",
          image: loadPieceImage("white", "rook"),
        };
      }
      //knights
      if (j == 1 || j == 6) {
        piece = {
          type: "knight",
          color: "white",
          image: loadPieceImage("white", "knight"),
        };
      }
      //bishops
      if (j == 2 || j == 5) {
        piece = {
          type: "bishop",
          color: "white",
          image: loadPieceImage("white", "bishop"),
        };
      }
      //queen
      if (j == 3) {
        piece = {
          type: "queen",
          color: "white",
          image: loadPieceImage("white", "queen"),
        };
      }
      //king
      if (j == 4) {
        piece = {
          type: "king",
          color: "white",
          image: loadPieceImage("white", "king"),
        };
      }
    }

    //white pawns
    else if (i == 1) {
      piece = {
        type: "pawn",
        color: "white",
        image: loadPieceImage("white", "pawn"),
      };
    }

    //black pawns
    else if (i == 6) {
      piece = {
        type: "pawn",
        color: "black",
        image: loadPieceImage("black", "pawn"),
      };
    }

    //black backrank
    else if (i == 7) {
      //rooks
      if (j == 0 || j == 7) {
        piece = {
          type: "rook",
          color: "black",
          image: loadPieceImage("black", "rook"),
        };
      }
      //knights
      if (j == 1 || j == 6) {
        piece = {
          type: "knight",
          color: "black",
          image: loadPieceImage("black", "knight"),
        };
      }
      //bishops
      if (j == 2 || j == 5) {
        piece = {
          type: "bishop",
          color: "black",
          image: loadPieceImage("black", "bishop"),
        };
      }
      //queen
      if (j == 3) {
        piece = {
          type: "queen",
          color: "black",
          image: loadPieceImage("black", "queen"),
        };
      }
      //king
      if (j == 4) {
        piece = {
          type: "king",
          color: "black",
          image: loadPieceImage("black", "king"),
        };
      }
    }
    //no piece
    else {
      piece = {
        type: "n/a",
        color: "n/a",
      };
    }

    return piece;
  };

  const loadPieces = () => {
    var board = [];
    for (var i = 0; i < 8; ++i) {
      var row = [];
      for (var j = 0; j < 8; ++j) {
        row.push(loadPiece(i, j));
      }
      board.push(row);
    }
    return board;
  };

  //pieces keeps track of the state of all pieces on the board.
  const [pieces, setPieces] = useState(loadPieces());
  //Selected keeps track of the square that the user has last pressed.
  const [selected, setSelected] = useState(false);

  const [moveArray, setMoveArray] = useState([]);
  const [possibleMoves, setPossibleMoves] = useState([]);

  const handleSelect = (key, file, rank) => {
    setSelected(key);
    setMoveArray(moveArray.concat([file, rank]));
    findPossibleMoves([file, rank]);
  };

  const findPossibleMoves = (start) => {
    //no possible moves
    if (pieces[start[0]][start[1]].type == "n/a") {
      return;
    } else if (pieces[start[0]][start[1]].type == "pawn") {
    } else if (pieces[start[0]][start[1]].type == "rook") {
      setPossibleMoves(moveRook(start));
    } else if (pieces[start[0]][start[1]].type == "knight") {
    } else if (pieces[start[0]][start[1]].type == "bishop") {
      setPossibleMoves(moveBishop(start));
    } else if (pieces[start[0]][start[1]].type == "king") {
    } else if (pieces[start[0]][start[1]].type == "queen") {
      setPossibleMoves(moveQueen(start));
    }
  };

  const movePiece = () => {
    if (moveArray.length >= 4) {
      var start = [moveArray[0], moveArray[1]];
      var end = [moveArray[2], moveArray[3]];

      //If a player selects a square with no piece on it.
      //Empty the move array.

      if (pieces[start[0]][start[1]].type == "n/a") {
        setMoveArray([]);
        return;
      }

      var temp = pieces;

      temp[end[0]][end[1]] = temp[start[0]][start[1]];
      temp[start[0]][start[1]] = {
        type: "n/a",
        color: "n/a",
        image: <Image />,
      };
      setMoveArray([]);
      setPossibleMoves([]);
      setPieces(temp);
    }
  };

  const isPossibleMove = (key) => {
    var bool = false;
    possibleMoves.forEach(function (e) {
      if (key == e[0] * 8 + e[1]) {
        bool = true;
      }
    });
    return bool;
  };

  const createBoard = () => {
    movePiece();
    var board = [];
    var flag = true;
    var key = 0;
    for (var i = 0; i < 8; ++i) {
      var j = 0;
      var row = [];
      flag = !flag;
      pieces[i].forEach(function (item) {
        if (!flag) {
          if (!item) {
            row.push(
              <Square
                key={key}
                id={key}
                file={i}
                rank={j}
                isPossibleMove={isPossibleMove(key)}
                active={key === selected}
                onSquarePress={handleSelect}
                style={styles.lightSquare}
              ></Square>
            );
          } else {
            row.push(
              <Square
                key={key}
                id={key}
                file={i}
                rank={j}
                isPossibleMove={isPossibleMove(key)}
                active={key === selected}
                onSquarePress={handleSelect}
                style={styles.lightSquare}
              >
                {item.image}
              </Square>
            );
          }
          flag = !flag;
        } else {
          if (!item) {
            row.push(
              <Square
                file={i}
                rank={j}
                key={key}
                id={key}
                isPossibleMove={isPossibleMove(key)}
                active={key === selected}
                onSquarePress={handleSelect}
                style={styles.darkSquare}
              ></Square>
            );
          } else {
            row.push(
              <Square
                file={i}
                rank={j}
                key={key}
                id={key}
                isPossibleMove={isPossibleMove(key)}
                active={key === selected}
                onSquarePress={handleSelect}
                style={styles.darkSquare}
              >
                {item.image}
              </Square>
            );
          }
          flag = !flag;
        }
        ++key;
        ++j;
      });
      board.push(<View style={styles.boardRow}>{row}</View>);
    }
    return board;
  };

  const getOppositeColor = (color) => {
    if (color == "white") {
      return "black";
    } else {
      return "white";
    }
  };

  const validMoveChecker = (i, j, color, flag) => {
    var possibleMove = [];
    var oppositeColor = getOppositeColor(color);
    //Friendly piece blocking
    if (pieces[i][j].color == color) {
      flag = false;
    }
    //Hostile piece blocking
    if (pieces[i][j].color == oppositeColor && flag) {
      possibleMove = [i, j];
      flag = false;
    }
    //Open Square
    if (flag) {
      possibleMove = [i, j];
    }
    return { possibleMove: possibleMove, flag: flag };
  };

  const moveBishop = (start) => {
    var possibleMoves = [];
    var color = pieces[start[0]][start[1]].color;
    var result;
    var flag = true;

    //up and right
    var j = start[1] + 1;
    for (var i = start[0] + 1; i < 8; ++i) {
      if (j < 8) {
        result = validMoveChecker(i, j, color, flag);
        if (result.possibleMove) {
          possibleMoves.push(result.possibleMove);
        }
        flag = result.flag;
        ++j;
      }
    }
    flag = true;

    //down and left
    j = start[1] - 1;
    for (var i = start[0] - 1; i >= 0; --i) {
      if (j >= 0) {
        result = validMoveChecker(i, j, color, flag);
        if (result.possibleMove) {
          possibleMoves.push(result.possibleMove);
        }
        flag = result.flag;
        --j;
      }
    }
    flag = true;

    //up and left
    j = start[1] - 1;
    for (var i = start[0] + 1; i < 8; ++i) {
      if (j >= 0) {
        result = validMoveChecker(i, j, color, flag);
        if (result.possibleMove) {
          possibleMoves.push(result.possibleMove);
        }
        flag = result.flag;
        --j;
      }
    }
    flag = true;

    //down and right
    j = start[1] + 1;
    for (var i = start[0] - 1; i >= 0; --i) {
      if (j < 8) {
        result = validMoveChecker(i, j, color, flag);
        if (result.possibleMove) {
          possibleMoves.push(result.possibleMove);
        }
        flag = result.flag;
        ++j;
      }
    }
    flag = true;

    return possibleMoves;
  };

  const moveRook = (start) => {
    var possibleMoves = [];
    var color = pieces[start[0]][start[1]].color;
    var flag = true;
    var result;

    //move forward
    for (var i = start[0] + 1; i < 8; ++i) {
      result = validMoveChecker(i, start[1], color, flag);
      if (result.possibleMove) {
        possibleMoves.push(result.possibleMove);
      }
      flag = result.flag;
    }
    flag = true;

    //move down
    for (var i = start[0] - 1; i >= 0; --i) {
      result = validMoveChecker(i, start[1], color, flag);
      if (result.possibleMove) {
        possibleMoves.push(result.possibleMove);
      }
      flag = result.flag;
    }
    flag = true;

    //move right
    for (var j = start[1] + 1; j < 8; ++j) {
      result = validMoveChecker(start[0], j, color, flag);
      if (result.possibleMove) {
        possibleMoves.push(result.possibleMove);
      }
      flag = result.flag;
    }
    flag = true;

    //move left
    for (var j = start[1] - 1; j >= 0; --j) {
      result = validMoveChecker(start[0], j, color, flag);
      if (result.possibleMove) {
        possibleMoves.push(result.possibleMove);
      }
      flag = result.flag;
    }
    flag = true;

    return possibleMoves;
  };

  const moveQueen = (start) => {
    var rookMoves = moveRook(start);
    var bishopMoves = moveBishop(start);
    var queenMoves = rookMoves.concat(bishopMoves);

    return queenMoves;
  }

  return (
    <View style={styles.screen}>
      <Text style={{ justifyContent: "center" }}>{possibleMoves}</Text>
      <View style={styles.board}>{createBoard()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#1BC91B",
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

export default Test;
