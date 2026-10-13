import React, { useMemo, useState, useEffect } from "react";
import {
  Search,
  Filter,
  Sparkles,
  MapPin,
  Clock,
  Wrench,
  Loader2,
  Video,
  Image as ImageIcon,
  User,
} from "lucide-react";
import { fetchReports } from "../services/api";
import ReportsMap from "./ReportsMap";

const BACKEND_URL = "http://localhost:5000";

const initialReportsFallback = [
  {
    id: "REP-001",
    codigo: "REP-001",
    type: "Hueco",
    tipo: "Hueco",
    description: "Daño considerable en la calzada que dificulta el tránsito.",
    descripcion: "Daño considerable en la calzada que dificulta el tránsito.",
    location: "Carrera 7 con Calle 72",
    ubicacionTexto: "Carrera 7 con Calle 72",
    latitud: 4.6533,
    longitud: -74.0542,
    status: "En proceso",
    estado: "En proceso",
    date: "2026-08-02",
    creadoEn: "2026-08-02",
  },
];

function Reports({ navigateTo, reports: parentReports = [], showToast }) {
  const [reportsList, setReportsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Todos");
  const [selected, setSelected] = useState(null);
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Obtener los reportes desde el backend al cargar el componente
  useEffect(() => {
    let isMounted = true;
    const loadReports = async () => {
      setLoading(true);
      try {
        const data = await fetchReports();
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setReportsList(data);
          } else if (parentReports.length > 0) {
            setReportsList(parentReports);
          } else {
            setReportsList(initialReportsFallback);
          }
        }
      } catch (error) {
        if (isMounted) {
          if (parentReports.length > 0) {
            setReportsList(parentReports);
          } else {
            setReportsList(initialReportsFallback);
          }
          if (showToast) {
            showToast("No se pudo cargar la lista actualizada de reportes", "error");
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadReports();
    return () => {
      isMounted = false;
    };
  }, [parentReports, showToast]);

  // Helpers para manejar archivos multimedia (imágenes o videos)
  const getMediaUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `${BACKEND_URL}${url}`;
  };

  const isVideo = (url) => {
    if (!url) return false;
    const cleanUrl = url.toLowerCase();
    return cleanUrl.endsWith(".mp4") || cleanUrl.endsWith(".mov") || cleanUrl.endsWith(".webm");
  };

  const filteredReports = useMemo(() => {
    return reportsList.filter((report) => {
      const code = report.codigo || report.code || report.id || "";
      const type = report.tipo || report.type || "";
      const location = report.ubicacionTexto || report.location || "";
      const currentStatus = report.estado || report.status || "";

      const matchesSearch =
        code.toLowerCase().includes(search.toLowerCase()) ||
        type.toLowerCase().includes(search.toLowerCase()) ||
        location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "Todos" ||
        currentStatus.toLowerCase() === status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [reportsList, search, status]);

  const optimizeReport = async (report) => {
    setAiLoading(true);
    setAiResult("Analizando reporte con NotiBot IA...");

    const repCode = report.codigo || report.id;
    const repType = report.tipo || report.type;
    const repLoc = report.ubicacionTexto || report.location;

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      setAiResult(
        `[Análisis IA del reporte ${repCode}]

Prioridad estimada: Alta
Diagnóstico: Se identifica una afectación de tipo "${repType}" en ${repLoc} que requiere inspección y validación en campo.

Recomendación:
Realizar visita técnica de cuadrilla en un plazo máximo de 48 horas para evaluar impacto vial.`
      );
    } finally {
      setAiLoading(false);
    }
  };

  const generateWorkPlan = async (report) => {
    setAiLoading(true);
    setAiResult("Generando plan técnico operativo...");

    const repCode = report.codigo || report.id;
    const repLoc = report.ubicacionTexto || report.location;

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      setAiResult(
        `[PLAN DE TRABAJO TÉCNICO - ${repCode}]

Ubicación: ${repLoc}

1. Cierre preventivo / Señalización de seguridad vial.
2. Inspección técnica de daños y valoración de materiales.
3. Ejecución de cuadrilla para reparación o sustitución.
4. Registro de evidencia fotográfica de cierre.
5. Actualización de estado del radicado a "Resuelto".`
      );
    } finally {
      setAiLoading(false);
    }
  };

  const statusClass = (value) => {
    const val = (value || "").toLowerCase();
    if (val === "resuelto") {
      return "report-status status-completed";
    }
    if (val === "en proceso") {
      return "report-status status-progress";
    }
    return "report-status status-pending";
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-black text-slate-900">
          Consulta Pública de Reportes
        </h1>
        <p className="text-slate-500 mt-1">
          Consulta el estado de los reportes de infraestructura registrados en NotiApp Bogotá.
        </p>
      </div>

      {/* MAPA INTERACTIVO DE PUNTOS ROJOS */}
      <ReportsMap reports={reportsList} />

      {/* Filtros */}
      <div className="noti-card p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="noti-input pl-9"
              placeholder="Buscar por código, tipo o dirección..."
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="noti-select"
          >
            <option value="Todos">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En proceso">En proceso</option>
            <option value="Resuelto">Resuelto</option>
          </select>

          <div className="flex items-center gap-2 text-sm text-slate-500 px-2">
            <Filter className="h-4 w-4" />
            {filteredReports.length} reportes encontrados
          </div>
        </div>
      </div>

      {/* Indicador de Carga */}
      {loading ? (
        <div className="noti-card p-12 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm font-semibold text-slate-600">
            Cargando reportes desde el servidor...
          </p>
        </div>
      ) : (
        /* Grilla de Reportes */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredReports.map((report) => {
            const rawUrl = report.urlImagen || report.imageUrl || report.image || report.url_imagen;
            const mediaUrl = getMediaUrl(rawUrl);
            const esVideo = isVideo(mediaUrl);
            const reportCode = report.codigo || report.code || report.id;
            const reportType = (report.tipo || report.type || "Desconocido").replace(/_/g, " ");
            const reportDesc = report.descripcion || report.description || "Sin descripción disponible.";
            const reportLoc = report.ubicacionTexto || report.location || report.ubicacion_texto || "Bogotá, Colombia";
            const reportStatus = report.estado || report.status || "pendiente";
            const reportDate = report.creadoEn || report.date || report.created_at || "Reciente";
            const reportCitizen = report.ciudadanoNombre || report.ciudadano_nombre;

            return (
              <article key={report.id || reportCode} className="report-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-400 font-bold">
                      {reportCode}
                    </p>
                    <h2 className="font-black text-lg text-slate-900 mt-1 uppercase">
                      {reportType}
                    </h2>
                  </div>

                  <span className={statusClass(reportStatus)}>
                    {reportStatus.toUpperCase()}
                  </span>
                </div>

                <p className="text-sm text-slate-500 mt-3 line-clamp-3">
                  {reportDesc}
                </p>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                    <span>{reportLoc}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-4 w-4 shrink-0 text-slate-400" />
                    <span>{reportDate}</span>
                  </div>

                  {reportCitizen && (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <User className="h-4 w-4 shrink-0 text-slate-400" />
                      <span>{reportCitizen}</span>
                    </div>
                  )}
                </div>

                {/* Evidencia Multimedia (Video o Foto) */}
                {mediaUrl && (
                  <div className="mt-3 rounded-lg overflow-hidden max-h-56 bg-slate-900 border border-slate-200">
                    {esVideo ? (
                      <video
                        src={mediaUrl}
                        controls
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <img
                        src={mediaUrl}
                        alt={reportType}
                        className="w-full h-48 object-cover"
                      />
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSelected(report);
                      setAiResult("");
                    }}
                    className="noti-btn noti-btn-secondary text-xs"
                  >
                    Ver detalle
                  </button>

                  <button
                    onClick={() => optimizeReport(report)}
                    className="noti-btn noti-btn-ai text-xs flex items-center gap-1"
                  >
                    <Sparkles className="h-4 w-4" />
                    Analizar IA
                  </button>

                  <button
                    onClick={() => generateWorkPlan(report)}
                    className="noti-btn noti-btn-primary text-xs flex items-center gap-1"
                  >
                    <Wrench className="h-4 w-4" />
                    Plan técnico
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Estado sin resultados */}
      {!loading && filteredReports.length === 0 && (
        <div className="noti-card p-10 text-center">
          <Search className="h-10 w-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-700 mt-3">
            No encontramos reportes
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Intenta modificar los filtros de búsqueda.
          </p>
        </div>
      )}

      {/* Panel de Resultado IA */}
      {aiResult && (
        <section className="ai-panel p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <h2 className="ai-title font-bold text-indigo-900">
              Resultado de Inteligencia Artificial NotiBot
            </h2>
          </div>

          {aiLoading ? (
            <div className="flex items-center gap-3 mt-4 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
              Procesando información...
            </div>
          ) : (
            <div className="ai-result whitespace-pre-line text-sm text-slate-700 mt-3 bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
              {aiResult}
            </div>
          )}
        </section>
      )}

      {/* Modal / Sección de Detalle del Reporte */}
      {selected && (
        <section className="noti-card p-6 border-2 border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">
                Detalle del reporte
              </p>
              <h2 className="text-2xl font-black text-slate-900">
                {selected.codigo || selected.code || selected.id}
              </h2>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            <div>
              <p className="text-xs text-slate-400">Categoría</p>
              <p className="font-bold mt-1 text-slate-800 uppercase">
                {(selected.tipo || selected.type || "").replace(/_/g, " ")}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Estado</p>
              <p className="font-bold mt-1 text-slate-800 uppercase">
                {selected.estado || selected.status}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs text-slate-400">Descripción</p>
              <p className="text-sm text-slate-600 mt-1">
                {selected.descripcion || selected.description}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Ubicación</p>
              <p className="text-sm text-slate-600 mt-1">
                {selected.ubicacionTexto || selected.location || selected.ubicacion_texto}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Fecha de radicado</p>
              <p className="text-sm text-slate-600 mt-1">
                {selected.creadoEn || selected.date || selected.created_at}
              </p>
            </div>

            {(selected.ciudadanoNombre || selected.ciudadano_nombre) && (
              <div>
                <p className="text-xs text-slate-400">Reportado por</p>
                <p className="text-sm text-slate-600 mt-1">
                  {selected.ciudadanoNombre || selected.ciudadano_nombre}
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default Reports;