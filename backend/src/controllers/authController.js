import pool from "../config/db.js"; // Ajusta la ruta a tu conexión de BD si varía
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secreto_desarrollo_notiapp";

// Generador de Token JWT Helper
const generateToken = (id, rol) => {
  return jwt.sign({ id, rol }, JWT_SECRET, { expiresIn: "8h" });
};

/**
 * 1. INICIAR SESIÓN (LOGIN)
 */
export const loginUser = async (req, res) => {
  const { correo, email, password, contrasena, role, rol } = req.body;

  // Normalizar los campos recibidos (admite 'correo' o 'email', 'password' o 'contrasena')
  const emailInput = correo || email;
  const passwordInput = password || contrasena;
  const roleInput = role || rol;

  console.log("=== INTENTO DE LOGIN ===");
  console.log("Datos recibidos:", { emailInput, passwordInput: passwordInput ? "***" : undefined, roleInput });

  if (!emailInput || !passwordInput) {
    return res.status(400).json({ message: "Por favor proporciona correo y contraseña." });
  }

  try {
    // Buscar el usuario por correo en la tabla 'usuarios'
    const result = await pool.query(
      "SELECT id, nombre_completo, correo, contrasena_hash, rol, entidad_id, estado FROM usuarios WHERE correo = $1",
      [emailInput.toLowerCase().trim()]
    );

    if (result.rows.length === 0) {
      console.log("❌ Usuario no encontrado en BD para el correo:", emailInput);
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const user = result.rows[0];
    console.log("👤 Usuario encontrado en BD:", { id: user.id, correo: user.correo, rol: user.rol, estado: user.estado });

    // Verificar si la cuenta está activa
    if (user.estado !== "activo") {
      console.log("⛔ Cuenta inactiva/suspendida para ID:", user.id);
      return res.status(403).json({ message: "La cuenta se encuentra inactiva o suspendida." });
    }

    // Comparar la contraseña enviada con 'contrasena_hash'
    const isPasswordValid = await bcrypt.compare(passwordInput, user.contrasena_hash);

    if (!isPasswordValid) {
      console.log("❌ Contraseña incorrecta para el usuario ID:", user.id);
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    console.log("✅ Autenticación exitosa para el usuario ID:", user.id);

    // Generar Token JWT
    const token = generateToken(user.id, user.rol);

    // Mapear respuesta para que sea consumible fácilmente por App.jsx / Login.jsx
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre_completo,
        email: user.correo,
        rol: user.rol, // 'ciudadano', 'entidad', 'administrador'
        entidadId: user.entidad_id,
      },
    });
  } catch (error) {
    console.error("Error en loginUser:", error);
    return res.status(500).json({ message: "Error interno en el servidor al intentar iniciar sesión." });
  }
};

/**
 * 2. REGISTRO DE NUEVOS CIUDADANOS
 */
export const registerUser = async (req, res) => {
  const { nombre_completo, nombre, correo, email, password, contrasena } = req.body;

  const fullName = nombre_completo || nombre;
  const userEmail = correo || email;
  const userPassword = password || contrasena;

  if (!fullName || !userEmail || !userPassword) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
    // Validar si el correo ya existe
    const existingUser = await pool.query("SELECT id FROM usuarios WHERE correo = $1", [
      userEmail.toLowerCase().trim(),
    ]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "El correo electrónico ya se encuentra registrado." });
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

    // Insertar nuevo ciudadano (rol por defecto: 'ciudadano')
    const newUser = await pool.query(
      `INSERT INTO usuarios (nombre_completo, correo, contrasena_hash, rol, estado)
       VALUES ($1, $2, $3, 'ciudadano', 'activo')
       RETURNING id, nombre_completo, correo, rol, entidad_id`,
      [fullName.trim(), userEmail.toLowerCase().trim(), hashedPassword]
    );

    const createdUser = newUser.rows[0];
    const token = generateToken(createdUser.id, createdUser.rol);

    return res.status(201).json({
      message: "Usuario registrado con éxito",
      token,
      user: {
        id: createdUser.id,
        nombre: createdUser.nombre_completo,
        email: createdUser.correo,
        rol: createdUser.rol,
        entidadId: createdUser.entidad_id,
      },
    });
  } catch (error) {
    console.error("Error en registerUser:", error);
    return res.status(500).json({ message: "Error interno del servidor al registrar el usuario." });
  }
};

/**
 * 3. OBTENER PERFIL DE USUARIO AUTENTICADO
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extraído desde el middleware de autenticación (JWT)

    const result = await pool.query(
      "SELECT id, nombre_completo, correo, rol, entidad_id, estado FROM usuarios WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const user = result.rows[0];

    return res.status(200).json({
      user: {
        id: user.id,
        nombre: user.nombre_completo,
        email: user.correo,
        rol: user.rol,
        entidadId: user.entidad_id,
      },
    });
  } catch (error) {
    console.error("Error en getProfile:", error);
    return res.status(500).json({ message: "Error al obtener el perfil de usuario." });
  }
};

/**
 * 4. RUTA TEMPORAL PARA FORZAR RESET DE CLAVE
 */
export const resetAdminPassword = async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("123456", saltRounds);

    await pool.query(
      "UPDATE usuarios SET contrasena_hash = $1, estado = 'activo' WHERE id IN (1, 2, 3, 4, 5)",
      [hashedPassword]
    );

    return res.json({ message: "Contraseñas actualizadas con éxito con el hash propio de Node", hashedPassword });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};