require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API Backend funcionando');
});

// Importar rutas
const productosRoutes = require('./routes/productos');
app.use('/api/productos', productosRoutes(db));


const clientesRoutes = require('./routes/clientes');
app.use('/api/clientes', clientesRoutes(db));

const ventasRoutes = require('./routes/ventas');
app.use('/api/ventas', ventasRoutes(db));

const detalleVentaRoutes = require('./routes/detalle_venta');
app.use('/api/detalles', detalleVentaRoutes(db));

const empleadosRoutes = require('./routes/empleados');
app.use('/api/empleados', empleadosRoutes(db));

const tareasRoutes = require('./routes/tareas');
app.use('/api/tareas', tareasRoutes(db));

const proveedoresRoutes = require('./routes/proveedores');
app.use('/api/proveedores', proveedoresRoutes(db));

const metodosPagoRoutes = require('./routes/metodos_pago');
app.use('/api/metodos_pago', metodosPagoRoutes(db));


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

