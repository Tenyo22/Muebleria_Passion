import React, { useState } from 'react'

// import { Link } from 'react-router-dom'
import { registrarUsuario, validateLogin, verificaContra } from '../js/login.js'
import logo from '../img/angulado_rojo.png'
import '../style/login.css'

const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [datos, setDatos] = useState({});

    const handleSwitch = () => {
        setIsLogin(!isLogin);
        setIsCardFlipped(!isCardFlipped);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(email, password);
        if (isLogin) {
            validateLogin(email, password);
        } else {
            // console.log(e.target[2].value);
            // console.log(e.target[3].value);
            if (e.target[2].value === e.target[3].value) {
                registrarUsuario(e.target[0].value, e.target[1].value, e.target[2].value);
                // console.log(e.target[2].value);
                // setDatos({ "email": e.target[0].value, "username" : e.target[1].value, "password": e.target[2].value})
                // console.log(datos);
            } else {
                // console.log("Contraseña incorrecta!");
                verificaContra();
            }
        }
    };

    const divStyle = {
        backgroundImage: `url(${logo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    };

    return (
        <>
            <div className='background-image' style={divStyle}>

                <div className='container-sm shadow'>

                    <div className={`container ${isCardFlipped ? 'flipped' : ''}`}>
                        <div className="switch-container">
                            <div className="reference reference-left" onClick={() => setIsLogin(true)}>
                                Log In
                            </div>
                            <div className={`toggle ${isLogin ? '' : 'active'}`} onClick={handleSwitch}></div>
                            <div className="reference reference-right" onClick={() => setIsLogin(false)}>
                                Sign Up
                            </div>
                        </div>
                        <div className="content-container">
                            <div className="card">
                                <div className="card-front">
                                    <div className="card-header">
                                        <h3 style={{ "color": "white" }}>Login</h3>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="email" style={{ "color": "white" }}>Email:</label>
                                                <input type="email" id="email" className="form-control"
                                                    value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password" style={{ "color": "white" }}>Password:</label>
                                                <input type="password" id="logpassword" className="form-control"
                                                    value={password} onChange={(event) => setPassword(event.target.value)} required />
                                            </div>
                                            <button type="submit" className="btn btn-primary">
                                                Login
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="card-back">
                                    <div className="card-header">
                                        <h3 style={{ "color": "white" }}>Sign Up</h3>
                                    </div>
                                    <div className="card-body" >
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="email" style={{ "color": "white" }}>Email:</label>
                                                <input type="email" id="signemail" className="form-control" required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email" style={{ "color": "white" }}>Username:</label>
                                                <input type="text" id="username" className="form-control" required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password" style={{ "color": "white" }}>Password:</label>
                                                <input type="password" id="signpassword" className="form-control" required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="confirmPassword" style={{ "color": "white" }}>Confirm Password:</label>
                                                <input type="password" id="confirmPassword" className="form-control" required />
                                            </div>
                                            <button type="submit" className="btn btn-primary">
                                                Sign Up
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default Login