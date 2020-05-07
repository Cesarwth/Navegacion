import firebase from "firebase";
import { Alert } from "react-native";

export const registrarUsuario = async(email, password, fnIrLogin) => {
    /*firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
            (obj) => {
                console.log('Objeto ', obj.user.email)
                fnIrLogin();
            }
        ).catch(
            (error) => {
                Alert.alert('Error!!', error.message + "----" + error.code)
            }
        );*/

    try {
        let respuesta = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
        console.log('Objeto ', respuesta.user.mail)
    } catch (error) {
        Alert.alert('Error!!', error.message + "----" + error.code)
    }
}

export const recuperarClave = (email, fnIrLogin) => {
    firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(
            (obj) => {
                Alert.alert('Info', 'Ingrese a su correo para restaurar la clave')
                fnIrLogin();
            }
        ).catch(
            (error) => {
                Alert.alert('Error!!', error.message + "----" + error.code)
            }
        );

}

export const validarIngreso = (email, password) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
            (obj) => {
                Alert.alert('Info', 'Usuario registrado correctamente')
            }
        ).catch(
            (error) => {
                Alert.alert('Error!!', error.message + "----" + error.code)
            }

        );
}

export const cerrarSesion = () => {
    firebase
        .auth()
        .signOut().then(
            (obj) => {
                Alert.alert('Info', 'Sesion finalizada')
            }
        ).catch(
            (error) => {
                Alert.alert('Error!!', error.message + "----" + error.code)
            }
        );
}