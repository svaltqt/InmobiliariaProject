# 📦 InmobiliarIA Web/App

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
│   │   ├── prototypes/
│   │   │   ├── userPrototype.js    # Base del Prototipo de usuario
│   │   │   └── userPrototypes.js   # Prototipos de usuario
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

## Diagramas de FLujo

### Patron de diseño
Diagrama de Flujo del Prototype en Signup
```mermaid
flowchart TD
    A[Inicio: Datos de registro] --> B[Crear UserPrototype base]
    B --> C[Clonar prototipo]
    C --> D[Crear instancia de User mongoose]
    D --> E{¿Clonación exitosa?}
    E -->|Sí| F[Guardar en BD y generar token]
    E -->|No| G[Error: Datos inválidos]
    F --> H[Respuesta 201: Usuario creado]
    G --> I[Respuesta 400: Error]
```
## Arquitectura MVC

Este proyecto sigue el patrón de diseño **Modelo-Vista-Controlador (MVC)** para organizar el backend de forma clara y escalable.

- **Vista**: `"public/"` — Interfaz de usuario en HTML, CSS y JS.
- **Modelo (`models/`)**: Define las estructuras de datos y su lógica (por ejemplo, `user.model.js`).
- **Controlador (`controllers/`)**: Contiene la lógica de negocio y responde a las solicitudes HTTP.
- **Rutas (`routes/`)**: Define los endpoints y conecta con los controladores.
- **Middleware**: Archivos como `protecRoute.js` protegen las rutas según la autenticación.

### Diagrama de Flujo MVC
```mermaid
flowchart TD
    A["Vista: 'public/'"] -->|"Solicita datos"| B["Rutas"]
    B -->|"Pasan por middleware"| C["Controladores"]
    C -->|"Clona 'userPrototype'"| D["Modelo: 'user.model.js'"]
    D -->|"Consulta / guarda"| E["Base de Datos: 'MongoDB Atlas'"]
    E -->|"Respuesta"| A

```
    
### Inicio sesión
Archivos relacionados: auth.controller.js, login.js, protecRoute.js
```mermaid
flowchart TD
    A[Inicio] --> B[Ingresar username y password]
    B --> C{Validar campos vacíos?}
    C -->|Sí| D[Mostrar error]
    C -->|No| E[POST /api/auth/login]
    E --> F{Usuario existe en BD?}
    F -->|No| G[Mostrar error: Credenciales inválidas]
    F -->|Sí| H[Verificar contraseña con bcrypt]
    H --> I{¿Coincide?}
    I -->|No| G
    I -->|Sí| J[Generar token JWT '15 días']
    J --> K[Set cookie httpOnly]
    K --> L[Redirigir a dashboard]
    L --> M[Fin]
```
Inicio sesion Diagrama de secuencia
```mermaid
sequenceDiagram
    participant Frontend
    participant Backend
    participant DB
    Frontend->>Backend: POST /api/auth/login (username, password)
    Backend->>DB: Buscar usuario por username
    alt Usuario no existe o contraseña incorrecta
        Backend-->>Frontend: 400 (Error: Credenciales inválidas)
    else Credenciales válidas
        Backend->>DB: Verificar contraseña con bcrypt
        Backend->>Backend: Generar token JWT (15 días)
        Backend->>Frontend: Set cookie httpOnly + Datos usuario (200)
    end

```

### Cerrar sesión
Archivos relacionados: auth.controller.js, logout.js
```mermaid
flowchart TD
    A[Inicio] --> B[POST /api/auth/logout]
    B --> C[Limpiar cookie 'jwt']
    C --> D[Redirigir a página de inicio]
    D --> E[Fin]
```
Diagrama secuencia Cerrar sesion
```mermaid
sequenceDiagram
    participant Frontend
    participant Backend
    Frontend->>Backend: POST /api/auth/logout
    Backend->>Frontend: Limpiar cookie 'jwt' (200)
    Frontend->>Frontend: Redirigir a página de inicio
```

### Crecion de cuenta Diagrama secuencia
```mermaid
sequenceDiagram
    participant Frontend
    participant Backend
    participant DB
    Frontend->>Backend: POST /api/auth/signup (datos usuario)
    Backend->>DB: Verificar username/email único
    alt Datos inválidos
        Backend-->>Frontend: 400 (Error: Email/username ya existe)
    else Datos válidos
        Backend->>Backend: Crear UserPrototype + Clonar
        Backend->>DB: Guardar nuevo usuario
        Backend->>Backend: Generar token JWT
        Backend->>Frontend: Set cookie + Datos usuario (201)
    end

```
### Recuperar contraseña Diagrama secuencia
```mermaid
sequenceDiagram
    participant Frontend
    participant Backend
    participant DB
    participant EmailService
    Frontend->>Backend: POST /api/auth/recover-password (email)
    Backend->>DB: Buscar usuario por email
    alt Email no registrado
        Backend-->>Frontend: 404 (Error)
    else Email válido
        Backend->>Backend: Generar token temporal (no implementado aún)
        Backend->>DB: Guardar token temporal
        Backend->>EmailService: Enviar email con enlace (simulado en tu código)
        Backend-->>Frontend: 200 (Éxito)
    end
```
### Desactivar cuenta
Archivos relacionados: user.controller.js, deactivateAccount.js
```mermaid
flowchart TD
    A[Inicio] --> B[Mostrar confirmación]
    B --> C{¿Confirmó?}
    C -->|No| D[Cancelar]
    C -->|Sí| E[POST /api/users/deactivate]
    E --> F[Actualizar BD: active=false]
    F --> G[Limpiar cookie JWT]
    G --> H[Redirigir a inicio con flag ?account=deactivated]
    H --> I[Fin]
```

### Eliminar Cuenta
Archivos relacionados: user.controller.js, deleteAccount.js
```mermaid
flowchart TD
    A[Inicio] --> B[Mostrar confirmación irreversible]
    B --> C{¿Confirmó?}
    C -->|No| D[Cancelar]
    C -->|Sí| E[Solicitar contraseña]
    E --> F{¿Contraseña válida?}
    F -->|No| G[Mostrar error]
    F -->|Sí| H[DELETE /api/users/delete]
    H --> I[Eliminar usuario de BD]
    I --> J[Limpiar cookies/localStorage]
    J --> K[Redirigir a página de inicio]
    K --> L[Fin]

```

### Modificar Perfil
Archivos relacionados: user.controller.js, update.js
```mermaid
flowchart TD
    A[Inicio] --> B[Seleccionar campo a modificar]
    B --> C{¿Es contraseña?}
    C -->|No| D[Mostrar input/select]
    C -->|Sí| E[Mostrar inputs: actual y nueva]
    D/E --> F[Validar formato 'email, etc.']
    F --> G{¿Datos válidos?}
    G -->|No| H[Mostrar error]
    G -->|Sí| I[POST /api/users/update]
    I --> J{¿Cambió contraseña?}
    J -->|Sí| K[Verificar actual con bcrypt]
    K --> L{¿Coincide?}
    L -->|No| M[Mostrar error]
    L -->|Sí| N[Hashear nueva contraseña]
    J -->|No| O[Actualizar campo en BD]
    N/O --> P[Devolver datos actualizados]
    P --> Q[Mostrar nuevo valor en UI]
    Q --> R[Fin]
```
### Middleware: protecRoute
```mermaid
flowchart TD
    A[Inicio] --> B[Obtener cookie 'jwt']
    B --> C{¿Token existe?}
    C -->|No| D[401: No autorizado]
    C -->|Sí| E[Verificar JWT_SECRET]
    E --> F{¿Token válido?}
    F -->|No| G[Limpiar cookie + 401]
    F -->|Sí| H[Buscar usuario en BD]
    H --> I{¿Existe?}
    I -->|No| J[Limpiar cookie + 404]
    I -->|Sí| K{¿Cuenta activa?}
    K -->|No| L[Limpiar cookie + 403]
    K -->|Sí| M[Adjuntar user a req]
    M --> N[Next]
    N --> O[Fin]

```
```mermaid
sequenceDiagram
    participant Frontend
    participant Backend
    participant DB
    Frontend->>Backend: Request con cookie 'jwt'
    Backend->>Backend: Verificar token JWT
    alt Token inválido
        Backend->>Frontend: 401 + Limpiar cookie
    else Token válido
        Backend->>DB: Buscar usuario por ID (decoded.userId)
        alt Usuario no existe o inactivo
            Backend->>Frontend: 403/404 + Limpiar cookie
        else Usuario válido
            Backend->>Backend: Adjuntar user a req
            Backend->>Frontend: Continuar petición
        end
    end
```
## 🛡️ Seguridad

- ✅ Rutas protegidas con middleware `protecRoute` que verifica el token JWT
- ✅ Tokens generados con secreto seguro (`JWT_SECRET`) y almacenados en cookies HTTPOnly
- ✅ Validación de identidad del usuario en cada operación sensible
- ✅ Verificación de correo no repetido antes de permitir actualización
- ✅ Cambio de contraseña que exige confirmar la contraseña actual
- ✅ Código dividido por responsabilidades (controladores, middleware, rutas)


### 📄 Licencia
Este proyecto está licenciado bajo la licencia MIT.
