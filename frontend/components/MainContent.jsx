import React from "react"; // <--- ESTA LÍNEA ES LA QUE FALTA

export default function MainContent({ onNavigate, darkMode, setDarkMode }) {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "32px" }}>
      
      {/* SECCIÓN IZQUIERDA: TEXTO Y BOTONES */}
      <div style={{ flex: "1 1 500px" }}>
        <span style={{ 
          backgroundColor: darkMode ? "#1e293b" : "#e0edff", 
          color: darkMode ? "#38bdf8" : "#0265d2", 
          fontSize: "12px", 
          fontWeight: "bold", 
          padding: "6px 14px", 
          borderRadius: "20px", 
          letterSpacing: "1px",
          textTransform: "uppercase"
        }}>
          Infraestructura Urbana · Bogotá D.C.
        </span>

        <h1 style={{ 
          fontSize: "48px", 
          fontWeight: "bold", 
          color: darkMode ? "#ffffff" : "#000000", 
          margin: "20px 0", 
          lineHeight: "1.1", 
          fontFamily: "serif" 
        }}>
          Reporta, consulta y <br />
          <span style={{ color: darkMode ? "#38bdf8" : "#0265d2" }}>mejora tu ciudad.</span>
        </h1>

        <p style={{ 
          fontSize: "16px", 
          color: darkMode ? "#94a3b8" : "#475569", 
          marginBottom: "32px", 
          maxWidth: "480px", 
          lineHeight: "1.5" 
        }}>
          NotiApp Bogotá conecta a la ciudadanía con las entidades responsables del mantenimiento de la infraestructura urbana.
        </p>

        {/* CONTENEDOR DE BOTONES CON INTERRUPTOR SOL/LUNA */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          
          <button
            onClick={() => onNavigate("report")}
            style={{ backgroundColor: "#0265d2", color: "#ffffff", padding: "12px 24px", borderRadius: "10px", border: "none", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}
          >
            Reportar un daño
          </button>

          <button
            onClick={() => onNavigate("reports")}
            style={{ backgroundColor: darkMode ? "#1e293b" : "#f1f5f9", color: darkMode ? "#ffffff" : "#1e293b", padding: "12px 24px", borderRadius: "10px", border: "1px solid #cbd5e1", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}
          >
            Consultar reportes
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            style={{
              backgroundColor: darkMode ? "#1e293b" : "#f1f5f9",
              border: "1px solid #cbd5e1",
              color: darkMode ? "#facc15" : "#1e293b",
              padding: "10px 16px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease"
            }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>
      </div>

      {/* SECCIÓN DERECHA: TARJETA "TU REPORTE IMPORTA" */}
      <div style={{ flex: "1 1 380px", maxWidth: "420px" }}>
        <div style={{ 
          backgroundColor: darkMode ? "#1e293b" : "#ffffff", 
          padding: "32px", 
          borderRadius: "24px", 
          border: darkMode ? "1px solid #334155" : "1px solid #e2e8f0", 
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" 
        }}>
          <div style={{ backgroundColor: "#e0edff", color: "#0265d2", width: "40px", height: "40px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "20px", marginBottom: "20px" }}>
            !
          </div>

          <h3 style={{ fontSize: "22px", fontWeight: "bold", color: darkMode ? "#ffffff" : "#000000", marginBottom: "12px", fontFamily: "serif" }}>
            Tu reporte importa
          </h3>

          <p style={{ fontSize: "14px", color: darkMode ? "#94a3b8" : "#64748b", lineHeight: "1.5", marginBottom: "24px" }}>
            Registra daños en vías, señalización, iluminación y otros elementos de infraestructura urbana.
          </p>

          <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", marginBottom: "24px" }} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", textAlign: "center", gap: "8px" }}>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "bold", color: "#0265d2" }}>24/7</div>
              <div style={{ fontSize: "11px", color: darkMode ? "#94a3b8" : "#64748b", marginTop: "2px" }}>Disponible</div>
            </div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "bold", color: "#0265d2" }}>IA</div>
              <div style={{ fontSize: "11px", color: darkMode ? "#94a3b8" : "#64748b", marginTop: "2px" }}>Asistencia</div>
            </div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "bold", color: "#0265d2" }}>BOG</div>
              <div style={{ fontSize: "11px", color: darkMode ? "#94a3b8" : "#64748b", marginTop: "2px" }}>Ciudadanía</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}