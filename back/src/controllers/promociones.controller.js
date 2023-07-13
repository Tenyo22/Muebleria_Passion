import { pool } from '../database/db.js';

export const getPromociones = async(req, res) => {
    const [[result]] = await pool.query('CALL select_promocion');
    res.json(result);
};