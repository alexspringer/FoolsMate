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
      <View style={styles.back}>
        <TouchableOpacity onPress={() => props.onPageChange("home")}>
          <Text style={styles.text}> back </Text>
        </TouchableOpacity>
      </View>
      <View style= {styles.myView}>
        <Text style= {styles.text}> Chose Game Style</Text>
        <View style= {styles.touchable}>
          <TouchableOpacity onPress={() => props.onPageChange("game")}>
            <Text style={styles.text}> Local Game </Text>
          </TouchableOpacity>
        </View>
        <View style= {styles.touchable}>
          <TouchableOpacity onPress={() => alert("Online Game Place Holder")}>
            <Text style={styles.text}> Online Game </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  menu: {
    alignContent:'center'
  },

  back: {
    position: 'absolute',
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
    fontWeight: 'bold',
    alignItems: 'center',
  }
});

export default MatchMakingScreen;
