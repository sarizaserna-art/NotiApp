import React, { useState } from "react";
import { AlertTriangle, UserPlus } from "lucide-react";
import { registerUser } from "../services/api";

function Register({ navigateTo, showToast }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // Validaciones básicas
    if (!form.name.trim() || !form.email.trim() || !form.password || !form.confirmPassword) {
      const msg = "Por favor completa todos los campos.";
      setError(msg);
      if (showToast) showToast(msg, "error");
      return;
    }

    if (form.password !== form.confirmPassword) {
      const msg = "Las contraseñas no coinciden.";
      setError(msg);
      if (showToast) showToast(msg, "error");
      return;
    }

    setLoading(true);

    try {
      // Petición real al backend mediante la API
      await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: "ciudadano", // Por defecto se registran como ciudadanos
      });

      if (showToast) {
        showToast("¡Cuenta creada con éxito! Por favor inicia sesión.", "success");
      }

      // Redirigir al login tras registrarse
      if (navigateTo) navigateTo("login");
    } catch (err) {
      const errorMsg = err.message || "Error al registrar la cuenta";
      setError(errorMsg);
      if (showToast) showToast(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="noti-card max-w-md mx-auto w-full">
        {/* Encabezado */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900">
            Crear Cuenta
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Regístrate para reportar y hacer seguimiento en Bogotá
          </p>
        </div>

        {/* Alerta de error si existe */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="noti-form">
          <div className="noti-form-group">
            <label htmlFor="register-name" className="noti-label">
              Nombre completo
            </label>
            <input
              id="register-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Ej. Ana María Gómez"
              className="noti-input"
            />
          </div>

          <div className="noti-form-group">
            <label htmlFor="register-email" className="noti-label">
              Correo electrónico
            </label>
            <input
              id="register-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              className="noti-input"
              autoComplete="email"
            />
          </div>

          <div className="noti-form-group">
            <label htmlFor="register-password" className="noti-label">
              Contraseña
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="noti-input"
              autoComplete="new-password"
            />
          </div>

          <div className="noti-form-group">
            <label htmlFor="register-confirmPassword" className="noti-label">
              Confirmar contraseña
            </label>
            <input
              id="register-confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="noti-input"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="noti-btn noti-btn-primary w-full flex items-center justify-center gap-2 mt-2"
          >
            <UserPlus className="h-4 w-4" />
            {loading ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        {/* Pie de la tarjeta */}
        <div className="auth-footer text-center mt-6 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500 mb-2">
            ¿Ya tienes una cuenta?
          </p>
          <button
            type="button"
            onClick={() => navigateTo && navigateTo("login")}
            className="noti-btn noti-btn-secondary w-full"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;