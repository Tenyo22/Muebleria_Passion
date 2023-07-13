import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { imagenesCarrusel, selectProductos } from '../js/productos';
import { Link } from 'react-router-dom';
// import '../style/home.css';

const Home = () => {

    const URI = 'http://localhost:3002';
    const [infoProductos, setInfoProductos] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);

    useEffect(() => {
        selectProductos(setInfoProductos);
        imagenesCarrusel(setImageFiles);
    }, []);

    return (
        <>
            <Navbar />
            {/* <h2>hola</h2> */}
            <div className="container-sm mt-2 mb-5">

                {/* Carrusel */}
                <div id="carrusel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {imageFiles.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carrusel"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : "false"}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {imageFiles.map((fileName, index) => (
                            <div key={index} className={`carousel-item${index === 0 ? ' active' : ''}`}>
                                <img
                                    src={URI + '/img/carrusel/' + fileName}
                                    className="d-block w-100"
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carrusel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Anterior</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carrusel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Siguiente</span>
                    </button>
                </div>



                {/* Muestra productos */}
                <div className='mt-4 clearfix'>
                    <div className='row row-cols-1 row-cols-md-3 g-2'>
                        {infoProductos.map((producto) => (
                            // console.log(infoProductos),
                            // console.log(producto),
                            // console.log(URI + '/img/' + producto.Clave_Producto),
                            <div className="col-6 col-md-3" key={producto.Clave_Producto}>
                                <div className="card" style={{ "width": "100%" }}>
                                    <img src={URI + '/img/' + producto.Imagen} className="card-img-top" alt={producto.Producto} style={{"height" : "200px", "objectFit" : "contain"}} />
                                    <div className="card-body text-center">
                                        <h5 className="card-title" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{producto.Producto}</h5>
                                        <p className="card-text">${producto.Precio}</p>
                                        <Link to={`/mueble/${producto.Clave_Producto}`} className="btn btn-primary">Ver Detalles</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home