import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { eliminarProducto } from '../servicios/ServiciosProductos'
import { TouchableHighlight } from "react-native-gesture-handler";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ItemProducto extends Component {

    render() {
        let { nav, producto } = this.props; //Se recupera con los mismos nombres que mando desde la props
        let { id, nombre, precio } = producto;

        return (<View>
        <TouchableHighlight
            onPress={() => {
                nav.navigate('FormularioProductoScreen', { producto })
            }}>
            <View style={styles.fila}>
                <View style={styles.imagen}>
                    <Text style={styles.textoPrecio}>{id}</Text>
                </View>
                <View style={styles.descripcion}>
                    <Text style={styles.textoDescripcion}>{nombre}</Text>
                </View>
                <View style={styles.precio}>
                    <Text style={styles.textoPrecio}>{precio}</Text>
                </View>
            </View>
        </TouchableHighlight>
        <View style={styles.boton}>
                    <Button style={styles.boton}
                        icon={<Icon
                            name="trash-o"
                            size={15}
                            color="white"
                        />}
                        onPress={() => {
                            eliminarProducto(id);
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