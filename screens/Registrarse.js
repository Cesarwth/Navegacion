import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { Input } from 'react-native-elements'
import { registrarUsuario } from '../servicios/ServiciosLogin'
import Icon from 'react-native-vector-icons/FontAwesome';

export class Registarse extends Component {
  constructor() {
    super();
    this.state = {
      mail: '',
      password: ''
    }
  }

  irLogin = ()=>{
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>REGISTRAR</Text>

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
        <Input
          value={this.state.password}
          onChangeText={(text) => {
            this.setState({ password: text })
          }}
          placeholder='Password'
          secureTextEntry={true}
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='black'
            />
          }
        />

        <Button
          title='Registrarse'
          onPress={() => {
            registrarUsuario(this.state.mail, this.state.password, this.irLogin);
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
