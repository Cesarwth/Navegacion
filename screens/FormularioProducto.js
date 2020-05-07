import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { crearProducto } from '../servicios/ServiciosProductos'
import { actualizarProducto } from '../servicios/ServiciosProductos'
import { Avatar } from "react-native-elements";

export class FormularioProducto extends Component {

  constructor(props) {
    super(props);
    if (this.props.route != null && this.props.route.params != null) {
      let producto = this.props.route.params.producto;
      this.state = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio + '',
        url: producto.url,
        esNuevo: false
      }
    } else {
      this.state = {
        id: '',
        nombre: '',
        precio: '',
        url: null,
        esNuevo: true
      }
    }


  }

  onSuccess = () => {
    this.limpiar();
  }

  limpiar = () => {
    this.setState({
      id: '',
      nombre: '',
      precio: '',
      url: null
    })
  }

  recibirUrl = (urlDescarga)=>{
    console.log('Descarga ', urlDescarga)
    this.setState({
      url:urlDescarga
    })
  }

  render() {
    let {url, nombre} = this.state;
    return (
      <View style={styles.container}>
        <Text>FORMULARIO DE PRODUCTO</Text>

        <Avatar
          title={nombre.substring(0, 2)}
          size="xlarge"
          source={url ? { uri: url } : null}
          icon={url ? null : { name: 'user', type: 'font-awesome' }}
        />

        <Button title='Editar imagen'
        onPress={()=>{
          this.props.navigation.navigate("CargarImagenScreen", {fnUrl:this.recibirUrl})
        }}
        />

        <Input
          value={this.state.id}
          onChangeText={(text) => {
            this.setState({ id: text })
          }}
          placeholder='Id'
          disabled={!this.state.esNuevo}
          leftIcon={
            <Icon
              name='list-ol'
              size={24}
              color='black'
            />
          }
        />

        <Input
          value={this.state.nombre}
          onChangeText={(text) => {
            this.setState({ nombre: text })
          }}
          placeholder='Nombre'
          leftIcon={
            <Icon
              name='edit'
              size={24}
              color='black'
            />
          }
        />

        <Input
          value={this.state.precio}
          onChangeText={(text) => {
            this.setState({ precio: text })
          }}
          placeholder='Precio'
          leftIcon={
            <Icon
              name='dollar'
              size={24}
              color='black'
            />
          }
        />

        <Button title='Crear'
          onPress={() => {

            if (this.state.esNuevo) {
              crearProducto({
                id: this.state.id,
                nombre: this.state.nombre,
                precio: parseFloat(this.state.precio),
                url: this.state.url
              }, this.onSuccess)
            } else {
              actualizarProducto({
                id: this.state.id,
                nombre: this.state.nombre,
                precio: parseFloat(this.state.precio),
                url: this.state.url
              }, this.onSuccess)
            }
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
