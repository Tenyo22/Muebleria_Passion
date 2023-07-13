import axios from 'axios';
import Swal from 'sweetalert2';

const URI = 'http://localhost:3002'

export const selectCategoria = async (setCategoria) => {
    const result = (await axios.get(`${URI}/categorias`)).data;

    setCategoria(result);
};

export const buscarCategoria = async (id, setCategoriaData) => {
    const result = (await axios.get(`${URI}/categorias/${id}`)).data[0];

    // console.log(result);
    setCategoriaData({
        id: result.ID,
        categoria: result.Categoria,
        descripcion: result.Descripcion
    })
}

export const insertCategoria = async (categoria, descripcion, setCategoria) => {
    const result = (await axios.post(`${URI}/categorias`, { categoria: categoria, descripcion: descripcion })).data;
    if (result[0]) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro Agregado con Exito!',
            showConfirmButton: false,
            timer: 1500
        })
    }
    selectCategoria(setCategoria);
    // console.log(result[0]);
};

export const actualizarCategoria = async (categoriaData, setCategoria) => {
    const result = (await axios.put(`${URI}/categorias/${categoriaData.id}`, { categoria: categoriaData.categoria, descripcion: categoriaData.descripcion })).data[0];
    // console.log(result);
    if (result) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: result.result,
            showConfirmButton: false,
            timer: 1500
        })
    }
    selectCategoria(setCategoria);
}

export const deleteCategoria = async (id) => {
    // console.log('Deleted', id);
    const result = (await axios.delete(`${URI}/categorias/${id}`)).data[0];
    // console.log(result);
    if (result && result.result === 'Categoria Eliminada con Exito!') {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: result.result,
            showConfirmButton: false,
            timer: 1500
        })
    } else if (result && result.result === 'Categoria Agregada con Exito!') {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: result.result,
            showConfirmButton: false,
            timer: 1500
        })
    }
};

export const validarCategoria = (categoriaHook, categoria) => {
    const categoriaExiste = categoriaHook.find((cat) => cat.Categoria === categoria);
    if (categoriaExiste) {
        Swal.fire({
            // position: 'top-end',
            icon: 'warning',
            title: 'La categoria ya existe!',
            showConfirmButton: false,
            timer: 1000
        });
        return categoriaExiste;
    }
};