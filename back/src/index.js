import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productosRoutes from './routes/productos.routes.js';
import clientesRouter from './routes/cliente.routes.js';
import usuariosRouter from './routes/usuarios.routes.js';
import categoriasRouter from './routes/categoria.routes.js';
import uploadImageRouter from './routes/uploadImage.routes.js';
import imgCarruselRouter from './routes/imgCarrusel.routes.js';
import promocionesRouter from './routes/promociones.routes.js';
import pedidosRouter from './routes/pedidos.routes.js';
import ventaRouter from './routes/venta.routes.js';
import facturaRouter from './routes/factura.routes.js';

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3002);

app.use(clientesRouter);
app.use(usuariosRouter)
app.use(productosRoutes);
app.use(usuariosRouter);
app.use(categoriasRouter);
app.use(uploadImageRouter);
app.use(imgCarruselRouter);
app.use(promocionesRouter);
app.use(pedidosRouter);
app.use(ventaRouter);
app.use(facturaRouter);

// app.get('/products', (req, res) =>)

console.log('Hello World!');