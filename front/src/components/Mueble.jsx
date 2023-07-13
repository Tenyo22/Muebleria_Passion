import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './Navbar';
import Footer from './Footer';
import { selectAProducto } from '../js/productos';
import { getClienteID, guardarProductos, obtenerProductosGuardados } from '../js/comprar';
import '../style/mueble.css';
import 'react-toastify/dist/ReactToastify.css';


const Mueble = () => {
    const { clave } = useParams();
    const [infoProducto, setInfoProducto] = useState([]);
    const [images, setImages] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    // const [hoveredImage, setHoveredImage] = useState(images[0]);
    const [prodSimilar, setProdSimilar] = useState();
    const [cantidad, setCantidad] = useState(1);

    // Obtener el valor de la cookie 'username'
    var username = document.cookie
        .split('; ')
        .find(row => row.startsWith('username='))
        ?.split('=')[1];

    var isLoggedIn = !!username;

    useEffect(() => {
        selectAProducto({ clave }, setInfoProducto, setImages, setProdSimilar);
    }, [clave]);

    const cambiarCantidad = (e) => {
        setCantidad(e.target.value);
    }

    const comprar = async () => {
        // No tiene sesion abierta, redirecciona a login
        // console.log(isLoggedIn)
        // console.log(isCookieAvailable);
        if (!isLoggedIn) {
            window.location.href = 'http://localhost:3000/login';
        } else {
            var id_user = await getClienteID(username);
            // console.log(id_user);
            if (id_user === undefined) {
                // console.log('Existe cliente');
                window.location.href = 'http://localhost:3000/formulario';
            } else {

                // Obtener los datos actuales del localStorage o la cookie
                const productosGuardados = obtenerProductosGuardados(isLoggedIn);

                // Producto que se va a almacenar
                const nuevoProducto = { clave: clave, producto: infoProducto.Producto, precio: infoProducto.Precio, cantidad: cantidad };

                // Verificar si el producto ya existe en la lista
                const productoExistente = productosGuardados.find(
                    (producto) => producto.clave === nuevoProducto.clave
                );

                if (productoExistente) {
                    // El producto ya existe, se actualiza la cantidad
                    productoExistente.cantidad = nuevoProducto.cantidad;
                } else {
                    // El producto no existe, se agrega a la lista de productos guardados
                    productosGuardados.push(nuevoProducto);
                }

                // Guardar la lista actualizada de productos en el localStorage o la cookie
                guardarProductos(isLoggedIn, productosGuardados);

                mostrarNotificacion();

                // console.log(obtenerProductosGuardados());
            }
        }
    }

    const mostrarNotificacion = () => {
        toast('Producto Agregado', { type: 'success', autoClose: 1000 });
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <main>
                <div className="container-sm mb-5">
                    <div className="row">

                        <div className='row'>
                            <div className="card col-12 mt-3">

                                {/* Imagen producto */}
                                <div className="card-body store-body mt-3">
                                    <div className="product-info">
                                        <div className="product-gallery">
                                            <div className="product-gallery-thumbnails">
                                                <ol className="thumbnails-list list-unstyled">
                                                    <li><img src={images} className="img-responsive" alt="" /></li>
                                                    <li><img src="https://via.placeholder.com/350x350/f16a22" alt="" /></li>
                                                    <li><img src="https://via.placeholder.com/350x350/d3ffce" alt="" /></li>
                                                    <li><img src="https://via.placeholder.com/350x350/7937fc" alt="" /></li>
                                                    <li><img src="https://via.placeholder.com/350x350/930000" alt="" /></li>
                                                </ol>
                                            </div>
                                            <div className="product-gallery-featured">
                                                <img src={images} className={`img-responsive ${isHovered ? 'zoomed' : setIsHovered(true)}`} style={{ width: '350px', height: '350px' }} alt="" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Informacion Principal */}
                                    <div className="product-payment-details">
                                        {/* <p className="last-sold text-muted"><small>145 items sold</small></p> */}
                                        <p className="last-sold text-muted"><small>Producto: {clave}  -   {infoProducto.Categoria}</small></p>
                                        <h2 className="product-title mb-2">{infoProducto.Producto}</h2>
                                        <h3 className="text-success"><i className='fas fa-dollar-sign'></i>{infoProducto.Precio}</h3>
                                        {/* <p className="text-success"><i className="fa fa-credit-card"></i> 12x or  5x $ 5.00</p> */}
                                        <p className="mb-0"><i className="fa fa-truck"></i> Entrega en todo el territorio {/*Delivery in all territory*/}</p>
                                        {/* <div className="text-muted mb-2"><small>know more about delivery time and shipping forms</small></div> */}
                                        <label className='mb-2' htmlFor="quant">Cantidad</label>
                                        {/* <input type="number" name="quantity" min="1" id="quant" className="form-control mb-5 input-lg" placeholder="Choose the quantity" /> */}
                                        <select name="quantity" id="quant" className="form-select mb-5" aria-label="Default select example"
                                            value={cantidad} onChange={cambiarCantidad}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <button className="btn btn-primary btn-lg btn-block" onClick={() => comprar()}>
                                            <i className='fas fa-shopping-cart'></i> Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="card col-12 mt-3">

                                {/* Muebles Similares */}
                                <div className="product-seller-recommended mt-4">
                                    <div className="card-header justify-content-start">
                                        <h3 className="mb-2">Muebles Similares</h3>
                                    </div>
                                    <div className="recommended-items card-deck mt-4">
                                        <div className="card2">
                                            <div className="row">
                                                {prodSimilar && prodSimilar.length > 0 && prodSimilar.map((product, index) => (
                                                    <div key={index} className="col-md-4">
                                                        <Link to={`/mueble/${product.Clave_Producto}`} className='btn bt-primary'>
                                                            <div className="image-product-similar">
                                                                <img src={product.ImageBase64} className="card-img-top" alt={product.Producto}/>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{product.Precio}</h5>
                                                                    <span className="text-muted"><small>{product.Producto}</small></span>
                                                                </div>
                                                            </div>
                                                        </Link>

                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Descripcion */}
                                    <div className="product-description mb-5">
                                        {/* Informacion */}
                                        <h3 className="mt-4">Informacion</h3>
                                        <p>{infoProducto.Descripcion ? infoProducto.Descripcion : ''}</p>
                                        <p>En Muebles Riverama fabricamos nuestros productos, son nuevos y están garantizados. Las fotos que se muestran en la publicación son del producto real que ofrecemos y el que será enviado.</p>

                                        {/* Materiales */}
                                        <h3 className="mt-4">Materiales de Produccion</h3>
                                        <dl className="row mb-4">
                                            <dt className="col-sm-3">Estructura:</dt>
                                            <dd className="col-sm-9">Madera de pino de primera sin nudos, reforzada para una mejor calidad y durabilidad.</dd>
                                            <dt className="col-sm-3">Acojinado</dt>
                                            <dd className="col-sm-9">Cada mueble se acojina con hule espuma de alta densidad, de esta forma se consigue confort.</dd>
                                            <dt className="col-sm-3">Tapizado:</dt>
                                            <dd className="col-sm-9">Se emplean telas mas novedosas y resistentes.</dd>
                                            <dt className="col-sm-3">Colores</dt>
                                            <dd className="col-sm-9">Disponible en 20 colores para fabricación. (Tiempo de fabricación de 8 a 10 días hábiles)</dd>
                                        </dl>

                                        {/* Garantia */}
                                        <h3 className="mt-4">Garantia</h3>
                                        <p>GARANTÍA DE SATISFACCIÓN PLENA Y LA COMPRA ESTA PROTEGIDA CON MERCADO PAGO, RECIBE EL PRODUCTO QUE ESPERABAS O TE DEVOLVEMOS EL DINERO.</p>

                                        <p>ES IMPORTANTE QUE TOMES EN CUENTA QUE LOS COSTOS DE ENVÍO POR DEVOLUCIÓN, YA QUE NO ESTÁN INCLUIDOS DENTRO DE LA GARANTÍA</p>

                                    </div>

                                    {/* Preguntas y Respuestas */}
                                    {/* <div className="product-faq mb-5">
                                        <h2 className="mb-3">Questions and Answers</h2>
                                        <p className="text-muted">What information do you need?</p>
                                        <div className="main-questions d-inline" data-container="body" data-toggle="popover" data-placement="right" data-content="Are you in doubt? these shortcuts can help you!">
                                            <Link to={"#"} className="btn btn-outline-primary">Cost and Delivery time</Link>
                                            <Link to={"#"} className="btn btn-outline-primary">Warranty</Link>
                                            <Link to={"#"} className="btn btn-outline-primary">Payment options</Link>
                                        </div>
                                    </div> */}

                                    {/* Ultimos comentarios */}
                                    {/* <div className="product-comments">
                                        <h5 className="mb-5">Lastest Questions</h5>
                                        <ol className="list-unstyled last-questions-list">
                                            <li><i className="fa fa-comment"></i> <span>Hello david, can i pay with credit card?</span></li>
                                            <li><i className="fa fa-comment"></i> <span>can i send it to another address?</span></li>
                                        </ol>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main >

        </>
    )
}

export default Mueble