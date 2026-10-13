import pool from '../config/db.js';

/**
 * Normaliza la categoría enviada desde la interfaz para que coincida con la BD.
 */
const normalizarTipoReporte = (valor) => {
  if (!valor) return null;
  const v = valor.toString().toLowerCase().trim();

  if (v.includes('hueco') || v.includes('malla') || v.includes('vial')) {
    return 'hueco_malla_vial';
  }
  if (v.includes('alumbrado') || v.includes('iluminac')) {
    return 'alumbrado_publico';
  }
  if (v.includes('semaforo') || v.includes('semáforo')) {
    return 'semaforo_averiado';
  }
  if (v.includes('parque') || v.includes('verde') || v.includes('arbol')) {
    return 'parques_zonas_verdes';
  }
  if (v.includes('alcantarillado') || v.includes('fuga') || v.includes('agua')) {
    return 'alcantarillado_fuga';
  }

  return valor;
};

// -------------------------------------------------------------------------
// OBTENER REPORTES (Filtrado según el usuario o rol)
// -------------------------------------------------------------------------
export const getReports = async (req, res) => {
  try {
    const usuarioId = req.user ? req.user.id : (req.query.ciudadano_id || req.query.citizenId);
    const rolUsuario = req.user ? req.user.rol : req.query.rol;

    let query = `
      SELECT 
        r.id, 
        r.codigo, 
        r.tipo, 
        r.descripcion, 
        r.ubicacion_texto, 
        r.latitud,
        r.longitud,
        r.url_imagen, 
        r.estado, 
        r.prioridad, 
        r.ciudadano_id, 
        u.nombre_completo AS ciudadano_nombre,
        r.creado_en,
        r.actualizado_en
       FROM reportes r
       LEFT JOIN usuarios u ON r.ciudadano_id = u.id
    `;

    const params = [];

    // Si es un ciudadano autenticado, FILTRAR únicamente por sus propios reportes
    if (rolUsuario === 'ciudadano' || (!rolUsuario && usuarioId)) {
      query += ` WHERE r.ciudadano_id = $1`;
      params.push(usuarioId);
    }

    query += ` ORDER BY r.creado_en DESC`;

    const result = await pool.query(query, params);

    const reportesFormateados = result.rows.map(r => ({
      id: r.id,
      code: r.codigo,
      codigo: r.codigo,
      type: r.tipo,
      tipo: r.tipo,
      description: r.descripcion,
      descripcion: r.descripcion,
      location: r.ubicacion_texto,
      ubicacionTexto: r.ubicacion_texto,
      latitud: r.latitud ? parseFloat(r.latitud) : null,
      longitud: r.longitud ? parseFloat(r.longitud) : null,
      imageUrl: r.url_imagen,
      urlImagen: r.url_imagen,
      status: r.estado,
      estado: r.estado,
      priority: r.prioridad,
      prioridad: r.prioridad,
      citizenId: r.ciudadano_id,
      ciudadanoNombre: r.ciudadano_nombre || 'Ciudadano Anónimo',
      createdAt: r.creado_en,
      creadoEn: r.creado_en
    }));

    res.json(reportesFormateados);
  } catch (error) {
    console.error('Error al obtener reportes:', error);
    res.status(500).json({ message: 'Error al consultar reportes en la base de datos' });
  }
};

// -------------------------------------------------------------------------
// OBTENER ÚNICAMENTE MIS REPORTES (Para la cuenta logueada)
// -------------------------------------------------------------------------
export const getMisReportes = async (req, res) => {
  try {
    const usuarioId = req.user ? req.user.id : (req.query.ciudadano_id || req.query.citizenId);

    if (!usuarioId) {
      return res.json([]);
    }

    const result = await pool.query(
      `SELECT 
        r.id, 
        r.codigo, 
        r.tipo, 
        r.descripcion, 
        r.ubicacion_texto, 
        r.latitud,
        r.longitud,
        r.url_imagen, 
        r.estado, 
        r.prioridad, 
        r.ciudadano_id, 
        u.nombre_completo AS ciudadano_nombre,
        r.creado_en,
        r.actualizado_en
       FROM reportes r
       LEFT JOIN usuarios u ON r.ciudadano_id = u.id
       WHERE r.ciudadano_id = $1
       ORDER BY r.creado_en DESC`,
      [usuarioId]
    );

    const reportesFormateados = result.rows.map(r => ({
      id: r.id,
      code: r.codigo,
      codigo: r.codigo,
      type: r.tipo,
      tipo: r.tipo,
      description: r.descripcion,
      descripcion: r.descripcion,
      location: r.ubicacion_texto,
      ubicacionTexto: r.ubicacion_texto,
      latitud: r.latitud ? parseFloat(r.latitud) : null,
      longitud: r.longitud ? parseFloat(r.longitud) : null,
      imageUrl: r.url_imagen,
      urlImagen: r.url_imagen,
      status: r.estado,
      estado: r.estado,
      priority: r.prioridad,
      prioridad: r.prioridad,
      citizenId: r.ciudadano_id,
      ciudadanoNombre: r.ciudadano_nombre || 'Ciudadano Anónimo',
      createdAt: r.creado_en,
      creadoEn: r.creado_en
    }));

    res.json(reportesFormateados);
  } catch (error) {
    console.error('Error al obtener mis reportes:', error);
    res.status(500).json({ message: 'Error al consultar tus reportes' });
  }
};

// -------------------------------------------------------------------------
// CREAR UN NUEVO REPORTE (Soporte para FormData / Multer)
// -------------------------------------------------------------------------
export const createReport = async (req, res) => {
  const { 
    tipo, type, categoria, 
    descripcion, description, 
    ubicacion_texto, locationText, location, 
    latitud, latitude, lat, 
    longitud, longitude, lng, 
    url_imagen, imageUrl, imagenUrl, 
    ciudadano_id, citizenId 
  } = req.body;

  let archivoUrlFinal = null;
  if (req.file) {
    archivoUrlFinal = `/${req.file.path.replace(/\\/g, '/')}`;
  } else {
    archivoUrlFinal = url_imagen || imageUrl || imagenUrl;
  }

  const tipoBruto = tipo || type || categoria;
  const tipoFinal = normalizarTipoReporte(tipoBruto);
  const descripcionFinal = (descripcion || description || '').trim();
  const ubicacionFinal = (ubicacion_texto || locationText || location || '').trim();
  
  let ciudadanoIdFinal = (req.user && req.user.id) ? req.user.id : (ciudadano_id || citizenId || null);

  const latitudFinal = (latitud || latitude || lat) ? parseFloat(latitud || latitude || lat) : null;
  const longitudFinal = (longitud || longitude || lng) ? parseFloat(longitud || longitude || lng) : null;

  if (!tipoFinal) {
    return res.status(400).json({ message: 'El tipo de reporte enviado no es válido o está ausente.' });
  }

  if (!ubicacionFinal) {
    return res.status(400).json({ message: 'La ubicación exacta del problema es obligatoria.' });
  }

  if (!archivoUrlFinal) {
    return res.status(400).json({ message: 'La imagen, video o evidencia del reporte es obligatoria.' });
  }

  // GENERACIÓN DE CÓDIGO EN NODE.JS
  const codigoGenerado = 'REP-' + Math.floor(100000 + Math.random() * 900000);

  try {
    const result = await pool.query(
      `INSERT INTO reportes (
        codigo,
        tipo, 
        descripcion, 
        ubicacion_texto, 
        latitud, 
        longitud, 
        url_imagen, 
        ciudadano_id
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING 
        id, 
        codigo, 
        tipo, 
        descripcion, 
        ubicacion_texto, 
        latitud, 
        longitud, 
        url_imagen, 
        estado, 
        prioridad, 
        ciudadano_id, 
        creado_en`,
      [
        codigoGenerado,
        tipoFinal, 
        descripcionFinal, 
        ubicacionFinal, 
        latitudFinal, 
        longitudFinal, 
        archivoUrlFinal, 
        ciudadanoIdFinal
      ]
    );

    const r = result.rows[0];

    res.status(201).json({
      id: r.id,
      code: r.codigo,
      codigo: r.codigo,
      type: r.tipo,
      tipo: r.tipo,
      description: r.descripcion,
      descripcion: r.descripcion,
      location: r.ubicacion_texto,
      ubicacionTexto: r.ubicacion_texto,
      latitud: r.latitud ? parseFloat(r.latitud) : null,
      longitud: r.longitud ? parseFloat(r.longitud) : null,
      imageUrl: r.url_imagen,
      urlImagen: r.url_imagen,
      status: r.estado,
      estado: r.estado,
      priority: r.prioridad,
      prioridad: r.prioridad,
      citizenId: r.ciudadano_id,
      createdAt: r.creado_en,
      creadoEn: r.creado_en
    });

  } catch (error) {
    console.error('Error detallado de PostgreSQL al crear reporte:', error);

    if (error.code === '23503') {
      return res.status(400).json({ 
        message: 'El usuario asociado al reporte no existe en la base de datos.' 
      });
    }

    if (error.code === '23502') {
      return res.status(400).json({ 
        message: `Falta completar un campo obligatorio en la base de datos (${error.column}).` 
      });
    }

    if (error.code === '22P02') {
      return res.status(400).json({ 
        message: 'El tipo de reporte enviado no existe en la categoría permitida.' 
      });
    }

    res.status(500).json({ 
      message: 'Error al registrar el reporte en la base de datos',
      detail: error.message 
    });
  }
};

// -------------------------------------------------------------------------
// ACTUALIZAR ESTADO DE UN REPORTE (Uso exclusivo Gestores / Entidades)
// -------------------------------------------------------------------------
export const updateReportStatus = async (req, res) => {
  const { id } = req.params;
  const { estado, status, cuadrilla, observacion_tecnica, observacion, nota } = req.body;

  const estadoRecibido = estado || status;
  const cuadrillaRecibida = cuadrilla || null;
  const observacionRecibida = observacion_tecnica || observacion || nota || null;

  if (!estadoRecibido) {
    return res.status(400).json({ message: 'El nuevo estado del reporte es requerido.' });
  }

  // 1. Mapear y normalizar el estado al tipo ENUM de PostgreSQL
  let estadoNormalizado = estadoRecibido.toString().toLowerCase().trim();
  
  if (estadoNormalizado.includes('proceso')) {
    estadoNormalizado = 'en_proceso';
  } else if (estadoNormalizado.includes('resuelto')) {
    estadoNormalizado = 'resuelto';
  } else if (estadoNormalizado.includes('rechazad')) {
    estadoNormalizado = 'rechazado';
  } else if (estadoNormalizado.includes('asignad')) {
    estadoNormalizado = 'asignado';
  } else if (estadoNormalizado.includes('pendien')) {
    estadoNormalizado = 'pendiente';
  }

  console.log(`=== INTENTANDO ACTUALIZAR REPORTE PARAM: ${id} ===`);
  console.log(`Estado procesado: ${estadoNormalizado}`);

  try {
    // Permite buscar tanto por ID numérico como por código de reporte (ej. REP-702972)
    const isNumericId = !isNaN(Number(id));

    let query = `
      UPDATE reportes 
      SET estado = $1::text::estado_reporte, 
          cuadrilla = COALESCE($2, cuadrilla), 
          observacion_tecnica = COALESCE($3, observacion_tecnica),
          actualizado_en = NOW()
      WHERE ${isNumericId ? 'id = $4 OR codigo = $5' : 'codigo = $4 OR codigo_reporte = $4'}
      RETURNING *
    `;

    const queryParams = isNumericId 
      ? [estadoNormalizado, cuadrillaRecibida, observacionRecibida, Number(id), String(id)]
      : [estadoNormalizado, cuadrillaRecibida, observacionRecibida, String(id)];

    const result = await pool.query(query, queryParams);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'El reporte no existe en la base de datos.' });
    }

    const r = result.rows[0];
    console.log(`✅ Reporte ${r.id} (${r.codigo}) actualizado correctamente a "${r.estado}"`);

    return res.status(200).json({
      message: 'Estado del reporte actualizado exitosamente',
      report: {
        id: r.id,
        codigo: r.codigo || r.codigo_reporte,
        estado: r.estado,
        cuadrilla: r.cuadrilla,
        observacionTecnica: r.observacion_tecnica,
        actualizadoEn: r.actualizado_en
      }
    });

  } catch (error) {
    console.error('❌ Error detallado de PostgreSQL:', error.message);
    return res.status(500).json({ 
      message: 'Error interno al actualizar el estado del reporte en la base de datos.',
      detail: error.message 
    });
  }
};