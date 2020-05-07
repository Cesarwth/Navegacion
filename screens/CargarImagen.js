import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Alert } from 'react-native';
import { Button } from 'react-native-elements';

export class CargarImagen extends Component {

    constructor() {
        super();
        this.state = {
            imagen: null,
            nombreArchivo: ''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Cargar Imagen</Text>
                <Avatar title='imagen'
                    size="xlarge"
                    rounded
                    source={{ uri: this.state.imagen }}
                />
                <Button title='Cargar'
                    onPress={() => {
                        this.abrirImagen();
                    }}
                />

                <Button title='Guardar'
                    onPress={() => {
                        this.guardarStorage();
                    }}
                />

            </View>
        )
    }

    abrirImagen = async () => {
        let permissionResult;
        try {
            permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        } catch (err) {
            Alert.alert("error");
        }
        if (permissionResult.granted === false) {
            Alert.alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (!pickerResult.cancelled) {
            console.log("URI:", pickerResult.uri);
            this.setState({ imagen: pickerResult.uri });
        }
    };

    uriToBlob = (dataUrl, callback) => {
        let req = new XMLHttpRequest();
        req.open("GET", dataUrl, true);
        req.responseType = "blob";
        req.onload = () => {
            callback(req.response);
        };
        req.onerror = (error) => {
            console.log("error", error);
        };
        req.send(null);
    };

    guardarStorage = () => {
        this.uriToBlob(this.state.imagen,
            async (blob) => {
                let nombreArchivo = new Date().getTime();
                try{
                    let obj = await global.storage.ref().child("/Imagenes/" + nombreArchivo).put(blob);
                }catch(error){
                    console.log('Entrando a error: ',error)
                }
                
                //console.log('Imagen Subida', obj)
                this.recuperarUrlDescarga(nombreArchivo);
            });
    }

    recuperarUrlDescarga = async (nombreArchivo) => {
        let urlDescarga = await global.storage
            .refFromURL("gs://reactnative-a818c.appspot.com/Imagenes/" + nombreArchivo)
            .getDownloadURL();
            this.props.route.params.fnUrl(urlDescarga);
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