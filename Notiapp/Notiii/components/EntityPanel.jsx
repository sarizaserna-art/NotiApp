import React, { useState, useEffect } from "react";
import {
  Building2,
  Search,
  Filter,
  Loader2,
  Send,
  MapPin,
  X,
  AlertCircle,
  CheckCircle2,
  Clock,
  Wrench
} from "lucide-react";
import { fetchReports, updateReportStatus } from "../services/api";

export default function EntityPanel({ user, showToast }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  // Estados del formulario
  const [newStatus, setNewStatus] = useState("");
  const [technicianNote, setTechnicianNote] = useState("");
  const [assignedCrew, setAssignedCrew] = useState("");
  const [updating, setUpdating] = useState(false);

  const loadEntityReports = async () => {
    setLoading(true);
    try {
      const data = await fetchReports();
      setReports(Array.isArray(data) ? data : []);
    } catch (error) {
      if (showToast) showToast("Error al cargar los reportes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntityReports();
  }, []);

  const handleSelectReport = (report) => {
    setSelectedReport(report);
    setNewStatus(report.estado || report.status || "Pendiente");
    setTechnicianNote(report.observacionTecnica || report.notaTecnica || "");
    setAssignedCrew(report.cuadrilla || "");
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!selectedReport) return;

    setUpdating(true);
    const reportId = selectedReport.id || selectedReport.codigo;

    try {
      await updateReportStatus(reportId, {
        estado: newStatus,
        observacion_tecnica: technicianNote,
        cuadrilla: assignedCrew,
        entidadId: user?.id,
      });

      if (showToast) showToast(`Reporte ${reportId} actualizado correctamente`, "success");
      await loadEntityReports();
      setSelectedReport(null);
    } catch (error) {
      if (showToast) showToast(error.message, "error");
    } finally {
      setUpdating(false);
    }
  };

  const filteredReports = reports.filter((rep) => {
    const code = rep.codigo || rep.id || "";
    const type = rep.tipo || rep.type || "";
    const loc = rep.ubicacionTexto || rep.location || "";
    const currentStatus = rep.estado || rep.status || "";

    const matchesSearch =
      code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "Todos" ||
      currentStatus.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b' }}>
      
      {/* Encabezado */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        color: '#ffffff',
        padding: '28px 32px',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.25)',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <Building2 size={18} />
            Panel de Gestión Operativa
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', margin: '6px 0 0 0', letterSpacing: '-0.5px' }}>
            {user?.entidadNombre || user?.name || "Gestor IDU / Entidad"}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0 0' }}>
            Atención de incidencias de infraestructura pública en Bogotá D.C.
          </p>
        </div>

        <button
          onClick={loadEntityReports}
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : "Actualizar Datos"}
        </button>
      </div>

      {/* Barra de Filtros */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ position: 'relative', flex: '2' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por código, tipo de falla o dirección..."
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: '14px 16px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#334155',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="Todos">Todos los Estados</option>
          <option value="Pendiente">Pendientes</option>
          <option value="En proceso">En proceso</option>
          <option value="Resuelto">Resueltos</option>
        </select>
      </div>

      {/* Grid de 2 Columnas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1.2fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* Columna Izquierda: Lista */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <Loader2 size={32} style={{ margin: '0 auto 12px auto', color: '#2563eb' }} className="animate-spin" />
              <p style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Cargando reportes asignados...</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px dashed #cbd5e1', color: '#64748b' }}>
              No hay reportes que coincidan con la búsqueda.
            </div>
          ) : (
            filteredReports.map((rep) => {
              const code = rep.codigo || rep.id;
              const type = (rep.tipo || rep.type || "").replace(/_/g, " ");
              const status = rep.estado || rep.status || "pendiente";
              const isSelected = selectedReport?.id === rep.id || selectedReport?.codigo === code;

              let statusBg = '#ffe4e6';
              let statusColor = '#e11d48';
              if (status.toLowerCase().includes('resuelto')) {
                statusBg = '#dcfce7';
                statusColor = '#15803d';
              } else if (status.toLowerCase().includes('proceso')) {
                statusBg = '#fef3c7';
                statusColor = '#b45309';
              }

              return (
                <div
                  key={rep.id || code}
                  onClick={() => handleSelectReport(rep)}
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '20px',
                    borderRadius: '16px',
                    border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 10px 20px -5px rgba(37, 99, 235, 0.15)' : '0 1px 3px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#2563eb', backgroundColor: '#eff6ff', padding: '4px 10px', borderRadius: '6px' }}>
                      {code}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '20px', backgroundColor: statusBg, color: statusColor }}>
                      {status}
                    </span>
                  </div>

                  <h3 style={{ margin: '8px 0', fontSize: '16px', fontWeight: '800', textTransform: 'uppercase', color: '#0f172a' }}>
                    {type}
                  </h3>

                  <p style={{ fontSize: '14px', color: '#475569', margin: '0 0 12px 0', lineHeight: '1.5' }}>
                    {rep.descripcion || rep.description || "Sin descripción disponible."}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', fontWeight: '500', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                    <MapPin size={14} color="#ef4444" />
                    <span>{rep.ubicacionTexto || rep.location || "Ubicación sin registrar"}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Columna Derecha: Panel Técnico */}
        <div>
          {selectedReport ? (
            <form onSubmit={handleSaveChanges} style={{
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
              position: 'sticky',
              top: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '900', margin: 0 }}>
                  Gestión: {selectedReport.codigo || selectedReport.id}
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                  Estado de la Operación
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '14px', fontWeight: '700', color: '#0f172a', outline: 'none' }}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Resuelto">Resuelto</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                  Cuadrilla / Operativos Asignados
                </label>
                <input
                  type="text"
                  value={assignedCrew}
                  onChange={(e) => setAssignedCrew(e.target.value)}
                  placeholder="Ej: Cuadrilla Sur - IDU N° 4"
                  style={{ width: '100%', padding: '12px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                  Observación Técnica u Oficial
                </label>
                <textarea
                  rows={4}
                  value={technicianNote}
                  onChange={(e) => setTechnicianNote(e.target.value)}
                  placeholder="Detalles sobre las acciones ejecutadas en campo..."
                  style={{ width: '100%', padding: '12px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '14px', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <button
                type="submit"
                disabled={updating}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                }}
              >
                {updating ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Guardar Cambios
              </button>
            </form>
          ) : (
            <div style={{ backgroundColor: '#f8fafc', padding: '32px 24px', borderRadius: '20px', border: '2px dashed #cbd5e1', textAlign: 'center', color: '#94a3b8' }}>
              <Wrench size={36} style={{ margin: '0 auto 8px auto', opacity: '0.5' }} />
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#475569', margin: '0 0 4px 0' }}>Selecciona un reporte</p>
              <p style={{ fontSize: '12px', margin: 0 }}>Haz clic en una tarjeta de la lista para actualizar su estado técnico.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}