import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/admin/Dashboard'
import ListarProductos from './components/admin/Productos';
import Categorias from './components/admin/Categorias';
import RegistrarProducto from './components/admin/Registrar';
import ActualizarProducto from './components/admin/Actualizar';
import Pedidos from './components/admin/Pedidos';
import Comprar from './components/Mueble';
import Carrito from './components/Carrito';
import DatosUsuario from './components/DatosUsuario';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/formulario' element={<DatosUsuario />} />
          <Route path='/mueble/:clave' element={<Comprar />} />
          <Route path='/carrito' element={<Carrito />} />
          <Route path='/gestionar' element={<Dashboard />} />
          <Route path='/gestionar/productos' element={<ListarProductos />} />
          <Route path='/gestionar/categorias' element={<Categorias />} />
          <Route path='/gestionar/pedidos' element={<Pedidos />} />
          <Route path='/gestionar/registrar/producto' element={<RegistrarProducto />} />
          <Route path='/gestionar/actualizar/producto/:clave' element={<ActualizarProducto />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
