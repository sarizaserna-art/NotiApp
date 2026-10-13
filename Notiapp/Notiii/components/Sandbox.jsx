import {
  User,
  FileWarning,
  Bot,
  LayoutDashboard,
} from "lucide-react";

function Sandbox({ user, navigateTo }) {
  return (
    <section className="sandbox">
      <div className="sandbox-card">

        <div className="mb-5">
          <h2 className="sandbox-title">
            Accesos rápidos
          </h2>

          <p className="text-sm text-slate-500">
            Explora las principales funcionalidades de NotiApp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

          <button
            onClick={() => navigateTo("report")}
            className="noti-btn noti-btn-primary"
          >
            <FileWarning className="h-4 w-4" />
            Reportar daño
          </button>

          <button
            onClick={() => navigateTo("consult")}
            className="noti-btn noti-btn-secondary"
          >
            <FileWarning className="h-4 w-4" />
            Ver reportes
          </button>

          <button
            onClick={() => navigateTo("chat")}
            className="noti-btn noti-btn-ai"
          >
            <Bot className="h-4 w-4" />
            NotiBot IA
          </button>

          {user ? (
            <button
              onClick={() => navigateTo("dashboard")}
              className="noti-btn noti-btn-success"
            >
              <LayoutDashboard className="h-4 w-4" />
              Mi Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigateTo("login")}
              className="noti-btn noti-btn-secondary"
            >
              <User className="h-4 w-4" />
              Iniciar sesión
            </button>
          )}

        </div>
      </div>
    </section>
  );
}

export default Sandbox;