import { pool } from '../database/db.js';

export const postVenta = async(req, res) => {
    const [[result]] = await pool.query(`CALL insert_detventa('${req.body.folioVenta}', '${req.body.claveProd}', '${req.body.cantidad}', '${req.body.username}')`);
    // console.log(result);
    res.json(result);
};

export const postActualizarVenta = async(req, res) => {
    const [[result]] = await pool.query(`CALL update_venta('${req.body.folio}')`);
    res.json(result);
};