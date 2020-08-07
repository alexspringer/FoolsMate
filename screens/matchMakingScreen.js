import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";

const MatchMakingScreen = (props) => {
  const [activeGamesList, setActiveGamesList] = useState([]);
  const [newGameName, setNewGameName] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    props.socket.emit("get-active-games");
    props.socket.on("active games", (games) => {
      setActiveGamesList(Object.keys(games));
    });
  }, []);

  const displayGames = () => {
    var component = [];
    var id = 0;
    activeGamesList.forEach(function (game) {
      component.push(
        <TouchableOpacity key={id} onPress={() => handleJoinGame(game)}>
          <Text style={styles.text}>{game}</Text>
        </TouchableOpacity>
      );
      ++id;
    });
    return component;
  };

  const handleNewGame = () => {
    props.socket.emit("create game", newGameName);
    setModalVisible(!modalVisible);
    props.onPageChange("game", "white");
  };

  const handleJoinGame = (gameName) => {
    props.socket.emit("join game", gameName);
    props.onPageChange("game", "black");
  };

  //When another user creates a game, add this to the list of active games.
  props.socket.on("game created", (games) => {
    setActiveGamesList(activeGamesList.concat(games));
  });

  return (
    <View style={styles.screen}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create Game: </Text>
            <TextInput
              onChangeText={(text) => setNewGameName(text)}
              placeholder="Name..."
            />
            <TouchableOpacity
              style={{
                ...styles.openButton,
                backgroundColor: "#2196F3",
                margin: 15,
                padding: 15,
              }}
              onPress={() => {
                handleNewGame();
              }}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.back}>
        <TouchableOpacity onPress={() => props.onPageChange("home")}>
          <Text style={styles.text}> back </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gameContainer}>{displayGames()}</View>
      <View style={styles.myView}>
        <Text style={styles.text}> Chose Game Style</Text>
        <View style={styles.touchable}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.text}> Create Game </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-around",
  },

  myView: {

  },

  gameContainer: {
    alignItems: "center",
  },

  back: {
    position: "absolute",
    top: -230,
    left: -75,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default MatchMakingScreen;
