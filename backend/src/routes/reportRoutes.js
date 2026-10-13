import express from 'express';
import multer from 'multer';
import { 
  getReports, 
  createReport, 
  updateReportStatus 
} from '../controllers/reportController.js';

const router = express.Router();

// Configuración de multer para guardar archivos temporales en la carpeta 'uploads'
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 50 * 1024 * 1024 } // Límite de 50 MB (para videos)
});

// 1. Obtener todos los reportes
router.get('/', getReports);

// 2. Crear un nuevo reporte con evidencia
router.post('/', upload.single('evidencia'), createReport);

// 3. Actualizar el estado del reporte (Gestor / Entidad)
router.put('/:id/status', updateReportStatus);
router.patch('/:id/status', updateReportStatus);
router.put('/:id', updateReportStatus);

export default router;