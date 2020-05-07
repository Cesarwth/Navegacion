import { onError } from '../utils/callBacks'

export const crearProducto = async(producto, fnOnSuccess) => {
    /*global.firestoredb
        .collection("productos") //accedo a la coleccion de productos
        .doc(producto.id).set(producto) //Se accede mediante el id que llega en el objeto, y creao el objeto con los campos, si no existe crea la coleccion, si existe sobre el documento pisa la informacion con el nuevo objeto //set permite crear o reemplazar/pisa completamente el objeto
        .then(
            (obj) => {
                fnOnSuccess();
            }).catch(
            (error) => {
                onError(error);
            }
        );*/

    try {
        let creacion = await global.firestoredb
            .collection("productos")
            .doc(producto.id).set(producto);
        fnOnSuccess();
        console.log('Producto creado')
    } catch (error) {
        onError(error);
    }
}

export const eliminarProducto = (id) => {
    global.firestoredb
        .collection("productos") //accedo a la coleccion de productos
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

export const actualizarProducto = (producto, fnOnSuccess) => {
    global.firestoredb
        .collection("productos") //accedo a la coleccion de productos
        .doc(producto.id)
        .update({ nombre: producto.nombre, precio: producto.precio, url: producto.url })
        .then(
            (obj) => {
                fnOnSuccess();
            }).catch(
            (error) => {
                onError(error);
            }
        );
}

export const buscarProducto = (producto, arregloProducto) => {
    for (let i = 0; i < arregloProducto.length; i++) {
        if (arregloProducto[i].id === producto.id) {
            return i;
        }
    }
    return -1;
}

export const actualizarListaProducto = (producto, arregloProducto) => {
    let indice = buscarProducto(producto, arregloProducto);
    if (indice !== -1) {
        arregloProducto[indice] = producto;
    }
}

export const eliminarListaProducto = (producto, arregloProducto) => {
    let indice = buscarProducto(producto, arregloProducto);
    if (indice !== -1) {
        arregloProducto.splice(indice, 1);
    }
}

export const registrarListener = (fnPintarLista) => {
    let productos = [];

    global.firestoredb
        .collection("productos")
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