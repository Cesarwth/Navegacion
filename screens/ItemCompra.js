import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";

export default class ItemCompra extends Component {

    render() {
        let { nav, producto } = this.props; //Se recupera con los mismos nombres que mando desde la props
        let { id, nombre, precio ,url} = producto;

        return (<TouchableHighlight underlayColor="gray"
            onPress={() => {
                nav.navigate('DetalleProductoScreen', { producto })
            }}>
            <View style={styles.fila}>
                <View style={styles.imagen}>
                <Avatar title={producto.nombre.substring(0, 1)}
                rounded
                source={{
                  uri:producto.url,
                }}
                ></Avatar>
                </View>
                <View style={styles.descripcion}>
                    <Text style={styles.textoDescripcion}>{nombre}</Text>
                </View>
                <View style={styles.precio}>
                    <Text style={styles.textoPrecio}>{precio}</Text>
                </View>
            </View>
        </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    fila: {
        flexDirection: "row", //Eje principal es el horizontal
        flex: 1,
        backgroundColor: "orange",
        marginBottom: 20,
        paddingVertical: 10,
        borderRadius: 40,
        //alignItems: "stretch",     //Aplica al eje transversal, en este caso horizontal
        //justifyContent: "center", //Aplica al eje principal, en este caso vertical
    },

    imagen: {
        flex: 2,
        //backgroundColor: "blue",
        alignItems: "center",
    },
    descripcion: {
        flex: 5,
        //backgroundColor: "green",
        justifyContent: "center",
    },
    precio: {
        flex: 2,
        //backgroundColor: "gray",
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    textoPrecio: {
        fontSize: 20,
        fontWeight: "bold",
        paddingRight: 10
    },
    textoDescripcion: {
        fontSize: 18,
        //paddingLeft:10
    },

});