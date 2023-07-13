import { Router } from 'express';
// Multer nos ayuda a hacer la copia del archivo a la ruta.
import multer from 'multer';
import { actualizarImagen, deleteImage, uploadImage } from '../controllers/uploadImage.controller.js';

const router = Router();
const upload = multer({ dest: 'public/img' })

router.post('/upload/image', upload.single('file'), uploadImage);
router.post('/actualizar/image', actualizarImagen);
router.delete('/delete/image/:image', deleteImage);

export default router;
