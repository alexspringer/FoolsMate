import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableHighlight,
  Dimensions,
  LayoutAnimation,
  Alert,
  TouchableOpacity,
} from "react-native";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

import Square from "../components/square";

const GameScreen = (props) => {
  const loadPieceImage = (color, type) => {
    var image = null;
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
          castlingRights: true,
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
          castlingRights: true,
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

  //Setup all the pieces on the board. Used to set the state of the pieces array.
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

  const initPlayerTurn = () => {
    if (props.playerColor === "white") {
      return true;
    } else {
      return false;
    }
  };

  //pieces keeps track of the state of all pieces on the board.
  const [pieces, setPieces] = useState(loadPieces());
  const [moveArray, setMoveArray] = useState([]);
  const [possibleMoves, setPossibleMoves] = useState([]);
  //True for whites turn, false for blacks turn.
  const [playerTurn, setPlayerTurn] = useState(false);
  const [checkmate, setCheckmate] = useState(false);
  const [opponentMove, setOpponentMove] = useState(false);

  //Keep track of what to show the user. *visual states*
  //Selected keeps track of the square that the user has last pressed.
  const [selected, setSelected] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [gameStartFlag, setGameStartFlag] = useState(false);

  //Listening to the server for when the other player takes there turn.
  //When the other player uses their turn, update the backend board and
  //the ui board, then set turn to true.
  //setTurnFlag(true);

  const displayWinner = () => {
    if (props.playerColor === "white") {
      if (playerTurn) {
        return "White Wins!";
      } else {
        return "Black Wins!";
      }
    } else {
      if (playerTurn) {
        return "Black Wins!";
      } else {
        return "White Wins!";
      }
    }
  };

  useEffect(() => {
    props.socket.on("enemy join", () => {
      setPlayerTurn(true);
      setGameStartFlag(true);
    });
  }, []);

  props.socket.on("enemy forfeit", () => {
    setShowAlert(true);
  });

  //Listen to the server to see if the other player in the game has made their move.
  props.socket.on("turn start", (move) => {
    setOpponentMove(move);
  });

  //Once the opponents move has been registered,
  useEffect(() => {
    if (opponentMove) {
      onTurnStart(opponentMove);
      if (opponentMove.mateFlag) {
        setCheckmate(true);
      } else {
        setPlayerTurn(!playerTurn);
      }
    }
  }, [opponentMove]);

  //update the state of the board with the move the opponent just made.
  const onTurnStart = (move) => {
    var start = move.start;
    var end = move.end;
    var enPassantFlag = move.enPassantFlag;
    var castleFlag = move.castleFlag;

    if (castleFlag) {
      //check to see if the move the user is making is castling, In this case we also move the rook.
      castleMoveHelper(start, end);
    }

    //If we are moving a pawn, we need to manage the en passant flag, and check to see if
    //the move being performed is en passant.
    if (enPassantFlag) {
      enPassantMoveHelper(start, end);
    }

    if (pieces[start[0]][start[1]].type === "king") {
      pieces[start[0]][start[1]].castlingRights = false;
    }

    if (pieces[start[0]][start[1]].type === "pawn") {
      if (end[0] + 2 == start[0] || end[0] - 2 == start[0]) {
        pieces[start[0]][start[1]].enPassantFlag = true;
      } else if (pieces[start[0]][start[1]].enPassantFlag) {
        pieces[start[0]][start[1]].enPassantFlag = false;
      }
    }

    pieces[end[0]][end[1]] = pieces[start[0]][start[1]];
    pieces[start[0]][start[1]] = {
      type: "n/a",
      color: "n/a",
      image: <Image />,
    };
  };

  //Helper function to display the player based on the playerTurn State
  //and the player's color.
  const displayPlayer = () => {
    if (props.playerColor === "white") {
      if (!gameStartFlag) {
        return "Waiting for opponent to join...";
      } else if (playerTurn) {
        return "White's Turn";
      } else {
        return "Black's Turn";
      }
    }
    if (props.playerColor === "black") {
      if (playerTurn) {
        return "Black's Turn";
      } else {
        return "White's Turn";
      }
    }
  };

  //Executes whenever a user presses on a square.
  const handleSelect = (key, file, rank) => {
    setSelected(key);
    setMoveArray(moveArray.concat([file, rank]));
    var possibleMoves = findPossibleMoves([file, rank], pieces);
    setPossibleMoves(validatePossibleMoves([file, rank], possibleMoves));
  };

  //Depending on the piece located at the start position,
  //this function acts as a wrapper to call the function that
  //contains the logic that details how each type of piece can move.
  //An array of moves is that returned to this function. After, the
  //moves are validated to make sure moving the pieces doesn't put
  //the players own king in check. Moves that do put the players own king in check
  //are removed from the array. Once all moves are validated, the possibleMoves array
  //is set to be displayed on the board.
  const findPossibleMoves = (start, board) => {
    var possibleMoves;
    //no possible moves
    if (board[start[0]][start[1]].type == "n/a") {
      possibleMoves = [];
    } else if (board[start[0]][start[1]].type == "pawn") {
      possibleMoves = movePawn(start, board);
    } else if (board[start[0]][start[1]].type == "rook") {
      possibleMoves = moveRook(start, board);
    } else if (board[start[0]][start[1]].type == "knight") {
      possibleMoves = moveKnight(start, board);
    } else if (board[start[0]][start[1]].type == "bishop") {
      possibleMoves = moveBishop(start, board);
    } else if (board[start[0]][start[1]].type == "king") {
      possibleMoves = moveKing(start, board);
    } else if (board[start[0]][start[1]].type == "queen") {
      possibleMoves = moveQueen(start, board);
    }
    return possibleMoves;
  };

  //Checks to see if the two squares left and right
  //of the king are safe squares. Once of the conditions required to castle.
  const isCastlingSafe = (board, color) => {
    var kingPosition = findKing(board, color);
    var possibleMoves = [];
    var oppositeColor = getOppositeColor(color);
    var flag = true;
    for (var i = 0; i < 8; ++i) {
      for (var j = 0; j < 8; ++j) {
        if (board[i][j].color == oppositeColor) {
          possibleMoves = findPossibleMoves([i, j], board);
          possibleMoves.forEach(function (move) {
            if (
              (move[0] == kingPosition[0] && move[1] == kingPosition[1]) ||
              (move[0] == kingPosition[0] && move[1] == kingPosition[1] + 1) ||
              (move[0] == kingPosition[0] && move[1] == kingPosition[1] + 2)
            ) {
              flag = false;
            }
            if (
              (move[0] == kingPosition[0] && move[1] == kingPosition[1]) ||
              (move[0] == kingPosition[0] && move[1] == kingPosition[1] - 1) ||
              (move[0] == kingPosition[0] && move[1] == kingPosition[1] - 2)
            ) {
              flag = false;
            }
          });
        }
      }
    }
    return flag;
  };

  //This function loops through an array of possible moves and tests them
  //to see if perfoming that specific move puts the players own king in check.
  //If it does, that possible move is removed from the array.
  const validatePossibleMoves = (start, possibleMoves) => {
    var color = pieces[start[0]][start[1]].color;
    var oppositeColor = getOppositeColor(color);
    var board = [];
    //deep copy the pieces array.
    for (var i = 0; i < 8; ++i) {
      var row = [];
      for (var j = 0; j < 8; ++j) {
        row.push(pieces[i][j]);
      }
      board.push(row);
    }

    //We are removing any move that would put the players own king in check
    //In chess this situation would be called a "pin". Since we are trying all
    //of the possible moves we need to know the previous move to set that to an empty
    //square once we move
    var newArray = [];
    var castlingFlag = true;
    possibleMoves.forEach(function (move) {
      var prevType = board[move[0]][move[1]].type;
      var prevColor = board[move[0]][move[1]].color;

      //CREATE A FUNCTION FOR THIS
      if (board[start[0]][start[1]].type == "pawn") {
        if (board[move[0]][move[1]].type == "n/a" && move[1] == start[1] + 1) {
          board[start[0]][start[1] + 1] = {
            type: "n/a",
            color: "n/a",
            enPassantFlag: false,
          };
        }
        if (board[move[0]][move[1]].type == "n/a" && move[1] == start[1] - 1) {
          board[start[0]][start[1] - 1] = {
            type: "n/a",
            color: "n/a",
            enPassantFlag: false,
          };
        }
      }

      if (board[start[0]][start[1]].type == "king") {
        //castle king side
        if (move[1] == start[1] + 2 || move[1] == start[1] - 2) {
          //move rook
          if (!isCastlingSafe(board, color)) {
            castlingFlag = false;
          }
        }
      }

      ///Test out the move and then scan the board for check.
      board[move[0]][move[1]] = board[start[0]][start[1]];
      board[start[0]][start[1]] = {
        type: "n/a",
        color: "n/a",
      };

      //If the move can be done without putting the unit in check add to the list of moves.
      if (!scanForCheck(board, color) && castlingFlag) {
        newArray.push(move);
      }

      //Reset the board to before we tested out the move.
      board[start[0]][start[1]] = board[move[0]][move[1]];
      board[move[0]][move[1]] = {
        type: prevType,
        color: prevColor,
      };

      //CREATE A FUNCTION FOR THIS.
      if (board[start[0]][start[1]].type == "pawn") {
        if (board[move[0]][move[1]].type == "n/a" && move[1] == start[1] + 1) {
          board[start[0]][start[1] + 1] = {
            type: "pawn",
            color: oppositeColor,
            enPassantFlag: true,
          };
        }
        if (board[move[0]][move[1]].type == "n/a" && move[1] == start[1] - 1) {
          board[start[0]][start[1] - 1] = {
            type: "pawn",
            color: oppositeColor,
            enPassantFlag: true,
          };
        }
      }
      castlingFlag = true;
    });

    return newArray;
  };

  //Given a color, and a board state, scan the board to see
  //if that king is in check from another piece.
  const scanForCheck = (board, color) => {
    var kingPosition = findKing(board, color);
    var possibleMoves = [];
    var oppositeColor = getOppositeColor(color);
    var flag = false;
    for (var i = 0; i < 8; ++i) {
      for (var j = 0; j < 8; ++j) {
        if (board[i][j].color == oppositeColor) {
          possibleMoves = findPossibleMoves([i, j], board);
          possibleMoves.forEach(function (move) {
            if (move[0] == kingPosition[0] && move[1] == kingPosition[1]) {
              flag = true;
            }
          });
        }
      }
    }
    return flag;
  };

  //Scans the board to see if a specific player is in checkmate.
  const scanForMate = (board, color) => {
    for (var i = 0; i < 8; ++i) {
      for (var j = 0; j < 8; ++j) {
        if (board[i][j].color == color) {
          var temp = findPossibleMoves([i, j], board);
          temp = validatePossibleMoves([i, j], temp);
          if (temp.length > 0) {
            return false;
          }
        }
      }
    }
    return true;
  };

  //Given a color, scan the board for that king and return its position
  const findKing = (board, color) => {
    for (var i = 0; i < 8; ++i) {
      for (var j = 0; j < 8; ++j) {
        if (board[i][j].type == "king" && board[i][j].color == color) {
          return [i, j];
        }
      }
    }
    return; //Should never actually get here.
  };

  //moves the rook when castling
  const castleMoveHelper = (start, end) => {
    var castleFlag = false;
    //castle king side
    if (start[1] + 2 == end[1]) {
      pieces[start[0]][start[1] + 1] = pieces[start[0]][start[1] + 3];
      pieces[start[0]][start[1] + 3] = {
        type: "n/a",
        color: "n/a",
        image: <Image />,
      };
      castleFlag = true;
    }
    //castle queen side
    if (start[1] - 2 == end[1]) {
      pieces[start[0]][start[1] - 1] = pieces[start[0]][start[1] - 4];
      pieces[start[0]][start[1] - 4] = {
        type: "n/a",
        color: "n/a",
        image: <Image />,
      };
      castleFlag = true;
    }
    pieces[start[0]][start[1]].castlingRights = false;
    return castleFlag;
  };

  //deletes the pawn the gets taken in passing.
  const enPassantMoveHelper = (start, end) => {
    var enPassantFlag = false;
    if (pieces[end[0]][end[1]].type == "n/a" && end[1] == start[1] + 1) {
      pieces[start[0]][start[1] + 1] = {
        type: "n/a",
        color: "n/a",
        enPassantFlag: false,
        image: <Image />,
      };
      enPassantFlag = true;
    }
    if (pieces[end[0]][end[1]].type == "n/a" && end[1] == start[1] - 1) {
      pieces[start[0]][start[1] - 1] = {
        type: "n/a",
        color: "n/a",
        enPassantFlag: false,
        image: <Image />,
      };
      enPassantFlag = true;
    }
    return enPassantFlag;
  };

  //Move a piece in the pieces array so the board rerenders and
  //displays the players move.
  const movePiece = () => {
    //Can only move a piece if we have two coordinates (which a coordinate consists of two numbers so 2x2=4)
    if (moveArray.length >= 4) {
      var start = [moveArray[0], moveArray[1]]; //Piece we are moving.
      var end = [moveArray[2], moveArray[3]]; //Square we are moving the piece to
      var color = pieces[start[0]][start[1]].color;
      var oppositeColor = getOppositeColor(color);
      var possibleMoves = findPossibleMoves(start, pieces); //Find the possible moves the piece we are moving can make.
      possibleMoves = validatePossibleMoves(start, possibleMoves); //Updated possible moves that won't put our own king in check.
      var flag = false; //If a piece is moved, flag is set to true, and that is how we know the player actually made their move.
      var enPassantFlag = false;
      var castleFlag = false;
      var mateFlag = false;

      //If its not a players turn don't let them move a piece!
      if (
        !playerTurn ||
        (playerTurn && pieces[start[0]][start[1]].color != props.playerColor)
      ) {
        setMoveArray([]);
        setPossibleMoves([]);
        setSelected();
        return;
      }

      //Make sure that a piece is not being moved to a square where a friendly piece is on.
      if (pieces[end[0]][end[1]].color != pieces[start[0]][start[1]].color) {
        possibleMoves.forEach(function (m) {
          if (end[0] == m[0] && end[1] == m[1]) {
            //User picked a valid move for the piece to make.
            flag = true; //Piece is going to move so the players turn ends after this.

            //If we move a king we need to revoke its castling rights.
            if (pieces[start[0]][start[1]].type == "king") {
              //check to see if the move the user is making is castling, In this case we also move the rook.
              castleFlag = castleMoveHelper(start, end);
            }

            //If we are moving a pawn, we need to manage the en passant flag, and check to see if
            //the move being performed is en passant.
            if (pieces[start[0]][start[1]].type == "pawn") {
              enPassantFlag = enPassantMoveHelper(start, end);
              if (end[0] + 2 == start[0] || end[0] - 2 == start[0]) {
                pieces[start[0]][start[1]].enPassantFlag = true;
              } else if (pieces[start[0]][start[1]].enPassantFlag) {
                pieces[start[0]][start[1]].enPassantFlag = false;
              }
            }

            //Move the piece, set the old space to be empty.
            pieces[end[0]][end[1]] = pieces[start[0]][start[1]];
            pieces[start[0]][start[1]] = {
              type: "n/a",
              color: "n/a",
              image: <Image />,
            };
            //images[end[0]][end[1]] = images[start[0]][start[1]];
            //images[start[0]][start[1]] = null;

            //Logic for controlling whether a pawn promotes.
            pawnPromotion(pieces, end);
          }
        });
      }

      //Piece moved
      if (flag) {
        setMoveArray([]);
        setPossibleMoves([]);
        if (scanForMate(pieces, oppositeColor)) {
          setCheckmate(true);
          mateFlag = true;
        } else {
          setPlayerTurn(!playerTurn);
        }
        props.socket.emit("turn end", {
          start: start,
          end: end,
          castleFlag: castleFlag,
          enPassantFlag: enPassantFlag,
          mateFlag: mateFlag,
        });
      }

      //Piece didn't move.
      else {
        setMoveArray([]);
        setPossibleMoves([]);
        setSelected();
      }
    }
  };

  //If a pawn reaches to the final rank of the board, promote it to a queen.
  const pawnPromotion = (board, end) => {
    //pawn promotion
    if (board[end[0]][end[1]].type == "pawn") {
      if (end[0] == 0) {
        board[end[0]][end[1]] = {
          type: "queen",
          color: "black",
          image: (
            <Image
              style={styles.piece}
              source={require("../assets/BlackQueen.png")}
            ></Image>
          ),
        };
      }
      if (end[0] == 7) {
        board[end[0]][end[1]] = {
          type: "queen",
          color: "white",
          image: (
            <Image
              style={styles.piece}
              source={require("../assets/WhiteQueen.png")}
            ></Image>
          ),
        };
      }
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
  const validMoveChecker = (i, j, color, flag, board) => {
    var possibleMove = [];
    var oppositeColor = getOppositeColor(color);
    //Friendly piece blocking
    if (board[i][j].color == color) {
      flag = false;
    }
    //Hostile piece blocking
    if (board[i][j].color == oppositeColor && flag) {
      possibleMove = [i, j];
      flag = false;
    }
    //Open Square
    if (flag) {
      possibleMove = [i, j];
    }
    return { possibleMove: possibleMove, flag: flag };
  };

  const moveBishop = (start, board) => {
    var possibleMoves = [];
    var color = board[start[0]][start[1]].color;
    var result; //Result of ValidMoveChecker, which returns an object with the fields possibleMove, and flag
    var flag = true; //Flag is set to false once there is a piece that is blocking movement in the current direction of the scan.

    //up and right
    var j = start[1] + 1; //+1 and later -1 will be to exclude the pieces current position as a possible move.
    for (var i = start[0] + 1; i < 8; ++i) {
      if (j < 8) {
        result = validMoveChecker(i, j, color, flag, board);
        if (result.possibleMove.length > 0) {
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
        result = validMoveChecker(i, j, color, flag, board);
        if (result.possibleMove.length > 0) {
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
        result = validMoveChecker(i, j, color, flag, board);
        if (result.possibleMove.length > 0) {
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
        result = validMoveChecker(i, j, color, flag, board);
        if (result.possibleMove.length > 0) {
          possibleMoves.push(result.possibleMove);
        }
        flag = result.flag;
        ++j;
      }
    }
    flag = true;
    return possibleMoves;
  };

  const moveRook = (start, board) => {
    var possibleMoves = [];
    var color = board[start[0]][start[1]].color;
    var flag = true;
    var result;

    //move forward
    for (var i = start[0] + 1; i < 8; ++i) {
      result = validMoveChecker(i, start[1], color, flag, board);
      if (result.possibleMove.length > 0) {
        possibleMoves.push(result.possibleMove);
      }
      flag = result.flag;
    }
    flag = true;

    //move down
    for (var i = start[0] - 1; i >= 0; --i) {
      result = validMoveChecker(i, start[1], color, flag, board);
      if (result.possibleMove.length > 0) {
        possibleMoves.push(result.possibleMove);
      }
      flag = result.flag;
    }
    flag = true;

    //move right
    for (var j = start[1] + 1; j < 8; ++j) {
      result = validMoveChecker(start[0], j, color, flag, board);
      if (result.possibleMove.length > 0) {
        possibleMoves.push(result.possibleMove);
      }
      flag = result.flag;
    }
    flag = true;

    //move left
    for (var j = start[1] - 1; j >= 0; --j) {
      result = validMoveChecker(start[0], j, color, flag, board);
      if (result.possibleMove.length > 0) {
        possibleMoves.push(result.possibleMove);
      }
      flag = result.flag;
    }
    flag = true;
    return possibleMoves;
  };

  const moveQueen = (start, board) => {
    var rookMoves = moveRook(start, board);
    var bishopMoves = moveBishop(start, board);
    var queenMoves = rookMoves.concat(bishopMoves);
    return queenMoves;
  };

  const movePawn = (start, board) => {
    var possibleMoves = [];
    var color = board[start[0]][start[1]].color;
    var oppositeColor = getOppositeColor(color);

    if (color == "white" && start[0] + 1 < 8) {
      //If the piece is in the starting position it can move one or two spaces.
      if (start[0] == 1) {
        if (board[start[0] + 1][start[1]].type == "n/a") {
          possibleMoves.push([start[0] + 1, start[1]]);
        }
        if (
          board[start[0] + 1][start[1]].type == "n/a" &&
          board[start[0] + 2][start[1]].type == "n/a"
        ) {
          possibleMoves.push([start[0] + 2, start[1]]);
        }
      }
      //default movement
      else {
        if (board[start[0] + 1][start[1]].type == "n/a") {
          possibleMoves.push([start[0] + 1, start[1]]);
        }
      }

      //bound checking so we dont access spaces that are below zero or above 8.
      if (start[1] + 1 < 8) {
        //attacking
        if (board[start[0] + 1][start[1] + 1].color == oppositeColor) {
          possibleMoves.push([start[0] + 1, start[1] + 1]);
        }
        //en passant
        if (start[0] == 4) {
          if (
            board[start[0]][start[1] + 1].color == oppositeColor &&
            board[start[0]][start[1] + 1].type == "pawn" &&
            board[start[0]][start[1] + 1].enPassantFlag
          ) {
            possibleMoves.push([start[0] + 1, start[1] + 1]);
          }
        }
      }

      //Bound checking.
      if (start[1] - 1 >= 0) {
        //attacking
        if (board[start[0] + 1][start[1] - 1].color == oppositeColor) {
          possibleMoves.push([start[0] + 1, start[1] - 1]);
        }
        //en passant
        if (start[0] == 4) {
          if (
            board[start[0]][start[1] - 1].color == oppositeColor &&
            board[start[0]][start[1] - 1].type == "pawn" &&
            board[start[0]][start[1] - 1].enPassantFlag
          ) {
            possibleMoves.push([start[0] + 1, start[1] - 1]);
          }
        }
      }
    }

    if (color == "black" && start[0] - 1 >= 0) {
      //If the piece is in the starting position it can move one or two spaces.
      if (start[0] == 6) {
        if (board[start[0] - 1][start[1]].type == "n/a") {
          possibleMoves.push([start[0] - 1, start[1]]);
        }
        if (
          board[start[0] - 1][start[1]].type == "n/a" &&
          board[start[0] - 2][start[1]].type == "n/a"
        ) {
          possibleMoves.push([start[0] - 2, start[1]]);
        }
      }
      //default movement
      else {
        if (board[start[0] - 1][start[1]].type == "n/a") {
          possibleMoves.push([start[0] - 1, start[1]]);
        }
      }

      //bound checking so we dont access spaces that are below zero or above 8.
      if (start[1] + 1 < 8) {
        //attacking
        if (board[start[0] - 1][start[1] + 1].color == oppositeColor) {
          possibleMoves.push([start[0] - 1, start[1] + 1]);
        }
        //en passant
        if (start[0] == 3) {
          if (
            board[start[0]][start[1] + 1].color == oppositeColor &&
            board[start[0]][start[1] + 1].type == "pawn" &&
            board[start[0]][start[1] + 1].enPassantFlag
          ) {
            possibleMoves.push([start[0] - 1, start[1] + 1]);
          }
        }
      }

      //Bound checking.
      if (start[1] - 1 >= 0) {
        //attacking
        if (board[start[0] - 1][start[1] - 1].color == oppositeColor) {
          possibleMoves.push([start[0] - 1, start[1] - 1]);
        }
        //en passant
        if (start[0] == 3) {
          if (
            board[start[0]][start[1] - 1].color == oppositeColor &&
            board[start[0]][start[1] - 1].type == "pawn" &&
            board[start[0]][start[1] - 1].enPassantFlag
          ) {
            possibleMoves.push([start[0] - 1, start[1] - 1]);
          }
        }
      }
    }

    return possibleMoves;
  };

  const moveKnight = (start, board) => {
    var possibleMoves = [];
    var color = board[start[0]][start[1]].color;
    var oppositeColor = getOppositeColor(color);

    //i+2, j-1 && j+1
    if (start[0] + 2 < 8) {
      if (
        start[1] + 1 < 8 &&
        (board[start[0] + 2][start[1] + 1].type == "n/a" ||
          board[start[0] + 2][start[1] + 1].color == oppositeColor)
      ) {
        possibleMoves.push([start[0] + 2, start[1] + 1]);
      }
      if (
        start[1] - 1 >= 0 &&
        (board[start[0] + 2][start[1] - 1].type == "n/a" ||
          board[start[0] + 2][start[1] - 1].color == oppositeColor)
      ) {
        possibleMoves.push([start[0] + 2, start[1] - 1]);
      }
    }

    //i+1 && i-1, j+2
    if (start[1] + 2 < 8) {
      if (
        start[0] + 1 < 8 &&
        (board[start[0] + 1][start[1] + 2].type == "n/a" ||
          board[start[0] + 1][start[1] + 2].color == oppositeColor)
      ) {
        possibleMoves.push([start[0] + 1, start[1] + 2]);
      }
      if (
        start[0] - 1 >= 0 &&
        (board[start[0] - 1][start[1] + 2].type == "n/a" ||
          board[start[0] - 1][start[1] + 2].color == oppositeColor)
      ) {
        possibleMoves.push([start[0] - 1, start[1] + 2]);
      }
    }
    //i+1 && i-1, j-2
    if (start[1] - 2 >= 0) {
      if (
        start[0] + 1 < 8 &&
        (board[start[0] + 1][start[1] - 2].type == "n/a" ||
          board[start[0] + 1][start[1] - 2].color == oppositeColor)
      ) {
        possibleMoves.push([start[0] + 1, start[1] - 2]);
      }
      if (
        start[0] - 1 >= 0 &&
        (board[start[0] - 1][start[1] - 2].type == "n/a" ||
          board[start[0] - 1][start[1] - 2].color == oppositeColor)
      ) {
        possibleMoves.push([start[0] - 1, start[1] - 2]);
      }
    }
    //i-2, j-1 && j+1
    if (start[0] - 2 >= 0) {
      if (
        start[1] + 1 < 8 &&
        (board[start[0] - 2][start[1] + 1].type == "n/a" ||
          board[start[0] - 2][start[1] + 1].color == oppositeColor)
      ) {
        possibleMoves.push([start[0] - 2, start[1] + 1]);
      }
      if (
        start[1] - 1 >= 0 &&
        (board[start[0] - 2][start[1] - 1].type == "n/a" ||
          board[start[0] - 2][start[1] - 1].color == oppositeColor)
      ) {
        possibleMoves.push([start[0] - 2, start[1] - 1]);
      }
    }
    return possibleMoves;
  };

  const moveKing = (start, board) => {
    var possibleMoves = [];
    var color = board[start[0]][start[1]].color;
    var oppositeColor = getOppositeColor(color);

    if (start[0] + 1 < 8) {
      if (
        board[start[0] + 1][start[1]].color == oppositeColor ||
        board[start[0] + 1][start[1]].type == "n/a"
      ) {
        possibleMoves.push([start[0] + 1, start[1]]);
      }
    }

    if (start[0] - 1 >= 0) {
      if (
        board[start[0] - 1][start[1]].color == oppositeColor ||
        board[start[0] - 1][start[1]].type == "n/a"
      ) {
        possibleMoves.push([start[0] - 1, start[1]]);
      }
    }

    if (start[1] - 1 >= 0) {
      if (
        board[start[0]][start[1] - 1].color == oppositeColor ||
        board[start[0]][start[1] - 1].type == "n/a"
      ) {
        possibleMoves.push([start[0], start[1] - 1]);
      }
    }

    if (start[1] + 1 < 8) {
      if (
        board[start[0]][start[1] + 1].color == oppositeColor ||
        board[start[0]][start[1] + 1].type == "n/a"
      ) {
        possibleMoves.push([start[0], start[1] + 1]);
      }
    }

    if (start[0] + 1 < 8 && start[1] + 1 < 8) {
      if (
        board[start[0] + 1][start[1] + 1].color == oppositeColor ||
        board[start[0] + 1][start[1] + 1].type == "n/a"
      ) {
        possibleMoves.push([start[0] + 1, start[1] + 1]);
      }
    }

    if (start[0] - 1 >= 0 && start[1] - 1 >= 0) {
      if (
        board[start[0] - 1][start[1] - 1].color == oppositeColor ||
        board[start[0] - 1][start[1] - 1].type == "n/a"
      ) {
        possibleMoves.push([start[0] - 1, start[1] - 1]);
      }
    }

    if (start[0] + 1 < 8 && start[1] - 1 >= 0) {
      if (
        board[start[0] + 1][start[1] - 1].color == oppositeColor ||
        board[start[0] + 1][start[1] - 1].type == "n/a"
      ) {
        possibleMoves.push([start[0] + 1, start[1] - 1]);
      }
    }

    if (start[0] - 1 >= 0 && start[1] + 1 < 8) {
      if (
        board[start[0] - 1][start[1] + 1].color == oppositeColor ||
        board[start[0] - 1][start[1] + 1].type == "n/a"
      ) {
        possibleMoves.push([start[0] - 1, start[1] + 1]);
      }
    }

    //Castling
    if (
      board[start[0]][start[1]].castlingRights &&
      board[start[0]][start[1] - 1].type == "n/a" &&
      board[start[0]][start[1] - 2].type == "n/a" &&
      board[start[0]][start[1] - 3].type == "n/a" &&
      board[start[0]][start[1] - 4].color == color &&
      board[start[0]][start[1] - 4].type == "rook"
    ) {
      possibleMoves.push([start[0], start[1] - 2]);
    }
    if (
      board[start[0]][start[1]].castlingRights &&
      board[start[0]][start[1] + 1].type == "n/a" &&
      board[start[0]][start[1] + 2].type == "n/a" &&
      board[start[0]][start[1] + 3].color == color &&
      board[start[0]][start[1] + 3].type == "rook"
    ) {
      possibleMoves.push([start[0], start[1] + 2]);
    }
    return possibleMoves;
  };

  //Return all state to its original states.
  const restartGame = () => {
    setPieces(loadPieces());
    setSelected(false);
    setMoveArray([]);
    setPossibleMoves([]);
    setPlayerTurn(initPlayerTurn());
    setCheckmate(false);
    setOpponentMove(false);
  };

  const spawnAlert = () => {
    if (showAlert) {
      Alert.alert("Enemy Forfeit", "You win!", [
        { text: "OK", onPress: () => handleLeave() },
      ]);
    }
  };

  const handleLeave = () => {
    props.socket.emit("player leave");
    props.onPageChange("matchmaking");
  };

  const handleForfeit = () => {
    props.socket.emit("forfeit");
    props.onPageChange("matchmaking");
  };

  return (
    <View style={styles.screen}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={checkmate}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{displayWinner()}</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                restartGame();
              }}
            >
              <Text style={styles.textStyle}>Play Again!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Text style={{ justifyContent: "center" }}>{displayPlayer()}</Text>

      <View style={styles.board}>{createBoard()}</View>
      {spawnAlert()}
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => handleForfeit()}
      >
        <Text style={styles.textStyle}> Forfeit </Text>
      </TouchableOpacity>
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

  touchable: {
    marginBottom: "10%",
    borderWidth: 2,
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
    width: screenWidth / 8,
    height: screenWidth / 8,
  },

  lightSquare: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    width: screenWidth / 8,
    height: screenWidth / 8,
  },

  piece: {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default GameScreen;
