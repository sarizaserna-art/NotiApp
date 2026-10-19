import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import Login from "../components/Login";
import Register from "../components/Register";
import AdminPanel from "../components/AdminPanel";
import EntityPanel from "../components/EntityPanel";
import ReportForm from "../components/ReportForm";
import Reports from "../components/Reports";
import Notibot from "../components/Notibot";
import Toast from "../components/toast";
import Footer from "../components/Footer";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  const [maintenanceNotice, setMaintenanceNotice] = useState({
    active: false,
    title: "",
    message: "",
  });

  const [reports, setReports] = useState([
    {
      id: "REP-001",
      type: "Malla Vial",
      location: "Calle 26 # 68-90",
      status: "Pendiente",
      isDuplicate: false,
    },
    {
      id: "REP-002",
      type: "Alumbrado Público",
      location: "Carrera 7 # 45-10",
      status: "En proceso",
      isDuplicate: false,
    },
  ]);

  // RESTAURAR SESIÓN DESDE LOCALSTORAGE AL CARGAR LA APLICACIÓN
  useEffect(() => {
    const savedUser = localStorage.getItem("notiApp_user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);

        // Restaurar la vista según el rol persistido
        const role = (parsedUser.role || parsedUser.rol || "").toLowerCase();
        if (role === "admin" || role === "administrador") {
          setCurrentView("admin");
        } else if (role === "entidad" || role === "entidad_gestora") {
          setCurrentView("entity");
        } else {
          setCurrentView("reports");
        }
      } catch (error) {
        console.error("Error al parsear el usuario en localStorage:", error);
        localStorage.removeItem("notiApp_user");
      }
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#0f172a" : "#f8fafc";
    document.body.style.color = darkMode ? "#f8fafc" : "#0f172a";
  }, [darkMode]);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleNavigate = (targetView) => {
    const protectedViews = ["report", "reports", "entity", "admin"];

    if (protectedViews.includes(targetView) && !user) {
      showToast("Debes iniciar sesión para acceder a esta función", "warning");
      setCurrentView("login");
      return;
    }

    const userRole = (user?.role || user?.rol || "").toLowerCase();

    if (targetView === "admin" && userRole !== "admin" && userRole !== "administrador") {
      showToast("Acceso restringido para administradores", "error");
      setCurrentView("home");
      return;
    }

    if (targetView === "entity" && userRole !== "entidad" && userRole !== "entidad_gestora") {
      showToast("Acceso restringido para entidades gestoras", "error");
      setCurrentView("home");
      return;
    }

    setCurrentView(targetView);
  };

  // GUARDAR SESIÓN AL INICIAR SESIÓN
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("notiApp_user", JSON.stringify(userData));
    showToast(`¡Bienvenido(a), ${userData.name || userData.nombre}!`, "success");

    const role = (userData.role || userData.rol || "").toLowerCase();

    if (role === "admin" || role === "administrador") {
      setCurrentView("admin");
    } else if (role === "entidad" || role === "entidad_gestora") {
      setCurrentView("entity");
    } else {
      setCurrentView("reports");
    }
  };

  // LIMPIAR SESIÓN AL CERRAR SESIÓN
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("notiApp_user");
    localStorage.removeItem("notiApp_token");
    showToast("Sesión cerrada correctamente", "info");
    setCurrentView("home");
  };

  const userRole = (user?.role || user?.rol || "").toLowerCase();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: darkMode ? "#0f172a" : "#f8fafc",
        color: darkMode ? "#f8fafc" : "#0f172a",
        transition: "all 0.3s ease",
      }}
    >
      <Header
        user={user}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {maintenanceNotice.active && (
        <div
          style={{
            backgroundColor: "#fef3c7",
            color: "#92400e",
            borderBottom: "1px solid #fde68a",
            padding: "10px 24px",
            textAlign: "center",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          ⚠️ {maintenanceNotice.title}: {maintenanceNotice.message}
        </div>
      )}

      <main style={{ flex: "1 0 auto", paddingBottom: "16px" }}>
        {currentView === "home" && (
          <MainContent
            onNavigate={handleNavigate}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        )}

        {currentView === "login" && (
          <Login
            onLogin={handleLogin}
            navigateTo={handleNavigate}
            showToast={showToast}
          />
        )}

        {currentView === "register" && (
          <Register
            onLogin={handleLogin}
            navigateTo={handleNavigate}
            showToast={showToast}
          />
        )}

        {currentView === "report" && user && (
          <ReportForm
            onNavigate={handleNavigate}
            showToast={showToast}
            reports={reports}
            setReports={setReports}
            darkMode={darkMode}
          />
        )}

        {currentView === "reports" && user && (
          <Reports
            reports={reports}
            darkMode={darkMode}
            navigateTo={handleNavigate}
            showToast={showToast}
          />
        )}

        {/* VISTA DEL PANEL DE ENTIDADES GESTORAS */}
        {currentView === "entity" && (userRole === "entidad" || userRole === "entidad_gestora") && (
          <EntityPanel
            user={user}
            reports={reports}
            setReports={setReports}
            showToast={showToast}
          />
        )}

        {/* VISTA DEL PANEL ADMINISTRADOR */}
        {currentView === "admin" && (userRole === "admin" || userRole === "administrador") && (
          <AdminPanel
            reports={reports}
            setReports={setReports}
            showToast={showToast}
            maintenanceNotice={maintenanceNotice}
            setMaintenanceNotice={setMaintenanceNotice}
          />
        )}

        {currentView === "chat" && (
          <Notibot darkMode={darkMode} />
        )}
      </main>

      <Footer darkMode={darkMode} />

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}