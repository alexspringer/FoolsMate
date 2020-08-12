import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TimePickerAndroid,
  Alert,
} from "react-native";

const MatchMakingScreen = (props) => {
  const [activeGamesList, setActiveGamesList] = useState([]);
  const [newGameName, setNewGameName] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let timerId = setTimeout(function tick() {
      props.socket.emit("get-active-games");
      props.socket.on("active games", (games) => {
        setActiveGamesList(Object.keys(games));
      });
      timerId = setTimeout(tick, 5000);
    }, 5000);
  }, []);

  props.socket.on("update-active-games", (games) => {});

  const displayGames = () => {
    var component = [];
    var id = 0;
    activeGamesList.forEach(function (game) {
      component.push(
        <TouchableOpacity
          style={styles.touchableGame}
          key={id}
          onPress={() => handleJoinGame(game)}
        >
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
    props.socket.on("join status", (data) => {
      if (data.flag) {
        props.onPageChange("game", "black");
      }
      else{
        Alert.alert(data.serverMessage)
      }
    });
  };

  //When another user creates a game, add this to the list of active games.
  props.socket.on("game created", (games) => {
    setActiveGamesList(activeGamesList.concat(games));
  });

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fool's Mate</Text>
      </View>

      <View style={styles.gameContainer}>
        <Text style={styles.activeGameText}>Active Games</Text>
        {displayGames()}
      </View>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.text}> Create Game </Text>
      </TouchableOpacity>
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
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={(text) => setNewGameName(text)}
                placeholder="Name..."
                style={styles.input}
              />
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={{
                  ...styles.openButton,
                  backgroundColor: "red",
                  margin: 15,
                  padding: 15,
                }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
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
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#4b4d4b",
  },

  touchableGame: {
    borderWidth: 1,
    width: "100%",
    padding: 10,
  },

  header: {
    backgroundColor: "#171717",
    width: "100%",
    height: "10%",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 30,
    marginVertical: "5%",
    textAlign: "center",
    color: "white",
  },

  inputContainer: {
    width: "100%",
    borderBottomWidth: 1,
  },

  input: {
    width: "100%",
    fontSize: 24,
  },

  modalButtonContainer: {
    flexDirection: "row",
    marginTop: "10%",
  },

  gameContainer: {
    marginTop: "10%",
    alignItems: "center",
    width: "100%",
    height: "65%",
  },

  touchable: {
    position: "absolute",
    justifyContent: "center",
    bottom: "10%",
    height: 40,
    width: "50%",
    backgroundColor: "#d9b12e",
    borderRadius: 15,
  },

  text: {
    fontSize: 22,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    color: "white",
  },

  activeGameText: {
    marginVertical: "5%",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    width: "80%",
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
    fontSize: 25,
    marginBottom: "10%",
    textAlign: "center",
  },
});

export default MatchMakingScreen;
