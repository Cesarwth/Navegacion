import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContext } from '@react-navigation/native';
import { Input } from 'react-native-elements'
import { recuperarClave } from '../servicios/ServiciosLogin'
import Icon from 'react-native-vector-icons/FontAwesome';

export class CambioClave extends Component {
    constructor() {
        super();
        this.state = {
          mail: ''
        }
      }
  static contextType = NavigationContext;

  irLogin = ()=>{
    this.props.navigation.goBack();
  }
  
  render() {
    const navigation = this.context;
    return (
        <View style={styles.container}>
        <Text>CAMBIO CLAVE</Text>

        <Input
          value={this.state.mail}
          onChangeText={(text) => {
            this.setState({ mail: text })
          }}
          placeholder='Mail'
          leftIcon={
            <Icon
              name='envelope-o'
              size={24}
              color='black'
            />
          }
        />

        <Button
          title='Recuperar clave'
          onPress={() => {
            recuperarClave(this.state.mail, this.irLogin);
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