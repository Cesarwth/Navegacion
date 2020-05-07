import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { agregarItem } from '../servicios/ServiciosCarro';
import Icon from 'react-native-vector-icons/FontAwesome';

export class DetalleProducto extends Component {

    render() {
        //let { producto } = this.props;
        let producto = this.props.route.params.producto;

        return (<View style={styles.container}>
            <View style={styles.imagen}>
                <Avatar title={producto.nombre.substring(0, 1)}
                rounded
                source={{
                  uri:producto.url,
                }}
                ></Avatar>
            </View>
            <View style={styles.texto}>
                <Text>{producto.nombre}</Text>
                <Text>{producto.precio}</Text>
            </View>
            <View style={styles.botones}>
                <Button title='Agregar a carrito'
                    icon={<Icon
                        name='shopping-Cart'
                        type='evilicon'
                        color='#517fa4'
                    />}
                    onPress={()=>{
                        agregarItem(global.mailUsuario,{cantidad:1,id:producto.id,nombre:producto.nombre,
                        precio:producto.precio},1);
                    }}
                />
            </View>
        </View >

        )

    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "stretch",
        justifyContent: "flex-start",
    },

    imagen: {
        flex: 4,
        backgroundColor: "blue",
    },
    texto: {
        flex: 3,
        backgroundColor: "orange",
    },
    botones: {
        flex: 2,
        backgroundColor: "green",
    },
});