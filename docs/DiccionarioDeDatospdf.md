

## DICCIONARIO DE DATOS
Notiapp — Plataforma Ciudadana para el Reporte de Infraestructura Urbana
Ficha 3407183  ·  SENA ADSO  ·  Bogotá D.C., Colombia  ·  2026
Total de tablas: 31
PK = Llave primaria    FK = Llave foránea    Null (X) = El campo acepta valor nulo
## Tabla Roles
ColumnaTipo de DatoDescripciónNull
PKID_rolintNúmero de identificación del rol
nombre_rolvarchar(50)Nombre del rol (ciudadano, operador, admin, equipo)
descripcionvarchar(200)Descripción del rol en el sistemaX
## Tabla Permisos
ColumnaTipo de DatoDescripciónNull
PKID_permisointNúmero de identificación del permiso
nombrevarchar(100)Nombre del permiso (ej: crear_reporte, ver_log)
descripcionvarchar(200)Descripción de la acción que habilita el permisoX
modulovarchar(50)Módulo del sistema al que pertenece el permiso
Tabla Roles_Permisos
ColumnaTipo de DatoDescripciónNull
PKID_rol_permisointNúmero de identificación del registro
FKID_rolintNúmero de identificación del rol
FKID_permisointNúmero de identificación del permiso asignado al rol
## Tabla Usuarios
ColumnaTipo de DatoDescripciónNull
PKID_usuariointNúmero de identificación del usuario
nombre_completovarchar(200)Nombre completo del usuario
correovarchar(150)Correo electrónico del usuario
contrasena_hashvarchar(500)Contraseña cifrada del usuario
telefonovarchar(20)Número de teléfono de contactoX
foto_perfilvarchar(500)URL de la foto de perfil del usuarioX

ColumnaTipo de DatoDescripciónNull
ciudadvarchar(100)Ciudad de residencia del usuario
FKID_rolintNúmero de identificación del rol asignado
estadobitIndicador si la cuenta está activa (1) o suspendida (0)
proveedor_authvarchar(30)Proveedor de autenticación (correo, google)
fecha_registrodatetimeFecha de registro en el sistema
intentos_fallidosintContador de intentos fallidos de inicio de sesión
fecha_suspensiondatetimeFecha en que la cuenta fue suspendidaX
motivo_suspensionvarchar(300)Motivo registrado de la suspensiónX
## Tabla Sesiones
ColumnaTipo de DatoDescripciónNull
PKID_sesionintNúmero de identificación de la sesión
FKID_usuariointNúmero de identificación del usuario autenticado
token_sesionvarchar(500)Token JWT de la sesión activa
ip_origenvarchar(50)Dirección IP desde la que se inició sesión
dispositivovarchar(200)Información del dispositivo (SO, versión de app)X
fecha_iniciodatetimeFecha y hora de inicio de la sesión
fecha_expiraciondatetimeFecha y hora de expiración del token
activabitIndicador si la sesión sigue activa
Tabla Recuperacion_Contrasena
ColumnaTipo de DatoDescripciónNull
PKID_recuperacionintNúmero de identificación de la solicitud
FKID_usuariointNúmero de identificación del usuario solicitante
tokenvarchar(500)Token único de restablecimiento de contraseña
usadobitIndicador si el token ya fue utilizado
fecha_creaciondatetimeFecha y hora de creación del token
fecha_expiraciondatetimeFecha y hora de expiración (válido 30 minutos)
Tabla Dispositivos_Usuario
ColumnaTipo de DatoDescripciónNull
PKID_dispositivointNúmero de identificación del dispositivo
FKID_usuariointNúmero de identificación del usuario propietario
token_fcmvarchar(500)Token FCM para envío de notificaciones push

ColumnaTipo de DatoDescripciónNull
plataformavarchar(20)Plataforma del dispositivo (android, ios)
version_appvarchar(20)Versión de la app instalada en el dispositivoX
activobitIndicador si el dispositivo está activo para notificaciones
fecha_registrodatetimeFecha de registro del dispositivo en el sistema
## Tabla Localidades
ColumnaTipo de DatoDescripciónNull
PKID_localidadintNúmero de identificación de la localidad
nombrevarchar(100)Nombre de la localidad de Bogotá
codigovarchar(10)Código oficial de la localidad
latituddecimal(10,7)Latitud del centroide de la localidadX
longituddecimal(10,7)Longitud del centroide de la localidadX
Tabla Entidades_Gestoras
ColumnaTipo de DatoDescripciónNull
PKID_entidadintNúmero de identificación de la entidad gestora
nombrevarchar(200)Nombre oficial de la entidad (Alcaldía, Secretaría)
correovarchar(150)Correo institucional de la entidad
telefonovarchar(20)Teléfono de contacto de la entidadX
tipovarchar(50)Tipo de entidad (alcaldía local, secretaría, etc.)
activabitIndicador si la entidad está activa en el sistema
fecha_registrodatetimeFecha de registro de la entidad
Tabla Categorias_Danio
ColumnaTipo de DatoDescripciónNull
PKID_categoriaintNúmero de identificación de la categoría
nombrevarchar(100)Nombre de la categoría (Hueco, Semáforo, Andén, etc.)
descripcionvarchar(300)Descripción detallada de la categoría de dañoX
nivel_urgenciavarchar(20)Nivel de urgencia predeterminado (bajo, medio, alto, crítico)
icono_urlvarchar(300)URL del ícono que representa la categoría en el mapaX
activobitIndicador si la categoría está disponible para reportes
fecha_creaciondatetimeFecha de creación de la categoría
Tabla Estados_Reporte

ColumnaTipo de DatoDescripciónNull
PKID_estadointNúmero de identificación del estado
nombre_estadovarchar(50)
Nombre del estado (Recibido, En revisión, En atención,
## Resuelto, Cancelado)
descripcionvarchar(200)Descripción del estado dentro del flujo del reporteX
color_hexvarchar(10)Color hexadecimal para visualizar el estado en la appX
ordenintOrden del estado dentro del flujo del ciclo de vida
## Tabla Reportes
ColumnaTipo de DatoDescripciónNull
PKID_reporteintNúmero de identificación del reporte
codigo_radicadovarchar(50)Código único de radicado asignado al reporte
FKID_usuariointNúmero de identificación del ciudadano reportante
FKID_categoriaintNúmero de identificación de la categoría del daño
FKID_localidadintNúmero de identificación de la localidad del daño
FKID_estadointNúmero de identificación del estado actual
descripciontextDescripción del daño ingresada por el ciudadano
latituddecimal(10,7)Coordenada de latitud GPS del reporte
longituddecimal(10,7)Coordenada de longitud GPS del reporte
direccionvarchar(500)Dirección del daño en Bogotá
prioridadvarchar(20)Nivel de prioridad (normal, media, alta, crítica)
contador_testigosintNúmero de ciudadanos sumados como testigos
enlace_publicovarchar(500)URL pública del reporte para compartirX
sincronizadobitIndicador si fue sincronizado desde modo offline
es_duplicadobitIndicador si fue marcado como posible duplicado
fecha_creaciondatetimeFecha de creación del reporte
fecha_modificaciondatetimeFecha de última modificación del reporteX
fecha_cierredatetimeFecha de cierre o resolución del reporteX
Tabla Imagenes_Reporte
ColumnaTipo de DatoDescripciónNull
PKID_imagenintNúmero de identificación de la imagen
FKID_reporteintNúmero de identificación del reporte asociado
urlvarchar(500)
URL de almacenamiento de la imagen
(Firebase/Cloudinary)

ColumnaTipo de DatoDescripciónNull
tipovarchar(20)Tipo de imagen (antes, despues, evidencia_adicional)
ordenintOrden de presentación de la imagen en el reporte
fecha_subidadatetimeFecha y hora en que la imagen fue subida
Tabla Borradores_Reporte
ColumnaTipo de DatoDescripciónNull
PKID_borradorintNúmero de identificación del borrador
FKID_usuariointNúmero de identificación del ciudadano
ID_categoriaintNúmero de identificación de la categoría elegidaX
descripciontextDescripción parcial del daño guardada localmenteX
foto_localvarchar(500)Ruta local de la foto guardada en el dispositivoX
latituddecimal(10,7)Latitud GPS capturada al guardar el borradorX
longituddecimal(10,7)Longitud GPS capturada al guardar el borradorX
sincronizadobitIndicador si ya fue enviado al servidor
fecha_creaciondatetimeFecha de creación del borrador offline
Tabla Reporte_Historial_Estados
ColumnaTipo de DatoDescripciónNull
PKID_historialintNúmero de identificación del registro de historial
FKID_reporteintNúmero de identificación del reporte
FKID_estadointNúmero de identificación del estado registrado
FKID_usuario_cambiointNúmero de identificación del usuario que realizó el cambio
observaciontextObservación registrada durante el cambio de estadoX
fecha_cambiodatetimeFecha y hora exacta del cambio de estado
Tabla Reportes_Vinculados
ColumnaTipo de DatoDescripciónNull
PKID_vinculointNúmero de identificación del vínculo
FKID_reporte_origenintNúmero de identificación del reporte original
FKID_reporte_derivadointNúmero de identificación del reporte derivado
tipo_vinculovarchar(50)Tipo de vínculo (cierre_parcial, duplicado, relacionado)
descripcionvarchar(300)Descripción del motivo del vínculo entre reportesX
fecha_vinculodatetimeFecha en que se estableció el vínculo

Tabla Comentarios_Reporte
ColumnaTipo de DatoDescripciónNull
PKID_comentariointNúmero de identificación del comentario
FKID_reporteintNúmero de identificación del reporte comentado
FKID_usuariointNúmero de identificación del usuario que comenta
contenidotextTexto del comentario o evidencia adicional
visiblebitIndicador si el comentario es visible al público
fecha_creaciondatetimeFecha y hora de creación del comentario
## Tabla Testigos
ColumnaTipo de DatoDescripciónNull
PKID_testigointNúmero de identificación del registro de testigo
FKID_reporteintNúmero de identificación del reporte asociado
FKID_usuariointNúmero de identificación del ciudadano testigo
fecha_registrodatetimeFecha y hora en que el ciudadano se sumó como testigo
## Tabla Calificaciones
ColumnaTipo de DatoDescripciónNull
PKID_calificacionintNúmero de identificación de la calificación
FKID_reporteintNúmero de identificación del reporte calificado
FKID_usuariointNúmero de identificación del ciudadano que calificó
FKID_equipointNúmero de identificación del equipo evaluado
puntajeintPuntuación asignada del 1 al 5
comentariotextComentario opcional del ciudadanoX
fecha_calificaciondatetimeFecha y hora en que se registró la calificación
Tabla Reportes_Compartidos
ColumnaTipo de DatoDescripciónNull
PKID_compartidointNúmero de identificación del registro de compartir
FKID_reporteintNúmero de identificación del reporte compartido
FKID_usuariointNúmero de identificación del ciudadano que compartió
canalvarchar(30)Canal usado (whatsapp, enlace_directo, redes_sociales)
fecha_acciondatetimeFecha y hora en que se realizó la acción de compartir
Tabla Equipos_Mantenimiento

ColumnaTipo de DatoDescripciónNull
PKID_equipointNúmero de identificación del equipo
nombre_equipovarchar(100)Nombre del equipo de mantenimiento
FKID_liderintNúmero de identificación del líder del equipo
FKID_entidadintNúmero de identificación de la entidad gestora
disponiblebitIndicador si el equipo está disponible para asignación
latitud_actualdecimal(10,7)Latitud de la ubicación actual del equipoX
longitud_actualdecimal(10,7)Longitud de la ubicación actual del equipoX
fecha_registrodatetimeFecha de registro del equipo en el sistema
Tabla Equipos_Usuarios
ColumnaTipo de DatoDescripciónNull
PKID_equipo_usuariointNúmero de identificación del registro
FKID_equipointNúmero de identificación del equipo
FKID_usuariointNúmero de identificación del usuario miembro
cargovarchar(100)Cargo del usuario dentro del equipo (líder, técnico)
activobitIndicador si el usuario sigue activo en el equipo
fecha_ingresodatetimeFecha en que el usuario se incorporó al equipo
## Tabla Asignaciones
ColumnaTipo de DatoDescripciónNull
PKID_asignacionintNúmero de identificación de la asignación
FKID_reporteintNúmero de identificación del reporte asignado
FKID_equipointNúmero de identificación del equipo asignado
FKID_operadorintNúmero de identificación del operador que asignó
motivo_reasignaciontextMotivo de reasignación si aplicaX
activobitIndicador si es la asignación actualmente activa
fecha_asignaciondatetimeFecha y hora de la asignación
hora_inicio_atenciondatetimeFecha y hora en que el equipo inició la atenciónX
## Tabla Escalamientos
ColumnaTipo de DatoDescripciónNull
PKID_escalamientointNúmero de identificación del escalamiento
FKID_reporteintNúmero de identificación del reporte escalado
FKID_usuario_origenintNúmero de identificación del usuario que escala

ColumnaTipo de DatoDescripciónNull
FKID_usuario_destinointNúmero de identificación del supervisor que recibe
motivotextMotivo detallado del escalamiento
nivel_anteriorvarchar(20)Nivel de prioridad antes del escalamiento
nivel_nuevovarchar(20)Nuevo nivel de prioridad tras el escalamiento
fecha_escalamientodatetimeFecha y hora en que se realizó el escalamiento
## Tabla Notificaciones
ColumnaTipo de DatoDescripciónNull
PKID_notificacionintNúmero de identificación de la notificación
FKID_usuariointNúmero de identificación del usuario destinatario
FKID_reporteintNúmero de identificación del reporte asociadoX
titulovarchar(200)Título de la notificación
mensajetextContenido completo del mensaje de la notificación
canalvarchar(20)Canal de envío (push, correo)
leidabitIndicador si la notificación fue leída
enviadabitIndicador si el envío al dispositivo fue exitoso
fecha_enviodatetimeFecha y hora en que fue enviada la notificación
fecha_lecturadatetimeFecha y hora en que el usuario la leyóX
Tabla Preferencias_Notificacion
ColumnaTipo de DatoDescripciónNull
PKID_preferenciaintNúmero de identificación de la preferencia
FKID_usuariointNúmero de identificación del usuario
notif_pushbitIndicador si acepta notificaciones push
notif_correobitIndicador si acepta notificaciones por correo
notif_cambio_estadobitIndicador si acepta alertas de cambio de estado
notif_generalesbitIndicador si acepta notificaciones generales del sistema
fecha_actualizaciondatetimeFecha de la última actualización de preferencias
Tabla Tipos_Canal_Notificacion
ColumnaTipo de DatoDescripciónNull
PKID_canalintNúmero de identificación del canal
nombrevarchar(50)Nombre del canal (push, correo, sms)
descripcionvarchar(200)Descripción del canal de notificaciónX

ColumnaTipo de DatoDescripciónNull
activobitIndicador si el canal está habilitado en el sistema
Tabla Alertas_Operador
ColumnaTipo de DatoDescripciónNull
PKID_alertaintNúmero de identificación de la alerta
FKID_operadorintNúmero de identificación del operador destinatario
FKID_localidadintNúmero de identificación de la localidad afectada
FKID_categoriaintNúmero de identificación de la categoría del daño
descripciontextDescripción del evento que generó la alerta
nivelvarchar(20)Nivel de la alerta (normal, crítico)
cantidad_reportesintNúmero de reportes que activaron la alerta
gestionadabitIndicador si el operador marcó la alerta como gestionada
fecha_creaciondatetimeFecha y hora de creación de la alerta
fecha_gestiondatetimeFecha en que el operador gestionó la alertaX
Tabla Chat_Mensajes
ColumnaTipo de DatoDescripciónNull
PKID_mensajeintNúmero de identificación del mensaje
FKID_reporteintNúmero de identificación del reporte asociado al chat
FKID_emisorintNúmero de identificación del usuario que envía
FKID_receptorintNúmero de identificación del usuario que recibe
contenidotextContenido del mensaje enviado
leidobitIndicador si el mensaje fue leído por el receptor
fecha_enviodatetimeFecha y hora de envío del mensaje
fecha_lecturadatetimeFecha y hora en que el receptor leyó el mensajeX
Tabla Configuracion_Sistema
ColumnaTipo de DatoDescripciónNull
PKID_configuracionintNúmero de identificación del parámetro de configuración
clavevarchar(100)Clave única del parámetro (ej: umbral_alerta_reportes)
valorvarchar(300)Valor actual del parámetro de configuración
descripcionvarchar(300)Descripción del parámetro y su impacto en el sistema
tipo_datovarchar(20)Tipo de dato del valor (int, bool, string)
FKID_usuario_cambiointNúmero de identificación del admin que hizo el cambio

ColumnaTipo de DatoDescripciónNull
fecha_actualizaciondatetimeFecha de la última actualización del parámetro
Tabla Log_Auditoria
ColumnaTipo de DatoDescripciónNull
PKID_logintNúmero de identificación del registro del log
FKID_usuariointNúmero de identificación del usuario que actuó
tipo_accionvarchar(100)Tipo de acción (creación, edición, eliminación, acceso)
recurso_afectadovarchar(200)Entidad o recurso sobre el que se realizó la acción
id_recursointID del recurso afectado para trazabilidad directaX
detalletextDescripción detallada de la acción ejecutadaX
ip_origenvarchar(50)Dirección IP desde donde se realizó la acción
sospechosobitIndicador si la acción fue marcada como sospechosa
fecha_acciondatetimeFecha y hora exacta en que se ejecutó la acción