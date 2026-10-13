// ============================================
// NotiApp - Funciones auxiliares
// ============================================

/**
 * Genera un ID único.
 */
export function generateId(prefix = "ID") {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;
}


/**
 * Formatea una fecha.
 */
export function formatDate(
  date,
  includeTime = true
) {
  if (!date) return "Sin fecha";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "Fecha inválida";
  }

  return new Intl.DateTimeFormat(
    "es-CO",
    {
      dateStyle: "medium",
      ...(includeTime
        ? { timeStyle: "short" }
        : {}),
    }
  ).format(value);
}


/**
 * Capitaliza un texto.
 */
export function capitalize(text = "") {
  if (!text) return "";

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1).toLowerCase()
  );
}


/**
 * Convierte un texto a formato título.
 */
export function titleCase(text = "") {
  return text
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(capitalize)
    .join(" ");
}


/**
 * Elimina espacios innecesarios.
 */
export function cleanText(text = "") {
  return text
    .trim()
    .replace(/\s+/g, " ");
}


/**
 * Valida un correo electrónico.
 */
export function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email.trim()
  );
}


/**
 * Valida una contraseña básica.
 */
export function isValidPassword(
  password = ""
) {
  return password.length >= 8;
}


/**
 * Valida un formulario.
 */
export function validateRequiredFields(
  data,
  fields = []
) {
  const errors = {};

  fields.forEach((field) => {
    const value = data?.[field];

    if (
      value === undefined ||
      value === null ||
      String(value).trim() === ""
    ) {
      errors[field] =
        "Este campo es obligatorio.";
    }
  });

  return {
    valid:
      Object.keys(errors).length === 0,
    errors,
  };
}


/**
 * Devuelve una etiqueta legible para el estado.
 */
export function getStatusLabel(
  status
) {
  const labels = {
    Pendiente: "Pendiente",
    Asignado: "Asignado",
    "En proceso": "En proceso",
    Resuelto: "Resuelto",
    Rechazado: "Rechazado",
  };

  return (
    labels[status] ||
    status ||
    "Sin estado"
  );
}


/**
 * Devuelve una clase CSS según el estado.
 */
export function getStatusClass(
  status
) {
  const classes = {
    Pendiente: "status-pending",
    Asignado: "status-assigned",
    "En proceso": "status-progress",
    Resuelto: "status-resolved",
    Rechazado: "status-rejected",
  };

  return (
    classes[status] ||
    "status-default"
  );
}


/**
 * Devuelve una etiqueta de prioridad.
 */
export function getPriorityLabel(
  priority
) {
  const labels = {
    Baja: "Baja",
    Media: "Media",
    Alta: "Alta",
    Crítica: "Crítica",
  };

  return (
    labels[priority] ||
    priority ||
    "No definida"
  );
}


/**
 * Determina la prioridad de un reporte
 * a partir de palabras clave.
 */
export function calculatePriority(
  description = ""
) {
  const text =
    description.toLowerCase();

  const criticalWords = [
    "hundimiento",
    "colapso",
    "accidente",
    "peligro",
    "emergencia",
    "abierto",
    "intransitable",
  ];

  const highWords = [
    "hueco grande",
    "daño grave",
    "riesgo",
    "peligroso",
    "fractura",
    "desprendimiento",
  ];

  if (
    criticalWords.some((word) =>
      text.includes(word)
    )
  ) {
    return "Crítica";
  }

  if (
    highWords.some((word) =>
      text.includes(word)
    )
  ) {
    return "Alta";
  }

  return "Media";
}


/**
 * Filtra reportes por texto.
 */
export function filterReports(
  reports = [],
  search = ""
) {
  if (!search.trim()) {
    return reports;
  }

  const query =
    search.toLowerCase().trim();

  return reports.filter((report) => {
    return [
      report.id,
      report.type,
      report.description,
      report.location,
      report.status,
    ]
      .filter(Boolean)
      .some((value) =>
        String(value)
          .toLowerCase()
          .includes(query)
      );
  });
}


/**
 * Ordena reportes por fecha.
 */
export function sortReportsByDate(
  reports = [],
  newestFirst = true
) {
  return [...reports].sort(
    (a, b) => {
      const dateA =
        new Date(
          a.createdAt || 0
        ).getTime();

      const dateB =
        new Date(
          b.createdAt || 0
        ).getTime();

      return newestFirst
        ? dateB - dateA
        : dateA - dateB;
    }
  );
}


/**
 * Cuenta reportes por estado.
 */
export function countByStatus(
  reports = []
) {
  return reports.reduce(
    (result, report) => {
      const status =
        report.status ||
        "Sin estado";

      result[status] =
        (result[status] || 0) + 1;

      return result;
    },
    {}
  );
}


/**
 * Convierte un objeto a JSON seguro.
 */
export function safeJsonParse(
  value,
  fallback = null
) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}


/**
 * Guarda datos en localStorage.
 */
export function saveLocal(
  key,
  value
) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

    return true;
  } catch (error) {
    console.error(
      "Error guardando datos:",
      error
    );

    return false;
  }
}


/**
 * Lee datos de localStorage.
 */
export function getLocal(
  key,
  fallback = null
) {
  try {
    const value =
      localStorage.getItem(key);

    if (value === null) {
      return fallback;
    }

    return JSON.parse(value);
  } catch {
    return fallback;
  }
}


/**
 * Elimina datos de localStorage.
 */
export function removeLocal(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}


/**
 * Debounce para búsquedas y eventos.
 */
export function debounce(
  callback,
  delay = 300
) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}


/**
 * Descarga un archivo generado.
 */
export function downloadBlob(
  blob,
  filename
) {
  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  link.remove();

  URL.revokeObjectURL(url);
}


/**
 * Convierte una imagen File a Data URL.
 */
export function fileToDataURL(file) {
  return new Promise(
    (resolve, reject) => {
      const reader =
        new FileReader();

      reader.onload = () =>
        resolve(reader.result);

      reader.onerror = () =>
        reject(
          new Error(
            "No fue posible leer el archivo."
          )
        );

      reader.readAsDataURL(file);
    }
  );
}


/**
 * Limita la longitud de un texto.
 */
export function truncate(
  text = "",
  maxLength = 100
) {
  if (text.length <= maxLength) {
    return text;
  }

  return (
    text.substring(
      0,
      maxLength
    ) + "..."
  );
}


/**
 * Formatea coordenadas.
 */
export function formatCoordinates(
  latitude,
  longitude
) {
  if (
    latitude === null ||
    latitude === undefined ||
    longitude === null ||
    longitude === undefined
  ) {
    return "Sin coordenadas";
  }

  return `${Number(latitude).toFixed(
    6
  )}, ${Number(longitude).toFixed(6)}`;
}


/**
 * Construye un enlace de Google Maps.
 */
export function getMapUrl(
  latitude,
  longitude
) {
  if (
    latitude === null ||
    latitude === undefined ||
    longitude === null ||
    longitude === undefined
  ) {
    return null;
  }

  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}