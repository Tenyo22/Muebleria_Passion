import React, { useState } from 'react'
import Navbar from './Navbar'
import { createCliente } from '../js/login';

const DatosUsuario = () => {
    var username = document.cookie
        .split('; ')
        .find(row => row.startsWith('username='))
        ?.split('=')[1];

    // console.log(username);
    var isLoggedIn = !!username;

    const [formData, setFormData] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        telefono: '',
        fechaNacimiento: '',
        usuario: '',
        estado: '',
        municipio: '',
        codigoPostal: '',
        delegacion: '',
        colonia: '',
        calle: '',
        numeroInterior: '',
        numeroExterior: '',
    });

    // Manejar el cambio en los campos del formulario
    const cambiarValue = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // console.log(formData);
    };

    const registroInformacion = (e) => {
        e.preventDefault();
        formData.usuario = username;

        createCliente(formData);

        console.log(formData);
    };

    return (
        <>
            {isLoggedIn ? (
                <>
                    <Navbar />
                    <div className='container-sm mt-3'>
                        <h2 className='text-center mb-4'>Registro de Información</h2>

                        <form onSubmit={registroInformacion}>

                            {/* Nombre y Primer Apellido*/}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Nombre</span>
                                        <input type="text" className="form-control" placeholder="Nombre" aria-label="Nombre" aria-describedby="basic-addon1"
                                            name='nombre' value={formData.nombre} onChange={cambiarValue} maxLength={255} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Apellido Paterno</span>
                                        <input type="text" className="form-control" placeholder="Apellido Paterno" aria-label="Ape1" aria-describedby="basic-addon1"
                                            name='apellidoPaterno' value={formData.apellidoPaterno} onChange={cambiarValue} maxLength={255} required />
                                    </div>
                                </div>
                            </div>

                            {/* Apellido Materno y Telefono */}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Apellido Materno</span>
                                        <input type="text" className="form-control" placeholder="Apellido Materno" aria-label="Ape2" aria-describedby="basic-addon1"
                                            name='apellidoMaterno' value={formData.apellidoMaterno} onChange={cambiarValue} maxLength={150} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Telefono</span>
                                        <input type="number" className="form-control" placeholder="Telefono" aria-label="Telefono" aria-describedby="basic-addon1"
                                            name='telefono' value={formData.telefono} onChange={cambiarValue} maxLength={10} min={1} required />
                                    </div>
                                </div>
                            </div>

                            {/* Fecha de Nacimiento y Estado*/}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Fecha de Nacimiento</span>
                                        <input type="date" className="form-control" aria-label="Fecha de Nacimiento" aria-describedby="basic-addon1"
                                            name='fechaNacimiento' value={formData.fechaNacimiento} onChange={cambiarValue} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Estado</span>
                                        <input type="text" className="form-control" placeholder="Estado" aria-label="Estado" aria-describedby="basic-addon1"
                                            name='estado' value={formData.estado} onChange={cambiarValue} maxLength={150} required />
                                    </div>
                                </div>
                            </div>

                            {/* Municipio y CP */}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Municipio</span>
                                        <input type="text" className="form-control" placeholder="Municipio" aria-label="Municipio" aria-describedby="basic-addon1"
                                            name='municipio' value={formData.municipio} onChange={cambiarValue} maxLength={150} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Codigo Postal</span>
                                        <input type="text" className="form-control" placeholder="C.P." aria-label="Codigo Postal" aria-describedby="basic-addon1"
                                            name='codigoPostal' value={formData.codigoPostal} onChange={cambiarValue} maxLength={10} required />
                                    </div>
                                </div>
                            </div>

                            {/* Delegacion y Colonia */}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Delegacion</span>
                                        <input type="text" className="form-control" placeholder="Delegacion" aria-label="Delegacion" aria-describedby="basic-addon1"
                                            name='delegacion' value={formData.delegacion} onChange={cambiarValue} maxLength={150} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Colonia</span>
                                        <input type="text" className="form-control" placeholder="Colonia " aria-label="Colonia" aria-describedby="basic-addon1"
                                            name='colonia' value={formData.colonia} onChange={cambiarValue} maxLength={150} required />
                                    </div>
                                </div>
                            </div>

                            {/* Calle y Numeros */}
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Calle</span>
                                        <input type="text" className="form-control" placeholder="Calle" aria-label="Calle" aria-describedby="basic-addon1"
                                            name='calle' value={formData.calle} onChange={cambiarValue} maxLength={200} required />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Num. Interior</span>
                                        <input type="text" className="form-control" placeholder="Num. Int" aria-label="Numero Interior" aria-describedby="basic-addon1"
                                            name='numeroInterior' value={formData.numeroInterior} onChange={cambiarValue} maxLength={8} required />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Num. Exterior</span>
                                        <input type="text" className="form-control" placeholder="Num. Ext" aria-label="Numero Exterior" aria-describedby="basic-addon1"
                                            name='numeroExterior' value={formData.numeroExterior} onChange={cambiarValue} maxLength={8} required />
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-center mt-2'>
                                <button className='btn btn-success col-3' type='submit'>Guardar Datos</button>
                            </div>
                        </form>

                    </div> {/* Container */}
                </>
            ) : (
                <div>
                    {window.location.href = "http://localhost:3000/login"}
                    {/* {console.log(isLoggedIn)} */}
                </div>
            )}
        </>
    )
}

export default DatosUsuario