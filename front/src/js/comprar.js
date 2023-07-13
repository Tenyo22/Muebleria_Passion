import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

const URI = 'http://localhost:3002';

export const getClienteID = async (username) => {
    // console.log(username);
    const result = (await axios.get(`${URI}/clientes/${username}`)).data[0];
    // console.log(result);
    return result;
};

// Función para obtener los productos guardados del localStorage o la cookie
export const obtenerProductosGuardados = (isLoggedIn) => {
    if (isLoggedIn) {
        const cookieData = obtenerCookie('productos');
        return cookieData ? JSON.parse(cookieData) : [];
    } else {
        const localStorageData = localStorage.getItem('productos');
        return localStorageData ? JSON.parse(localStorageData) : [];
    }
}

// Función para guardar los productos en el localStorage o la cookie
export const guardarProductos = (isLoggedIn, productos) => {
    if (isLoggedIn) {
        setCookie('productos', JSON.stringify(productos), 7);
    } else {
        localStorage.setItem('productos', JSON.stringify(productos));
    }
}

// Función para obtener el valor de una cookie
export const obtenerCookie = (cookieName) => {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return '';
}

// Función para establecer una cookie
export const setCookie = (cookieName, cookieValue, days) => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + expirationDate.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
}

export const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

export const terminarCompra = async (productos) => {
    const username = getCookie('username');
    const folio = generarFolio();
    // console.log(productos);
    // console.log(folio);

    for (const prod of productos) {
        try {
            // console.log(prod.clave);
            // console.log(`${URI}/venta`, folio, prod.clave, prod.cantidad, username);
            await axios.post(`${URI}/venta`, {
                folioVenta: folio,
                claveProd: prod.clave,
                cantidad: prod.cantidad,
                username: username
            })
        } catch (error) {
            console.log(error);
            return;
        }
    }

    try {
        await axios.post(`${URI}/ventatotal`, {
            folio: folio
        });

        // console.log(result);
        // if (result && result.result === 'Total actualizado!') {

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra confirmada!',
            showConfirmButton: false,
            timer: 1500
        })
        // }
    } catch (error) {
        console.log(error);
    }

    // const result = (await axios.post(`${URI}/venta`, {
    //     username : username
    // })).data;
    // console.log(result);
};

const generarFolio = () => {
    const folioVenta = moment().format('YYYYMMDDHHmmss');
    return folioVenta;
}