// import pool from '.../database/db.js';
import fs from 'fs';

export const getImgCarrusel = async(req, res) => {
    // const [[result]] = await pool
    const imagePath = 'public/img/carrusel';
    fs.readdir(imagePath, (err, files) => {
        if(err){
            console.log('Error al leer el directorio', err);
            return;
        }

        const imageFiles = files.filter(file => file.endsWith('.png'));
        // console.log(imageFiles);
        res.json(imageFiles);
    });
};