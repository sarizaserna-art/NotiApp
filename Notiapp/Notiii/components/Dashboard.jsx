import {
  FileWarning,
  Clock,
  CheckCircle,
  Activity,
  ArrowRight,
  MapPin,
} from "lucide-react";

const userReports = [
  {
    id: "REP-001",
    type: "Hueco",
    location: "Carrera 7 con Calle 72",
    status: "En proceso",
  },
  {
    id: "REP-004",
    type: "Alumbrado",
    location: "Calle 100 con Carrera 15",
    status: "Pendiente",
  },
];

function Dashboard({ user, navigateTo }) {
  const stats = [
    {
      label: "Mis reportes",
      value: 8,
      icon: FileWarning,
    },
    {
      label: "Pendientes",
      value: 3,
      icon: Clock,
    },
    {
      label: "En proceso",
      value: 2,
      icon: Activity,
    },
    {
      label: "Resueltos",
      value: 3,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Encabezado */}
      <div>
        <p className="text-sm text-blue-600 font-bold">
          Panel ciudadano
        </p>

        <h1 className="text-3xl font-black text-slate-900">
          Mi Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Bienvenido,{" "}
          <strong>
            {user?.name || "Usuario"}
          </strong>
          . Aquí puedes consultar tu actividad.
        </p>
      </div>


      {/* KPIs */}
      <div className="dashboard-grid">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="kpi-card"
            >

              <div className="flex items-center justify-between">

                <p className="text-sm font-semibold text-slate-500">
                  {stat.label}
                </p>

                <Icon className="h-5 w-5 text-blue-600" />

              </div>

              <p className="kpi-value">
                {stat.value}
              </p>

            </div>
          );
        })}

      </div>


      {/* Reportes */}
      <section className="noti-card">

        <div className="noti-card-header flex items-center justify-between">

          <div>
            <h2 className="font-black text-slate-900">
              Mis reportes recientes
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Últimos reportes registrados.
            </p>
          </div>

          <button
            onClick={() => navigateTo("consult")}
            className="text-blue-600 font-bold text-sm"
          >
            Ver todos
          </button>

        </div>


        <div className="divide-y divide-slate-100">

          {userReports.map((report) => (

            <div
              key={report.id}
              className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >

              <div>

                <p className="text-xs text-slate-400 font-bold">
                  {report.id}
                </p>

                <h3 className="font-bold text-slate-800">
                  {report.type}
                </h3>

                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {report.location}
                </p>

              </div>

              <div className="flex items-center gap-3">

                <span
                  className={
                    report.status === "En proceso"
                      ? "report-status status-progress"
                      : "report-status status-pending"
                  }
                >
                  {report.status}
                </span>

                <button
                  onClick={() => navigateTo("consult")}
                  className="text-blue-600"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* Acción rápida */}
      <section className="noti-card p-6">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

          <div>
            <h2 className="font-black text-xl text-slate-900">
              ¿Encontraste otro problema?
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Registra un nuevo reporte y permite que la IA ayude
              a estructurarlo.
            </p>
          </div>

          <button
            onClick={() => navigateTo("report")}
            className="noti-btn noti-btn-primary"
          >
            <FileWarning className="h-4 w-4" />
            Nuevo reporte
          </button>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;