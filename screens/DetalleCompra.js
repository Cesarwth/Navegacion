import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export class DetalleCompra extends Component {
  render() {
    let { nav, producto } = this.props; //Se recupera con los mismos nombres que mando desde la props
    let { id, nombre, precio } = producto;

    return (<View>
      <Text>{id} {nombre}</Text>
      <Text>{precio}</Text>
    </View>

    )

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
