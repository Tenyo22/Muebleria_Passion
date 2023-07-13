import { pool } from "../database/db.js";

export const getPedidos = async(req, res) =>{
    const [[result]] = await pool.query('CALL select_pedidos');

    res.json(result);
};


export const deletePedidos = async(req, res) => {
    const [[result]] = await pool.query(`CALL delete_pedido('${req.params.folio}')`);
    // console.log(req.params.folio);
    res.json(result);
};