import { pool } from '../database/db.js';

export const getClientes = async (req, res) => {
    const [[result]] = await pool.query('CALL select_cliente');
    res.json(result);
};

export const getCliente = async (req, res) => {
    const [[result]] = await pool.query(`CALL validate_cliente('${req.params.username}')`);
    res.json(result);
};

export const postCliente = async (req, res) => {
    const [[result]] = await pool.query(`CALL insert_cliente('${req.body.nombre}','${req.body.ape1}','${req.body.ape2}','${req.body.telefono}','${req.body.fechaNacimiento}','${req.body.usuario}','${req.body.estado}','${req.body.municipio}','${req.body.codigoPostal}','${req.body.delegacion}','${req.body.colonia}','${req.body.calle}','${req.body.numExt}','${req.body.numInt}')`);
    res.json(result);
};