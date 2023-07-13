import fs from 'fs';

export const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se ha proporcionado ningun archivo' });
    }
    const fileName = req.file.originalname;

    const sourcePath = req.file.path; // Ruta temporal del archivo
    const destPath = `public/img/${fileName}`;

    fs.rename(sourcePath, destPath, (error) => {
        if (error) {
            console.error('Error al mover el archivo: ', error);
            return res.status(500).json({ error: "Error al guardar la imagen" });
        }
    });

    return res.status(200).json({ imagenName: fileName });
};

export const deleteImage = (req, res) => {
    const imagePath = `public/img/${req.params.image}`;
    // console.log(imagePath);
    fs.unlink(imagePath, (error) => {
        if (error) {
            console.error('Error al eliminar la imagen: ', error);
            return;
        }

        console.log('Imagen eliminada correctamente');
        res.json({ result: 'Imagen eliminada correctamente' });
    });

}

export const actualizarImagen = (req, res) => {
    if (!req.body.imageData) {
        return res.status(400).json({ error: 'No se proporciono imagen' });
    }

    const imageData = req.body.imageData;
    const rutaCarpeta = 'public/img/';
    const image = req.body.claveProd;

    // Eliminar la parte inicial "data:image/png;base64,"
    const imagenData = imageData.replace(/^data:image\/png;base64,/, '');
    // Decodificar los datos base64 en un buffer
    const imagenBuffer = Buffer.from(imagenData, 'base64');

    // Ruta y nombre de archivo para guardar la imagen
    const rutaCompleta = `${rutaCarpeta}/${image}.png`;

    fs.writeFile(rutaCompleta, imagenBuffer, (error) => {
        if (error) {
            console.error('Error al guardar la imagen: ', error);
            return res.status(500).json({ error: 'Error al guardar la imagen' });
        }

        console.log('Imagen guardada correctamente');
        return res.status(200).json({ mensaje: 'Imagen guardada correctamente' });
    });


};