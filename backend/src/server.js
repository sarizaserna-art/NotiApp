import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import pool from './config/db.js';

dotenv.config();

const app = express();

app.use('/uploads', express.static('uploads'));

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 Servidor funcionando correctamente');
});

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;

pool.query('SELECT NOW()')
  .then((result) => {
    console.log('✅ PostgreSQL conectado correctamente');
    console.log('🕐 Hora de PostgreSQL:', result.rows[0].now);
  })
  .catch((error) => {
    console.error('❌ Error conectando a PostgreSQL:');
    console.error(error.message);
  });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
});