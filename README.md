# NotiApp Bogotá 

## Descripción del proyecto

NotiApp Bogotá es una plataforma web diseñada para facilitar la recepción, organización, gestión y seguimiento de reportes ciudadanos relacionados con daños en la infraestructura pública de Bogotá D. C.

La plataforma permite a los ciudadanos reportar problemas como daños en la malla vial, fallas en el alumbrado público, semáforos averiados, problemas de alcantarillado y afectaciones en parques y zonas verdes.

Además, proporciona herramientas para que los administradores y las entidades gestoras consulten los casos, actualicen su estado y realicen seguimiento a las acciones necesarias para su atención.

NotiApp busca fortalecer la comunicación entre la ciudadanía y las entidades responsables, promoviendo la participación ciudadana, la transparencia y una gestión organizada de las incidencias urbanas.

## Objetivo general

Desarrollar una plataforma web para la gestión de incidencias urbanas en Bogotá D. C., mediante herramientas de registro, clasificación, administración y seguimiento de reportes ciudadanos, con el fin de facilitar la atención de los daños en la infraestructura pública y mejorar la comunicación entre los ciudadanos y las entidades responsables.

## Tecnologías utilizadas

### Frontend

- React: desarrollo de interfaces de usuario.
- Vite: entorno de desarrollo y compilación.
- JavaScript: programación de la aplicación.
- HTML5 y CSS3: estructura y estilos de la interfaz.
- Lucide React: iconografía de la plataforma.

### Backend

- Node.js: entorno de ejecución de JavaScript.
- Express.js: desarrollo del servidor y las rutas de la API.
- CORS: configuración de solicitudes entre el frontend y el backend.
- Multer: gestión de archivos adjuntos.
- bcrypt y bcryptjs: herramientas disponibles para el procesamiento seguro de contraseñas.
- JSON Web Token (JWT): gestión de tokens de autenticación.

### Base de datos

- PostgreSQL: almacenamiento y gestión de la información.
- pg: conexión entre el backend y la base de datos.

### Herramientas de desarrollo

- Git y GitHub: control de versiones y alojamiento del código fuente.
- Visual Studio Code: edición y desarrollo del proyecto.
- pgAdmin: administración de la base de datos PostgreSQL.

## Funcionalidades principales

### 1. Módulo de ciudadanos

- Registro e inicio de sesión.
- Creación de reportes sobre daños en la infraestructura urbana.
- Registro de descripciones, categorías y datos de ubicación.
- Adjuntar evidencias mediante archivos o fotografías.
- Consulta de los reportes registrados.
- Seguimiento del estado de cada caso.

### 2. Módulo de entidades gestoras

- Consulta y gestión de reportes.
- Revisión de incidencias relacionadas con sus áreas de responsabilidad.
- Actualización del estado de los casos.
- Registro y seguimiento de las acciones realizadas.
- Organización de los reportes para facilitar su atención.

### 3. Módulo de administración

- Supervisión general de los reportes.
- Gestión de la información de los casos.
- Consulta y organización de incidencias.
- Seguimiento de los estados de los reportes.
- Administración de las funcionalidades disponibles según los permisos del usuario.

### 4. NotiBot

NotiBot es un asistente integrado en la plataforma que permite a los usuarios realizar consultas en lenguaje natural relacionadas con la gestión de reportes y las problemáticas urbanas.

Su propósito es facilitar el acceso a la información y orientar a los usuarios durante la interacción con el sistema.

## Categorías de reportes

NotiApp contempla categorías relacionadas con diferentes tipos de incidencias urbanas:

- Malla vial: huecos y daños en las vías.
- Alumbrado público: fallas en las luminarias.
- Semaforización: semáforos averiados.
- Parques y zonas verdes: daños o afectaciones en espacios públicos.
- Alcantarillado y fugas: problemas en redes de drenaje y fugas de agua.

## Estados de los reportes

Los reportes pueden organizarse de acuerdo con su estado de gestión:

- *Pendiente:* el caso está registrado y requiere atención.
- *En proceso:* el reporte está siendo atendido.
- *Resuelto:* se ha registrado la solución del caso.
- *Rechazado:* el reporte no continúa en el proceso de atención.

## Roles del sistema

### Ciudadano

Registra incidencias urbanas, adjunta información relevante y consulta el estado de sus reportes.

### Administrador

Supervisa la plataforma, revisa la información de los casos y administra los reportes según los permisos disponibles.

### Entidad gestora

Consulta y gestiona las incidencias relacionadas con su área de responsabilidad, actualizando el estado de los casos y registrando su progreso.

## Estructura del proyecto

La estructura general del proyecto está organizada de la siguiente manera:

text
Notiapp_Santiago/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── reportController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── reportRoutes.js
│   │   └── server.js
│   ├── uploads/
│   ├── .env
│   └── package.json
│
└── Notiapp/
    └── Notiii/
        ├── components/
        ├── controllers/
        ├── services/
        │   ├── api.js
        │   └── gemini.js
        ├── src/
        │   ├── assets/
        │   ├── App.jsx
        │   └── main.jsx
        ├── utils/
        ├── public/
        ├── index.html
        └── package.json


## Instalación y ejecución local

### Requisitos previos

- Node.js y npm.
- PostgreSQL.
- Git.
- Una base de datos configurada para NotiApp.

### 1. Clonar el repositorio

bash
git clone URL_DEL_REPOSITORIO


Accede a la carpeta principal del proyecto descargado.

### 2. Configurar la base de datos

Crea la base de datos notiapp_db en PostgreSQL y verifica que las tablas necesarias estén configuradas.

Asegúrate de utilizar las credenciales correspondientes en las variables de entorno del backend.

### 3. Instalar y ejecutar el backend

Desde la carpeta principal del proyecto, ejecuta:

bash
cd backend
npm install
npm run dev


El servidor está configurado para utilizar el puerto 5000, según la configuración actual del proyecto.

### 4. Instalar y ejecutar el frontend

Abre una segunda terminal y ejecuta:

bash
cd Notiapp/Notiii
npm install
npm run dev


Vite mostrará la dirección local para acceder a la aplicación desde el navegador.

## Flujo general de funcionamiento

1. El ciudadano registra un reporte con la información disponible sobre una incidencia urbana.
2. El sistema procesa la solicitud y la registra en la plataforma.
3. El administrador o el responsable correspondiente consulta la información del caso.
4. La entidad gestora realiza el seguimiento de la incidencia y actualiza su estado.
5. El ciudadano consulta los cambios registrados en su reporte.
6. El caso se marca como resuelto o se actualiza según el resultado de la gestión.

## Impacto del proyecto

NotiApp busca facilitar la participación ciudadana en la identificación de problemas urbanos y contribuir a una gestión más organizada de las incidencias relacionadas con la infraestructura pública.

Al centralizar los reportes y permitir consultar su estado, la plataforma favorece la comunicación entre los ciudadanos y las entidades responsables, además de facilitar el seguimiento de los casos registrados.

## Equipo de desarrollo

- Juan Sebastian Pineda Tellez — Documentación.
- Wilder Santiago Marulanda — Investigación.
- Hellen Sofia Ariza Serna — Líder.
