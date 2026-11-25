# Currículum web de Marcos Gómez

Portfolio estático en HTML, CSS y JavaScript, con una página principal editorial, navegación por secciones y versiones en español e inglés.

## Ejecutar

- Abre `index.html` en un navegador para consultar el currículum.
- Para probarlo como sitio web, sirve la carpeta raíz con un servidor estático local o la extensión Live Server de VS Code.
- El proyecto no necesita gestor de paquetes ni dependencias JavaScript externas.
- El botón «Guardar / imprimir PDF» abre el diálogo de impresión del navegador; selecciona «Guardar como PDF».

## Personalizar los datos

Edita `index.html` para cambiar presentación, experiencia, formación, habilidades, idiomas, proyectos y contacto. Mantén sincronizados `data-es` y `data-en` al editar un texto traducido. Sustituye `marcos.gomez@example.com` por tu correo definitivo en los dos enlaces `mailto:` antes de publicar.

El currículum no incluye fotografía de perfil; la portada se ha diseñado para presentar la información sin depender de una imagen personal.

## Estructura principal

- `index.html`: currículum completo con presentación, perfil, experiencia, formación, habilidades, idiomas, proyectos y contacto.
- `css/portfolio.css`: sistema visual, responsive, movimiento reducido y reglas de impresión de la portada.
- `js/scripts.js`: selector de idioma y tema, menú móvil, progreso de lectura, sección activa, animaciones discretas y diálogo de impresión.
- `assets/img/`: favicon.
- `experience.html`, `education.html`, `projects.html`, `skills.html`, `interests.html`: enlaces heredados a sus secciones en la página principal.

## Accesibilidad y seguridad

La portada incluye navegación por teclado, enlace para saltar al contenido, HTML semántico, foco visible, etiquetas accesibles, contraste revisable en ambos temas y respeto a `prefers-reduced-motion`. El diseño se ha comprobado en tamaños de móvil y escritorio; estas comprobaciones no sustituyen una auditoría WCAG completa con tecnologías de asistencia.

La CSP del documento limita recursos a este mismo sitio, no se cargan bibliotecas de terceros en la portada y los enlaces externos usan `rel="noopener noreferrer"`. En producción, publica únicamente mediante HTTPS y configura también las cabeceras de seguridad desde el servidor o la plataforma de hosting: la CSP en una etiqueta `meta` es una defensa adicional, no reemplaza las cabeceras HTTP. No incluyas secretos ni información personal que no quieras hacer pública.
