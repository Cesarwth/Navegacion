import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import ItemCarrito from '../screens/ItemCarrito';
import { registrarListener } from '../servicios/ServiciosCarro';
import { vaciarCarrito } from '../servicios/ServiciosCarro';

export class CarritoCompras extends Component {

    constructor() {
        super();
        this.state = {
            listaProductos: [],
            total: 0
        }
    }

    pintarLista = (arregloProductos) => {

        let total = arregloProductos.reduce((a, i) => a + i.subtotal, 0)
        this.setState({
            listaProductos: arregloProductos,
            total: total
        });
    }

    //Se llama despues del render. orden--> constructor, render, diMount
    componentDidMount() {
        registrarListener(this.pintarLista, global.mailUsuario);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Total: {this.state.total}</Text>
                <Text>CARRITO DE COMPRAS</Text>

                <Button title="Vaciar Carrito" 
                onPress={()=>{
                    vaciarCarrito(global.mailUsuario,this.state.listaProductos)
                }}/>

                <FlatList
                    data={this.state.listaProductos}
                    keyExtractor={key => key.id + ""}
                    renderItem={
                        ({ item }) => <ItemCarrito producto={item}
                            nav={this.props.navigation}
                        />
                    } >
                </FlatList>

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
