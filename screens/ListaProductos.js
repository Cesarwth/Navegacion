import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ActionButton from 'react-native-action-button';
import ItemProducto from '../screens/ItemProducto';
import { registrarListener } from '../servicios/ServiciosProductos';

export class ListaProductos extends Component {

  constructor() {
    super();
    this.state = {
      listaProductos: []
    }
  }

  pintarLista = (arregloProductos) => {
    this.setState({
      listaProductos: arregloProductos
    });
  }

  //Se llama despues del render. orden--> constructor, render, diMount
  componentDidMount() {
    registrarListener(this.pintarLista);
  }

  render() {
    return (<View style={styles.container}>
        <Text>LISTA DE PRODUCTOS</Text>

        <FlatList
          data={this.state.listaProductos}
          keyExtractor={key => key.id + ""}
          renderItem={
            ({ item }) => <ItemProducto producto={item}
            nav={this.props.navigation}
            />
          } >

          </FlatList>

        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {
            this.props.navigation.navigate("FormularioProductoScreen");
          }}>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column", //Eje principal es el vertical
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",     //Aplica al eje transversal, en este caso horizontal
    justifyContent: "center", //Aplica al eje principal, en este caso vertical
  },
});
