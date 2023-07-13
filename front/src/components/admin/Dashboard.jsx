import React from 'react'
import '../../style/dashboard.css'
import logo from '..//../img/logo_passion.png';
import { Link } from 'react-router-dom'
// import Navbar from '../Navbar';

const Dashboard = () => {
    return (
        <>
            <div className="area"></div>
            {/* <Navbar /> */}
            <nav className="main-menu">
                <ul>
                    <li className='margen'>
                        <Link to={'/home'}>
                            <img src={logo} alt="Logo" className='menu-logo' width={50} />
                        </Link>
                    </li>
                    <li className='margen'>
                        <Link to={"/gestionar"}>
                            <i className="fa fa-home" style={{ "fontSize": "28px" }}></i>
                            <span className="nav-text">
                                Home
                            </span>
                        </Link>
                    </li>
                    <li className="has-subnav margen">
                        <Link to={"/gestionar/productos"}>
                            <i className="fa fa-bed" style={{ "fontSize": "28px" }}></i>
                            <span className="nav-text">
                                Productos
                            </span>
                        </Link>
                    </li>
                    <li className='margen'>
                        <Link to={"/gestionar/categorias"}>
                            <i className="fa fa-tags" style={{ "fontSize": "28px" }}></i>
                            <span className="nav-text">
                                Categorias
                            </span>
                        </Link>

                    </li>
                    <li className='margen'>
                        <Link to={"/gestionar/pedidos"}>
                            <i className="fa fa-ruler-combined" style={{ "fontSize": "28px" }}></i>
                            <span className="nav-text">
                                Pedidos
                            </span>
                        </Link>

                    </li>
                </ul>

                <ul className="logout">
                    <li>
                        <Link href="#">
                            <i className="fa fa-power-off" style={{ "fontSize": "28px" }}></i>
                            <span className="nav-text">
                                Logout
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>

        </>
    )
}

export default Dashboard