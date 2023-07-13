import axios from 'axios';
// const fs = require('fs');

const URI = 'http://localhost:3002'

export const imagenesCarrusel = async (setImage) => {
    try {
        const response = await axios.get(`${URI}/carrusel`);
        const imageFiles = response.data;
        // console.log(response);
        // console.log(setImageFiles);
        setImage(imageFiles);
    } catch (error) {
        console.log('Error al obtener los nombres de las imagenes', error);
    }
}

export const selectProductos = async (setInfoProductos) => {
    const result = (await axios.get(`${URI}/productos/cliente`)).data;
    // console.log(result)
    setInfoProductos(result);
};

export const selectAProducto = async (clave, setInfoProducto, setImages, setProdSimilar) => {
    // console.log(clave.clave);

    // Obtiene informacion del producto
    const result = (await axios.get(`${URI}/productos/${clave.clave}`)).data[0];
    setInfoProducto(result);
    // console.log(result);

    // Obtiene imagen
    const imagen = await axios.get(`${URI}/imagen/${result.Imagen}`, {
        responseType: 'blob',
    });

    const reader = new FileReader();
    reader.onloadend = () => {
        const base64Image = reader.result;
        // obj.setImage(base64Image);
        setImages(base64Image)
    };

    reader.readAsDataURL(imagen.data);

    // Obtenemos los productos que tengan la misma categoria
    // console.log(result.Categoria);
    const products_categoria = (await axios.get(`${URI}/productos/categoria/${result.Categoria}`)).data;
    // console.log(products_categoria);
    setProdSimilar(products_categoria);

    // console.log(products_categoria[0].Imagen);
    // const imagesCategoria = [];
    for (let i = 0; i < products_categoria.length; i++) {
        const imagen = products_categoria[i].Imagen;
        const imagenProducto = await axios.get(`${URI}/imagen/${imagen}`, {
            responseType: 'blob',
        });
        // console.log(imagen);
        const readerProducto = new FileReader();
        readerProducto.onloadend = () => {
            const base64ImageProducto = readerProducto.result;
            const updatedProducto = { ...products_categoria[i], ImageBase64: base64ImageProducto };
            products_categoria[i] = updatedProducto; // Actualizar el objeto en el array
            if (i === products_categoria.length - 1) {
                setProdSimilar([...products_categoria]); // Actualizar el estado con el arreglo actualizado
                // console.log(products_categoria);
            }
        };

        readerProducto.readAsDataURL(imagenProducto.data);
    }
    // console.log(imagesCategoria);
};

export const getImageProduct = async (producto) => {
    try {
        const imagen = await axios.get(`${URI}/imagen/${producto}.png`, {
            responseType: 'blob',
        });

        const reader = new FileReader();
        const promise = new Promise((resolve) => {
            reader.onloadend = () => {
                const base64Image = reader.result;
                resolve(base64Image);
            };
        });

        reader.readAsDataURL(imagen.data);

        return promise;
    } catch (error) {
        console.error('Error al obtener la imagen', error);
        return null;
    }
};