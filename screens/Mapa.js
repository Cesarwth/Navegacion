import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { guardarDireccion } from '../servicios/ServiciosMapa'

export class Mapa extends Component {
    constructor() {
        super();
        Geocoder.init("AIzaSyCqz6cD3FwbEjSl6SedOZOael61Esr_jcE")
        this.state = {
            marcador: { latitude: -0.2627764, longitude: -78.4759949 },
            direccion: ''
        }
    }

    componentDidMount() {
        this.obtenerPosicionActual();
    }

    obtenerPosicionActual = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Error al otorgar el permiso");
        }

        let location = await Location.getCurrentPositionAsync({});
        if (location) {
            this.setState({
                region:
                {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                },
                marcador: { latitude: location.coords.latitude, longitude: location.coords.longitude }
            })
        }
        console.log("Location", location);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.direccion}</Text>
                <MapView style={styles.mapStyle}
                    initialRegion={this.state.region}
                    /*onRegionChange= {(region)=>{
                      this.setState({ marcador:{
                        latitude: region.latitude,
                        longitude: region.longitude
                      }
                      })
                    }}*/
                    onRegionChangeComplete={async (region) => {
                        const direccion = await Geocoder.from(region.latitude, region.longitude)
                        this.setState({ direccion: direccion.results[0].formatted_address })
                        console.log(direccion.results[0].formatted_address)
                    }}
                >
                    <Marker coordinate={this.state.marcador}
                    ></Marker>
                </MapView>
                <ActionButton buttonColor='#FFDA33'
                    icon={<Icon name="save" style={styles.actionButtonIcon} />}
                    onPress={() => {
                        guardarDireccion(global.mailUsuario,{
                            direccion: this.state.direccion,
                            latitud: this.state.marcador.latitude,
                            longitud: this.state.marcador.longitude,
                            estado: 'V'
                        })
                    }}
                >
                </ActionButton>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        marginTop: 150,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});