    // ------------------------------------------------------------------
    // ESTRUCTURAS DE DATOS GLOBALES Y CONSTANTES (AHORA ESTÁTICAS)
    // ------------------------------------------------------------------
    
    // Enlace de Donación General
    const GENERAL_DONATE_LINK = 'https://www.patreon.com/cw/Rexytmc'; 
    const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@rexytmc-s3d?si=7E_OWq8eIAhF_K9F'; 
    const ENABLE_YOUTUBE_VIDEO = true; 
    const SHADERS_PER_PAGE = 20;
    let currentPage = 1;
    let currentSearchTerm = '';
   
   // --- ANIMACIÓN BUSCADOR ---
const searchWords = [
  "Shaders...",
  "Worlds...",
  "Texturas...",
  "Addons...",
    "título...",
  "autor...",
  "características..."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;
let typingTimeout;
    
    // --- DATOS DE EJEMPLO 1: SHADERS ---
    const rawShaders = [
        {
            id: 1,
            title: "NEWBXSUPERVANILLA",
            author: "Rexytmc",
            description: "Shader Descontinuado. Esperar a que se actualize a la 1.2 para la nueva version de mc 1.21.1.1 ⚠️             Un shader estilo vanilla inspirado en SuperDuperVanilla la iluminación y el agua mantiene el look clásico de Minecraft.",
            features: ["Shader", "Vanilla", "Specular Reflection", "Items Glow", "Flowers Glow", "Lava Noise"],
            downloadLink: "https://link-center.net/1317037/gdBte5PRdr2L", 
            youtubeLink: "https://youtu.be/dQw4w9WgXcQ?si=kn7Kw-WW1jH0qHqh",     
            imagePath: "assets/supervanilla", 
            versions: ["r1.1", "1.21", "Android"],
            screenshotFiles: ["1.png", "2.png", "3.png", "4.png", "5.png"],          
        },
        {
            id: 3,
            title: "NEWBXREXYTMC",
            author: "Rexytmc",
            description: "Un Shader estilo vanilla inspirado en los complementary de java.",
            features: ["Shader", "Leaves Wave", "Mobs Bloom", "Particles Bloom", "Items glow", "Raysun", "Vanilla"],
            downloadLink: "https://link-target.net/1317037/tOqOIIbcUvhi", 
            youtubeLink: "https://www.youtube.com/watch?v=youtube_complementary",
            imagePath: "assets/complementary",
            versions: ["r1.1.1", "1.26.13", "Android"],
            screenshotFiles: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"],
        },
        {
                id: 4,
            title: "NEWBXITERATIONT",
            author: "Rexytmc",
            description: "Shader Inspirado en Iterationt de java",
            features: ["Shader", "Shadow", "Glow", "Cloud Unbound", "End Black Hole"],
            downloadLink: "https://direct-link.net/1317037/1Rvzadw613d7", 
            youtubeLink: "https://youtu.be/qMgznUpKK1w?si=H-r2DHCsyVZmD7ip",
            imagePath: "assets/iterationt",
            versions: ["r1.0", "1.26.13", "Android"],
            screenshotFiles: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"],
        },
        {
                    id: 2,
            title: "Minecraft Bedrock",
            author: "Mojang",
            description: "Esta versión fue lanzada el 8 de Abril de 2026. Se corrigieron varios errores que podían afectar la jugabilidad. Se solucionó un problema con los componentes de entidades personalizadas bloqueados detrás de identificadores de tiempo de ejecución. Los gestos seleccionados ya no vuelven a los valores predeterminados al reiniciar el título.",
            features: [],
            downloadLink: "https://link-hub.net/1317037/vZTI1u0CT6hS", 
            youtubeLink: "https://www.youtube.com/watch?v=youtube_complementary",
            imagePath: "assets/minecraft",
            versions: ["1.26.13", "32bits 64bits", "878.96 MB"],
            screenshotFiles: [],
        }
    ]; 
    
    // --- FUNCIÓN PARA PROCESAR LOS SHADERS ---
    const publishedShaders = rawShaders.map(shader => {
        if (shader.imagePath) {
            // Construir las rutas si tiene imagePath
            shader.coverImage = `${shader.imagePath}/portada.png`;
            shader.iconImage = `${shader.imagePath}/icono.png`;
            shader.screenshots = shader.screenshotFiles.map(file => `${shader.imagePath}/${file}`);
        }
        return shader;
    });
    // --- DATOS DE EJEMPLO 2: SCREENSHOTS ---
function generateScreenshotsAuto(max = 100) {
  const images = [];

  for (let i = max; i >= 1; i--) {
    const img = new Image();
    img.src = `assets/screenshots/${i}.png`;

    img.onload = () => {
      images.push({
        src: img.src,
        desc: `Screenshot ${i}`
      });

      // recargar galería cuando encuentra imágenes reales
      loadScreenshots(images);
    };
  }

  return images;
}

const screenshotImages = generateScreenshotsAuto();
    
    // Estadísticas iniciales
    // Estadísticas iniciales
let profileStats = {
    followers: 150,
    projects: publishedShaders.length, 
    downloads: 112414, // valor fijo
    isFollowing: false 
};
    
    // HTML de la sección de Información
    const infoHTML = `
      <div class="info-accordion">
        <details><summary>HOW TO INSTALL SHADER</summary><p>Guía paso a paso para instalar shaders en Minecraft.</p></details>
        <details><summary>ADD-ONS | TEXTURE SHADER</summary><p>Texturas y mejoras visuales para tu shader.</p></details>
        <details><summary>CREATE YOUR SHADER</summary><p>Tutorial para crear tu propio shader desde cero.</p></details>
        <details><summary>SPECIAL CREDITS</summary><p>Muchas gracias a @Stellar por crear el servidor de discord y algunos codigos compartidos:]
 Tambien a @Jesusmiguelgamer por sus texturas noise personalizadas la motivacion y inspiracion :D.</p></details>

        <div class="social-section">
          <h3>SEGUIR A REXYTMC</h3>
          <div class="social-icons">
            <div class="social-row">
              <img src="assets/youtube.png" data-color="youtube" onclick="openLink('${YOUTUBE_CHANNEL_URL}')">
              <img src="assets/instagram.png" data-color="instagram" onclick="openLink('https://www.instagram.com/name')">
              <img src="assets/facebook.png" data-color="facebook" onclick="openLink('https://www.facebook.com/name')">
              <img src="assets/twitter.png" data-color="twitter" onclick="openLink('https://twitter.com/name')">
              <img src="assets/tiktok.png" data-color="tiktok" onclick="openLink('https://www.tiktok.com/@rexytmc')">
            </div>
            <div class="social-row">
              <img src="assets/mcpdl.png" data-color="mcpdl" onclick="openLink('https://mcpedl.com/user/ReXytMc')">
              <img src="assets/discord.png" data-color="discord" onclick="openLink('https://discord.gg/SwAehyBj6')">
              <img src="assets/curseforge.png" data-color="curseforge" onclick="openLink('https://www.curseforge.com/members/REXYTMC')">
            </div>
          </div>
        </div>
      </div>
    `;

    // Referencias DOM
    const content = document.getElementById('content');
    const shaderDetailModal = document.getElementById('shaderDetailModal'); 
    const profileStatsElement = document.getElementById('profileStats');
    const followBtn = document.getElementById('followBtn');
    
    // ------------------------------------------------------------------
    // LÓGICA DE PERSISTENCIA Y ESTADÍSTICAS
    // ------------------------------------------------------------------

    function loadStatsAndShaders() {      
        updateProfileDisplay();
        switchTab('shader');
    }
    
    function updateProfileDisplay() {
        const formatNumber = (num) => {
            if (num >= 1000) {
                return (num / 1000).toFixed(0).replace(/\.0$/, '') + 'k'; 
            }
            return num;
        };
        
        profileStatsElement.textContent = 
            `${profileStats.followers.toLocaleString()} Followers · ${profileStats.projects} Projects · ${formatNumber(profileStats.downloads)} Downloads`;
            
        followBtn.textContent = 'YouTube';
followBtn.onclick = () => openLink(YOUTUBE_CHANNEL_URL);
}
    // ------------------------------------------------------------------
    // LÓGICA DE SHADERS Y DETALLE
    // ------------------------------------------------------------------

    function getYouTubeEmbedUrl(url) {
        if (!url || !ENABLE_YOUTUBE_VIDEO) return null; 
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}`;
        }
        return null;
    }
    
    let currentDetailShader = null; 

    function openShaderDetailModal(shaderId) {
        const shaderIdNum = parseInt(shaderId);
        currentDetailShader = publishedShaders.find(s => s.id === shaderIdNum);
        if (!currentDetailShader) return;
        
        const shader = currentDetailShader;
        const detailContainer = document.getElementById('shaderDetailModal').querySelector('.detail-container');
        const mainScreen = detailContainer.querySelector('.main-screen');
        const screenshotsContainer = document.getElementById('screenshotsDetailContainer');
        
        // 1. Título y Autor (Añadiendo el icono del shader)
        document.getElementById('detailTitle').textContent = shader.title;
        document.getElementById('detailAuthorName').textContent = `by ${shader.author || 'Desconocido'}`;
        
        // ¡ACTUALIZACIÓN! Usar el icono del SHADER en la línea "by"
        document.getElementById('detailAuthorIcon').src = shader.iconImage || 'assets/avatar.png';
        
        // 2. Botones de Acción (Descarga y Exclusivo)
        document.getElementById('detailDownloadBtn').href = shader.downloadLink || '#';
        document.getElementById('detailDownloadBtn').onclick = () => trackDownload(shader.id, shader.downloadLink);
        
        // 3. Contenido Principal (Portada)
        mainScreen.innerHTML = '';
        const youtubeEmbedUrl = getYouTubeEmbedUrl(shader.youtubeLink);
        let mainContentIsVideo = false;

        if (youtubeEmbedUrl) {
            mainScreen.innerHTML = `<iframe src="${youtubeEmbedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            mainContentIsVideo = true;
        } else {
            mainScreen.innerHTML = `<img id="mainScreenDetail" src="${shader.coverImage || 'https://via.placeholder.com/800x450.png?text=No+Cover'}" alt="Pantalla principal">`;
        }
        
        // 4. Screenshots y Miniaturas
        screenshotsContainer.innerHTML = '';
        
        const allScreenshots = [
            {src: shader.coverImage || 'https://via.placeholder.com/160x100.png?text=Portada', isCover: true}, 
            ...(shader.screenshots || []).map(src => ({src, isCover: false}))
        ];

        if (allScreenshots.length > 0) {
            allScreenshots.forEach((item, index) => {
                const img = document.createElement('img');
                img.src = item.src;
                img.alt = `Miniatura ${index + 1}`;
                img.dataset.full = item.src;
                img.onclick = () => switchMainScreen(img.src);
                screenshotsContainer.appendChild(img);
            });
            
            if (!mainContentIsVideo) {
                const firstThumbnail = screenshotsContainer.querySelector('img');
                if (firstThumbnail) {
                    firstThumbnail.classList.add('active'); 
                    switchMainScreen(firstThumbnail.src); 
                }
            }
        }
        
        // 5. Descripción y Características
        document.getElementById('detailDescription').textContent = shader.description;
        
        const featuresList = document.getElementById('detailFeaturesList');
        const featuresContainer = document.getElementById('detailFeaturesContainer');
        featuresList.innerHTML = '';
        
        if (shader.features && shader.features.length > 0) {
            shader.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            featuresContainer.style.display = 'block';
        } else {
            featuresContainer.style.display = 'none';
        }

        // 6. Configuración de Toggle de Detalles
        const toggle = document.getElementById('toggleDetailsDetail');
        if (featuresContainer.style.display === 'block') {
            toggle.style.display = 'block';
            toggle.textContent = 'Mostrar más ▼';
            featuresContainer.style.display = 'none'; 
            toggle.onclick = toggleDetailDetails;
        } else {
            toggle.style.display = 'none';
        }
        
        shaderDetailModal.style.display = 'flex';
    }

    // Manejar el cambio de imagen principal en el modal de detalle
    function switchMainScreen(src) {
        const mainScreenImg = document.getElementById('mainScreenDetail');
        if (mainScreenImg) mainScreenImg.src = src;

        document.querySelectorAll('.screenshots-detail img').forEach(s => s.classList.remove('active'));
        const activeThumb = document.querySelector(`.screenshots-detail img[data-full="${src}"]`);
        if (activeThumb) activeThumb.classList.add('active');
    }

    function toggleDetailDetails() {
        const extra = document.getElementById('detailFeaturesContainer');
        const toggle = document.getElementById('toggleDetailsDetail');
        
        if (extra.style.display === 'block') {
            extra.style.display = 'none';
            toggle.textContent = 'Mostrar menos ▲';
        } else {
            extra.style.display = 'block';
            toggle.textContent = 'Mostrar más ▼';
        }
    }


    function closeShaderDetailModal() {
        shaderDetailModal.style.display = 'none';
        currentDetailShader = null; 
    }


    // TRACKING DE DESCARGA
    function trackDownload(shaderId, downloadLink) {
    const shader = publishedShaders.find(s => s.id === shaderId);
    if (!shader || !downloadLink) return;
    
    shader.downloads++; 
    updateProfileDisplay(); 
    window.open(downloadLink, '_blank');
    
    event.preventDefault(); 
    event.stopPropagation();
}
    
    // FUNCIONES DE FILTRADO Y PAGINACIÓN 

    function filterShaders(searchTerm) {
        if (!searchTerm) return publishedShaders;
        
        const lowerCaseTerm = searchTerm.toLowerCase();
        return publishedShaders.filter(shader => 
            shader.title.toLowerCase().includes(lowerCaseTerm) ||
            shader.author.toLowerCase().includes(lowerCaseTerm) ||
            shader.description.toLowerCase().includes(lowerCaseTerm) ||
            shader.features.some(f => f.toLowerCase().includes(lowerCaseTerm))
        );
    }
    
    function setPage(page) {
        const filteredList = filterShaders(currentSearchTerm);
        const totalPages = Math.ceil(filteredList.length / SHADERS_PER_PAGE);
        
        if (page < 1) currentPage = 1;
        else if (page > totalPages && totalPages > 0) currentPage = totalPages;
        else currentPage = page;
        
        renderShadersList();
    }
    
    function handleSearch() {
        const newSearchTerm = document.getElementById('shaderSearchInput').value.trim();
        if (newSearchTerm !== currentSearchTerm) {
            currentSearchTerm = newSearchTerm;
            currentPage = 1; 
            renderShadersList();
        }
    }

function animatePlaceholder() {
  const input = document.getElementById("shaderSearchInput");
  if (!input) return;

  if (input.value.length > 0) {
    input.placeholder = "Buscar...";
    return;
  }

  const word = searchWords[wordIndex];

  if (deleting) charIndex--;
  else charIndex++;

  input.placeholder = "Buscar por " + word.substring(0, charIndex);

  let speed = deleting ? 40 : 80;

  if (!deleting && charIndex === word.length) {
    speed = 1200;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % searchWords.length;
    speed = 600;
  }

  typingTimeout = setTimeout(animatePlaceholder, speed);
}

    // RENDERIZADO PRINCIPAL DE SHADERS 
    function renderShadersList() {
      content.className = 'shader-list-container';
      content.innerHTML = ''; 

      const filteredShaders = filterShaders(currentSearchTerm)
  .sort((a, b) => b.id - a.id); //ID mayor primero
      const totalPages = Math.ceil(filteredShaders.length / SHADERS_PER_PAGE);
      
      if (currentPage > totalPages && totalPages > 0) {
          currentPage = totalPages;
      } else if (totalPages === 0) {
          currentPage = 1;
      }

      const startIndex = (currentPage - 1) * SHADERS_PER_PAGE;
      const endIndex = startIndex + SHADERS_PER_PAGE;
      const paginatedShaders = filteredShaders.slice(startIndex, endIndex);

      // 1. Renderizar Barra de Búsqueda
      const searchContainer = document.createElement('div');
searchContainer.className = 'search-bar';
searchContainer.innerHTML = `
  <input type="text" id="shaderSearchInput" value="${currentSearchTerm}">
  <button onclick="handleSearch()">Buscar</button>
`;
      content.appendChild(searchContainer);
      
      clearTimeout(typingTimeout);
charIndex = 0;
deleting = false;
animatePlaceholder();
      
      document.getElementById('shaderSearchInput').addEventListener('keyup', (e) => {
          if (e.key === 'Enter') handleSearch();
      });

      // 2. Renderizar Lista de Shaders
      const listDiv = document.createElement('div');
      listDiv.className = 'shader-list';
      content.appendChild(listDiv);

      if (paginatedShaders.length === 0) {
        listDiv.innerHTML = `<p style="text-align:center; color:#555; padding:20px;">${currentSearchTerm ? 'No se encontraron resultados para la búsqueda.' : 'Aún no hay shaders publicados.'}</p>`;
      } else {
        paginatedShaders.forEach(shader => {
            const featureIcons = {
                "Vanilla": "⚡",
                "Cielo 3D": "☁️",
                "Agua Sutil": "💧",
                "Efecto 'Lens Flare'": "☀️",
                "Vanilla-like": "🍦",
                "Iluminación": "💡",
                "PVP": "⚔️",
                "Sombreado": "⚫",
                "Shader": "🌅",
                "World": "🏞",
                "Texturas": "🎨",
                "Addons": "🗂"
            };
            
            const featuresHtml = shader.features.map(feat => 
                `<div class="shader-feature">${featureIcons[feat] || '🔹'} ${feat}</div>`
            ).join('');

            // Información de Versión Transparente
            const versionInfoHtml = (shader.versions || []).map(v => `<span>${v}</span>`).join(' • ');
            
            const card = document.createElement('div');
            card.className = 'shader-card';
            
            card.onclick = () => openShaderDetailModal(shader.id);

            card.innerHTML = `
            <div class="shader-card-header" style="background-image: url('${shader.coverImage}');"></div>
            
            <div class="shader-content">
                <div class="shader-icon">
                <img src="${shader.iconImage || 'assets/placeholder_icon.png'}" alt="Icono del Shader">
                </div>
                <div class="shader-text">
                <p class="shader-title">${shader.title}</p>
                <p class="shader-author">By ${shader.author || 'Desconocido'}</p>
                </div>
            </div>
            
            <div class="shader-description-container">
                <p class="shader-description">${shader.description}</p>
                <div class="shader-features">
                    ${featuresHtml}
                </div>
            </div>

            <div class="shader-version-info">
                ${versionInfoHtml}
            </div>
            
            <div class="shader-actions-float" style="right: 15px; bottom: 15px;">
                <button class="action-btn btn-download" onclick="event.stopPropagation(); trackDownload(${shader.id}, '${shader.downloadLink}')">Descargar</button>
            </div>
            `;
            listDiv.appendChild(card);
        });
      }

      // 3. Renderizar Controles de Paginación 
      if (totalPages > 1) {
          const paginationDiv = document.createElement('div');
          paginationDiv.className = 'pagination-controls';
          paginationDiv.innerHTML = `
            <button onclick="setPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Anterior</button>
            <span class="page-info">Página ${currentPage} de ${totalPages}</span>
            <button onclick="setPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Siguiente</button>
          `;
          content.appendChild(paginationDiv);
      }
    }


// ------------------------------------------------------------------
// LÓGICA DE SCREENSHOTS Y NAVEGACIÓN
// ------------------------------------------------------------------

function loadScreenshots(images) {
  content.innerHTML = '';
  content.className = 'gallery-grid'; 

  if (images.length === 0) {
    content.innerHTML = '<p style="text-align:center; color:#555; padding:20px;">Aún no hay screenshots subidos.</p>';
    return;
  }

  images.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    
    // Solo imagen, sin <p> ni descripción visible
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.desc;

    // Evento para abrir modal
    img.onclick = () => openScreenshotModal(item.src, item.desc);

    div.appendChild(img);
    content.appendChild(div);
  });
}

function openScreenshotModal(src, desc) {
  const modal = document.getElementById('screenshotModal');
  const modalImg = document.getElementById('screenshotModalImg');
  const modalDesc = document.getElementById('screenshotModalDesc');

  modal.style.display = 'flex';
  modalImg.src = src;
  modalDesc.textContent = desc || '';
}

// Cerrar modal al hacer click en overlay o en "×"
function closeScreenshotModal() {
  document.getElementById('screenshotModal').style.display = 'none';
}

// ABRIR LINK
function openLink(url) { 
  window.open(url, '_blank'); 
}


// CAMBIO DE TABS
function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
  
  if (tab === 'shader') {
    document.getElementById('tab-shader').classList.add('active');
    currentPage = 1;
    currentSearchTerm = '';
    renderShadersList(); 

  } else if (tab === 'screenshot') {
    document.getElementById('tab-screenshot').classList.add('active');

    // 🔥 carga correcta
    loadScreenshots(screenshotImages);

  } else {
    document.getElementById('tab-info').classList.add('active');
    content.className = '';
    content.innerHTML = infoHTML;
  }
}

const banners = [
  'assets/portada.png',
  'assets/portada1.png',
  'assets/portada2.png',
  'assets/portada3.png'
];

const container = document.querySelector('.banner');

let index = 0;

// Imagen inicial
let current = document.createElement('div');
current.className = 'banner-img current';
current.style.backgroundImage = `url(${banners[index]})`;
container.appendChild(current);

function changeImage() {
  index = (index + 1) % banners.length;

  let next = document.createElement('div');
  next.className = 'banner-img next';
  next.style.backgroundImage = `url(${banners[index]})`;
  container.appendChild(next);

  setTimeout(() => {
    container.removeChild(current);
    next.classList.remove('next');
    next.classList.add('current');
    current = next;
  }, 2000);
}

setInterval(changeImage, 2000); /* 🔥 tiempo correcto */