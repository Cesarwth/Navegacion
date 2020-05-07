import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListaCompras } from './screens/ListaCompras';
import { ListaProductos } from './screens/ListaProductos';
import { FormularioProducto } from './screens/FormularioProducto';
import { DetalleCompra } from './screens/DetalleCompra';
import { Informacion } from './screens/Informacion';
import { Login } from './screens/Login';
import { Registarse } from './screens/Registrarse';
import { CambioClave } from './screens/CambioClave';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { cargarConfiguracion } from './servicios/firebaseConfig'
import firebase from "firebase";

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
                            name='cart'
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

        </NavStack.Navigator>
    );
}

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            login: false
        }
        if (!global.estaConfigurado) { //Variable global para asegurarnos que no se decloare varias veces
            cargarConfiguracion();
        }
        firebase.auth().onAuthStateChanged((usuario)=>{
            if (usuario){
                this.setState ({
                    login: true
                })
            } else{
                this.setState ({
                    login: false
                })
            }
        })
    }

    cambiarEstado = () => {
        this.setState({
            login: true
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
                        </NavDrawer.Navigator>
                    ) : (
                            <NavStack.Navigator>
                                <NavDrawer.Screen name='Login'>
                                    {() => {
                                        return (
                                            <Login
                                                fnCambiarEstado={this.cambiarEstado}
                                            />
                                        )
                                    }}
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