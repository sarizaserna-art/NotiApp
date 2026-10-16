> Documento SRS
>
> Juan Sebastián Pineda
>
> Tellez Wilder Santiago
>
> Marulando Santiago Yate
>
> Rios
>
> Hellen Sofia Ariza
>
> Myriam Malpica
>
> Introducción
>
> Describe el propósito del documento.
>
> 1.1 Alcance del producto Enumera los beneficios, los objetivos y las
> metas del producto. Establecer de forma clara y verificable los
> requisitos funcionales y no funcionales que debe cumplir Report-app,
> de modo que el equipo de desarrollo cuente con una referencia concreta
> para construir una aplicación que realmente sea útil para el ciudadano
> que reporta un daño y para la entidad pública que debe atenderlo.
>
> 1.2 Valor del producto Describe qué valor encontrará el público en tu
> producto.
>
> Lo encontraran muy util porque ayudara a optimizar el tiempo de
> respuesta de las entidades encargadas de la infraestructura de la
> ciudad y esto ayuda a mejorar la calidad de vida de los usuarios
>
> 1.3 Público objetivo Describe a quién está destinado el producto.
>
> Esta hacia los ciudadanos que tienen inconvenientes o evidencian daños
> en la infraestructura de la ciudad y esto les puede dificultar su
> movilidad cotidiana
>
> 1.4 Uso previsto Describe de qué manera tu público objetivo usará el
>
> producto. Lo utilizaran para avisar si en la ciudad ahí algún daño
>
> 1.5 Descripción general
>
> Las funciones serian como el inicio de sesion, y en el inicio el
> usuario podra encontrar para crear el reporte junto con el mapa, ahi
> mismo estara los reportes que haya hecho
>
> Requisitos funcionales

Enumera los requisitos de diseño, los requisitos gráficos, los
requisitos del sistema operativo y las limitaciones del producto.

> RF:01-Autenticar: Permitir que el usuario inicie sesión con correo y
> contraseña antes de enviar reportes.
>
> RF:02-Registrar: Crear cuentas de usuario solicitando datos básicos y
> aceptación de la política de privacidad.
>
> RF:03-Validar usuarios: Verificar que solo los usuarios autenticados
> puedan acceder a funciones de reporte, consulta y edición de
> información propia.
>
> RF:04-Permitir reporte anónimo: Habilitar el envío de reportes sin
> mostrar públicamente la identidad del ciudadano.
>
> RF:05-Solicitar consentimiento: Mostrar un consentimiento explícito
> antes de recopilar datos personales del usuario.
>
> RF:06-Mostrar mapa: Presentar un mapa con los daños reportados para
> ubicar incidentes cercanos.
>
> RF:07-Guardar reportes offline: Permitir redactar y guardar reportes
> sin conexión para enviarlos automáticamente cuando vuelva internet.
>
> RF:08-Capturar fotografías: Permitir tomar fotos desde la cámara del
> dispositivo y adjuntarlas al reporte.
>
> RF:09-Geolocalizar reportes: Obtener la ubicación mediante GPS y usar
> Wi-Fi o datos móviles como respaldo.
>
> RF:10-Bloquear envíos inválidos: Impedir el envío de formularios con
> datos inválidos o comportamientos sospechosos.
>
> RF:11-Consultar reportes: Permitir al usuario visualizar los reportes
> realizados en la
>
> aplicación.
>
> RF:12-Editar reportes: Permitir modificar la información de un reporte
> antes de ser
>
> enviado.
>
> RF:13-Eliminar reportes: Permitir eliminar reportes guardados por el
> usuario.
>
> RF:RF:14-Adjuntar evidencia: Permitir adjuntar imágenes adicionales
> como evidencia del daño reportado.
>
> RF:15-Filtrar reportes: Permitir buscar reportes por fecha, ubicación
> o categoría.
>
> RF:16-Clasificar daños: Permitir seleccionar el tipo de daño o
> incidente al crear un
>
> reporte.
>
> RF:17-Notificar estado: Informar al usuario cuando el reporte sea
> recibido o
>
> actualizado.
>
> RF:18-Recuperar contraseña: Permitir recuperar la contraseña mediante
> correo
>
> electrónico.
>
> RF:19-Cerrar sesión: Permitir al usuario cerrar sesión de forma
> segura.
>
> RF:20-Visualizar perfil: Permitir consultar la información personal
> registrada en la
>
> cuenta.
>
> RF:21-Editar perfil: Permitir modificar datos personales del usuario.
>
> RF:22-Compartir reportes: Permitir compartir reportes mediante enlaces
> o plataformas digitales.
>
> RF:23-Confirmar envío: Mostrar un mensaje de confirmación después de
> enviar un reporte.
>
> RF:24-Detectar ubicación automática: Obtener automáticamente la
> ubicación actual del usuario al iniciar un reporte.
>
> RF:25-Registrar fecha y hora: Guardar automáticamente la fecha y hora
> de cada reporte
>
> enviado.
>
> RF:26-Visualizar historial: Permitir consultar el historial de
> reportes realizados.
>
> RF:27-Generar alertas: Mostrar alertas al detectar incidentes cercanos
> a la ubicación del usuario.
>
> RF:28-Administrar categorías: Permitir al administrador crear, editar
> o eliminar categorías de reportes.
>
> RF:29-Gestionar usuarios: Permitir al administrador bloquear o
> habilitar cuentas de
>
> usuarios.
>
> RF:30-Exportar información: Permitir descargar reportes en formatos
> como PDF o
>
> Excel.
>
> RF:31-Enviar notificaciones: Permitir enviar notificaciones al usuario
> cuando el estado de un reporte cambie.
>
> RF:32-Configurar notificaciones: Permitir que el usuario configure
> horarios y tipos de notificaciones.
>
> RF:33-Detectar reportes duplicados: Permitir identificar reportes
> repetidos en una misma ubicación.
>
> RF:34-Enviar correo de confirmación: Permitir enviar un correo
> electrónico con los detalles del reporte realizado.
>
> RF:35-Informar mantenimientos: Permitir mostrar avisos sobre
> mantenimientos programados del sistema.
>
> Requisitos de la interfaz externa 3
>
> **3.1** **Requisitos** **de** **la** **Interfaz** **de** **Usuario**
>
> Estos requisitos describen la interacción entre el usuario y el
> sistema, el diseño visual y la experiencia de uso.
>
> **ID** **Requisito**
>
> UI-01 Pantalla de inicio de sesión clara, organizada y fácil de usar.
>
> UI-02 Formularios visibles, comprensibles y ordenados.
>
> UI-03 Navegación intuitiva para acceder a las funciones principales.
> UI-04
>
> Ocultamiento visual de la identidad del ciudadano en reportes
> anónimos. UI-
>
> 05 Mapa interactivo con iconos y colores para identificar daños
> reportados.
>
> UI-06 Indicador visual del estado offline y sincronización de
> reportes. UI-07
>
> Botones accesibles para capturar y adjuntar fotografías.
>
> UI-08 Mensajes de validación para datos inválidos.
>
> UI-09 Diseño intuitivo y fácil de entender.
>
> UI-10 Navegación simple mediante menús organizados.
>
> UI-11 Diseño responsivo para distintos tamaños de pantalla.
>
> UI-12 Botones grandes y visibles.
>
> UI-13 Uso consistente de colores.
>
> UI-14 Tipografía legible.
>
> UI-15 Iconos comprensibles.
>
> UI-16 Disponibilidad de modo oscuro.
>
> UI-17 Retroalimentación visual mediante mensajes o animaciones.
>
> UI-18 Formularios alineados y organizados.
>
> UI-19 Características de accesibilidad para usuarios con limitaciones
> visuales o
>
> motoras. UI-20 Zoom en el mapa para acercar, alejar y seleccionar
> reportes.
>
> **ID** **Requisito**
>
> UI-21 Vista previa de imágenes antes del envío.
>
> UI-22 Indicadores de carga durante procesos.
>
> UI-23 Diseño moderno y atractivo.
>
> UI-24 Confirmaciones visuales de éxito o error.
>
> UI-25 Menú principal accesible desde las pantallas principales.
>
> UI-26 Organización visual de la información sin saturar la pantalla.
>
> UI-27 Compatibilidad táctil para dispositivos móviles.
>
> UI-28 Consistencia visual entre pantallas.
>
> UI-29 Panel de notificaciones recientes.
>
> UI-30 Configuración de alertas y notificaciones.
>
> UI-31 Alertas visuales para reportes duplicados.
>
> UI-34 Indicadores administrativos de estado y rendimiento.
>
> UI-35 Pantalla amigable durante actualizaciones.
>
> UI-36 Visualización organizada de documentación técnica.
>
> UI-37 Diseño modular de las secciones de la interfaz.
>
> UI-38 Visualización de registros en tablas organizadas.
>
> UI-39 Avisos legales visibles antes del registro.
>
> UI-40 Gestión visual de datos personales.
>
> UI-41 Uniformidad visual en colores, botones y estilos.
>
> **3.2** **Requisitos** **de** **la** **Interfaz** **de** **Hardware**
>
> Basado en los requisitos observados, el sistema requiere
> compatibilidad con los siguientes dispositivos:
>
> • Dispositivos móviles Android e iOS.
>
> • Computadoras de escritorio y portátiles mediante navegador web.
>
> • Cámara integrada del dispositivo para captura de fotografías
> (UI-07).
>
> • Pantallas táctiles para interacción móvil (UI-27).
>
> • Conexión a Internet mediante Wi-Fi o red móvil 4G/5G.
>
> • Funcionamiento temporal sin conexión para almacenamiento local y
> sincronización posterior (UI-06).
>
> • GPS del dispositivo para ubicación geográfica de reportes en el mapa
> interactivo
>
> (UI 05 y UI-20).
>
> **3.3** **Requisitos** **de** **la** **Interfaz** **de** **Software**
>
> Los requisitos relacionados con integración de software son:
>
> • Front-end web responsivo compatible con navegadores modernos.
>
> • Integración con servicios de mapas para visualización geográfica de
> reportes (UI-05, UI-20).
>
> • Módulo de autenticación para inicio de sesión (UI-01).
>
> • Módulo de carga y gestión de imágenes (UI-07, UI-21).
>
> • Sistema de notificaciones y alertas (UI-29, UI-30, UI-31).
>
> • Módulo de administración para indicadores y registros (UI-34,
> UI-38).
>
> • Base de datos para almacenamiento de usuarios, reportes, imágenes y
> configuraciones.
>
> • Servicio de sincronización para funcionamiento offline y
> actualización de datos (UI 06).
>
> **3.4** **Requisitos** **de** **la** **Interfaz** **de**
> **Comunicación**
>
> Los requisitos relacionados con comunicación e intercambio de
> información
>
> son: **ID** **Requisito**
>
> UI-29 Panel de notificaciones recientes para el usuario.
>
> UI-30 Configuración de alertas y notificaciones.
>
> UI-32 Diseño claro y organizado para correos de confirmación.
>
> UI-33 Avisos visibles sobre mantenimientos programados. **ID**
> **Requisito**
>
> UI-24 Confirmaciones visuales de éxito o error en operaciones.
>
> UI-17 Retroalimentación visual al completar acciones
>
> importantes. UI-08 Mensajes de validación en formularios.
>
> UI-31 Alertas visuales ante reportes duplicados.
>
> Requisitos no funcionales
>
> **4.1** **Seguridad**
>
> Incluye normas de privacidad y protección de datos:
>
> • RNF-01: Seguridad de contraseñas (cifrado y respuesta \< 3s)
>
> • RNF-03: Seguridad de acceso (permisos y sesiones seguras)
>
> • RNF-04: Confidencialidad del reporte anónimo
>
> • RNF-08: Validación de seguridad (detección de datos inválidos)
>
> • RNF-11: Integridad de eliminación
>
> • RNF-16: Seguridad de recuperación
>
> • RNF-17: Seguridad de sesión
>
> • RNF-18: Protección de datos personales
>
> • RNF-26: Seguridad administrativa
>
> • RNF-27: Control de permisos
>
> • RNF-38: Registro de actividad (logs)
>
> • RNF-39: Cumplimiento normativo
>
> • RNF-40: Términos y condiciones
>
> **4.2** **Capacidad**
>
> Demanda de almacenamiento actual y futura:
>
> • RNF-07: Optimización de imágenes (compresión)
>
> • RNF-24: Capacidad de almacenamiento (grandes volúmenes sin perder
> rendimiento)
>
> **4.3** **Compatibilidad**
>
> Requisitos mínimos de hardware/software:
>
> • RNF-02: Usabilidad del registro (compatible con móviles)
>
> • RNF-20: Compatibilidad de compartición
>
> • RNF-28: Compatibilidad de exportación (PDF y Excel)
>
> **4.4** **Confiabilidad**
>
> Tiempo esperado de fallos en uso normal:
>
> • RNF-09: Disponibilidad de consulta (sin interrupciones)
>
> • RNF-25: Disponibilidad de alertas
>
> • RNF-31: Detección de duplicados
>
> **4.5** **Escalabilidad**
>
> Cantidad máxima de trabajo soportado:
>
> • RNF-34: Arquitectura escalable (soporte a crecimiento de usuarios y
> datos)
>
> • RNF-24: Capacidad de almacenamiento
>
> • RNF-25: Soporte de múltiples usuarios simultáneos
>
> **4.6** **Mantenibilidad**
>
> Uso de integración continua y facilidad de mantenimiento: • RNF-33:
> Avisos de mantenimiento
>
> • RNF-35: Actualizaciones sin interrupciones
>
> • RNF-36: Documentación técnica
>
> • RNF-37: Modularidad del código
>
> **4.7** **Facilidad** **de** **uso**
>
> Qué tan fácil es para el usuario final:
>
> • RNF-02: Usabilidad del registro
>
> • RNF-21: Claridad de confirmaciones •
>
> RNF-14: Precisión de clasificación • RNF-
>
> 30: Configuración de notificaciones
>
> **4.8** **Otro** **(Otros** **requisitos** **no** **funcionales)**
>
> Aquí van los que no encajan directamente
>
> arriba: • RNF-05: Rendimiento del mapa (\< 5s)
>
> • RNF-06: Sincronización offline
>
> • RNF-10: Velocidad de edición (\< 2s)
>
> • RNF-12: Calidad de imágenes
>
> • RNF-13: Rendimiento de búsqueda (\< 3s)
>
> • RNF-15: Tiempo de notificación
>
> • RNF-19: Actualización inmediata
>
> • RNF-22: Precisión de ubicación
>
> • RNF-23: Exactitud temporal
>
> • RNF-29: Notificaciones push
>
> • RNF-32: Correo de confirmación (\< 5 min)
>
> Definiciones y acrónimos
>
> **1.** **CRUD**
>
> • Create, Read, Update, Delete
>
> • Crear, leer, actualizar y eliminar datos (reportes en tu caso)
>
> **2.** **SPA** **(Single** **Page** **Application)**
>
> •      Tu app funciona por vistas como currentPage === 'report',
> login, admin, etc. •      **Definición:** Aplicación web de una sola
> página que cambia el contenido sin
>
> recargar.
>
> **3.** **React** **(Framework/Librería)** • Se ve por:
>
> o useState (implícito) o onClick, onChange
>
> o JSX (\<div className=...\>)
>
> • **Definición:** Librería de JavaScript para construir interfaces
> dinámicas basadas en componentes.
>
> **4.** **State** **(Estado)** • Variables como:
>
> o currentPage o reportForm o loginData
>
> o filteredReports
>
> • **Definición:** Información dinámica que cambia en la aplicación y
> controla lo que se muestra.
>
> **5.** **Event** **Handling** **(Manejo** **de** **eventos)** •
> Ejemplos:
>
> o onClick
>
> o onChange o onSubmit
>
> • **Definición:** Funciones que reaccionan a acciones del usuario
> (clics, escritura, envíos).
>
> **6.** **Form** **Handling** **(Manejo** **de** **formularios)**
>
> • Formularios como: o Login
>
> o Registro o Reporte
>
> • **Definición:** Proceso de capturar, validar y enviar datos
> ingresados por el usuario.
>
> **7.** **JSON** **(estructura** **de** **datos)** • Datos como:
>
> rep.id rep.status rep.description
>
> • **Definición:** Formato ligero para almacenar y transportar datos.
>
> **8.** **Filtering** **/** **Search** **(Filtrado** **y**
> **búsqueda)** • Variables:
>
> o searchQuery o filterCategory o filterStatus
>
> • **Definición:** Permite mostrar datos según criterios específicos.
>
> **9.** **Roles** **de** **usuario** • Aparecen:
>
> o Ciudadano o Técnico
>
> o Administrador
>
> • **Definición:** Tipos de usuarios con diferentes permisos dentro del
> sistema.
>
> **10.** **UI** **(User** **Interface)**
>
> • Toda la parte visual del sistema
>
> • **Definición:** Interfaz gráfica con la que interactúa el usuario.
>
> **11.** **UX** **(User** **Experience)**
>
> • Flujo: o o
>
> o

Reportar daño Consultar

Ver estado

> • **Definición:** Experiencia del usuario al usar la aplicación.
>
> **12.** **Frontend**
>
> • Todo el código que tienes
>
> • **Definición:** Parte visual de la aplicación que corre en el
> navegador.
>
> **13.** **Componentes** • Secciones como:
>
> o Report o Login o Admin
>
> o Tech panel
>
> • **Definición:** Bloques reutilizables de la interfaz.
>
> **14.** **KPI** **(Key** **Performance** **Indicator)** • Ejemplo:
>
> o “Eficiencia Distrital”
>
> • **Definición:** Indicador clave para medir rendimiento.
>
> **15.** **Bitácora** **/** **Historial** **(Log)** • Ejemplo:
>
> o rep.history.map(...)
>
> • **Definición:** Registro de cambios o acciones realizadas.
>
> **16.** **Upload** **/** **File** **Handling** • Subida de imágenes:
>
> o type="file"
>
> • **Definición:** Manejo de archivos cargados por el usuario.
