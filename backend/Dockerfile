# Usa una imagen oficial de Node.js
FROM node:18-alpine
# Define el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copia los archivos de dependencias
COPY package*.json ./
# Instala las dependencias en el contenedor
RUN npm install
# Copia el resto del código del backend
COPY . .
# Expone el puerto en el que corre tu servidor (ej. 3000, 4000 o 5000)
EXPOSE 3000
# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]