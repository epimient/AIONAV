/*
  AIONAV
  main.js
  Render dinámico, filtrado y generación de herramientas
*/

let allData = null; // Store full data

document.addEventListener("DOMContentLoaded", () => {
    fetch("data/tools.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar tools.json");
            }
            return response.json();
        })
        .then(data => {
            allData = data;
            initializeFilters(data);
            initializeAddTool(data);
            renderApp(data);
        })
        .catch(error => {
            console.error("Error cargando herramientas:", error);
            showError();
        });
});

// --- RENDERIZADO PRINCIPAL ---

// --- RENDERIZADO PRINCIPAL ---

function renderApp(data, sortMode = 'default', categoryFilter = 'all', searchQuery = '') {
    const container = document.getElementById("tools-container");
    container.innerHTML = "";

    let toolsToRender = [];
    const query = searchQuery.toLowerCase().trim();

    // 1. Aplanar y Filtrar
    data.categories.forEach(cat => {
        if (categoryFilter === 'all' || cat.id === categoryFilter) {
            cat.tools.forEach(tool => {
                // Lógica de Búsqueda
                const matchSearch = !query ||
                    tool.name.toLowerCase().includes(query) ||
                    tool.description.toLowerCase().includes(query) ||
                    (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(query)));

                if (matchSearch) {
                    toolsToRender.push({ ...tool, categoryName: cat.name });
                }
            });
        }
    });

    // 2. Ordenar
    if (sortMode === 'az') {
        toolsToRender.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMode === 'za') {
        toolsToRender.sort((a, b) => b.name.localeCompare(a.name));
    }

    document.getElementById("totalToolsCount").textContent = `${toolsToRender.length} herramientas encontradas`;

    // Si hay búsqueda activa o filtro de categoría o orden alfabético, usamos vista plana
    const isFilteredView = query !== '' || categoryFilter !== 'all' || sortMode !== 'default';

    if (!isFilteredView && sortMode === 'default') {
        // Renderizado por Categorías (Vista limpia original por defecto)
        data.categories.forEach(category => {
            // Solo mostrar si tiene herramientas que pasaron el filtro (aunque aquí renderizamos todo data.categories, 
            // la lógica de arriba toolsToRender ya filtró. Si queremos ser consistentes, debemos verificar
            // qué herramientas pertenecen a esta categoría dentro de las filtradas)

            // Re-filtrado visual para mantener consistencia estricta en vista por defecto:
            // En vista "Default" sin filtros, mostramos todo.

            const section = document.createElement("section");
            section.classList.add("mb-5");
            section.innerHTML = `
                <h2 class="section-title">${category.name}</h2>
                <p class="text-muted mb-4">${category.description}</p>
                <div class="row g-4">
                    ${category.tools.map(tool => renderToolCard(tool)).join("")}
                </div>
            `;
            container.appendChild(section);
        });
    } else {
        // Renderizado Plano (Grid única) para resultados de búsqueda o filtros
        if (toolsToRender.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <h3 class="text-muted">No se encontraron herramientas</h3>
                    <p class="text-secondary">Intenta con otros términos de búsqueda.</p>
                </div>
            `;
        } else {
            const row = document.createElement("div");
            row.classList.add("row", "g-4");
            row.innerHTML = toolsToRender.map(tool => renderToolCard(tool, true)).join("");
            container.appendChild(row);
        }
    }
}

function renderToolCard(tool, showCategory = false) {
    const tagsHTML = tool.tags
        ? tool.tags.map(tag => `<span class="badge">${tag}</span>`).join("")
        : "";

    const categoryBadge = showCategory
        ? `<div class="mb-2"><small class="text-accent">${tool.categoryName}</small></div>`
        : "";

    return `
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card h-100">
        <div class="card-body d-flex flex-column">
          <div class="d-flex align-items-center mb-3">
             ${tool.icon ? `<img src="${tool.icon}" alt="${tool.name}" class="me-3" style="width: 40px; height: 40px; object-fit: contain;">` : ''}
             <h5 class="card-title mb-0">${tool.name}</h5>
          </div>
          ${categoryBadge}
          <div class="mb-2">
            ${tagsHTML}
          </div>
          <p class="card-text flex-grow-1">
            ${tool.description}
          </p>
          <a
            href="${tool.url}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-sm btn-outline-light mt-auto"
          >
            Abrir herramienta
          </a>
        </div>
      </div>
    </div>
  `;
}

// --- LOGICA DE FILTROS ---

function initializeFilters(data) {
    const catSelect = document.getElementById("categoryFilter");
    const sortSelect = document.getElementById("sortFilter");
    const searchInput = document.getElementById("searchInput");

    // Llenar select de categorías
    data.categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = cat.name;
        catSelect.appendChild(option);
    });

    const updateView = () => {
        renderApp(data, sortSelect.value, catSelect.value, searchInput.value);
    };

    catSelect.addEventListener("change", updateView);
    sortSelect.addEventListener("change", updateView);
    searchInput.addEventListener("input", updateView);
}

// --- LOGICA DE AÑADIR HERRAMIENTA ---

function initializeAddTool(data) {
    const generateBtn = document.getElementById("generateBtn");
    const copyBtn = document.getElementById("copyJsonBtn");
    const catSelect = document.getElementById("toolCategory");

    // Llenar select de categorías del modal
    data.categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = cat.name;
        catSelect.appendChild(option);
    });

    generateBtn.addEventListener("click", () => {
        const name = document.getElementById("toolName").value;
        const url = document.getElementById("toolUrl").value;
        const desc = document.getElementById("toolDesc").value;
        const catId = document.getElementById("toolCategory").value;
        const tags = document.getElementById("toolTags").value.split(",").map(t => t.trim()).filter(t => t);

        if (!name || !url || !desc) {
            alert("Por favor llena los campos obligatorios");
            return;
        }

        const newToolObj = {
            name: name,
            url: url,
            description: desc,
            tags: tags
        };

        const jsonString = JSON.stringify(newToolObj, null, 4);

        document.getElementById("jsonOutput").value = `// Pega esto dentro de la lista 'tools' de la categoría '${catId}':\n` + jsonString + ",";
        document.getElementById("jsonResult").classList.remove("d-none");
    });

    copyBtn.addEventListener("click", () => {
        const copyText = document.getElementById("jsonOutput");
        copyText.select();
        document.execCommand("copy"); // Fallback compatible
        // Moderno: navigator.clipboard.writeText(copyText.value);

        copyBtn.textContent = "¡Copiado!";
        setTimeout(() => copyBtn.textContent = "Copiar al portapapeles", 2000);
    });
}

function showError() {
    const container = document.getElementById("tools-container");
    container.innerHTML = `
    <div class="alert alert-danger">
        Error cargando el directorio de herramientas.
    </div>
  `;
}

