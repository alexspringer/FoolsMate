import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";

const HomeScreen = (props) => {
  return (
      <View>
          <Text>Fool's Mate</Text>
          <Button onPress={() => props.onPageChange("matchmaking")}title="Play"/>
      </View>
  )
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
    },

});

export default HomeScreen;