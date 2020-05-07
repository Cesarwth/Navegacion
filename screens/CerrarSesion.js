import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { cerrarSesion } from '../servicios/ServiciosLogin';

export class CerrarSesion extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>CERRAR SESION</Text>
        <Button title='Aceptar'
        onPress={()=>{
          cerrarSesion();
        }}
        />
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
