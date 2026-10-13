import React, { useState, useEffect, useRef } from 'react';
import { createReport, fetchReports } from '../services/api';

const ReportForm = ({ onReportCreated, onNavigate }) => {
  const [formData, setFormData] = useState({
    tipo: 'hueco_malla_vial',
    descripcion: '',
    ubicacion_texto: '',
    latitud: 4.60971, // Bogotá por defecto
    longitud: -74.08175,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeReports, setActiveReports] = useState([]);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const activeMarkersGroupRef = useRef(null);

  // Cargar reportes activos/pendientes para mostrar los puntos rojos
  useEffect(() => {
    const loadActiveReports = async () => {
      try {
        const response = await fetchReports();
        
        // Soporte tanto para array directo como para { success: true, reports: [...] }
        const rawReports = Array.isArray(response) 
          ? response 
          : (response && Array.isArray(response.reports) ? response.reports : []);

        // Filtrar reportes que NO estén resueltos ni rechazados
        const unresolved = rawReports.filter((r) => {
          const status = (r.status || r.estado || '').toString().toLowerCase();
          return status !== 'resuelto' && status !== 'completado' && status !== 'cerrado' && status !== 'rechazado';
        });

        setActiveReports(unresolved);
      } catch (err) {
        console.warn('No se pudieron cargar los reportes anteriores en el mapa:', err);
      }
    };

    loadActiveReports();
  }, []);

  // Inicializar mapa de Leaflet centrado en Bogotá
  useEffect(() => {
    if (!window.L || mapInstanceRef.current || !mapRef.current) return;

    const L = window.L;

    // Crear la instancia del mapa en Bogotá
    const map = L.map(mapRef.current).setView([4.60971, -74.08175], 12);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Grupo para marcadores de reportes sin resolver (Puntos rojos)
    activeMarkersGroupRef.current = L.layerGroup().addTo(map);

    // Icono Azul para el reporte actual seleccionado
    const blueIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Marcador inicial
    markerRef.current = L.marker([4.60971, -74.08175], { icon: blueIcon, draggable: true }).addTo(map);
    markerRef.current.bindPopup('Ubicación seleccionada').openPopup();

    // Actualizar coordenadas al arrastrar el marcador azul
    markerRef.current.on('dragend', function (event) {
      const position = event.target.getLatLng();
      updateSelectedCoords(position.lat, position.lng);
    });

    // Permitir seleccionar coordenadas haciendo clic directo en el mapa
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      }
      updateSelectedCoords(lat, lng);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Dibujar puntos rojos para los reportes sin resolver
  useEffect(() => {
    if (!window.L || !mapInstanceRef.current || !activeMarkersGroupRef.current) return;

    const L = window.L;
    const group = activeMarkersGroupRef.current;
    group.clearLayers();

    // Icono Rojo para reportes pendientes
    const redIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [22, 36],
      iconAnchor: [11, 36],
      popupAnchor: [1, -34],
      shadowSize: [36, 36],
    });

    activeReports.forEach((report) => {
      const lat = parseFloat(report.latitude || report.latitud || report.lat);
      const lng = parseFloat(report.longitude || report.longitud || report.lng);

      if (!isNaN(lat) && !isNaN(lng)) {
        const redMarker = L.marker([lat, lng], { icon: redIcon });
        redMarker.bindPopup(`
          <div style="font-size:12px;">
            <strong style="color:#dc2626;">⚠️ Reporte Pendiente</strong><br/>
            <b>Tipo:</b> ${report.type || report.tipo || 'Afectación'}<br/>
            <b>Estado:</b> ${report.status || report.estado || 'Pendiente'}<br/>
            <b>Detalle:</b> ${report.description || report.descripcion || 'Sin descripción'}
          </div>
        `);
        group.addLayer(redMarker);
      }
    });
  }, [activeReports]);

  // Helper para actualizar coordenadas en el estado
  const updateSelectedCoords = (lat, lng) => {
    setFormData((prev) => ({
      ...prev,
      latitud: lat,
      longitud: lng,
      ubicacion_texto: prev.ubicacion_texto || `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`,
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert('El archivo excede el tamaño máximo permitido (50 MB).');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          updateSelectedCoords(lat, lng);

          if (mapInstanceRef.current && markerRef.current) {
            mapInstanceRef.current.setView([lat, lng], 15);
            markerRef.current.setLatLng([lat, lng]);
          }
        },
        (err) => {
          console.error('Error al obtener geolocalización:', err);
          alert('No se pudo obtener la ubicación automáticamente.');
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Por favor adjunta una evidencia fotográfica o en video.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const dataToSend = new FormData();
      
      // Enviamos las variables al backend
      dataToSend.append('tipo', formData.tipo);
      dataToSend.append('type', formData.tipo);

      dataToSend.append('descripcion', formData.descripcion);
      dataToSend.append('description', formData.descripcion);

      dataToSend.append('ubicacion_texto', formData.ubicacion_texto);
      dataToSend.append('location', formData.ubicacion_texto);

      if (formData.latitud) {
        dataToSend.append('latitud', formData.latitud);
        dataToSend.append('latitude', formData.latitud);
      }
      if (formData.longitud) {
        dataToSend.append('longitud', formData.longitud);
        dataToSend.append('longitude', formData.longitud);
      }

      // ✅ UN SOLO ARCHIVO enviado como 'evidencia' (coincide con upload.single('evidencia'))
      dataToSend.append('evidencia', selectedFile);

      const response = await createReport(dataToSend);
      const createdReport = response.report || response;

      setSuccess(`¡Reporte creado exitosamente!`);

      setFormData({
        tipo: 'hueco_malla_vial',
        descripcion: '',
        ubicacion_texto: '',
        latitud: 4.60971,
        longitud: -74.08175,
      });
      setSelectedFile(null);

      // Agregar de inmediato el nuevo reporte a los puntos rojos del mapa
      if (createdReport) {
        setActiveReports((prev) => [...prev, createdReport]);
        if (onReportCreated) onReportCreated(createdReport);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)', backgroundColor: '#f8fafc', padding: '40px 16px', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '600px', backgroundColor: '#ffffff', padding: '36px 40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)', border: '1px solid #e2e8f0', boxSizing: 'border-box' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>
            Reportar una Afectación
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Haz clic en el mapa de Bogotá para marcar la ubicación exacta del daño.
          </p>
        </div>

        {error && <div style={{ padding: '12px', marginBottom: '20px', color: '#991b1b', backgroundColor: '#fee2e2', borderRadius: '8px', fontSize: '13px' }}>{error}</div>}
        {success && <div style={{ padding: '12px', marginBottom: '20px', color: '#166534', backgroundColor: '#dcfce7', borderRadius: '8px', fontSize: '13px' }}>{success}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>Tipo de problema</label>
            <select name="tipo" value={formData.tipo} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#334155' }}>
              <option value="hueco_malla_vial">Hueco / Malla Vial</option>
              <option value="alumbrado_publico">Alumbrado Público</option>
              <option value="semaforo_averiado">Semáforo Averiado</option>
              <option value="parques_zonas_verdes">Parques y Zonas Verdes</option>
              <option value="alcantarillado_fuga">Alcantarillado / Fuga de Agua</option>
            </select>
          </div>

          {/* Mapa Interactivo de Bogotá */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                Mapa de Bogotá (Selecciona la ubicación exacta)
              </label>
              <button type="button" onClick={handleGetLocation} style={{ background: 'none', border: 'none', color: '#0265d2', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                📍 GPS Autodetectar
              </button>
            </div>

            <div 
              ref={mapRef} 
              style={{ width: '100%', height: '260px', borderRadius: '12px', border: '1px solid #cbd5e1', zIndex: 1 }} 
            />

            <span style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              🔴 <b>Puntos rojos:</b> Reportes pendientes/en proceso. | 🔵 <b>Punto azul:</b> Tu selección actual.
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>Ubicación en texto / Dirección</label>
            <input type="text" name="ubicacion_texto" placeholder="Ej. Calle 26 con Carrera 68" value={formData.ubicacion_texto} onChange={handleChange} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#334155', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>Descripción del daño</label>
              <button type="button" onClick={() => onNavigate && onNavigate("chat")} style={{ background: 'none', border: 'none', color: '#0265d2', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                ✨ Redactar con NotiBot IA
              </button>
            </div>
            <textarea name="descripcion" rows="3" placeholder="Escribe brevemente la afectación..." value={formData.descripcion} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#334155', resize: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>Evidencia (Imagen o Video) *</label>
              <span style={{ fontSize: '11px', color: '#dc2626', fontWeight: '500' }}>⚠️ Campo obligatorio</span>
            </div>
            
            <label style={{ border: '2px dashed #cbd5e1', borderRadius: '10px', padding: '20px', textAlign: 'center', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <span style={{ fontSize: '24px' }}>🎥 / 📷</span>
              <span style={{ fontSize: '13px', color: '#0265d2', fontWeight: '500' }}>
                {selectedFile ? `Seleccionado: ${selectedFile.name}` : 'Haz clic para adjuntar foto o video'}
              </span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Formatos: MP4, MOV, PNG, JPG (Máx. 50MB)</span>
              <input 
                type="file" 
                accept="image/*,video/*" 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
              />
            </label>
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', backgroundColor: loading ? '#94a3b8' : '#0265d2', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px' }}>
            🚀 {loading ? 'Subiendo evidencia y enviando...' : 'Enviar Reporte'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;