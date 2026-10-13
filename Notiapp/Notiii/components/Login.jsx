import React, { useState } from "react";
import { loginUser } from "../services/api";

export default function Login({ onLogin, navigateTo, showToast }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ciudadano"); // "ciudadano", "entidad", "administrador"
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      showToast ? showToast("Por favor ingresa correo y contraseña", "error") : alert("Por favor ingresa correo y contraseña");
      return;
    }

    setLoading(true);
    try {
      // Normalizar el rol para asegurar compatibilidad exacta con PostgreSQL ("administrador")
      const roleToSend = role === "admin" ? "administrador" : role;
      
      const response = await loginUser({ email, password, role: roleToSend });
      
      // Normalizar datos por si PostgreSQL devuelve 'rol' en vez de 'role' o 'nombre' en vez de 'name'
      const userObj = response.user || response;
      const normalizedUser = {
        ...userObj,
        role: userObj.role || userObj.rol || roleToSend,
        name: userObj.name || userObj.nombre || "Usuario",
      };

      // Notificar a App.jsx pasándole el usuario autenticado
      if (onLogin) {
        onLogin(normalizedUser);
      }
    } catch (error) {
      if (showToast) {
        showToast(error.message || "Error al iniciar sesión", "error");
      } else {
        alert(error.message || "Error al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "440px", margin: "40px auto", padding: "32px 24px", backgroundColor: "#ffffff", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", fontFamily: "sans-serif" }}>
      
      <h2 style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center", color: "#000000", margin: "0 0 8px 0" }}>
        Iniciar Sesión
      </h2>
      
      <p style={{ textAlign: "center", color: "#64748b", fontSize: "15px", margin: "0 0 24px 0" }}>
        Accede a tu cuenta de NotiApp Bogotá
      </p>

      {/* SELECTOR DE ROL */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "20px", backgroundColor: "#f1f5f9", padding: "4px", borderRadius: "10px" }}>
        <button
          type="button"
          onClick={() => setRole("ciudadano")}
          style={{
            flex: 1,
            padding: "8px 4px",
            borderRadius: "8px",
            border: "none",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: role === "ciudadano" ? "#0265d2" : "transparent",
            color: role === "ciudadano" ? "#ffffff" : "#64748b",
            transition: "all 0.2s"
          }}
        >
          👤 Ciudadano
        </button>

        <button
          type="button"
          onClick={() => setRole("entidad")}
          style={{
            flex: 1,
            padding: "8px 4px",
            borderRadius: "8px",
            border: "none",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: role === "entidad" ? "#0265d2" : "transparent",
            color: role === "entidad" ? "#ffffff" : "#64748b",
            transition: "all 0.2s"
          }}
        >
          🏢 Entidad
        </button>

        <button
          type="button"
          onClick={() => setRole("administrador")}
          style={{
            flex: 1,
            padding: "8px 4px",
            borderRadius: "8px",
            border: "none",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: (role === "administrador" || role === "admin") ? "#0265d2" : "transparent",
            color: (role === "administrador" || role === "admin") ? "#ffffff" : "#64748b",
            transition: "all 0.2s"
          }}
        >
          🛡️ Admin
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", color: "#1e293b", marginBottom: "6px" }}>
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontSize: "14px", outline: "none" }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", color: "#1e293b", marginBottom: "6px" }}>
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontSize: "14px", outline: "none" }}
          />
        </div>

        <div style={{ textAlign: "right" }}>
          <button
            type="button"
            onClick={() => showToast && showToast("Enlace de recuperación enviado a tu correo", "info")}
            style={{ background: "none", border: "none", color: "#0265d2", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ backgroundColor: loading ? "#94a3b8" : "#0265d2", color: "#ffffff", fontWeight: "bold", padding: "12px", borderRadius: "10px", border: "none", cursor: loading ? "not-allowed" : "pointer", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "4px" }}
        >
          <span>➔</span> {loading ? "Verificando..." : "Iniciar Sesión"}
        </button>
      </form>

      {/* SECCIÓN CREAR CUENTA */}
      <div style={{ marginTop: "28px", paddingTop: "20px", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
        <p style={{ fontSize: "15px", color: "#64748b", margin: "0 0 12px 0" }}>
          ¿No tienes una cuenta?
        </p>
        <button
          type="button"
          onClick={() => navigateTo("register")}
          style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", color: "#1e293b", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}
        >
          Crear una cuenta
        </button>
      </div>

    </div>
  );
}