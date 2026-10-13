import React, { useState } from "react";

export default function Header({ user = null, onLogout = () => {}, onNavigate = () => {} }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  const userRole = user?.role ? String(user.role).toLowerCase() : "";

  return (
    <>
      <header style={{ backgroundColor: "#0265d2", color: "#ffffff", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* LOGO Y NOMBRE DE NOTIAPP BOGOTÁ */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => onNavigate("home")}>
          <img 
            src="/img/logo.jpeg" 
            alt="Logo NotiApp Bogotá" 
            style={{ 
              width: "40px", 
              height: "40px", 
              borderRadius: "8px", 
              objectFit: "cover",
              border: "2px solid #0066cc",
              boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
            }} 
          />

          <div>
            <h1 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
              NotiApp <span style={{ fontSize: "10px", backgroundColor: "#004899", padding: "2px 6px", borderRadius: "4px" }}>BOG</span>
            </h1>
            <p style={{ fontSize: "10px", margin: 0, opacity: 0.8 }}>INFRAESTRUCTURA URBANA</p>
          </div>
        </div>

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={() => onNavigate("home")} style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontWeight: "500", fontSize: "14px" }}>
            Inicio
          </button>
          
          {/* PESTAÑAS DE CIUDADANO (Se ocultan para la Entidad Gestora) */}
          {userRole !== "entidad" && (
            <>
              <button onClick={() => onNavigate("report")} style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontWeight: "500", fontSize: "14px" }}>
                Reportar Daño
              </button>
              <button onClick={() => onNavigate("reports")} style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontWeight: "500", fontSize: "14px" }}>
                Consultar Reportes
              </button>
            </>
          )}

          {/* BOTÓN ENTIDAD GESTORA */}
          {userRole === "entidad" && (
            <button
              onClick={() => onNavigate("entity")}
              style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontWeight: "500", fontSize: "14px" }}
            >
              Entidad Gestora
            </button>
          )}

          {/* BOTÓN ADMINISTRADOR */}
          {userRole === "admin" && (
            <button
              onClick={() => onNavigate("admin")}
              style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontWeight: "500", fontSize: "14px" }}
            >
              Administrador
            </button>
          )}

          <button onClick={() => onNavigate("chat")} style={{ backgroundColor: "#004899", border: "none", color: "#ffffff", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: "500", fontSize: "14px" }}>
            ✨ NotiBot IA
          </button>

          {/* INFORMACIÓN DE USUARIO O SESIÓN */}
          {Boolean(user) ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: "600" }}>
                {user.nombre || user.name || "Usuario"} {userRole ? `(${userRole})` : ""}
              </span>
              <button
                onClick={() => setShowLogoutModal(true)}
                style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", textDecoration: "underline", fontSize: "12px" }}
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "8px", marginLeft: "12px" }}>
              <button onClick={() => onNavigate("login")} style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontSize: "14px" }}>
                Iniciar Sesión
              </button>
              <button onClick={() => onNavigate("register")} style={{ backgroundColor: "#ffffff", color: "#0265d2", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>
                Registrarse
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* MODAL DE CONFIRMACIÓN DE CERRAR SESIÓN */}
      {showLogoutModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
          <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", maxWidth: "360px", width: "90%", textAlign: "center", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#0f172a", marginBottom: "8px" }}>¿Cerrar Sesión?</h3>
            <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>¿Estás seguro de que deseas salir de tu cuenta NotiApp?</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", color: "#475569", fontWeight: "600", cursor: "pointer" }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmLogout}
                style={{ padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#ef4444", color: "#ffffff", fontWeight: "600", cursor: "pointer" }}
              >
                Sí, Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}