import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import GameScreen from "./screens/gameScreen"
import Test from "./screens/test"

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Test/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
