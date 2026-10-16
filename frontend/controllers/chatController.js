// ============================================
// NotiApp - Controlador de NotiBot IA
// ============================================

import {
  sendMessageToGemini,
} from "../services/gemini";


/**
 * Envía un mensaje al asistente.
 */
export async function sendChatMessage(
  message,
  history = []
) {
  try {

    if (!message?.trim()) {
      throw new Error(
        "El mensaje está vacío."
      );
    }

    const response =
      await sendMessageToGemini(
        message.trim(),
        history
      );

    return {
      success: true,
      message: response,
    };

  } catch (error) {

    console.error(
      "Error en NotiBot:",
      error
    );

    return {
      success: false,
      message:
        "No fue posible procesar tu consulta.",
      error: error.message,
    };
  }
}


/**
 * Envía una consulta enfocada en veeduría.
 */
export async function askVeeduriaBot(
  question,
  context = {}
) {
  try {

    if (!question?.trim()) {
      throw new Error(
        "La consulta está vacía."
      );
    }

    const prompt = `
Eres NotiBot IA, asistente de NotiApp Bogotá.

Tu función es orientar a ciudadanos sobre:
- infraestructura urbana;
- reportes ciudadanos;
- seguimiento de reportes;
- veeduría ciudadana;
- mantenimiento de infraestructura;
- interpretación general del estado de un reporte.

No inventes información oficial.

Consulta del ciudadano:
${question}

Contexto disponible:
${JSON.stringify(context)}
`;

    const response =
      await sendMessageToGemini(
        prompt,
        []
      );

    return {
      success: true,
      response,
    };

  } catch (error) {

    console.error(
      "Error en consulta de veeduría:",
      error
    );

    return {
      success: false,
      response: null,
      error: error.message,
    };
  }
}


/**
 * Analiza un reporte desde NotiBot.
 */
export async function analyzeReportWithChat(
  report
) {
  try {

    if (!report) {
      throw new Error(
        "No se recibió el reporte."
      );
    }

    const prompt = `
Analiza el siguiente reporte ciudadano
de infraestructura urbana.

ID:
${report.id || "Sin ID"}

Tipo:
${report.type || "No especificado"}

Descripción:
${report.description || "Sin descripción"}

Ubicación:
${report.location || "No especificada"}

Estado:
${report.status || "No especificado"}

Entrega:
1. Resumen.
2. Problema identificado.
3. Posible prioridad.
4. Recomendación general.
5. Información adicional que debería verificarse.

No presentes el análisis como diagnóstico técnico definitivo.
`;

    const response =
      await sendMessageToGemini(
        prompt,
        []
      );

    return {
      success: true,
      analysis: response,
    };

  } catch (error) {

    return {
      success: false,
      analysis: null,
      error: error.message,
    };
  }
}


/**
 * Genera una respuesta rápida para preguntas frecuentes.
 */
export async function quickQuestion(
  question
) {
  const commonContext = `
Eres NotiBot IA de NotiApp Bogotá.

Responde de forma clara, breve y útil.
Si no tienes información suficiente,
indícalo explícitamente.

Pregunta:
${question}
`;

  try {

    const response =
      await sendMessageToGemini(
        commonContext,
        []
      );

    return {
      success: true,
      response,
    };

  } catch (error) {

    return {
      success: false,
      response:
        "No fue posible consultar NotiBot.",
      error: error.message,
    };
  }
}