import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { consultarLista } from '../servicios/ServiciosMapa';
import ItemDireccion from '../screens/ItemDireccion';

export class Direcciones extends Component {

    constructor() {
        super();
        this.state = {
          listaDirecciones: []
        }
      }
    
      pintarLista = (arregloDirecciones) => {
        this.setState({
            listaDirecciones: arregloDirecciones
        });
      }
    
      //Se llama despues del render. orden--> constructor, render, diMount
      componentDidMount() {
        consultarLista(this.pintarLista, global.mailUsuario);
      }

    render() {
        return (<View style={styles.container}>
          <Text>DIRECCIONES</Text>

          <FlatList
          data={this.state.listaDirecciones}
          keyExtractor={key => key.id + ""}
          renderItem={
            ({ item }) => <ItemDireccion direcciones={item}
            nav={this.props.navigation}
            />
          } />

          <Button title='Consultar todos'
            icon={<Icon name="refresh" style={styles.actionButtonIcon} />}
            onPress={() => {
              this.componentDidMount();
            }}
          >
          </Button>

          <ActionButton buttonColor='#33FF96'
            icon={<Icon name="globe" style={styles.actionButtonIcon} />}
            onPress={() => {
              this.props.navigation.navigate("MapaScreen");
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