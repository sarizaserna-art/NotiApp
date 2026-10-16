  // ============================================
  // NotiApp - Controlador de reportes
  // ============================================

  import {
    addReport,
    getReports,
    getReportById,
    updateReport,
    deleteReport,
  } from "../appController";

  import {
    optimizeReportWithAI,
    generateTechnicalPlan,
  } from "../services/gemini";


  /**
   * Crea un reporte.
   */
  export async function createReport(reportData) {
    try {
      if (!reportData) {
        throw new Error(
          "No se recibieron datos del reporte."
        );
      }

      if (!reportData.type) {
        throw new Error(
          "El tipo de afectación es obligatorio."
        );
      }

      if (!reportData.description) {
        throw new Error(
          "La descripción es obligatoria."
        );
      }

      const report = {
        type: reportData.type,

        description:
          reportData.description,

        location:
          reportData.location || "",

        latitude:
          reportData.latitude || null,

        longitude:
          reportData.longitude || null,

        image:
          reportData.image || null,

        userId:
          reportData.userId || null,

        status: "Pendiente",

        priority: "Media",
      };

      const savedReport =
        addReport(report);

      return {
        success: true,
        report: savedReport,
      };

    } catch (error) {

      console.error(
        "Error creando reporte:",
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }
  }


  /**
   * Obtiene todos los reportes.
   */
  export async function fetchReports(filters = {}) {
    try {
      let reports = getReports();

      if (filters.status) {
        reports = reports.filter(
          (report) =>
            report.status ===
            filters.status
        );
      }

      if (filters.type) {
        reports = reports.filter(
          (report) =>
            report.type ===
            filters.type
        );
      }

      if (filters.search) {
        const search =
          filters.search.toLowerCase();

        reports = reports.filter(
          (report) =>
            report.id
              ?.toLowerCase()
              .includes(search) ||

            report.type
              ?.toLowerCase()
              .includes(search) ||

            report.location
              ?.toLowerCase()
              .includes(search) ||

            report.description
              ?.toLowerCase()
              .includes(search)
        );
      }

      return {
        success: true,
        reports,
        total: reports.length,
      };

    } catch (error) {

      console.error(
        "Error obteniendo reportes:",
        error
      );

      return {
        success: false,
        reports: [],
        total: 0,
        error: error.message,
      };
    }
  }


  /**
   * Obtiene un reporte específico.
   */
  export async function fetchReport(id) {
    try {
      const report =
        getReportById(id);

      if (!report) {
        throw new Error(
          "Reporte no encontrado."
        );
      }

      return {
        success: true,
        report,
      };

    } catch (error) {

      return {
        success: false,
        report: null,
        error: error.message,
      };
    }
  }


  /**
   * Actualiza el estado de un reporte.
   */
  export async function changeReportStatus(
    id,
    status
  ) {
    const validStatuses = [
      "Pendiente",
      "Asignado",
      "En proceso",
      "Resuelto",
      "Rechazado",
    ];

    if (!validStatuses.includes(status)) {
      return {
        success: false,
        error: "Estado no válido.",
      };
    }

    const report =
      updateReport(id, {
        status,
      });

    if (!report) {
      return {
        success: false,
        error: "Reporte no encontrado.",
      };
    }

    return {
      success: true,
      report,
    };
  }


  /**
   * Actualiza cualquier información del reporte.
   */
  export async function editReport(
    id,
    changes
  ) {
    try {
      const report =
        updateReport(id, changes);

      if (!report) {
        throw new Error(
          "Reporte no encontrado."
        );
      }

      return {
        success: true,
        report,
      };

    } catch (error) {

      return {
        success: false,
        error: error.message,
      };
    }
  }


  /**
   * Elimina un reporte.
   */
  export async function removeReport(id) {
    try {
      deleteReport(id);

      return {
        success: true,
        message:
          "Reporte eliminado correctamente.",
      };

    } catch (error) {

      return {
        success: false,
        error: error.message,
      };
    }
  }


  /**
   * Optimiza la descripción mediante IA.
   */
  export async function optimizeReport(
    reportData
  ) {
    try {

      if (!reportData?.description) {
        throw new Error(
          "No existe una descripción para optimizar."
        );
      }

      const result =
        await optimizeReportWithAI(
          reportData
        );

      return {
        success: true,
        result,
      };

    } catch (error) {

      console.error(
        "Error optimizando reporte:",
        error
      );

      return {
        success: false,
        result: null,
        error: error.message,
      };
    }
  }


  /**
   * Genera un plan técnico mediante IA.
   */
  export async function createTechnicalPlan(
    report
  ) {
    try {

      if (!report) {
        throw new Error(
          "No se recibió el reporte."
        );
      }

      const plan =
        await generateTechnicalPlan(
          report
        );

      return {
        success: true,
        plan,
      };

    } catch (error) {

      console.error(
        "Error generando plan técnico:",
        error
      );

      return {
        success: false,
        plan: null,
        error: error.message,
      };
    }
  }


  /**
   * Obtiene estadísticas de reportes.
   */
  export async function getReportStats() {
    const reports = getReports();

    return {
      total: reports.length,

      pending:
        reports.filter(
          (r) =>
            r.status === "Pendiente"
        ).length,

      assigned:
        reports.filter(
          (r) =>
            r.status === "Asignado"
        ).length,

      inProgress:
        reports.filter(
          (r) =>
            r.status === "En proceso"
        ).length,

      resolved:
        reports.filter(
          (r) =>
            r.status === "Resuelto"
        ).length,

      rejected:
        reports.filter(
          (r) =>
            r.status === "Rechazado"
        ).length,
    };
  }