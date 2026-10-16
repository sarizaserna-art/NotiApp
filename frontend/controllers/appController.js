// ============================================
// NotiApp - Controlador principal
// ============================================

const STORAGE_USER = "notiapp_user";
const STORAGE_REPORTS = "notiapp_reports";

/**
 * Inicializa la aplicación.
 */
export function initializeApp() {
  try {
    const user = getCurrentUser();
    const reports = getReports();

    return {
      initialized: true,
      user,
      reports,
      authenticated: Boolean(user),
    };
  } catch (error) {
    console.error("Error inicializando NotiApp:", error);

    return {
      initialized: false,
      user: null,
      reports: [],
      authenticated: false,
      error: error.message,
    };
  }
}

/**
 * Obtiene el usuario actualmente autenticado.
 */
export function getCurrentUser() {
  try {
    const storedUser = localStorage.getItem(STORAGE_USER);

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Error leyendo usuario:", error);
    return null;
  }
}

/**
 * Guarda la sesión del usuario.
 */
export function setCurrentUser(user) {
  try {
    localStorage.setItem(
      STORAGE_USER,
      JSON.stringify(user)
    );

    return user;
  } catch (error) {
    console.error("Error guardando usuario:", error);
    return null;
  }
}

/**
 * Cierra la sesión.
 */
export function logout() {
  try {
    localStorage.removeItem(STORAGE_USER);

    return {
      success: true,
      message: "Sesión cerrada correctamente.",
    };
  } catch (error) {
    console.error("Error cerrando sesión:", error);

    return {
      success: false,
      message: "No fue posible cerrar la sesión.",
    };
  }
}

/**
 * Obtiene todos los reportes almacenados localmente.
 */
export function getReports() {
  try {
    const storedReports =
      localStorage.getItem(STORAGE_REPORTS);

    if (!storedReports) {
      return [];
    }

    return JSON.parse(storedReports);
  } catch (error) {
    console.error("Error leyendo reportes:", error);
    return [];
  }
}

/**
 * Guarda la colección de reportes.
 */
export function saveReports(reports) {
  try {
    localStorage.setItem(
      STORAGE_REPORTS,
      JSON.stringify(reports)
    );

    return true;
  } catch (error) {
    console.error("Error guardando reportes:", error);
    return false;
  }
}

/**
 * Agrega un reporte al almacenamiento local.
 */
export function addReport(report) {
  const reports = getReports();

  const newReport = {
    ...report,

    id:
      report.id ||
      `REP-${Date.now()}`,

    createdAt:
      report.createdAt ||
      new Date().toISOString(),

    status:
      report.status ||
      "Pendiente",
  };

  reports.unshift(newReport);

  saveReports(reports);

  return newReport;
}

/**
 * Busca un reporte por ID.
 */
export function getReportById(id) {
  const reports = getReports();

  return (
    reports.find(
      (report) => report.id === id
    ) || null
  );
}

/**
 * Actualiza un reporte.
 */
export function updateReport(id, changes) {
  const reports = getReports();

  const index = reports.findIndex(
    (report) => report.id === id
  );

  if (index === -1) {
    return null;
  }

  reports[index] = {
    ...reports[index],
    ...changes,
    updatedAt: new Date().toISOString(),
  };

  saveReports(reports);

  return reports[index];
}

/**
 * Elimina un reporte.
 */
export function deleteReport(id) {
  const reports = getReports();

  const filteredReports = reports.filter(
    (report) => report.id !== id
  );

  saveReports(filteredReports);

  return true;
}

/**
 * Limpia los datos locales de la aplicación.
 */
export function clearAppData() {
  localStorage.removeItem(STORAGE_USER);
  localStorage.removeItem(STORAGE_REPORTS);

  return true;
}

/**
 * Verifica si el usuario tiene determinado rol.
 */
export function hasRole(role) {
  const user = getCurrentUser();

  if (!user) {
    return false;
  }

  if (Array.isArray(user.roles)) {
    return user.roles.includes(role);
  }

  return user.role === role;
}

/**
 * Control básico de navegación.
 */
export function navigateTo(view) {
  const validViews = [
    "home",
    "report",
    "consult",
    "chat",
    "dashboard",
    "tech",
    "admin",
    "login",
    "register",
  ];

  if (!validViews.includes(view)) {
    console.warn(
      `Vista no válida: ${view}`
    );

    return false;
  }

  window.dispatchEvent(
    new CustomEvent("notiapp:navigate", {
      detail: view,
    })
  );

  return true;
}