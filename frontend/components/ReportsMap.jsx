import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Configuración del marcador rojo personalizado en CSS/SVG para no depender de imágenes externas
const redMarkerIcon = L.divIcon({
  className: "custom-red-pin",
  html: `
    <div style="
      background-color: #ef4444;
      width: 24px;
      height: 24px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid #ffffff;
      box-shadow: 0 2px 5px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 8px;
        height: 8px;
        background-color: #ffffff;
        border-radius: 50%;
      "></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

export default function ReportsMap({ reports = [] }) {
  // Coordenadas del centro de Bogotá por defecto
  const bogotaCenter = [4.60971, -74.08175];

  // Filtrar solo los reportes activos que NO estén resueltos o rechazados
  const activeReports = reports.filter(
    (r) => r.estado !== "resuelto" && r.estado !== "rechazado" && r.latitud && r.longitud
  );

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
        padding: "20px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        marginBottom: "28px",
      }}
    >
      {/* Encabezado del mapa */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "bold",
              color: "#111827",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>📍</span> Mapa de Incidencias Activas
          </h2>
          <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#6b7280" }}>
            Visualización en tiempo real de los reportes pendientes de solución en la ciudad.
          </p>
        </div>

        {/* Indicador visual / Leyenda */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            padding: "6px 12px",
            borderRadius: "20px",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "#ef4444",
              borderRadius: "50%",
              display: "inline-block",
            }}
          ></span>
          <span style={{ fontSize: "12px", fontWeight: "600", color: "#991b1b" }}>
            {activeReports.length} {activeReports.length === 1 ? "Reporte activo" : "Reportes activos"}
          </span>
        </div>
      </div>

      {/* Contenedor del Mapa */}
      <div
        style={{
          height: "420px",
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #d1d5db",
        }}
      >
        <MapContainer
          center={bogotaCenter}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {activeReports.map((report) => (
            <Marker
              key={report.id || report.codigo}
              position={[parseFloat(report.latitud), parseFloat(report.longitud)]}
              icon={redMarkerIcon}
            >
              <Popup>
                <div style={{ fontFamily: "sans-serif", padding: "4px", maxWidth: "200px" }}>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      color: "#dc2626",
                      background: "#fee2e2",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    {report.codigo || "REP-ACTIVO"}
                  </span>
                  <h4 style={{ margin: "8px 0 4px 0", fontSize: "14px", color: "#111827" }}>
                    {report.tipo ? report.tipo.replace(/_/g, " ").toUpperCase() : "Incidencia Urbana"}
                  </h4>
                  <p style={{ margin: "0 0 6px 0", fontSize: "12px", color: "#4b5563" }}>
                    <strong>Ubicación:</strong> {report.ubicacion_texto || "Bogotá"}
                  </p>
                  {report.descripcion && (
                    <p style={{ margin: 0, fontSize: "11px", color: "#6b7280", fontStyle: "italic" }}>
                      "{report.descripcion}"
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}