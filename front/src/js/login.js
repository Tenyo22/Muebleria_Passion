import axios from 'axios';
import Swal from 'sweetalert2';
// import { serialize } from 'cookie';

const URI = 'http://localhost:3002';

export const validateLogin = async (email, password) => {

    const result = (await axios.get(`${URI}/usuarios/${email}`, { params: { contra: password } })).data;
    if (result.result) {
        // Mensaje datos incorrectos
        // console.log(result.result);
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: result.result,
            showConfirmButton: false,
            timer: 1000
        })
        return;
    } else {
        // Sesion iniciada
        console.log(result);

        // Obtener username
        const username = result.Username;

        // Crear cookie
        const expiracion = new Date();
        expiracion.setTime(expiracion.getTime() + 7 * 24 * 60 * 60 * 1000);
        // expiracion.setMinutes(expiracion.getMinutes() + 5); // Agregar 5 minutos a la fecha actual

        const cookieOptions = {
            expires: expiracion.toUTCString(), // Convertir la fecha a formato UTC
            // Otras opciones de la cookie...
            // path: '/login, /home',
        };

        // Crear la cookie
        document.cookie = `username=${username}; expires=${cookieOptions.expires}; path=/login`;
        document.cookie = `username=${username}; expires=${cookieOptions.expires}; path=/home`;
        document.cookie = `username=${username}; expires=${cookieOptions.expires}; path=/formulario`;
        document.cookie = `username=${username}; expires=${cookieOptions.expires}; path=/mueble/`;
        document.cookie = `username=${username}; expires=${cookieOptions.expires}; path=/carrito`;

        // Redireccionar
        window.location.href = 'http://localhost:3000/home';
    }
};

export const createCliente = async (data) => {
    const result = (await axios.post(`${URI}/clientes`, {
        nombre: data.nombre,
        ape1: data.apellidoPaterno,
        ape2: data.apellidoMaterno,
        telefono: data.telefono,
        fechaNacimiento: data.fechaNacimiento,
        usuario: data.usuario,
        estado: data.estado,
        municipio: data.municipio,
        codigoPostal: data.codigoPostal,
        delegacion: data.delegacion,
        colonia: data.colonia,
        calle: data.calle,
        numExt: data.numeroExterior,
        numInt: data.numeroInterior
    })).data;

    // Mensaje a usuario
    if (result[0]) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Datos Regitrados con Exito!',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

export const verificaContra = () => {
    Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'La Contraseña no coincide!',
        showConfirmButton: false,
        timer: 1500
    })
};

export const registrarUsuario = async (email, username, password) => {
    // console.log(email, username, password);

    const result = await axios.post(`${URI}/usuarios`, {
        email: email,
        username: username,
        password: password
    });
    await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario registrado!',
        showConfirmButton: false,
        timer: 1500
    })
    window.location.href = 'http://localhost:3000/login';
}