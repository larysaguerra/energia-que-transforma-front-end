# Registro de Cambios del Proyecto

Este documento resume los cambios y nuevas características implementadas en el proyecto.

## Versión 17/09/2025 - Funcionalidad de Creación de Productos y Mejoras en Registro

### 🚀 Nuevas Características

-   **Formulario de Creación de Productos:** Se ha implementado un nuevo formulario en la sección de administración (`/admin/productos`) que se alinea con la estructura de la tabla `productos` de la base de datos.
    -   Incluye todos los campos requeridos, como capacidad, costos, eficiencia, etc.
    -   Utiliza componentes de UI adecuados como selectores, interruptores y campos numéricos.
-   **Carga Dinámica de Tipos de Energía:** El formulario de creación de productos ahora obtiene dinámicamente los "Tipos de Energía" (Panel Solar, Turbina Eólica) desde el endpoint `/tipo/gettipos` de la API, poblando el selector correspondiente.

### ✨ Mejoras

-   **Rol de Usuario por Defecto:** Al registrar un nuevo usuario, se le asigna automáticamente el rol de `"usuario"` por defecto, estandarizando los nuevos registros.

## Versión 16/09/2025 - Integración de Backend y Autenticación Completa

### 🔌 Integración con Backend

-   **Conexión a API Real:** Se ha conectado la aplicación a los endpoints del backend de Java. El archivo `servicios/apiEnergia.js` ahora realiza llamadas HTTP reales.
-   **Catálogo de Productos Dinámico:** La página de `/productos` ahora carga la lista de productos directamente desde el endpoint `/producto/getproductos` del backend.
-   **Creación de Productos:** El formulario de administrador en `/admin/productos` ahora envía los datos del nuevo producto al endpoint `/producto/postproducto`.

### 🔐 Sistema de Autenticación Completo

-   **Flujo de Autenticación Real:** Se ha implementado el flujo completo de registro, inicio de sesión y cierre de sesión utilizando los endpoints del backend (`/user/saveusers`, `/user/login`).
-   **Gestión de Estado Global:** Se ha creado un `AuthContext` (`context/AuthContext.tsx`) para gestionar el estado de autenticación del usuario de forma global en toda la aplicación.
-   **Persistencia de Sesión:** El estado de inicio de sesión ahora persiste entre sesiones gracias al uso de `localStorage` para guardar el token de autenticación.
-   **Rutas Protegidas:** La página de administración (`/admin/productos`) ahora es una ruta protegida, accesible únicamente para usuarios autenticados.

### 🛠️ Correcciones de Build y Mejoras Técnicas

-   Se solucionaron múltiples errores de compilación de Next.js relacionados con la resolución de módulos y la interoperabilidad entre TypeScript y JavaScript.
-   Se corrigió un error de renderizado en el servidor con el hook `useSearchParams` en la página de inicio de sesión, implementando un `Suspense boundary` para una carga diferida del componente.
-   Se refactorizó la estructura de archivos para una mejor organización del código, como la creación del componente `SignIn.jsx`.

---

## Versión Anterior - Mejoras de Funcionalidad y UI

### 🚀 Nuevas Características

1.  **Página de Productos de Energía**
    -   Se ha creado una nueva página en `/productos` para mostrar un catálogo de productos de energía renovable.

2.  **Gestión de Productos para Administradores**
    -   Se ha añadido una nueva sección de administración en `/admin/productos` con un formulario para subir nuevos productos.

3.  **Sistema de Autenticación (Simulado)**
    -   Se ha integrado un flujo de autenticación simulado en el encabezado.

### ✨ Mejoras

1.  **Rediseño del Formulario de Energía**
    -   El formulario principal de la calculadora de energía ha sido rediseñado para una mejor experiencia de usuario con iconos y una disposición optimizada.

2.  **Navegación del Encabezado Mejorada**
    -   El encabezado ha sido actualizado para incluir una barra de navegación más robusta y enlaces condicionales.