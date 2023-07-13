import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { actualizarCategoria, buscarCategoria, deleteCategoria, insertCategoria, selectCategoria, validarCategoria } from '../../js/categoria.js'
import '../../style/categorias.css';

const Categorias = () => {

    const [titulo, setTitulo] = useState('Registro de Categorias');
    const [categoria, setCategoria] = useState([]);
    const [categoriaData, setCategoriaData] = useState({
        id: '',
        categoria: '',
        descripcion: ''
    });
    const [boton, setBoton] = useState('Guardar');

    useEffect(() => {
        selectCategoria(setCategoria);
        // console.log(categoria);
    }, [categoria.length]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const categ = event.target[0].value;
        const descripcion = event.target[1].value;
        if (boton === 'Actualizar') {
            // console.log('Actualizar');
            actualizarCategoria(categoriaData, setCategoria)
            limpiarCampos();
        } else {
            const categoriaExistente = validarCategoria(categoria, categ);

            // const categoriaExistente = categoria.find((cat) => cat.Categoria === categ);
            if (categoriaExistente) {
                // console.log('Categoria ya existe!');
                event.target[0].value = '';
                event.target[1].value = '';
                return;
            }
            // Insercion de datos y actualizacion de tabla
            await insertCategoria(categ, descripcion, setCategoria);
            // await selectCategoria(setCategoria);
        }

        // Limpieza de datos
        event.target[0].value = '';
        event.target[1].value = '';


    };

    const handleEditCategoria = (id) => {
        buscarCategoria(id, setCategoriaData);
        setTitulo('Actualizar Categoria');
        setBoton('Actualizar');
    }

    const handleDeleteCategoria = (id) => {
        deleteCategoria(id);

        // Actualiza Status Categoria
        setCategoria(categoria => categoria.filter(cat => cat.ID !== id));
        limpiarCampos();
    };

    const limpiarCampos = () => {
        setCategoriaData({
            id: '',
            categoria: '',
            descripcion: ''
        })
        setTitulo('Registro de Categorias');
        setBoton('Guardar');
    }

    return (
        <>
            <Dashboard />

            <div className='container-sm mt-4'>
                <div className="card mb-5 col-12">
                    <h1 className='card-header text-center'>{titulo}</h1>
                    <div className="card-body">
                        <div className="form">
                            <form onSubmit={handleFormSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Categoria:</span>
                                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                value={categoriaData.categoria} onChange={(e) => setCategoriaData({ ...categoriaData, categoria: e.target.value })} required />
                                        </div>

                                    </div>

                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Descripcion:</span>
                                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                value={categoriaData.descripcion} onChange={(e) => setCategoriaData({ ...categoriaData, descripcion: e.target.value })} required />
                                        </div>
                                    </div>

                                </div>
                                <div className='text-center d-grid col-4 mx-auto'>
                                    <button className='btn btn-primary text-align' type="submit">{boton}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


                {/* Tabla */}
                <h1 className='text-center'>Lista de Categorias</h1>
                <div className='table-container'>
                    <div className='table-scroll-cat'>

                        <table className='col-12'>
                            <thead className='text-center'>
                                <tr>
                                    <th scope='col' className='align-middle'>Num</th>
                                    <th scope='col' className='align-middle'>Categoria</th>
                                    <th scope='col' className='align-middle'>Descripcion</th>
                                    <th scope='col' className='align-middle'>Status</th>
                                    <th scope='col' className='align-middle'>Opciones</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {categoria.map((categoria, index) => (
                                    // console.log(categoria),
                                    <tr key={index}>
                                        <th scope="row" className='align-middle text-center'>{index + 1}</th>
                                        <td className='align-middle '>{categoria.Categoria}</td>
                                        <td className='align-middle'>{categoria.Descripcion}</td>
                                        <td className={`align-middle text-center ${categoria.Activo === '1' ? 'activo' : 'inactivo'}`}>
                                            {categoria.Activo === '1' ? 'Activo' : 'Inactivo'}
                                        </td>
                                        <td className='align-middle'>
                                            <div className='d-flex justify-content-center'>
                                                <button type='button' className='btn btn-info' onClick={() => handleEditCategoria(categoria.ID)}>
                                                    <i className='fas fa-edit'></i>
                                                </button>
                                                {categoria.Activo === '1' ?
                                                    <button type='button' className='btn btn-danger ms-2' onClick={() => handleDeleteCategoria(categoria.ID)}>
                                                        <i className='fas fa-trash'></i>
                                                    </button>
                                                    :
                                                    <button type='button' className='btn btn-success ms-2' onClick={() => handleDeleteCategoria(categoria.ID)}>
                                                        <i className='fas fa-plus'></i>
                                                    </button>
                                                }
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

export default Categorias