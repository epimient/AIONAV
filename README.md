# AIONAV 🚀
> **Directorio Open Source de Herramientas de Inteligencia Artificial**

**AIONAV** es una biblioteca técnica curada de las mejores herramientas de IA. Diseñada para ser **rápida, privada y mantenible**, funciona sin bases de datos complejas ni rastreadores. Todo el contenido se gestiona a través de un simple archivo JSON.

![AIONAV Screenshot](assets/img/logo.svg)

---

## ✨ Características

- **🔍 Búsqueda Inteligente**: Filtra instantáneamente por nombre, descripción o etiquetas.
- **⚡ Filtrado y Orden**:
  - Filtra por categorías (Texto, Video, Audio, Dev, etc.).
  - Ordena alfabéticamente (A-Z / Z-A).
- **🛠️ Generador de Herramientas**: Interfaz integrada para generar el código JSON de nuevas herramientas fácilmente.
- **🎨 Diseño Moderno**: Interfaz oscura (Dark Mode), responsiva y minimalista.
- **🚀 100% Estático**: Puede alojarse en GitHub Pages, Netlify o cualquier servidor web simple.

---

## 🛠️ Tecnologías

Este proyecto se adhiere a la filosofía **"No Build Steps"** (Sin pasos de construcción complejos):

- **HTML5 Semántico**: Estructura limpia.
- **CSS3 Moderno**: Variables CSS para fácil personalización.
- **Bootstrap 5**: Sistema de grillas y componentes base.
- **JavaScript Vanilla**: Lógica rápida sin frameworks pesados (React/Angular/Vue).
- **JSON**: Base de datos ligera y legible por humanos.

---

## ➕ Cómo Agregar Nuevas Herramientas

Tienes dos formas de contribuir o añadir tus propias herramientas al directorio:

### Opción A: Usando el Asistente Visual (Recomendado)
1. Abre la página web (`index.html`).
2. Haz clic en el botón **"+ Añadir Herramienta"** en la esquina superior derecha.
3. Rellena el formulario (Nombre, URL, Descripción, Categoría, Tags).
4. Haz clic en **"Generar Código"**.
5. Copia el bloque JSON generado.
6. Pega el código en el archivo `data/tools.json` dentro de la lista `tools` de la categoría correspondiente.

### Opción B: Edición Manual
Edita directamente el archivo `data/tools.json`:

```json
{
    "name": "Nombre de la IA",
    "url": "https://ejemplo.com",
    "description": "Breve descripción de lo que hace.",
    "icon": "assets/img/icons/mi-icono.png", // Opcional
    "tags": ["tag1", "tag2"]
}
```

---

## 📁 Estructura del Proyecto

```text
AIONAV/
├── index.html          # Página principal (Contenedor y UI)
├── data/
│   └── tools.json      # BASE DE DATOS (Aquí están todas las herramientas)
├── assets/
│   ├── css/
│   │   └── style.css   # Estilos visuales y personalización
│   ├── js/
│   │   └── main.js     # Lógica de renderizado, búsqueda y filtros
│   └── img/
│       └── logo.svg    # Logotipo del proyecto
└── README.md           # Esta documentación
```

---

## 🎨 Personalización

### Cambiar Iconos
Puedes agregar iconos personalizados para cada herramienta:
1. Guarda la imagen (png/svg) en `assets/img/`.
2. En `data/tools.json`, agrega la propiedad `"icon": "assets/img/tu-archivo.png"`.

### Cambiar Colores
Edita las variables CSS en `assets/css/style.css`:

```css
:root {
    --bg-main: #0f1115;       /* Fondo principal */
    --accent: #4da3ff;        /* Color de acento/enlaces */
    --text-main: #e6e6e6;     /* Color de texto */
}
```

---

## 📄 Licencia

Este proyecto es Open Source bajo la licencia **MIT**. Eres libre de usarlo, modificarlo y distribuirlo.
