# Energía que Transforma - Frontend

Este proyecto es la interfaz de usuario de la plataforma "Energía que Transforma", diseñada para ayudar a personas y pequeñas empresas a comprender el impacto económico y ambiental de su consumo energético y explorar los beneficios de la transición a energías renovables.

## Visión General del Proyecto

La plataforma permite a los usuarios calcular los costos y beneficios económicos y ambientales de cambiar de fuentes de energía no renovables a alternativas de energía renovable. Ofrece recomendaciones personalizadas basadas en el consumo energético y la ubicación del usuario, facilitando la toma de decisiones informadas sobre la adopción de energías limpias.

## Cómo Funciona la Aplicación

La aplicación "Energía que Transforma" es una calculadora interactiva que ayuda a usuarios a evaluar los beneficios económicos y ambientales de migrar a energías renovables. El flujo de funcionamiento es el siguiente:

### Flujo de Usuario Principal

1. **Ingreso de Datos**: El usuario accede a la página principal y completa el formulario con:
   - Consumo mensual de energía (en kW)
   - Costo mensual actual (en pesos)
   - Ubicación geográfica (norte, centro, sur)
   - Tipo de edificación (residencial, comercial, industrial)

2. **Cálculo Automático**: Al enviar el formulario, la aplicación procesa los datos utilizando algoritmos que consideran:
   - Factores de radiación solar por región
   - Eficiencias por tipo de edificación
   - Costos de instalación y mantenimiento
   - Vida útil de los sistemas (25 años)
   - Degradación anual de paneles solares (0.5%)
   - Inflación energética (4% anual)

3. **Resultados y Visualización**: Se muestran los resultados incluyendo:
   - Energía renovable rentable
   - Costo de instalación
   - Retorno de inversión (punto de equilibrio)
   - Ahorro mensual y total
   - Reducción de CO2
   - Beneficios tributarios
   - Gráficas interactivas de comparación de costos y ahorro a lo largo del tiempo

### Funcionalidades Adicionales

- **Autenticación de Usuarios**: Sistema de registro e inicio de sesión para usuarios
- **Panel de Administración**: Gestión de productos de energía renovable (requiere autenticación)
- **Visualización de Datos**: Gráficas dinámicas usando Recharts para mostrar proyecciones a largo plazo

## Estructura del Frontend

El frontend está organizado siguiendo principios de arquitectura modular y separación de responsabilidades:

### Arquitectura General

```
energia-que-transforma-front-end/
├── app/                          # Páginas y rutas de Next.js
│   ├── layout.tsx               # Layout global de la aplicación
│   ├── page.jsx                 # Página principal (calculadora)
│   ├── globals.css              # Estilos globales
│   ├── admin/                   # Rutas protegidas de administración
│   │   └── productos/
│   │       └── page.jsx         # Gestión de productos
│   ├── productos/               # Página de listado de productos
│   ├── sign-in/                 # Página de inicio de sesión
│   └── sign-up/                 # Página de registro
├── componentes/                 # Componentes específicos de la app
│   ├── Encabezado.jsx          # Cabecera con navegación
│   ├── EncabezadoBase.jsx      # Versión base de la cabecera
│   ├── FormularioEnergia.jsx   # Formulario principal de cálculo
│   ├── FormularioProducto.jsx  # Formulario para productos
│   ├── FormularioRegistro.jsx  # Formulario de registro
│   ├── LoginUsuario.jsx        # Componente de login
│   ├── PiePagina.jsx           # Pie de página
│   ├── Resultados.jsx          # Visualización de resultados
│   ├── SignIn.jsx              # Componente de autenticación
│   └── graficas/               # Componentes de visualización
│       ├── AhorroTiempo.jsx    # Gráfica de ahorro temporal
│       └── ComparacionCostos.jsx # Gráfica comparativa
├── components/ui/              # Componentes UI reutilizables (Shadcn)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ... (otros componentes UI)
├── context/                    # Contextos de React
│   └── AuthContext.tsx         # Gestión de autenticación
├── lib/                        # Utilidades y helpers
│   └── utils.ts                # Funciones de utilidad
├── public/                     # Activos estáticos
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   └── placeholder.svg
├── servicios/                  # Servicios de API
│   └── apiEnergia.js           # Cliente API para backend
└── configuración/              # Archivos de configuración
    ├── next.config.mjs
    ├── tailwind.config.js
    ├── tsconfig.json
    └── components.json
```

### Diseño y Patrones Arquitectónicos

- **Componentes Modulares**: Cada componente tiene una responsabilidad única y es reutilizable
- **Separación de Preocupaciones**: Lógica de negocio separada de la presentación
- **Estado Global**: Uso de Context API para gestión de autenticación
- **Enrutamiento Declarativo**: Next.js App Router para navegación
- **Estilos Consistentes**: Tailwind CSS con componentes base de Shadcn UI
- **Accesibilidad**: Componentes UI con soporte para lectores de pantalla y navegación por teclado
- **Responsive Design**: Layout adaptativo para diferentes tamaños de pantalla

### Gestión de Estado

- **Estado Local**: useState para estado de componentes individuales
- **Estado Global**: AuthContext para gestión de sesión de usuario
- **Estado Derivado**: Cálculos basados en props y estado local

### Comunicación con Backend

- **Cliente API**: Servicio centralizado en `servicios/apiEnergia.js`
- **Manejo de Errores**: Try-catch con mensajes de error descriptivos
- **Autenticación**: Headers con tokens JWT para rutas protegidas
- **Mock Data**: Funciones simuladas para desarrollo sin backend completo

## Tecnologías Clave (Frontend)

Este proyecto frontend utiliza las siguientes tecnologías principales:

-   **React**: Una librería de JavaScript para construir interfaces de usuario interactivas.
    -   **Next.js**: Se utiliza como el framework de React para este proyecto, aportando beneficios clave como:
        -   **Enrutamiento Basado en Archivos**: Simplifica la creación de páginas y la navegación, utilizando la estructura de carpetas (`app/`).
        -   **Renderizado Híbrido (SSR/SSG)**: Mejora el rendimiento inicial y el SEO al permitir renderizado en el servidor o generación estática.
        -   **Optimización de Rendimiento**: Incluye optimización automática de imágenes, code splitting y precarga de rutas para una experiencia de usuario más rápida.
        -   **Desarrollo Mejorado**: Ofrece "Fast Refresh" para una retroalimentación casi instantánea durante el desarrollo.
        -   **Soporte Integrado**: Facilita la integración de estilos (Tailwind CSS) y tiene un excelente soporte para TypeScript.
-   **Tailwind CSS**: Un framework CSS que permite construir diseños personalizados rápidamente con clases de utilidad.
-   **Recharts**: Una librería de gráficos compuesta por componentes React, utilizada para la visualización de datos en las gráficas.

## Cómo Ejecutar el Proyecto (Frontend)

Para poner en marcha el frontend de la aplicación en tu entorno de desarrollo, sigue estos pasos:

1.  **Instalar Dependencias**:
    Abre tu terminal en la raíz del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:
    ```
    pnpm install
    ```

2.  **Iniciar el Servidor de Desarrollo**:
    Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo con:
    ```
    pnpm dev
    ```
    Esto iniciará la aplicación en modo de desarrollo, generalmente accesible en `http://localhost:3000`.
