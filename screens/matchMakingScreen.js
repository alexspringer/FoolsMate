import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";

const MatchMakingScreen = (props) => {
    const [activeGamesList, setActiveGamesList] = useState([]);

    const displayGames = () => {
        activeGamesList.forEach(function(game){
            //create a game room
        });
    };
  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => props.onPageChange("game")}>
          <Text> Game 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text> Game 2</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text> Game 3</Text>
        </TouchableOpacity>
      </View>
      <Button title="Create Game" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default MatchMakingScreen;
