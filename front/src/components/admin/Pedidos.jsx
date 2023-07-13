import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { cambiarStatusPedido, crearFactura, selectPedidos } from '../../js/admin';
import '../../style/pedidos.css';

const Pedidos = () => {
    const [infoPedidos, setInfoPedidos] = useState([]);

    useEffect(() => {
        selectPedidos(setInfoPedidos);
    }, [infoPedidos.length]);

    const changeStatus = (folio) => {
        cambiarStatusPedido(folio);

        setInfoPedidos(infoPedidos => infoPedidos.filter(ped => ped.Folio !== folio));
        // selectPedidos(setInfoPedidos);
    };

    const generarFactura = (folio) => {
        crearFactura(folio);
        // console.log('Generar Factura');
    };

    let folioAnterior = null; // Variable para almacenar el folio anterior

    return (
        <>
            <Dashboard />

            <h2 className='text-center mt-5'>Pedidos</h2>
            <div className='container-sm mt-2'>

                <div className='table-container text-center'>
                    <div className='table-scroll'>
                        <table className='col-12'>
                            <thead>
                                <tr>
                                    <th scope='col'>Folio Venta</th>
                                    <th scope='col'>Producto</th>
                                    <th scope='col'>Cantidad</th>
                                    <th scope='col'>Precio</th>
                                    <th scope='col'>Subtotal</th>
                                    <th scope='col'>Cliente</th>
                                    <th scope='col'>Telefono</th>
                                    <th scope='col'>Estado</th>
                                    <th scope='col'>Municipio</th>
                                    <th scope='col'>Delegacion</th>
                                    <th scope='col'>Colonia</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col' className='align-middle'>Opciones</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {infoPedidos.map((pedido, index) => {
                                    const esMismoFolio = folioAnterior === pedido.Folio; // Verificar si es el mismo folio
                                    // Actualizar el folio anterior
                                    folioAnterior = pedido.Folio;

                                    return (
                                        <tr key={index} >
                                            <th scope="row" className='align-middle'>
                                                {esMismoFolio ? '' : pedido.Folio}
                                            </th>
                                            <td className='align-middle'>{pedido.Producto}</td>
                                            <td className='align-middle'>{pedido.Cantidad}</td>
                                            <td className='align-middle'>{pedido.Precio}</td>
                                            <td className='align-middle'>{pedido.Subtotal}</td>
                                            <td className='align-middle'>{pedido.Cliente}</td>
                                            <td className='align-middle'>{pedido.Telefono}</td>
                                            <td className='align-middle'>{pedido.Estado}</td>
                                            <td className='align-middle'>{pedido.Municipio}</td>
                                            <td className='align-middle'>{pedido.Delegacion}</td>
                                            <td className='align-middle'>{pedido.Colonia}</td>
                                            <td className={`align-middle ${pedido.Estatus === '1' ? 'proceso' : 'entregado'}`}>
                                                {pedido.Estatus === '1' ? 'En proceso' : 'Entregado'}
                                            </td>
                                            <td className='align-middle'>
                                                <div className='d-flex'>
                                                    {!esMismoFolio && (
                                                        <>
                                                            {pedido.Estatus === '1' ? (
                                                                <button type='button' className='btn btn-danger ms-2' onClick={() => changeStatus(pedido.Folio)}>
                                                                    <i className='fas fa-trash'></i>
                                                                </button>
                                                            ) : (
                                                                <button type='button' className='btn btn-info ms-2' onClick={() => generarFactura(pedido.Folio)}>
                                                                    <i className='fas fa-file-pdf'></i>
                                                                </button>
                                                            )
                                                            }
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div >
                </div >

            </div >
        </>
    )
}

export default Pedidos