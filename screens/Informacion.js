import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export class Informacion extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>INFORMACION</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
