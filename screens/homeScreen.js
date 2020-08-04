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
          <Text style={styles.text}>Fool's Mate</Text>
          <Button onPress={() => props.onPageChange("matchmaking")}title="Play"/>
      </View>
  )
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
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

export default HomeScreen;