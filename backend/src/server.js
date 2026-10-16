import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import pool from './config/db.js';

dotenv.config();

const app = express();

app.use('/uploads', express.static('uploads'));

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal para comprobar que el servidor funciona
app.get('/', (req, res) => {
  res.send('🚀 Servidor funcionando correctamente');
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

// Puerto
const PORT = process.env.PORT || 4000;

// Comprobar conexión con PostgreSQL
pool.query('SELECT NOW()')
  .then((result) => {
    console.log('✅ PostgreSQL conectado correctamente');
    console.log('🕐 Hora de PostgreSQL:', result.rows[0].now);
  })
  .catch((error) => {
    console.error('❌ Error conectando a PostgreSQL:');
    console.error(error.message);
  });

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});