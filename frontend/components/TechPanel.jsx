import { useState } from "react";
import {
  Wrench,
  ClipboardList,
  Clock,
  CheckCircle,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const initialTasks = [
  {
    id: "REP-001",
    type: "Hueco",
    location: "Carrera 7 con Calle 72",
    priority: "Alta",
    status: "Pendiente",
  },
  {
    id: "REP-002",
    type: "Alumbrado",
    location: "Calle 80 con Carrera 15",
    priority: "Media",
    status: "Asignado",
  },
  {
    id: "REP-003",
    type: "Señalización",
    location: "Carrera 30 con Calle 45",
    priority: "Baja",
    status: "Finalizado",
  },
];

function TechPanel({ user }) {
  const [tasks, setTasks] =
    useState(initialTasks);

  const [selected, setSelected] =
    useState(null);

  const [plan, setPlan] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const updateStatus = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  };

  const generatePlan = async (task) => {
    setSelected(task);
    setLoading(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      setPlan(
        `PLAN DE TRABAJO

Reporte: ${task.id}
Tipo: ${task.type}
Prioridad: ${task.priority}

1. Inspección de campo.
2. Validación del diagnóstico.
3. Definición de recursos.
4. Ejecución de mantenimiento.
5. Registro de evidencia.
6. Cierre del reporte.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>

          <p className="text-sm text-emerald-600 font-bold">
            Operaciones
          </p>

          <h1 className="text-3xl font-black text-slate-900">
            Panel Gestor
          </h1>

          <p className="text-slate-500 mt-1">
            Administración técnica de reportes y órdenes de trabajo.
          </p>

        </div>

        <div className="tech-badge px-3 py-2 rounded-lg text-sm font-bold">
          Técnico: {user?.name || "Usuario gestor"}
        </div>

      </div>


      {/* KPIs */}
      <div className="dashboard-grid">

        <div className="kpi-card">
          <ClipboardList className="h-5 w-5 text-blue-600" />
          <p className="kpi-value">
            {tasks.length}
          </p>
          <p className="text-sm text-slate-500">
            Casos asignados
          </p>
        </div>

        <div className="kpi-card">
          <Clock className="h-5 w-5 text-amber-500" />
          <p className="kpi-value">
            {
              tasks.filter(
                (t) => t.status === "Pendiente"
              ).length
            }
          </p>
          <p className="text-sm text-slate-500">
            Pendientes
          </p>
        </div>

        <div className="kpi-card">
          <Wrench className="h-5 w-5 text-blue-600" />
          <p className="kpi-value">
            {
              tasks.filter(
                (t) => t.status === "Asignado"
              ).length
            }
          </p>
          <p className="text-sm text-slate-500">
            En ejecución
          </p>
        </div>

        <div className="kpi-card">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
          <p className="kpi-value">
            {
              tasks.filter(
                (t) => t.status === "Finalizado"
              ).length
            }
          </p>
          <p className="text-sm text-slate-500">
            Finalizados
          </p>
        </div>

      </div>


      {/* Órdenes */}
      <section className="noti-card">

        <div className="noti-card-header">
          <h2 className="font-black text-slate-900">
            Órdenes de trabajo
          </h2>
        </div>

        <div className="divide-y divide-slate-100">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="p-5"
            >

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                <div>

                  <p className="text-xs text-slate-400 font-bold">
                    {task.id}
                  </p>

                  <h3 className="font-black text-lg">
                    {task.type}
                  </h3>

                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4" />
                    {task.location}
                  </p>

                </div>


                <div className="flex flex-wrap items-center gap-2">

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100">
                    Prioridad: {task.priority}
                  </span>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    {task.status}
                  </span>

                </div>

              </div>


              <div className="flex flex-wrap gap-2 mt-4">

                {task.status === "Pendiente" && (
                  <button
                    onClick={() =>
                      updateStatus(
                        task.id,
                        "Asignado"
                      )
                    }
                    className="noti-btn noti-btn-primary text-xs"
                  >
                    Asignar
                  </button>
                )}

                {task.status === "Asignado" && (
                  <button
                    onClick={() =>
                      updateStatus(
                        task.id,
                        "Finalizado"
                      )
                    }
                    className="noti-btn noti-btn-success text-xs"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Finalizar
                  </button>
                )}

                <button
                  onClick={() =>
                    generatePlan(task)
                  }
                  className="noti-btn noti-btn-ai text-xs"
                >
                  <Sparkles className="h-4 w-4" />
                  Generar plan IA
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* Plan IA */}
      {selected && (
        <section className="ai-panel">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600" />

              <h2 className="ai-title">
                Plan técnico IA
              </h2>
            </div>

            <button
              onClick={() => {
                setSelected(null);
                setPlan("");
              }}
              className="text-sm text-slate-500"
            >
              Cerrar
            </button>

          </div>

          {loading ? (
            <div className="flex gap-3 items-center mt-4">
              <div className="noti-loader" />
              Generando plan...
            </div>
          ) : (
            <div className="ai-result whitespace-pre-line">
              {plan}
            </div>
          )}

        </section>
      )}

    </div>
  );
}

export default TechPanel;