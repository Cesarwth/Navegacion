import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ItemCompra from '../screens/ItemCompra';
import { registrarListener } from '../servicios/ServiciosProductos';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

export class ListaCompras extends Component {
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
      <Text>LISTA DE COMPRAS</Text>

      <FlatList
        data={this.state.listaProductos}
        keyExtractor={key => key.id + ""}
        renderItem={
          ({ item }) => <ItemCompra producto={item}
            nav={this.props.navigation}
          />
        } >
      </FlatList>

      <ActionButton buttonColor='#1abc9c'
        icon={<Icon name="shopping-cart" style={styles.actionButtonIcon} />}
        onPress={() => {
          this.props.navigation.navigate("CarritoComprasScreen");
        }}
      >
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
