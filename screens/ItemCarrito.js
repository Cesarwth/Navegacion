import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { agregarItem } from '../servicios/ServiciosCarro'
import { eliminarProducto } from '../servicios/ServiciosCarro'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ItemCarrito extends Component {

    render() {
        let { producto } = this.props; //Se recupera con los mismos nombres que mando desde la props
        let { id, cantidad, nombre, precio, subtotal } = producto;

        return (<View style={styles.fila}>
            <View style={styles.imagen}>
                <Text style={styles.textoPrecio}>{id}</Text>
            </View>
            <View style={styles.descripcion}>
                <Text style={styles.textoDescripcion}>{nombre}</Text>
            </View>
            <View  style={styles.precio}>
                <Text style={styles.textoPrecio}>{precio}</Text>
            </View>

            <View  style={styles.precio}>
                <Text style={styles.textoPrecio}>{cantidad}</Text>
            </View>

            <View  style={styles.precio}>
                <Text style={styles.textoPrecio}>{subtotal}</Text>
            </View>
            <View style={styles.boton}>
            <Button
                    icon={<Icon
                        name="plus"
                        size={15}
                        color="white"
                    />}
                    onPress={() => {
                        agregarItem(global.mailUsuario, producto, 1);
                    }}
                />
                <Text>{cantidad}</Text>
                <Button
                    icon={<Icon
                        name="minus"
                        size={15}
                        color="red"
                    />}
                    onPress={() => { cantidad > 1 ?
                        agregarItem(global.mailUsuario, producto, -1) :
                        eliminarProducto(id,global.mailUsuario)
                    }}
                />
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    fila: {
        flexDirection: "row", //Eje principal es el horizontal
        flex: 1,
        backgroundColor: "green",
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
        flex: 4,
        //backgroundColor: "green",
        justifyContent: "center",
    },
    precio: {
        flex: 2,
        //backgroundColor: "gray",
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    boton: {
        flex: 2,
        //backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center"
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