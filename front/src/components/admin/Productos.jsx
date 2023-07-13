import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard'
import { deleteProducto, selectProductos } from '../../js/admin.js';
import '../../style/productos.css';


const Productos = () => {
    const URI = 'http://localhost:3002';
    const [infoProductos, setInfoProductos] = useState([]);

    useEffect(() => {
        selectProductos(setInfoProductos);
    }, []);

    const eliminarProducto = async (clave) => {
        // console.log(clave);
        // console.log(infoProductos);
        await deleteProducto(clave);
        await selectProductos(setInfoProductos);

    };

    return (
        <>
            <Dashboard />
            <div className='container-sm mt-4'>

                {/* Boton agregar nuevo mueble */}
                <button type='button' className='btn col-2'>
                    <Link to={"/gestionar/registrar/producto"}
                        className='btn btn-outline-danger text-decoration-none pt-2 pe-4'
                        style={{ "fontSize": "24px" }}>
                        <i className="fa fa-plus-square" ></i>
                        Agregar
                    </Link>
                </button>

                <div className='text-center mb-4'>
                    <h2>Listado de muebles</h2>
                </div>
                {/* Tabla muebles */}
                <div className='table-container'>
                    <div className='table-scroll'>
                        <table className='col-12'>
                            <thead className='text-center'>
                                <tr>
                                    <th scope='col'>Clave Producto</th>
                                    <th scope='col'>Producto</th>
                                    <th scope='col'>Imagen</th>
                                    <th scope='col'>Precio</th>
                                    <th scope='col'>Promocion</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col' className='align-middle'>Opciones</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {infoProductos.map((producto) => (
                                    // console.log(producto),
                                    <tr key={producto.Clave_Producto}>
                                        <th scope="row" className='align-middle text-center'>{producto.Clave_Producto}</th>
                                        <td className='align-middle'>{producto.Producto}</td>
                                        <td className='align-middle'>{producto.Imagen ? <img src={URI + '/img/' + producto.Imagen} alt={producto.Producto} height={100} /> : ''}</td>
                                        <td className='align-middle'>{producto.Precio}</td>
                                        <td className='align-middle'>{producto.Promocion}</td>
                                        <td className={`align-middle text-center ${producto.Activo === '1' ? 'activo' : 'inactivo'}`}>{producto.Activo === '1' ? 'Activo' : 'Inactivo'}</td>
                                        <td className='align-middle'>
                                            <div className='d-flex justify-content-center'>
                                                <Link to={`/gestionar/actualizar/producto/${producto.Clave_Producto}`} type='button' className='btn btn-success'>
                                                    <i className='fas fa-edit'></i>
                                                </Link>
                                                <button type='button' className='btn btn-danger ms-2' onClick={() => eliminarProducto(producto.Clave_Producto)}>
                                                    <i className='fas fa-trash'></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div >

                </div>
            </div>
        </>
    )
}

export default Productos