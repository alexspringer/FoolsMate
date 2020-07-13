import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

import Square from "../components/square";

const GameScreen = (props) => {
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
        enPassantFlag: false,
        image: loadPieceImage("white", "pawn"),
      };
    }

    //black pawns
    else if (i == 6) {
      piece = {
        type: "pawn",
        color: "black",
        enPassantFlag: false,
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
      setPossibleMoves(movePawn(start));
    } else if (pieces[start[0]][start[1]].type == "rook") {
      setPossibleMoves(moveRook(start));
    } else if (pieces[start[0]][start[1]].type == "knight") {
      setPossibleMoves(moveKnight(start));
    } else if (pieces[start[0]][start[1]].type == "bishop") {
      setPossibleMoves(moveBishop(start));
    } else if (pieces[start[0]][start[1]].type == "king") {
      setPossibleMoves(moveKing(start));
    } else if (pieces[start[0]][start[1]].type == "queen") {
      setPossibleMoves(moveQueen(start));
    }
  };

  //Move a piece in the pieces array so the board rerenders and
  //displays the players move. WIP
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

  //Loop through the possibleMoves state array and calculate the key.
  //This is to let a square know if a piece can move to it so it will
  //display a circle notifying the user of the possible move.
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
      board.push(
        <View key={i} style={styles.boardRow}>
          {row}
        </View>
      );
    }
    return board;
  };

  //Simple helper function to get the opposite color of the color passed in.
  const getOppositeColor = (color) => {
    if (color == "white") {
      return "black";
    } else {
      return "white";
    }
  };

  //Helper function for finding the possible moves of rooks, bishops,
  //and queens, since they all move in a similar fashion.
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

  //Scan the board for all possible moves the selected rook can make.
  const moveBishop = (start) => {
    var possibleMoves = [];
    var color = pieces[start[0]][start[1]].color;
    var result; //Result of ValidMoveChecker, which returns an object with the fields possibleMove, and flag
    var flag = true; //Flag is set to false once there is a piece that is blocking movement in the current direction of the scan.

    //up and right
    var j = start[1] + 1; //+1 and later -1 will be to exclude the pieces current position as a possible move.
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
    flag = true; //Reset the flag because we are going to move in another direction now.

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

  //Scan the board for all possible moves the selected rook can make.
  //See moveBishop(start) for more information, the functions are very similar
  //and moveBishop has additional documentation.
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

  //queen is just the combination of a rook and bishop so I just call their
  //possible move finding methods and combine the results.
  const moveQueen = (start) => {
    var rookMoves = moveRook(start);
    var bishopMoves = moveBishop(start);
    var queenMoves = rookMoves.concat(bishopMoves);

    return queenMoves;
  };

  //Movement for pawn
  const movePawn = (start) => {
    var possibleMoves = [];
    var color = pieces[start[0]][start[1]].color;
    var oppositeColor = getOppositeColor(color);

    if (color == "white") {
      //If the piece is in the starting position it can move one or two spaces.
      if (start[0] == 1) {
        if (pieces[start[0] + 1][start[1]].type == "n/a") {
          possibleMoves.push([start[0] + 1, start[1]]);
        }
        if (
          pieces[start[0] + 1][start[1]].type == "n/a" &&
          pieces[start[0] + 2][start[1]].type == "n/a"
        ) {
          possibleMoves.push([start[0] + 2, start[1]]);
        }
      }
      //default movement
      else {
        if (pieces[start[0] + 1][start[1]].type == "n/a") {
          possibleMoves.push([start[0] + 1, start[1]]);
        }
      }

      //bound checking so we dont access spaces that are below zero or above 8.
      if (start[1] + 1 < 8) {
        //attacking
        if (pieces[start[0] + 1][start[1] + 1].color == oppositeColor) {
          possibleMoves.push([start[0] + 1, start[1] + 1]);
        }
        //en passant
        if (start[0] == 4) {
          if (
            pieces[start[0]][start[1] + 1].color == oppositeColor &&
            pieces[start[0]][start[1] + 1].type == "pawn" &&
            pieces[start[0]][start[1] + 1].enPassantFlag
          ) {
            possibleMoves.push([start[0] + 1, start[1] + 1]);
          }
        }
      }

      //Bound checking.
      if (start[1] - 1 >= 0) {
        //attacking
        if (pieces[start[0] + 1][start[1] - 1].color == oppositeColor) {
          possibleMoves.push([start[0] + 1, start[1] - 1]);
        }
        //en passant
        if (start[0] == 4) {
          if (
            pieces[start[0]][start[1] - 1].color == oppositeColor &&
            pieces[start[0]][start[1] - 1].type == "pawn" &&
            pieces[start[0]][start[1] - 1].enPassantFlag
          ) {
            possibleMoves.push([start[0] + 1, start[1] - 1]);
          }
        }
      }
    }

    if (color == "black") {
      //If the piece is in the starting position it can move one or two spaces.
      if (start[0] == 6) {
        if (pieces[start[0] - 1][start[1]].type == "n/a") {
          possibleMoves.push([start[0] - 1, start[1]]);
        }
        if (pieces[start[0] - 2][start[1]].type == "n/a") {
          possibleMoves.push([start[0] - 2, start[1]]);
        }
      }
      //default movement
      else {
        if (pieces[start[0] - 1][start[1]].type == "n/a") {
          possibleMoves.push([start[0] - 1, start[1]]);
        }
      }

      //bound checking so we dont access spaces that are below zero or above 8.
      if (start[1] + 1 < 8) {
        //attacking
        if (pieces[start[0] - 1][start[1] + 1].color == oppositeColor) {
          possibleMoves.push([start[0] - 1, start[1] + 1]);
        }
        //en passant
        if (start[0] == 3) {
          if (
            pieces[start[0]][start[1] + 1].color == oppositeColor &&
            pieces[start[0]][start[1] + 1].type == "pawn" &&
            pieces[start[0]][start[1] + 1].enPassantFlag
          ) {
            possibleMoves.push([start[0] - 1, start[1] + 1]);
          }
        }
      }

      //Bound checking.
      if (start[1] - 1 >= 0) {
        //attacking
        if (pieces[start[0] - 1][start[1] - 1].color == oppositeColor) {
          possibleMoves.push([start[0] - 1, start[1] - 1]);
        }
        //en passant
        if (start[0] == 3) {
          if (
            pieces[start[0]][start[1] - 1].color == oppositeColor &&
            pieces[start[0]][start[1] - 1].type == "pawn" &&
            pieces[start[0]][start[1] - 1].enPassantFlag
          ) {
            possibleMoves.push([start[0] - 1, start[1] - 1]);
          }
        }
      }
    }

    return possibleMoves;
  };

  //knight movement
  const moveKnight = (start) => {
    var possibleMoves = [];
    var color = pieces[start[0]][start[1]].color;
    var oppositeColor = getOppositeColor(color);

    //i+2, j-1 && j+1
    if (start[0] + 2 < 8 && start[1] + 1 < 8 && start[1] - 1 >= 0) {
      if (
        pieces[start[0] + 2][start[1] + 1].type == "n/a" ||
        pieces[start[0] + 2][start[1] + 1].color == oppositeColor
      ) {
        possibleMoves.push([start[0] + 2, start[1] + 1]);
      }
      if (
        pieces[start[0] + 2][start[1] - 1].type == "n/a" ||
        pieces[start[0] + 2][start[1] - 1].color == oppositeColor
      ) {
        possibleMoves.push([start[0] + 2, start[1] - 1]);
      }
    }

    //i+1 && i-1, j+2
    if (start[0] + 1 < 8 && start[0] - 1 >= 0 && start[1] + 2 < 8) {
      if (
        pieces[start[0] + 1][start[1] + 2].type == "n/a" ||
        pieces[start[0] + 1][start[1] + 2].color == oppositeColor
      ) {
        possibleMoves.push([start[0] + 1, start[1] + 2]);
      }
      if (
        pieces[start[0] - 1][start[1] - 1].type == "n/a" ||
        pieces[start[0] - 1][start[1] - 1].color == oppositeColor
      ) {
        possibleMoves.push([start[0] - 1, start[1] + 2]);
      }
    }
    //i+1 && i-1, j-2
    if (start[0] + 1 < 8 && start[0] - 1 >= 0 && start[1] - 2 >= 0) {
      if (
        pieces[start[0] + 1][start[1] - 2].type == "n/a" ||
        pieces[start[0] + 1][start[1] - 2].color == oppositeColor
      ) {
        possibleMoves.push([start[0] + 1, start[1] - 2]);
      }
      if (
        pieces[start[0] - 1][start[1] - 2].type == "n/a" ||
        pieces[start[0] - 1][start[1] - 2].color == oppositeColor
      ) {
        possibleMoves.push([start[0] - 1, start[1] - 2]);
      }
    }
    //i-2, j-1 && j+1
    if (start[0] - 2 >= 0 && start[1] + 1 < 8 && start[1] - 1 >= 0) {
      if (
        pieces[start[0] - 2][start[1] + 1].type == "n/a" ||
        pieces[start[0] - 2][start[1] + 1].color == oppositeColor
      ) {
        possibleMoves.push([start[0] - 2, start[1] + 1]);
      }
      if (
        pieces[start[0] - 2][start[1] - 1].type == "n/a" ||
        pieces[start[0] - 2][start[1] - 1].color == oppositeColor
      ) {
        possibleMoves.push([start[0] - 2, start[1] - 1]);
      }
    }
    return possibleMoves;
  };

  //king movement STILL NEEDS CASTLING SUPPORT
  const moveKing = (start) => {
    var possibleMoves = [];
    var color = pieces[start[0]][start[1]].color;
    var oppositeColor = getOppositeColor(color);

    if (start[0] + 1 < 8) {
      if (
        pieces[start[0] + 1][start[1]].color == oppositeColor ||
        pieces[start[0] + 1][start[1]].type == "n/a"
      ) {
        possibleMoves.push([start[0] + 1, start[1]]);
      }
    }

    if (start[0] - 1 >= 0) {
      if (
        pieces[start[0] - 1][start[1]].color == oppositeColor ||
        pieces[start[0] - 1][start[1]].type == "n/a"
      ) {
        possibleMoves.push([start[0] - 1, start[1]]);
      }
    }

    if (start[1] - 1 >= 0) {
      if (
        pieces[start[0]][start[1] - 1].color == oppositeColor ||
        pieces[start[0]][start[1] - 1].type == "n/a"
      ) {
        possibleMoves.push([start[0], start[1] - 1]);
      }
    }

    if (start[1] + 1 < 8) {
      if (
        pieces[start[0]][start[1] + 1].color == oppositeColor ||
        pieces[start[0]][start[1] + 1].type == "n/a"
      ) {
        possibleMoves.push([start[0], start[1] + 1]);
      }
    }

    if (start[0] + 1 < 8 && start[1] + 1 < 8) {
      if (
        pieces[start[0] + 1][start[1] + 1].color == oppositeColor ||
        pieces[start[0] + 1][start[1] + 1].type == "n/a"
      ) {
        possibleMoves.push([start[0] + 1, start[1] + 1]);
      }
    }

    if (start[0] - 1 >= 0 && start[1] - 1 >= 0) {
      if (
        pieces[start[0] - 1][start[1] - 1].color == oppositeColor ||
        pieces[start[0] - 1][start[1] - 1].type == "n/a"
      ) {
        possibleMoves.push([start[0] - 1, start[1] - 1]);
      }
    }

    if (start[0] + 1 < 8 && start[1] - 1 >= 0) {
      if (
        pieces[start[0] + 1][start[1] - 1].color == oppositeColor ||
        pieces[start[0] + 1][start[1] - 1].type == "n/a"
      ) {
        possibleMoves.push([start[0] + 1, start[1] - 1]);
      }
    }

    if (start[0] - 1 >= 0 && start[1] + 1 < 8) {
      if (
        pieces[start[0] - 1][start[1] + 1].color == oppositeColor ||
        pieces[start[0] - 1][start[1] + 1].type == "n/a"
      ) {
        possibleMoves.push([start[0] - 1, start[1] + 1]);
      }
    }

    return possibleMoves;
  };

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

export default GameScreen;