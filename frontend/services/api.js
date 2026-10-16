const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Helper para validar si la respuesta es JSON antes de parsearla
const handleResponse = async (response, fallbackErrorMsg) => {
  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    if (response.status === 413) {
      throw new Error("El archivo es demasiado pesado para el servidor. Intenta con un archivo más liviano.");
    }
    if (response.status === 404) {
      throw new Error(`Ruta no encontrada (404) en ${response.url}. Revisa la URL del backend.`);
    }
    throw new Error(`Error del servidor (${response.status}). Verifica que el backend esté corriendo.`);
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || fallbackErrorMsg);
  }

  return data;
};

// Obtener headers de petición incluyendo el Bearer Token si el usuario ha iniciado sesión
const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem("token");
  const headers = {};

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// -------------------------------------------------------------------------
// AUTENTICACIÓN
// -------------------------------------------------------------------------

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  });

  const data = await handleResponse(response, "Error al iniciar sesión");

  if (data.token) {
    localStorage.setItem("token", data.token);
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }

  return data;
};

export const registerUser = async (userData) => {
  const payload = {
    nombre: userData.name || userData.nombre,
    email: userData.email,
    password: userData.password || userData.contrasena,
    rol: userData.role || userData.rol || "ciudadano",
  };

  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await handleResponse(response, "Error al registrarse");

  if (data.token) {
    localStorage.setItem("token", data.token);
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }

  return data;
};

// -------------------------------------------------------------------------
// ADMINISTRACIÓN DE USUARIOS
// -------------------------------------------------------------------------

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/users`, {
      headers: getHeaders(),
    });
    return await handleResponse(response, "Error al obtener la lista de usuarios");
  } catch (error) {
    console.error("Error en fetchUsers:", error);
    throw error;
  }
};

export const updateUserRole = async (userId, newRole) => {
  try {
    const response = await fetch(`${API_URL}/admin/users/${userId}/role`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ role: newRole }),
    });
    return await handleResponse(response, "Error al actualizar el rol del usuario");
  } catch (error) {
    console.error("Error en updateUserRole:", error);
    throw error;
  }
};

// -------------------------------------------------------------------------
// GESTIÓN DE REPORTES
// -------------------------------------------------------------------------

export const fetchReports = async () => {
  const response = await fetch(`${API_URL}/reports`, {
    headers: getHeaders(),
  });

  return await handleResponse(response, "Error al consultar los reportes");
};

export const createReport = async (reportData) => {
  const isFormData = reportData instanceof FormData;

  const response = await fetch(`${API_URL}/reports`, {
    method: "POST",
    headers: getHeaders(isFormData),
    body: isFormData ? reportData : JSON.stringify(reportData),
  });

  return await handleResponse(response, "Error al registrar el reporte");
};

export const updateReportStatus = async (reportId, statusData) => {
  try {
    const response = await fetch(`${API_URL}/reports/${reportId}/status`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(statusData),
    });

    return await handleResponse(response, "No se pudo actualizar el estado del reporte");
  } catch (error) {
    console.error("Error al actualizar el reporte:", error);
    throw error;
  }
};

export const createReportAPI = createReport;