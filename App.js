import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListaCompras } from './screens/ListaCompras';
import { ListaProductos } from './screens/ListaProductos';
import { Direcciones } from './screens/Direcciones';
import { FormularioProducto } from './screens/FormularioProducto';
import { DetalleCompra } from './screens/DetalleCompra';
import { Informacion } from './screens/Informacion';
import { DetalleProducto } from './screens/DetalleProducto';
import { CarritoCompras } from './screens/CarritoCompras';
import { CargarImagen } from './screens/CargarImagen';
import { Mapa } from './screens/Mapa';
import { Login } from './screens/Login';
import { Registarse } from './screens/Registrarse';
import { CambioClave } from './screens/CambioClave';
import { CerrarSesion } from './screens/CerrarSesion';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { cargarConfiguracion } from './servicios/firebaseConfig'
import firebase from "firebase";
import { YellowBox } from "react-native";

let NavStack = createStackNavigator();
let NavTab = createBottomTabNavigator();
let NavDrawer = createDrawerNavigator();

function tabHome() {
    return (
        <NavTab.Navigator>
            <NavTab.Screen
                name='ListaComprasScreen'
                component={ListaCompras}
                options={{
                    tabBarLabel: 'Compras',
                    tabBarIcon: () => {
                        return <Icon
                            name='shopping-cart'
                            type='evilicon'
                            color='#517fa4'
                        />
                    }
                }}
            />
            <NavTab.Screen
                name='ListaProductosScreen'
                component={ListaProductos}
                options={{
                    tabBarLabel: 'Productos',
                    tabBarIcon: () => {
                        return <Icon
                            name='navicon'
                            type='evilicon'
                            color='#517fa4'
                        />
                    }
                }}
            />
            <NavTab.Screen
                name='DireccionesScreen'
                component={Direcciones}
                options={{
                    tabBarLabel: 'Direcciones',
                    tabBarIcon: () => {
                        return <Icon
                            name='map'
                            type='evilicon'
                            color='#517fa4'
                        />
                    }
                }}
            />

        </NavTab.Navigator>
    );
}

function home() {
    return (
        <NavStack.Navigator initialRouteName='TabHome'>
            <NavStack.Screen
                name='TabHome'
                component={tabHome}
                options={{ title: 'Home' }}
            />
            <NavStack.Screen
                name='DetalleCompraScreen'
                component={DetalleCompra}
                options={{ title: 'Detalle compra' }} />
            <NavStack.Screen
                name='FormularioProductoScreen'
                component={FormularioProducto}
                options={{ title: 'Formulario de productos' }} />
            <NavStack.Screen
                name='DetalleProductoScreen'
                component={DetalleProducto}
                options={{ title: 'Detalle de productos' }} />
            <NavStack.Screen
                name='CarritoComprasScreen'
                component={CarritoCompras}
                options={{ title: 'Carrito de compras' }} />
            <NavStack.Screen
                name='CargarImagenScreen'
                component={CargarImagen}
                options={{ title: 'Cargar imagen' }} />
                 <NavStack.Screen
                name='MapaScreen'
                component={Mapa}
                options={{ title: 'Mapa' }} />

        </NavStack.Navigator>
    );
}

export default class App extends Component {
    constructor() {
        //console.disableYellowBox = true; //Hace desaparecer todos los warnings, no recomendable
        YellowBox.ignoreWarnings([
            "Warning: componentWillReceiveProps",
            "Setting a timer "
        ]);
        super();
        this.state = {
            login: false
        }
        if (!global.estaConfigurado) { //Variable global para asegurarnos que no se decloare varias veces
            cargarConfiguracion();
        }
        firebase.auth().onAuthStateChanged((usuario) => {
            if (usuario) {
                console.log('Usuario ', usuario)
                global.mailUsuario = usuario.email
                this.setState({
                    login: true
                })
            } else {
                this.setState({
                    login: false
                })
            }
        })
    }

    render() {
        return (
            <NavigationContainer>
                {
                    this.state.login ? (
                        <NavDrawer.Navigator initialRouteName='Home'>
                            <NavDrawer.Screen
                                name='Home'
                                component={home}
                            />
                            <NavDrawer.Screen
                                name='Informacion'
                                component={Informacion}
                            />
                            <NavDrawer.Screen
                                name='CerrarSesion'
                                component={CerrarSesion}
                            />
                        </NavDrawer.Navigator>
                    ) : (
                            <NavStack.Navigator initialRouteName='Login'>
                                <NavDrawer.Screen
                                    name='Login'
                                    component={Login}>
                                </NavDrawer.Screen>
                                <NavStack.Screen
                                    name='Registarse'
                                    component={Registarse}
                                />
                                <NavStack.Screen
                                    name='CambioClave'
                                    component={CambioClave}
                                />
                            </NavStack.Navigator>
                        )
                }

            </NavigationContainer>
        );
    }

}