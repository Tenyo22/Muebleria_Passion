import { Router } from 'express';
import { deleteProducto, getImagen, getInfoProducto, getProductos, getProductosByCategoria, getProductosCliente, postActProducto, postProducto } from '../controllers/productos.controller.js'

const router = Router();

router.get('/productos', getProductos);
router.get('/productos/cliente', getProductosCliente);
router.get('/productos/:clave', getInfoProducto);
router.get('/imagen/:filename', getImagen);
router.get('/productos/categoria/:categoria', getProductosByCategoria);
router.post('/productos', postProducto);
router.post('/actualizar/producto', postActProducto);
router.delete('/productos/:clave', deleteProducto);


export default router;