import React, { useEffect, useState } from 'react'
import '../style/Carrito.module.css';
import Navbar from './Navbar';
import { getCookie, setCookie, terminarCompra } from '../js/comprar';
import { getImageProduct } from '../js/productos';

const Carrito = () => {
    const [productos, setProductos] = useState([]);
    const [images, setImage] = useState([]);

    useEffect(() => {
        // console.log(getCookie('productos'));
        const productosCookie = getCookie('productos');

        if (productosCookie) {
            // Parsear el contenido de la cookie a un objeto
            const productosData = JSON.parse(productosCookie);
            // console.log(productosData);
            setProductos(productosData);

            const clavesProductos = productosData.map((producto) => producto.clave);

            // Creamos un objeto para asociar las claves de productos con las imágenes correspondientes
            const imagesPromises = {};

            for (const clave of clavesProductos) {
                if (!imagesPromises[clave]) {
                    // Almacenamos las promesas de las imágenes en el objeto imagesPromises
                    imagesPromises[clave] = getImageProduct(clave);
                }
            }

            // Esperamos a que se resuelvan todas las promesas
            Promise.all(Object.values(imagesPromises)).then((resolvedImages) => {
                // Creamos un objeto para asociar las claves de productos con las imágenes en formato base64
                const imagesMap = {};

                // Asignamos las imágenes resueltas al objeto imagesMap utilizando las claves correspondientes
                clavesProductos.forEach((clave, index) => {
                    imagesMap[clave] = resolvedImages[index];
                });

                setImage(imagesMap);
            });
        }
    }, []);

    const finalizarCompra = () => {
        terminarCompra(productos);
        // console.log(productos);
        setProductos([]);
        // const productosCookie = getCookie('productos');
        document.cookie = 'productos=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // console.log(getCookie('username'));
    };

    const deleteProduct = (index) => {
        // console.log(index);

        const updatedProducts = [...productos];
        const deletedProduct = updatedProducts.splice(index, 1)[0];
        // console.log(deletedProduct);
        setProductos(updatedProducts);

        const productosCookie = getCookie('productos');
        if (productosCookie) {
            const productosData = JSON.parse(productosCookie);
            const updatedCookie = productosData.filter(producto => producto.clave !== deletedProduct.clave);
            const cookieValue = JSON.stringify(updatedCookie);
            setCookie('productos', cookieValue, 30);
        }
    };

    return (
        <>
            <Navbar />
            {/* Carrito */}
            {productos && productos.length > 0 ? (

                <div className="resumen-compra">
                    <h2 className='text-center mt-3 mb-4'>Resumen de compra</h2>
                    <div className='container-sm align-items-center justify-content-center'>
                        {productos.map((producto, index) => (
                            <div className="card col-12 mb-4" key={index}>
                                <div className="row g-0">
                                    <div className="col-md-4 text-center">
                                        {images[producto.clave] && (
                                            <img
                                                src={images[producto.clave]}
                                                className="card-img-top"
                                                alt={producto.producto}
                                                style={{ width: '160px' }}
                                            />
                                        )}
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">{producto.producto}</h5>
                                            <p className="card-text">Cantidad: {producto.cantidad}</p>
                                            <p className="card-text">Precio: {producto.precio}</p>
                                            <button className="btn btn-danger" onClick={() => deleteProduct(index)}>Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="container-sm mt-4">
                        <div className='d-flex justify-content-end col-11'>
                            <div className="alert alert-info total" role='alert'>
                                <span className="total-label me-5">Total a pagar:</span>
                                <span className="total-amount ms-5">
                                    ${productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0)
                                        .toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>

                        </div>
                        <div className='d-flex justify-content-center'>
                            <button className='btn btn-success col-3' onClick={finalizarCompra}>Finalizar Compra</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='container-sm mt-4'>
                    <div className="alert alert-primary" role="alert">
                        No hay productos en el carrito!
                    </div>
                </div>
            )}

        </>
    )
}

export default Carrito