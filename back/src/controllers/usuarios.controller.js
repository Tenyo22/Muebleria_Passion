import { pool } from '../database/db.js';
// import bodyParser from 'body-parser';

export const getUsuarios = async (req, res) => {
    const [[result]] = await pool.query('CALL select_usuarios');
    res.json(result);
};

export const getAUsuario = async(req, res) => {
    try{
        // console.log(`CALL select_a_usuario('${req.params.username}', '${req.body.contra}')`);
        const [[result]]= await pool.query(`CALL select_a_usuario('${req.params.username}', '${req.query.contra}')`);
        // console.log(`CALL select_a_usuario('${req.params.username}', '${req.query.contra}')`);

        if(result && result[0]){
            res.json(result[0]);
        }else{
            res.json({result: "Usuario o Contraseña incorrecto"});
        }
    }catch(err){
        res.status(500).json({error : err.message})
    }
};

export const postUsuario = async (req, res) => {
    const {email, username, password} = req.body;
    const [[result]] = await pool.query(`CALL insert_usuario('${email}', '${username}', '${password}')`);
    res.json(result);
};