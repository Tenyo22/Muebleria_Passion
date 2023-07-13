import { pool } from '../database/db.js'
import path from 'path';
import fs from 'fs';

export const getProductos = async (req, res) => {
    const [[result]] = await pool.query('CALL select_producto');
    res.json(result);
};

export const getProductosCliente = async (req, res) => {
    const [[result]] = await pool.query('CALL select_producto_cliente');
    res.json(result);
};

export const getInfoProducto = async (req, res) => {
    const [[result]] = await pool.query(`CALL select_info_prod('${req.params.clave}')`);
    res.json(result);
};

export const getProductosByCategoria = async(req, res) => {
    const [[result]] = await pool.query(`CALL select_products_categoria('${req.params.categoria}')`);
    res.json(result);
};

export const getImagen = async (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join('public', 'img', filename); // Ruta completa de la imagen

    // Verificar si el archivo existe
    if (fs.existsSync(imagePath)) {
        // Leer el archivo y enviarlo como respuesta
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error al leer la imagen' });
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' }); // Establecer el tipo de contenido adecuado
                // console.log(data);
                res.end(data);
            }
        });
    } else {
        res.status(404).json({ message: 'Imagen no encontrada' });
    }
};

export const postActProducto = async(req, res) => {
    const [[result]] = await pool.query(`CALL update_producto('${req.body.claveProd}', '${req.body.producto}', '${req.body.descripcion}', '${req.body.imagen}', '${req.body.precio}', '${req.body.promocion}', '${req.body.categoria}')`);
    res.json(result);
};

export const postProducto = async (req, res) => {
    const [[result]] = await pool.query(`CALL insert_producto('${req.body.claveProducto}', '${req.body.nombreProducto}', '${req.body.descripcionProd}', '${req.body.imagePath}', '${req.body.precio}', '${req.body.promocion}', '${req.body.categoria}')`);
    res.json(result);
};

export const deleteProducto = async (req, res) => {
    const [[result]] = await pool.query(`CALL delete_producto('${req.params.clave}')`);
    res.json(result);
};