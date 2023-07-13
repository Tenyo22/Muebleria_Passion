import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../img/logo_passion.png'

const Navbar = () => {
    // Obtener el valor de la cookie 'username'
    var username = document.cookie
        .split('; ')
        .find(row => row.startsWith('username='))
        ?.split('=')[1];

    // console.log(username);
    var isLoggedIn = !!username;

    // Funcion para cerrar sesion
    const handleLogout = () => {
        // Eliminar la cookie 'username'
        document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/home;';
        // Realizar cualquier otra acción necesaria al cerrar sesión
        window.location.href = 'http://localhost:3000/home';
    };

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ "paddingLeft": "6rem", "paddingRight": "10rem" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/home"}>
                        <img src={logo} alt="Logo" width={100} />
                        Muebles Passion
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapse */}
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to={''}>Sobre Nosotros</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'https://api.whatsapp.com/send?phone=+525576401059&text=Hola! Quisiera un pedido personalizado!'}>Contactanos</Link>
                            </li>
                        </ul>

                        {/* Search */}
                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}

                        <ul className="navbar-nav ms-3">
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item dropdown me-4">
                                        <button className="nav-link btn btn-link dropdown-toggle" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                            {username.toUpperCase()}
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li>
                                                <button className="dropdown-item" onClick={handleLogout}>
                                                    Log Out
                                                </button>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link d-flex align-items-center me-3" to={'/carrito'}>
                                            <i className='fas fa-shopping-cart'></i>
                                            <span className='ms-2'>My Car</span>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {/* Mostrar opción de inicio de sesión */}
                                    <li className="nav-item me-3">
                                        <Link className="nav-link d-flex align-items-center" to={'/login'}>
                                            Sign In / Log In
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link d-flex align-items-center me-3" to={'/login'}>
                                            <i className='fas fa-shopping-cart'></i>
                                            <span className='ms-2'>My Car</span>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar