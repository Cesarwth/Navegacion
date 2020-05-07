import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContext } from '@react-navigation/native';
import { validarIngreso } from '../servicios/ServiciosLogin';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export class Login extends Component {
  static contextType = NavigationContext;

  constructor() {
    super();
    this.state = {
      mail: '',
      password: ''
    }
  }

  render() {
    const navigation = this.context;
    return (
      <View style={styles.container}>
        <Text>LOGIN</Text>
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
        <Button title='Ingresar'
          onPress={() => {
            validarIngreso(this.state.mail, this.state.password);
          }}
        />
        <Button
          title='Registarse'
          onPress={() => {
            navigation.navigate("Registarse");
          }}
        />
        <Button
          title='Recuperar clave'
          onPress={() => {
            navigation.navigate("CambioClave");
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
