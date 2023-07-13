import React, { useEffect, useState } from 'react'
import '../../style/registrarProductos.css'
import Dashboard from './Dashboard'
import { agregarProducto, saveImage, selectPromociones, validateDatos, validateImage, validatePrecio } from '../../js/admin'
import { selectCategoria } from '../../js/categoria'

const Registrar = () => {
    // const URI = 'http://localhost:3002'
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const [showInput, setShowInput] = useState(true);
    const [claveProducto, setClaveProducto] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [promociones, setPromociones] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [selectedPromocion, setSelectedPromocion] = useState('');
    const [selectedCategoria, setSelectedCategoria] = useState('');

    useEffect(() => {
        selectPromociones(setPromociones);
        selectCategoria(setCategoria);
    }, []);

    useEffect(() => {
        // console.log(promociones);

        if (promociones.length > 0) {
            setSelectedPromocion(promociones[0].ID);
        }

        // console.log(categoria);
        if (categoria.length > 0) {
            setSelectedCategoria(categoria[0].ID);
        }
    }, [promociones, categoria]);

    const handleFileUpdate = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'image/png') {
            setImage(file);

            const reader = new FileReader();
            reader.onload = () => {
                // console.log(e.target.result);
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            console.log("Por favor seleccione un archivo png");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Seleccione una imagen
        if (validateImage(image)) {
            // console.log(promociones)
            return;
        }

        // console.log(image.name);
        var obj = { claveProducto, nombreProducto, selectedPromocion, selectedCategoria };
        if (validateDatos(obj)) {
            return;
        }

        if (validatePrecio(precio)) {
            return;
        }

        // if (!image) {
        //     console.log("Seleccione una imagen");
        //     return;
        // }

        // Guarda la imagen
        saveImage(image);

        // Guarda en BD el producto
        var imgg = image.name;
        obj = { claveProducto, nombreProducto, descripcion, imgg, precio, selectedPromocion, selectedCategoria };
        // console.log(obj);
        // return;
        agregarProducto(obj);
        // console.log('Clave Producto:', claveProducto);
        // console.log('Nombre Producto:', nombreProducto);
        // console.log('Descripcion Producto:', descripcion);
        // console.log('Precio Producto:', precio);
        // console.log('Promocion:', selectedPromocion);
        // console.log('Categoria:', selectedCategoria);
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
        setShowInput(true);
    }

    const cambioPromocion = (event) => {
        setSelectedPromocion(event.target.value);
    };

    const cambioCategoria = (event) => {
        // console.log(event.target.value);
        setSelectedCategoria(event.target.value)
    };

    return (
        <>
            <Dashboard />
            <div className='container-sm pt-3'>
                <div className='text-center mb-5'>
                    <h1>Registro de muebles</h1>
                </div>

                <div className="row">

                    {/* Imagen */}
                    <div className='card col-4 ms-4 me-2'>
                        <div className='card-body'>
                            <h2 className='text-center mb-3'>Imagen del Producto</h2>
                            <div className="file-upload">
                                {preview ? (
                                    <>
                                        <div className='text-center'>
                                            <img src={preview} alt='Preview' style={{ 'maxWidth': '70%' }} />
                                            <button className='btn btn-danger mt-3' onClick={handleRemoveImage}>Eliminar Imagen</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {showInput && (
                                            <>
                                                <label htmlFor="file" id='largeFile'>
                                                    <input type="file" id='file' className='form-control-file' accept='.png' onChange={handleFileUpdate} />
                                                </label>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='card col-7 ms-4'>
                        <div className='card-body'>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Clave Producto:</span>
                                    <input type="text" className="form-control" aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                        maxLength={10}
                                        onChange={(e) => setClaveProducto(e.target.value)} required />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Nombre Producto:</span>
                                    <input type="text" className="form-control" aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                        maxLength={150}
                                        onChange={(e) => setNombreProducto(e.target.value)} required />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Descripcion Producto:</span>
                                    <input type="text" className="form-control" aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                        maxLength={255}
                                        onChange={(e) => setDescripcion(e.target.value)} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Precio Producto:</span>
                                    <input type="number" className="form-control" aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                        min={1}
                                        onChange={(e) => setPrecio(parseInt(e.target.value))} required />
                                </div>

                                <select className="form-select mb-4" aria-label="Default select example"
                                    value={selectedPromocion} onChange={cambioPromocion}>
                                    {/* <option value={''}>Seleccionar promocion</option> */}
                                    {promociones.filter((promocion) => promocion.Activo === '1')
                                        .map((promocion) => (
                                            // console.log(promocion),
                                            <option key={promocion.ID} value={promocion.ID}>
                                                {promocion.Promocion} - {promocion.Porcentaje}%
                                            </option>
                                        ))}
                                </select>

                                <select className="form-select mb-4" aria-label="Default select example"
                                    value={selectedCategoria} onChange={cambioCategoria}>
                                    {/* <option value={''}>Seleccionar promocion</option> */}
                                    {categoria.filter((categoria) => categoria.Activo === '1')
                                        .map((categoria) => (
                                            // console.log(categoria),
                                            <option key={categoria.ID} value={categoria.ID}>
                                                {categoria.Categoria}
                                            </option>
                                        ))}
                                </select>

                            </div>

                        </div>
                    </div>
                </div>

                {/* <div className='row'>
                    {/* <div className='card col-4'>
                        <div className='card-body'>
                            <h2 className='text-center'>Imagen del Producto</h2>
                            <div className="file-upload">
                                {preview ? (
                                    <>
                                        <img src={preview} alt='Preview' style={{ 'maxWidth': '100%' }} />
                                        <button className='btn btn-danger mt-3' onClick={handleRemoveImage}>Eliminar Imagen</button>
                                    </>
                                ) : (
                                    <>
                                        {showInput && (
                                            <>
                                                <label htmlFor="file" id='largeFile'>
                                                    <input type="file" id='file' className='form-control-file' accept='.png' onChange={handleFileUpdate} />
                                                </label>
                                                <br /><br /><br />
                                                <br /><br /><br />
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div> */}

                {/* <div className='col'>
                        <div className='card col-12'>
                            <div className='card-body'>
                                <div className="mb-3">
                                    <label htmlFor="claveProducto" className="form-label">Clave Producto</label>
                                    <input type="email" className="form-control" id="claveProducto" placeholder="Clave de Producto" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Boton para enviar datos */}
                <div className="text-center justify-content-center col-12 d-flex">
                    <div className='col-3'>
                        <button className='btn btn-primary mt-3 mx-auto' onClick={handleSubmit}>Guardar</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Registrar