import React, { useState, useEffect } from "react";
import { fetchUsers, updateUserRole } from "../services/api";

export default function AdminPanel({
  reports = [],
  showToast,
  maintenanceNotice = { active: false, title: "", message: "" },
  setMaintenanceNotice
}) {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [filterRole, setFilterRole] = useState("todos");

  // Formulario aviso
  const [announcementTitle, setAnnouncementTitle] = useState(maintenanceNotice?.title || "");
  const [announcementMsg, setAnnouncementMsg] = useState(maintenanceNotice?.message || "");

  const loadUsersList = async () => {
    setLoadingUsers(true);
    try {
      const data = await fetchUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      // Datos de respaldo para pruebas locales
      setUsers([
        { id: 1, nombre_completo: "Admin uno", correo: "admin1@notiapp.com", rol: "administrador" },
        { id: 2, nombre_completo: "Gestor IDU", correo: "entidad.idu@notiapp.com", rol: "entidad" },
        { id: 3, nombre_completo: "Ana María Gómez", correo: "ana.gomez@example.com", rol: "ciudadano" }
      ]);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadUsersList();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, rol: newRole } : u))
      );
      if (showToast) showToast("Rol actualizado con éxito", "success");
    } catch (error) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, rol: newRole } : u))
      );
      if (showToast) showToast("Rol actualizado en vista local", "info");
    }
  };

  const handleToggleMaintenance = (e) => {
    e.preventDefault();
    if (!maintenanceNotice.active) {
      if (!announcementTitle.trim() || !announcementMsg.trim()) {
        if (showToast) showToast("Completa el título y el mensaje", "error");
        return;
      }
      setMaintenanceNotice({ active: true, title: announcementTitle, message: announcementMsg });
      if (showToast) showToast("Aviso global activado", "warning");
    } else {
      setMaintenanceNotice({ active: false, title: "", message: "" });
      setAnnouncementTitle("");
      setAnnouncementMsg("");
      if (showToast) showToast("Aviso global desactivado", "info");
    }
  };

  const filteredUsers = users.filter((u) => {
    const nameMatch = (u.nombre_completo || u.nombre || "").toLowerCase().includes(userSearch.toLowerCase());
    const emailMatch = (u.correo || u.email || "").toLowerCase().includes(userSearch.toLowerCase());
    const roleMatch = filterRole === "todos" || u.rol === filterRole;
    return (nameMatch || emailMatch) && roleMatch;
  });

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      
      {/* Encabezado */}
      <div style={{ background: "#111827", color: "#fff", padding: "24px", borderRadius: "12px", marginBottom: "24px" }}>
        <span style={{ color: "#f87171", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" }}>
          🛡️ Panel de Control Administrador
        </span>
        <h1 style={{ margin: "8px 0 4px 0", fontSize: "28px" }}>Gestión Global NotiApp</h1>
        <p style={{ margin: 0, color: "#9ca3af", fontSize: "14px" }}>
          Gestión de usuarios, avisos del sistema y mantenimiento.
        </p>
      </div>

      {/* Tarjeta 1: Avisos de Mantenimiento */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", marginBottom: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h2 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#1f2937" }}>⚙️ Mantenimientos Programados del Sistema</h2>
        <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
          Activa o desactiva la alerta global que se muestra a todos los usuarios en la parte superior.
        </p>

        <form onSubmit={handleToggleMaintenance} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "#374151", marginBottom: "4px" }}>
                Título del Aviso
              </label>

              <input
                type="text"
                disabled={maintenanceNotice.active}
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                placeholder="Ej: Mantenimiento Programado"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "#374151", marginBottom: "4px" }}>
                Mensaje Detallado
              </label>

              <input
                type="text"
                disabled={maintenanceNotice.active}
                value={announcementMsg}
                onChange={(e) => setAnnouncementMsg(e.target.value)}
                placeholder="Ej: La plataforma estará fuera de servicio de 2:00 AM a 4:00 AM"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#fff",
              background: maintenanceNotice.active ? "#dc2626" : "#2563eb",
              alignSelf: "flex-end"
            }}
          >
            {maintenanceNotice.active ? "Desactivar Alerta" : "Publicar Cambios"}
          </button>
        </form>
      </div>

      {/* Tarjeta 2: Directorio de Usuarios */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
          <h2 style={{ margin: 0, fontSize: "18px", color: "#1f2937" }}>👥 Directorio de Usuarios</h2>
          
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Buscar por nombre o correo..."
              style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "13px" }}
            />

            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "13px" }}
            >
              <option value="todos">Todos los Roles</option>
              <option value="ciudadano">Ciudadano</option>
              <option value="entidad">Entidad</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
        </div>

        {loadingUsers ? (
          <p style={{ textAlign: "center", color: "#6b7280", padding: "20px" }}>Cargando usuarios...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f3f4f6", color: "#6b7280" }}>
                <th style={{ padding: "12px" }}>Usuario</th>
                <th style={{ padding: "12px" }}>Correo</th>
                <th style={{ padding: "12px" }}>Rol Actual</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px", fontWeight: "bold", color: "#111827" }}>
                    {u.nombre_completo || u.nombre}
                  </td>
                  <td style={{ padding: "12px", color: "#4b5563" }}>{u.correo || u.email}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      background: u.rol === "administrador" ? "#fee2e2" : u.rol === "entidad" ? "#dbeafe" : "#f3f4f6",
                      color: u.rol === "administrador" ? "#991b1b" : u.rol === "entidad" ? "#1e40af" : "#374151"
                    }}>
                      {u.rol}
                    </span>
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    <select
                      value={u.rol}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "12px" }}
                    >
                      <option value="ciudadano">Ciudadano</option>
                      <option value="entidad">Entidad</option>
                      <option value="administrador">Administrador</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}