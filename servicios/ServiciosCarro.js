import { onError } from '../utils/callBacks'
import { Alert } from 'react-native';

export const agregarItem2 = (mail, itemCompra, value) => {
    global.firestoredb
        .collection("carritos").doc(mail)
        .collection("items").doc(itemCompra.id)
        .get()
        .then(
            (obj) => {
                console.log('Objeto', obj.exists);
                if (obj.exists) {
                    let candidadAtual = obj.data().cantidad
                    global.firestoredb
                        .collection("carritos").doc(mail)
                        .collection("items").doc(itemCompra.id)
                        .update({
                            cantidad: candidadAtual + value,
                            subtotal: (obj.data().cantidad + value) * obj.data().precio
                        })
                        .then((obj) => {})
                        .catch(
                            (error) => {
                                onError(error);
                            }
                        )
                } else {
                    global.firestoredb
                        .collection("carritos").doc(mail)
                        .collection("items").doc(itemCompra.id)
                        .set(itemCompra)
                        .then(
                            (obj) => {
                                Alert.alert('Agregado a carrito')
                            }).catch(
                            (error) => {
                                onError(error);
                            }
                        )
                }
            }
        )
        .catch(
            (error) => {
                onError(error);
            }
        )
        /*global.firestoredb
            .collection("carritos")
            .doc(mail).collection("items").doc(itemCompra.id).set(itemCompra)
            .then(
                (obj) => {
                    //fnOnSuccess();
                }).catch(
                (error) => {
                    onError(error);
                }
            );*/
}

export const agregarItem = async(mail, itemCompra, value) => {
    try {
        let obj = await global.firestoredb
            .collection("carritos").doc(mail)
            .collection("items").doc(itemCompra.id)
            .get();
        console.log('Objeto', obj.exists);
        if (obj.exists) {
            let candidadAtual = obj.data().cantidad
            let respuesta = await global.firestoredb
                .collection("carritos").doc(mail)
                .collection("items").doc(itemCompra.id)
                .update({
                    cantidad: candidadAtual + value,
                    subtotal: (obj.data().cantidad + value) * obj.data().precio
                })
            console.log('Item actualizado');
        } else {
            let respuesta = await global.firestoredb
                .collection("carritos").doc(mail)
                .collection("items").doc(itemCompra.id)
                .set(itemCompra)
            console.log('Agregado a carrito');
        }
    } catch (error) {
        console.log('Error ', error);
    }
}

export const vaciarCarrito = (mail, arregloProducto) => {
    for (let i = 0; i < arregloProducto.length; i++) {
        const elemento = arregloProducto[i].id;
        eliminarProducto(elemento, mail);
    }
}

export const buscarProducto = (producto, arregloProducto) => {
    for (let i = 0; i < arregloProducto.length; i++) {
        if (arregloProducto[i].id === producto.id) {
            return i;
        }
    }
    return -1;
}

export const eliminarProducto = (id, mail) => {
    global.firestoredb
        .collection("carritos").doc(mail).collection("items")
        .doc(id)
        .delete() //Se elimina objeto
        .then(
            (obj) => {
                //fnOnSuccess();
            }).catch(
            (error) => {
                onError(error);
            }
        );
}

export const eliminarListaProducto = (producto, arregloProducto) => {
    let indice = buscarProducto(producto, arregloProducto);
    if (indice !== -1) {
        arregloProducto.splice(indice, 1);
    }
}

export const actualizarListaProducto = (producto, arregloProducto) => {
    let indice = buscarProducto(producto, arregloProducto);
    if (indice !== -1) {
        arregloProducto[indice] = producto;
    }
}

export const registrarListener = (fnPintarLista, mail) => {
    let productos = [];

    global.firestoredb
        .collection("carritos").doc(mail).collection("items")
        .onSnapshot((snapshotCambios) => {
            let cambios = snapshotCambios.docChanges();
            let cambio;
            for (let i = 0; i < cambios.length; i++) {
                cambio = cambios[i];
                if (cambio.type == 'added') {
                    //Alert.alert('Added')
                    productos.push(cambio.doc.data())
                } else if (cambio.type == 'removed') {
                    //Alert.alert('Removed')
                    eliminarListaProducto(cambio.doc.data(), productos)
                } else if (cambio.type == 'modified') {
                    //Alert.alert('Modified')
                    actualizarListaProducto(cambio.doc.data(), productos)
                }
            }
            fnPintarLista(productos);
        })
}