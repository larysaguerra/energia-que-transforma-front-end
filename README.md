# Energía que Transforma - Frontend

Este proyecto es la interfaz de usuario de la plataforma "Energía que Transforma", diseñada para ayudar a personas y pequeñas empresas a comprender el impacto económico y ambiental de su consumo energético y explorar los beneficios de la transición a energías renovables.

## Visión General del Proyecto

La plataforma permite a los usuarios calcular los costos y beneficios económicos y ambientales de cambiar de fuentes de energía no renovables a alternativas de energía renovable. Ofrece recomendaciones personalizadas basadas en el consumo energético y la ubicación del usuario, facilitando la toma de decisiones informadas sobre la adopción de energías limpias.

## Estructura del Frontend

El frontend de la aplicación está organizado de la siguiente manera:

-   **`app/`**: Contiene los archivos principales de la aplicación, incluyendo el layout global (`layout.tsx`) y las páginas principales (`page.jsx`). Aquí se define la estructura base y las rutas de la aplicación.
-   **`componentes/`**: Aquí se encuentran los componentes reutilizables específicos de la aplicación, como:
    -   `Encabezado.jsx`: El componente de la cabecera de la aplicación.
    -   `FormularioEnergia.jsx`: El formulario para que los usuarios ingresen sus datos de consumo.
    -   `PiePagina.jsx`: El componente del pie de página.
    -   `Resultados.jsx`: Muestra los resultados de los cálculos de energía.
    -   `graficas/`: Contiene componentes para visualizar datos, como `AhorroTiempo.jsx` y `ComparacionCostos.jsx`.
-   **`components/ui/`**: Esta carpeta alberga una colección de componentes de interfaz de usuario genéricos y reutilizables (Shadcn UI), que forman la base visual de la aplicación (botones, tarjetas, inputs, etc.).
-   **`lib/utils.ts`**: Contiene funciones de utilidad y helpers que pueden ser usados en diferentes partes de la aplicación.
-   **`public/`**: Almacena activos estáticos como imágenes, íconos y otros archivos que son servidos directamente por el servidor web.
-   **`servicios/apiEnergia.js`**: Este archivo maneja la lógica para interactuar con la API de energía, realizando las llamadas necesarias para obtener los datos de cálculo.

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
