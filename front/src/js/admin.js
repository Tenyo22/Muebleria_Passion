import axios from 'axios';
import Swal from 'sweetalert2';

const URI = 'http://localhost:3002';

export const selectPromociones = async (setPromociones) => {
    const result = (await axios.get(`${URI}/promociones`)).data;
    setPromociones(result);

};

export const selectProductos = async (setInfoProductos) => {
    const result = (await axios.get(`${URI}/productos`)).data;
    // console.log(result)
    setInfoProductos(result);
};

export const validateImage = (image) => {
    if (!image) {
        // console.log("Seleccione una imagen");
        Swal.fire({
            icon: 'warning',
            title: 'Image...',
            text: 'Seleccione una imagen!'
        })
        return true;
    }
};

export const validatePrecio = (precio) => {
    if (isNaN(parseFloat(precio))) {
        Swal.fire({
            icon: 'warning',
            title: 'Precio Inválido',
            text: 'Por favor, ingrese un precio válido.'
        });
        return true
    }
    return false;
}

export const validateDatos = (datos) => {
    // Valida que los campos no esten vacios
    for (let campo in datos) {
        if (datos.hasOwnProperty(campo) && datos[campo].length === 0) {
            // console.log(datos);
            Swal.fire({
                icon: 'warning',
                title: `${campo.toUpperCase()} FALTANTE!`,
                text: 'Por favor, complete el campo!'
            })
            return true; // Retorna true si encuentra algún campo vacío
        }
    }
    // console.log(datos)
    return false; // Retorna false si no encuentra campos vacíos

};

export const saveImage = (image) => {
    // Guarda imagen en directorio del servidor
    const formData = new FormData();
    formData.append('file', image);

    fetch(`${URI}/upload/image`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(`Imagen ${data.imagenName} Subida correctamente!`);
            // Acciones despues de subir la imagen
        })
        .catch(error => {
            console.log('Error al subir la imagen: ', error);
        });
};

export const agregarProducto = async (data) => {
    // console.log(data);
    // Realiza peticion para guardar informacion del producto
    try {


        const result = (await axios.post(`${URI}/productos`, {
            claveProducto: data.claveProducto, nombreProducto: data.nombreProducto,
            descripcionProd: data.descripcion, imagePath: data.imgg, precio: data.precio,
            promocion: data.selectedPromocion, categoria: data.selectedCategoria
        })).data;

        // Mensaje a usuario
        if (result[0]) {
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registro Agregado con Exito!',
                showConfirmButton: false,
                timer: 1500
            })
        }
        window.location.href = 'http://localhost:3000/gestionar/productos';
    } catch (error) {
        console.error(error)
    }
};


export const actualizarProducto = async (obj) => {
    // console.log(obj)
    try {
        // Actualizamos imagen en directorio
        await axios.post(`${URI}/actualizar/image`, {
            imageData: obj.preview,
            claveProd: obj.claveProducto
        });
        // console.log(result);

        // console.log(obj.claveProducto, obj.nombreProducto, obj.descripcion, obj.claveProducto + '.png', obj.precio, obj.selectedPromocion, obj.selectedCategoria);
        await axios.post(`${URI}/actualizar/producto`, {
            claveProd: obj.claveProducto,
            producto: obj.nombreProducto,
            descripcion: obj.descripcion,
            imagen: obj.claveProducto + '.png',
            precio: obj.precio,
            promocion: obj.selectedPromocion,
            categoria: obj.selectedCategoria
        });
        // console.log(result);
        await Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro Actualizado con Exito!',
            showConfirmButton: false,
            timer: 800
        })
        window.location.href = 'http://localhost:3000/gestionar/productos';
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Algo salio mal al guardar los datos!',
            showConfirmButton: false,
            timer: 1500
        })
    }

};

export const deleteProducto = async (clave) => {
    try {
        const result = (await axios.delete(`${URI}/productos/${clave}`)).data[0];
        if (result) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: result.result,
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteImage = async (image) => {
    try {
        const result = (await axios.delete(`${URI}/delete/image/${image}`)).data;
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

export const buscarProducto = async (clave, obj) => {
    const result = (await axios.get(`${URI}/productos/${clave}`)).data[0];
    obj.setNombreProducto(result.Producto);
    obj.setDescripcion(result.Descripcion);
    obj.setPrecio(result.Precio);
    obj.setImage(result.Imagen);
    // console.log(result);
    obj.setSelectedPromocion(result.Promocion_ID);
    obj.setSelectedCategoria(result.Categoria_ID);

    const imagen = await axios.get(`${URI}/imagen/${result.Imagen}`, {
        responseType: 'blob',
    });

    const reader = new FileReader();
    reader.onloadend = () => {
        const base64Image = reader.result;
        // obj.setImage(base64Image);
        obj.setPreview(base64Image)
    };

    reader.readAsDataURL(imagen.data);

    // obj.setImage(`data:image/png;base64,${base64Image}`);
    // console.log(imagen);
    // console.log(result);
};

export const selectPedidos = async (setInfoPedidos) => {
    const result = (await axios.get(`${URI}/pedidos`)).data;

    setInfoPedidos(result);
};

export const cambiarStatusPedido = async (folio) => {
    const result = (await axios.delete(`${URI}/pedidos/${folio}`)).data[0];
    if (result && result.result === 'Pedido Finalizado con Exito!') {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: result.result,
            showConfirmButton: false,
            timer: 1500
        })
    }
};

export const crearFactura = async (folio) => {
    // console.log('Generar Factura', folio);
    try {
        var result = (await axios.get(`${URI}/factura/productos/${folio}`)).data;
        // console.log(result);

        result = (await axios.get(`${URI}/factura/cliente/${folio}`)).data;
        // console.log(result);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: result.message,
            showConfirmButton: false,
            timer: 1000
        })
    } catch (error) {
        console.log(error);
    }
};