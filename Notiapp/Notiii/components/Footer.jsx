import React from "react";

export default function Footer({ darkMode }) {
  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: darkMode ? "#0f172a" : "#0265d2",
        color: "#ffffff",
        padding: "8px 24px", // Padding muy delgado
        fontSize: "12px",
        borderTop: darkMode ? "1px solid #1e293b" : "none",
        marginTop: "auto", // Mantiene el footer al final sin forzar espacio extra
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* LOGO DE NOTIAPP BOGOTÁ */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src="/img/logo.jpeg"
            alt="NotiApp Logo"
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              objectFit: "cover",
              border: "1px solid #0066cc",
            }}
          />
          <span style={{ fontWeight: "bold", fontSize: "12px" }}>
            NotiApp Bogotá
          </span>
        </div>

        {/* Mensaje de Copyright */}
        <p style={{ margin: 0, opacity: 0.85, fontSize: "11px" }}>
          © 2026 NotiApp Bogotá — Infraestructura Urbana.
        </p>

        {/* Enlaces rápidos */}
        <div style={{ display: "flex", gap: "14px", fontSize: "11px" }}>
          <a href="#terminos" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.9 }}>
            Términos
          </a>
          <a href="#privacidad" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.9 }}>
            Privacidad
          </a>
          <a href="#soporte" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.9 }}>
            Soporte
          </a>
        </div>
      </div>
    </footer>
  );
}