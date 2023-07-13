import { pool } from '../database/db.js';

export const getCategorias = async(req, res)  => {
    const [[result]] = await pool.query('CALL select_categoria');
    res.json(result);
};

export const getACategoria = async(req, res) => {
    const [[result]] = await pool.query(`CALL select_a_categoria('${req.params.id}')`);
    res.json(result);
};

export const postCategorias = async(req, res) => {
    const [[result]] = await pool.query(`CALL insert_categoria('${req.body.categoria}', '${req.body.descripcion}') `);
    // res.send(req.body);
    // console.log(req.body.categoria);
    res.json(result);
};

export const putCategorias = async(req, res) => {
    const [[result]] = await pool.query(`CALL update_categoria('${req.params.id}', '${req.body.categoria}', '${req.body.descripcion}')`);
    res.json(result);
};

export const deleteCategorias = async(req, res) => {
    const [[result]] = await pool.query(`CALL delete_categoria('${req.params.id}')`);
    // console.log(req.body.id);
    res.json(result);
};