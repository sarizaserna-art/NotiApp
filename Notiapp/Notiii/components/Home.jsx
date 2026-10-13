import React from "react";

function Home({ navigateTo }) {
  // ... resto del componente {
  return (
    <section className="home">

      <div className="home-content">

        <span className="home-badge">
          INFRAESTRUCTURA URBANA · BOGOTÁ D.C.
        </span>

        <h1>
          Reporta, consulta y
          <span> mejora tu ciudad.</span>
        </h1>

        <p>
          NotiApp Bogotá conecta a la ciudadanía con
          las entidades responsables del mantenimiento
          de la infraestructura urbana.
        </p>

        <div className="home-actions">

            {/* Botón 1: Reportar un daño */}
            <button
           onClick={() => navigateTo && navigateTo("report")}
            className="noti-btn noti-btn-primary">
            Reportar un daño
            </button>

           {/* Botón 2: Consultar reportes */}
            <button
              onClick={() => navigateTo && navigateTo("reports")}
             className="noti-btn noti-btn-secondary">
              Consultar reportes
            </button>

        </div>

      </div>

      <div className="home-card">

        <div className="home-card-icon">
          !
        </div>

        <h2>
          Tu reporte importa
        </h2>

        <p>
          Registra daños en vías, señalización,
          iluminación y otros elementos de
          infraestructura urbana.
        </p>

        <div className="home-stats">

          <div>
            <strong>24/7</strong>
            <span>Disponible</span>
          </div>

          <div>
            <strong>IA</strong>
            <span>Asistencia</span>
          </div>

          <div>
            <strong>BOG</strong>
            <span>Ciudadanía</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Home;