import { onError } from '../utils/callBacks'
import { Alert } from 'react-native';

export const guardarDireccion = async(mail, direccion) => {
    try {
        let respuesta = await global.firestoredb
            .collection("direcciones").doc(mail)
            .collection("puntos")
            .add(direccion)
        console.log('Direccion agregada', respuesta);
        Alert.alert('Direccion agregada');
    } catch (error) {
        console.log('Error ', error);
    }
}

export const actualizarDireccion = async(id, mail) => {
    try {
        let obj = await global.firestoredb
            .collection("direcciones").doc(mail)
            .collection("puntos").doc(id)
            .get();
        console.log('Objeto', obj.exists);
        if (obj.exists) {
            let respuesta = await global.firestoredb
                .collection("direcciones").doc(mail)
                .collection("puntos").doc(id)
                .update({
                    estado: 'E'
                })
            console.log('Item actualizado');
        }
    } catch (error) {
        console.log('Error ', error);
    }
}

export const buscarDireccion = (id, arregloProducto) => {
    for (let i = 0; i < arregloProducto.length; i++) {
        if (arregloProducto[i].id === id) {
            return i;
        }
    }
    return -1;
}

export const eliminarListaDirecciones = (id, arregloDirecciones) => {
    let indice = buscarDireccion(id, arregloDirecciones);
    if (indice !== -1) {
        arregloDirecciones.splice(indice, 1);
    }
}

export const actualizarListaDirecciones = (direccion, arregloDirecciones) => {
    let indice = buscarDireccion(direccion.id, arregloDirecciones);
    if (indice !== -1) {
        arregloDirecciones[indice] = direccion;
    }
}

export const consultarLista = (fnPintarLista, mail) => {
    global.firestoredb
        .collection("direcciones").doc(mail).collection("puntos")
        .get()
        .then(
            async(info) => {
                let direccion = await global.firestoredb
                    .collection("direcciones").doc(mail)
                    .collection("puntos")
                    .get();

                direccion.forEach(function(doc) {
                    let direccion = [];
                    global.firestoredb
                        .collection("direcciones").doc(mail).collection("puntos")
                        .where("estado", "==", "V")
                        .onSnapshot((snapshotCambios) => {
                            let cambios = snapshotCambios.docChanges();
                            let cambio;
                            for (let i = 0; i < cambios.length; i++) {
                                cambio = cambios[i];
                                if (cambio.type == 'added') {
                                    direccion.push({
                                        id: cambio.doc.id,
                                        estado: cambio.doc.data().estado,
                                        direccion: cambio.doc.data().direccion,
                                        latitud: cambio.doc.data().latitud,
                                        longitud: cambio.doc.data().longitud
                                    })
                                } else if (cambio.type == 'removed') {
                                    eliminarListaDirecciones(cambio.doc.id, direccion)
                                } else if (cambio.type == 'modified') {
                                    actualizarListaDirecciones({
                                        id: cambio.doc.id,
                                        estado: cambio.doc.data().estado,
                                        direccion: cambio.doc.data().direccion,
                                        latitud: cambio.doc.data().latitud,
                                        longitud: cambio.doc.data().longitud
                                    }, direccion)
                                }
                            }
                            fnPintarLista(direccion);
                        })
                })
            }
        )
        .catch(
            (error) => {
                onError(error);
            }
        )
}