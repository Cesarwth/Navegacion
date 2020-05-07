import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { ListaCompras} from './screens/ListaCompras';
import { ListaProductos} from './screens/ListaProductos';
import { FormularioProducto } from './screens/FormularioProducto';
import { DetalleCompra } from './screens/DetalleCompra';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'

let NavStack=createStackNavigator();
let NavTab = createBottomTabNavigator();

function tabProducto(){
    return(
        <NavStack.Navigator initialRouteName='ListaProductosScreen'>
            <NavStack.Screen 
                    name='ListaProductosScreen' 
                    component={ListaProductos} 
                    options={{title:'Lista productos'}}/>
            <NavStack.Screen 
                    name='FormularioProductoScreen' 
                    component={FormularioProducto} 
                    options={{title:'Formulario de productos'}}/>
        </NavStack.Navigator>
    );
  }

function tabCompra(){
    return(
        <NavStack.Navigator initialRouteName='ListaComprasScreen'>
            <NavStack.Screen 
                    name='DetalleCompraScreen' 
                    component={DetalleCompra} 
                    options={{title:'Detalle compra'}}/>
            <NavStack.Screen 
                    name='ListaComprasScreen' 
                    component={ListaCompras} 
                    options={{title:'Lista de compras'}}/>
        </NavStack.Navigator>
    );
}

export function App() {
    return ( 
        <NavigationContainer>
        <NavTab.Navigator>
            <NavTab.Screen
                name='ListaComprasScreen'
                component={tabCompra} 
                options={{tabBarLabel:'Compras', 
                tabBarIcon:()=>{return <Icon
                    name='cart'
                    type='evilicon'
                    color='#517fa4'
                  /> }}}
            />
            <NavTab.Screen 
                name='ListaProductosScreen' 
                component={tabProducto} 
                options={{tabBarLabel:'Productos',
                tabBarIcon:()=>{return <Icon
                    name='navicon'
                    type='evilicon'
                    color='#517fa4'
                  />  }}}
            />
            
        </NavTab.Navigator>

        </NavigationContainer>
    );
}