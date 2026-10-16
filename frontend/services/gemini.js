const GEMINI_API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY;

const GEMINI_MODEL =
  import.meta.env.VITE_GEMINI_MODEL ||
  "gemini-2.5-flash";

const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;


/**
 * Verifica que exista la configuración necesaria.
 */
function validateConfig() {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "No se encontró VITE_GEMINI_API_KEY."
    );
  }
}


/**
 * Realiza una petición básica a Gemini.
 */
async function requestGemini(
  prompt,
  options = {}
) {
  validateConfig();

  const {
    temperature = 0.4,
    maxOutputTokens = 1200,
  } = options;

  const response = await fetch(
    `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        contents: [
          {
            role: "user",

            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],

        generationConfig: {
          temperature,
          maxOutputTokens,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorData =
      await response.json().catch(() => null);

    const message =
      errorData?.error?.message ||
      `Gemini respondió con HTTP ${response.status}.`;

    throw new Error(message);
  }

  const data = await response.json();

  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

  if (!text) {
    throw new Error(
      "Gemini no devolvió contenido."
    );
  }

  return text;
}


/**
 * Chat general con Gemini.
 */
export async function sendMessageToGemini(
  message,
  history = []
) {
  const formattedHistory = history
    .map((item) => {
      const role =
        item.role === "user"
          ? "Ciudadano"
          : "NotiBot";

      return `${role}: ${item.text}`;
    })
    .join("\n");

  const prompt = `
Eres NotiBot IA, el asistente virtual
de NotiApp Bogotá.

Tu función es orientar a los ciudadanos
sobre infraestructura urbana, reportes,
veeduría ciudadana y seguimiento de casos.

REGLAS:
- Responde en español.
- Sé claro y concreto.
- No inventes información oficial.
- No afirmes que un reporte fue atendido
  si no existe información verificable.
- No presentes recomendaciones generales
  como diagnósticos técnicos definitivos.
- Si falta información, dilo claramente.
- Prioriza respuestas útiles para el ciudadano.

CONVERSACIÓN PREVIA:
${formattedHistory || "Sin conversación previa."}

NUEVA CONSULTA:
${message}
`;

  return requestGemini(prompt, {
    temperature: 0.5,
    maxOutputTokens: 1000,
  });
}


/**
 * Optimiza la descripción de un reporte.
 */
export async function optimizeReportWithAI(
  report
) {
  const prompt = `
Eres un asistente especializado en
redacción de reportes de infraestructura urbana.

Convierte la información ciudadana en un
reporte claro, estructurado y útil para
una posterior revisión técnica.

DATOS DEL REPORTE:

Tipo:
${report.type || "No especificado"}

Descripción original:
${report.description || "No especificada"}

Ubicación:
${report.location || "No especificada"}

Coordenadas:
${report.latitude || "No disponible"},
${report.longitude || "No disponible"}

Genera:

1. Título del reporte.
2. Descripción optimizada.
3. Afectación identificada.
4. Nivel de prioridad sugerido:
   Baja, Media o Alta.
5. Información que debería verificarse
   durante una inspección.

No inventes datos que no estén presentes.

Devuelve el resultado en español.
`;

  return requestGemini(prompt, {
    temperature: 0.3,
    maxOutputTokens: 1000,
  });
}


/**
 * Genera un plan de trabajo técnico.
 */
export async function generateTechnicalPlan(
  report
) {
  const prompt = `
Eres un asistente de planificación de
mantenimiento de infraestructura urbana.

Analiza este reporte:

ID:
${report.id || "No disponible"}

Tipo:
${report.type || "No especificado"}

Descripción:
${report.description || "No especificada"}

Ubicación:
${report.location || "No especificada"}

Prioridad:
${report.priority || "No especificada"}

Estado:
${report.status || "No especificado"}

Genera un PLAN DE TRABAJO TÉCNICO
preliminar con:

1. Objetivo.
2. Inspección inicial.
3. Diagnóstico requerido.
4. Actividades sugeridas.
5. Recursos que podrían requerirse.
6. Evidencia que debería registrarse.
7. Criterios generales de cierre.

IMPORTANTE:

Este documento es una propuesta preliminar.
No reemplaza una inspección profesional
ni una decisión de la entidad competente.

No inventes dimensiones, costos, materiales
ni tiempos específicos que no estén disponibles.
`;

  return requestGemini(prompt, {
    temperature: 0.25,
    maxOutputTokens: 1400,
  });
}


/**
 * Analiza una consulta de veeduría ciudadana.
 */
export async function analyzeVeeduriaQuestion(
  question,
  context = {}
) {
  const prompt = `
Eres NotiBot IA de NotiApp Bogotá.

Ayudas a ciudadanos a comprender procesos
de reporte y seguimiento de infraestructura
urbana.

CONSULTA:
${question}

CONTEXTO:
${JSON.stringify(context, null, 2)}

Responde:

- Qué significa la situación.
- Qué puede hacer el ciudadano.
- Qué información debería conservar.
- Qué información debería verificar.

No inventes procedimientos oficiales.
Si la información depende de una entidad
o normativa específica, indícalo.
`;

  return requestGemini(prompt, {
    temperature: 0.4,
    maxOutputTokens: 1000,
  });
}


/**
 * Analiza un reporte completo.
 */
export async function analyzeReportWithAI(
  report
) {
  const prompt = `
Analiza el siguiente reporte ciudadano
de infraestructura urbana.

REPORTE:
${JSON.stringify(report, null, 2)}

Entrega:

1. Resumen.
2. Problema identificado.
3. Prioridad sugerida.
4. Posibles riesgos.
5. Información faltante.
6. Recomendación general.

No realices un diagnóstico estructural
definitivo y no inventes información.
`;

  return requestGemini(prompt, {
    temperature: 0.3,
    maxOutputTokens: 1200,
  });
}


/**
 * Comprueba la conexión con Gemini.
 */
export async function testGeminiConnection() {
  try {
    const response =
      await requestGemini(
        "Responde únicamente: conexión correcta.",
        {
          temperature: 0,
          maxOutputTokens: 50,
        }
      );

    return {
      success: true,
      response,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}