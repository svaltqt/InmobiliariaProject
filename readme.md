# 📦 User Settings App

Esta es una aplicación web full stack que permite a los usuarios visualizar y modificar su información personal. Usa **Node.js con Express** para el backend y **HTML/CSS/JavaScript modular** para el frontend.

Incluye autenticación, manejo de sesiones, validación de datos y actualización de perfil.

---
## 🚀 Tecnologías utilizadas

- **Backend**: Node.js, Express, JWT, MongoDB (Mongoose)
- **Frontend**: HTML, CSS, JavaScript vanilla
- **Autenticación**: JSON Web Tokens
- **Estilos**: CSS Grid, responsive design
- **Base de datos**: MongoDB Atlas / local


---

## 🚀 Requisitos

- Node.js >= 16.x
- npm (v7 o superior)
- MongoDB (local o en la nube, como MongoDB Atlas)

---

## 📥 Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/user-settings-app.git
cd user-settings-app
```
### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura las variables de entorno

Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

```env
MONGO_URI=mongodb+srv://dbadmin:dbpassword@cluster0.itvrl4h.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
JWT_SECRET=secret=NV0B7dysi8KA6h9zNIhXUPuVNirIBRmhW57ykoqkfD0=
NODE_ENV=development
PORT2=8000
```
Puedes usar MongoDB Atlas para conexión remota.

### ▶️ Cómo iniciar la aplicación
En desarrollo
```bash
npm run dev
```
Usa nodemon para autorecargar cambios automáticamente.


### 🌐 Acceso a la App
Una vez iniciado, abre tu navegador en:

``` plaintext
http://localhost:3000   
```
### 🗂️ Estructura del Proyecto
```plaintext
InmobiliariaProject/
├── .env                        # Variables de entorno
├── .gitignore                  # Archivos y carpetas ignoradas por Git
├── package.json                # Dependencias y scripts del proyecto
├── server.js                   # Punto de entrada del backend

├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js  # Lógica de autenticación
│   │   └── user.controller.js  # Controlador de perfil de usuario
│   ├── lib/
│   │   └── utils/
│   │       └── generateToken.js    # Generación de tokens JWT
│   ├── middleware/
│   │   └── protecRoute.js      # Middleware de autenticación
│   ├── models/
│   │   ├── user.model.js       # Modelo de usuario
│   │             
│   ├── routes/
│   │   ├── auth.routes.js      # Rutas de login y registro
│   │   └── user.routes.js      # Rutas de perfil y actualización
│   └── db/
│       └── db.js               # Conexión a la base de datos

├── frontend/
│   ├── public/
│   │   ├── assets/             # Imágenes e íconos
│   │   ├── css/
│   │   │   ├── style.css
│   │   │   └── settings.css            
│   │   ├── js/
│   │   │   ├── checkSession.js # Verifica sesión activa
│   │   │   ├── login.js        # Lógica de inicio de sesión
│   │   │   ├── logout.js       # Lógica de cierre de sesión
│   │   │   ├── main.js         # Lógica principal de la app    
│   │   │   ├── register.js     # Lógica de registro
│   │   │   ├── settings.js     # Lógica de UI de perfil
│   │   │   └── update.js       # Lógica de actualización de perfil
│   │   ├── index.html          # Página de inicio/login
│   │   └── settings.html       # Página de configuración de perfil

└── readme.md                   # Documentación del proyecto

```
## ✅ Funcionalidades

- ✨ Registro de nuevos usuarios (cliente o propietario)
- 🔐 Inicio de sesión con autenticación JWT
- 👤 Visualización de los datos del perfil del usuario autenticado
- 📝 Edición de campos del perfil:
    - Nombre completo
    - Nombre de usuario
    - Correo electrónico (con verificación de duplicados)
    - Teléfono
    - Dirección
    - Tipo de usuario (`cliente` o `propietario`)
    - Contraseña (requiere ingresar la contraseña actual y la nueva)
- 🔄 Mantenimiento de sesión activa mediante cookies HTTPOnly
- 🚪 Cierre de sesión seguro

---

## 🛡️ Seguridad

- ✅ Rutas protegidas con middleware `protecRoute` que verifica el token JWT
- ✅ Tokens generados con secreto seguro (`JWT_SECRET`) y almacenados en cookies HTTPOnly
- ✅ Validación de identidad del usuario en cada operación sensible
- ✅ Verificación de correo no repetido antes de permitir actualización
- ✅ Cambio de contraseña que exige confirmar la contraseña actual
- ✅ Código dividido por responsabilidades (controladores, middleware, rutas)


### 📄 Licencia
Este proyecto está licenciado bajo la licencia MIT.
