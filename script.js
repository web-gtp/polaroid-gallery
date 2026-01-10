// ============================================
// GALERÍA CON PANEL DE ADMINISTRACIÓN COMPLETO
// ============================================

// Contraseña admin (puedes cambiarla)
const ADMIN_PASSWORD = 'admin123';

// Base de datos de fotos original (Unsplash)
const originalGalleryData = {
    "United States": [
        { url: "https://images.unsplash.com/photo-1540155945626-66eacf57fcb9?w=800", title: "Hollywood Sign, Los Angeles" },
        { url: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800", title: "Golden Gate Bridge" },
        { url: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800", title: "New York City" },
        { url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800", title: "Miami Beach" },
        { url:   "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", title:  "Grand Canyon" }
    ],
    "Spain":  [
        { url: "https://images.unsplash.com/photo-1495653089282-38a5286a8583?w=800", title: "Alhambra, Granada" },
        { url: "https://images.unsplash.com/photo-1558642891-54be180ea339?w=800", title: "Barcelona Skyline" },
        { url:   "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800", title: "Madrid Royal Palace" },
        { url:   "https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=800", title: "Seville Cathedral" },
        { url:  "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800", title: "Valencia City" }
    ],
    "Italy": [
        { url: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=800", title: "Vernazza, Cinque Terre" },
        { url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800", title: "Colosseum, Rome" },
        { url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800", title: "Venice Canals" },
        { url: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800", title: "Florence Duomo" },
        { url: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800", title:   "Amalfi Coast" }
    ],
    "Portugal": [
        { url: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=800", title: "Benagil Cave, Algarve" },
        { url: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800", title: "Lisbon Trams" },
        { url: "https://images.unsplash.com/photo-1513735492246-483525079686?w=800", title: "Porto Riverside" },
        { url: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800", title: "Sintra Palace" },
        { url: "https://images.unsplash.com/photo-1588963014962-e6f45c7c7fc7?w=800", title: "Lagos Beach" }
    ],
    "France": [
        { url:   "https://images.unsplash.com/photo-1572907564143-ee1ef5882732?w=800", title: "Lavender Fields, Provence" },
        { url: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800", title: "Eiffel Tower, Paris" },
        { url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", title: "Arc de Triomphe" },
        { url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800", title:   "Paris Streets" },
        { url: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800", title: "Mont Saint-Michel" }
    ],
    "Switzerland": [
        { url: "https://images.unsplash.com/photo-1528493366314-e317cd98dd52?w=800", title: "Matterhorn, Zermatt" },
        { url:   "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800", title: "Swiss Alps" },
        { url:   "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", title: "Lake Lucerne" },
        { url:  "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800", title: "Interlaken" },
        { url: "https://images.unsplash.com/photo-1548678967-f1aec58f6fb2?w=800", title:  "Zurich City" }
    ],
    "Chile": [
        { url: "https://images.unsplash.com/photo-1603382585507-45205571d760?w=800", title: "Torres del Paine" },
        { url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800", title: "Atacama Desert" },
        { url: "https://images.unsplash.com/photo-1591802020165-c0a1eba35c52?w=800", title: "Santiago Skyline" },
        { url:   "https://images.unsplash.com/photo-1570737231183-4c162a1cb0f4?w=800", title: "Valparaíso Streets" },
        { url: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800", title: "Chilean Fjords" }
    ]
};

function getGalleryData() {
    const saved = localStorage.getItem('galleryData');
    return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(originalGalleryData));
}

function saveGalleryData(data) {
    localStorage.setItem('galleryData', JSON.stringify(data));
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', error:  '❌', warning: '⚠️', info: 'ℹ️' };
    toast.innerHTML = `<span style="font-size: 1.3em; margin-right: 10px;">${icons[type]}</span> ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideInUp 0.4s ease reverse';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function setButtonLoading(button, loading) {
    if (loading) {
        button.classList.add('btn-loading');
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.textContent = 'Procesando...';
    } else {
        button.classList.remove('btn-loading');
        button.disabled = false;
        button. textContent = button.dataset.originalText || 'Subir Foto';
    }
}

function updateCountryPhotoCounts() {
    const uploadSelect = document.getElementById('uploadCountry');
    const manageSelect = document.getElementById('manageCountry');
    
    [uploadSelect, manageSelect].forEach(select => {
        if (select) {
            Array.from(select.options).forEach(option => {
                if (option.value && galleryData[option.value]) {
                    const count = galleryData[option. value].length;
                    const baseText = option.value;
                    option.textContent = `${baseText} (${count} ${count === 1 ? 'foto' : 'fotos'})`;
                }
            });
        }
    });
}

let galleryData = {};

// Cargar galería desde Firebase al iniciar
(async function initGallery() {
    try {
        galleryData = await getGalleryDataFromFirebase();
        console.log('✅ Galería lista con', Object.keys(galleryData).length, 'países');
    } catch (error) {
        console.error('Error al inicializar:', error);
        galleryData = JSON.parse(JSON.stringify(originalGalleryData));
    }
})();
let currentCountry = '';
let currentPhotoIndex = 0;

const countryModal = document.getElementById('countryModal');
const closeCountryModalBtn = document.querySelector('.close-country-modal');
const modalMainPhoto = document.getElementById('modalMainPhoto');
const modalCountryName = document.getElementById('modalCountryName');
const photoCounter = document.getElementById('photoCounter');
const thumbnailsContainer = document.getElementById('thumbnailsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document. getElementById('nextBtn');
const openAdminBtn = document.getElementById('openAdminBtn');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const loginForm = document.getElementById('loginForm');
const adminModal = document.getElementById('adminModal');
const closeAdminModal = document.getElementById('closeAdminModal');

new WOW().init();

document.querySelectorAll('a[data-country]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const country = this.getAttribute('data-country');
        openCountryGallery(country);
    });
});

async function openCountryGallery(country) {
    currentCountry = country;
    currentPhotoIndex = 0;
    modalCountryName.textContent = country;
    countryModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Recargar desde Firebase
    galleryData = await getGalleryDataFromFirebase();
    
    loadGalleryPhotos();
}

function loadGalleryPhotos() {
    const photos = galleryData[currentCountry];
    updateMainPhoto();
    thumbnailsContainer.innerHTML = '';
    photos.forEach((photo, index) => {
        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = photo.title;
        img.className = 'thumbnail';
        if (index === currentPhotoIndex) img.classList.add('active');
        img.addEventListener('click', () => {
            currentPhotoIndex = index;
            updateMainPhoto();
        });
        thumbnailsContainer.appendChild(img);
    });
}

function updateMainPhoto() {
    const photos = galleryData[currentCountry];
    const photo = photos[currentPhotoIndex];
    modalMainPhoto.src = photo.url;
    modalMainPhoto.alt = photo.title;
    photoCounter.textContent = `${currentPhotoIndex + 1} / ${photos.length} - ${photo.title}`;
    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentPhotoIndex);
    });
}

prevBtn.addEventListener('click', () => {
    const photos = galleryData[currentCountry];
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    updateMainPhoto();
});

nextBtn.addEventListener('click', () => {
    const photos = galleryData[currentCountry];
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updateMainPhoto();
});

document.addEventListener('keydown', (e) => {
    if (countryModal.style.display === 'block') {
        if (e.key === 'ArrowLeft') prevBtn.click();
        else if (e.key === 'ArrowRight') nextBtn.click();
        else if (e.key === 'Escape') closeCountryModalBtn.click();
    }
});

closeCountryModalBtn.addEventListener('click', () => {
    countryModal. style.display = 'none';
    document.body.style. overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === countryModal) closeCountryModalBtn.click();
    if (e.target === loginModal) closeLoginModal.click();
    if (e.target === adminModal) closeAdminModal.click();
});

openAdminBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeLoginModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
    loginForm.reset();
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        loginModal.style.display = 'none';
        adminModal.style.display = 'block';
        loginForm.reset();
        showToast('Bienvenido al Panel de Administración', 'success');
        updateCountryPhotoCounts();
    } else {
        showToast('Contraseña incorrecta', 'error');
        document.getElementById('adminPassword').value = '';
    }
});

closeAdminModal.addEventListener('click', () => {
    adminModal. style.display = 'none';
});

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const tabId = btn. dataset.tab + 'Tab';
        const tabElement = document.getElementById(tabId);
        if (tabElement) tabElement.classList.add('active');
    });
});

const uploadPhotoFile = document.getElementById('uploadPhotoFile');
if (uploadPhotoFile) {
    uploadPhotoFile.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const previewContainer = document.getElementById('uploadPreview');
        
        if (! file) {
            previewContainer.innerHTML = '';
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            showToast('Imagen muy grande.   Máximo 5MB', 'error');
            this.value = '';
            previewContainer.innerHTML = '';
            return;
        }
        
        if (! file.type.startsWith('image/')) {
            showToast('Por favor selecciona una imagen válida', 'error');
            this.value = '';
            previewContainer.innerHTML = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            previewContainer.innerHTML = `
                <div class="upload-preview-container">
                    <button type="button" class="remove-preview" onclick="clearPreview()">×</button>
                    <img src="${event.target.result}" alt="Preview">
                    <div class="preview-info">
                        <p><strong>📁 Archivo:</strong> ${file.name}</p>
                        <p><strong>📏 Tamaño:</strong> ${sizeInMB} MB</p>
                        <p><strong>📐 Tipo:</strong> ${file.type}</p>
                        <p style="color: #4CAF50; font-weight:  600; margin-top: 10px;">✓ Imagen lista para subir</p>
                    </div>
                </div>
            `;
        };
        reader.readAsDataURL(file);
    });
}

window.clearPreview = function() {
    const uploadPhotoFile = document.getElementById('uploadPhotoFile');
    const uploadPreview = document.getElementById('uploadPreview');
    if (uploadPhotoFile) uploadPhotoFile.value = '';
    if (uploadPreview) uploadPreview.innerHTML = '';
    showToast('Vista previa eliminada', 'info');
};

const uploadPhotoForm = document.getElementById('uploadPhotoForm');
if (uploadPhotoForm) {
    uploadPhotoForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const country = document.getElementById('uploadCountry').value;
        const file = document.getElementById('uploadPhotoFile').files[0];
        const title = document.getElementById('uploadPhotoTitle').value.trim();
        
        if (! country) {
            showToast('Por favor selecciona un país', 'warning');
            return;
        }
        
        if (!file) {
            showToast('Por favor selecciona una imagen', 'warning');
            return;
        }
        
        if (! title) {
            showToast('Por favor añade un título a la foto', 'warning');
            return;
        }
        
        setButtonLoading(submitBtn, true);
        showToast('Comprimiendo imagen... ', 'info');
        
        try {
            // Comprimir imagen
            const compressedImage = await compressImage(file);
            
            // Verificar tamaño final
            const sizeKB = compressedImage.length / 1024;
            if (sizeKB > 900) {
                showToast('⚠️ Imagen muy grande.  Usa una foto más pequeña.', 'warning');
                setButtonLoading(submitBtn, false);
                return;
            }
            
            const newPhoto = { url: compressedImage, title:  title };
            galleryData[country].push(newPhoto);
            
            // Guardar en Firebase
            const saved = await saveGalleryDataToFirebase(galleryData);
            
            if (saved) {
                const previewContainer = document.getElementById('uploadPreview');
                previewContainer.innerHTML = `
                    <div class="upload-success-summary">
                        <div class="success-checkmark"></div>
                        <h3>¡Foto Subida Exitosamente!</h3>
                        <img src="${compressedImage}" alt="${title}">
                        <p><strong>País:</strong> ${country}</p>
                        <p><strong>Título:</strong> ${title}</p>
                        <p><strong>Tamaño:</strong> ${sizeKB.toFixed(0)} KB</p>
                        <p style="margin-top: 15px; font-size: 0.9rem;">
                            Total de fotos en ${country}: <strong>${galleryData[country].length}</strong>
                        </p>
                    </div>
                `;
                
                document.getElementById('uploadPhotoForm').reset();
                showToast(`Foto "${title}" añadida a ${country}`, 'success');
                updateCountryPhotoCounts();
                
                // Actualizar si está viendo ese país
                if (currentCountry === country && countryModal.style.display === 'block') {
                    galleryData = await getGalleryDataFromFirebase();
                    loadGalleryPhotos();
                }
                
                setTimeout(() => { previewContainer.innerHTML = ''; }, 5000);
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Error al subir la foto', 'error');
        } finally {
            setButtonLoading(submitBtn, false);
        }
    });
}

const manageCountry = document.getElementById('manageCountry');
if (manageCountry) {
    manageCountry.addEventListener('change', function() {
        const country = this. value;
        const container = document.getElementById('managePhotosContainer');
        
        if (! country) {
            container.innerHTML = '<div class="empty-state-manage"><p style="font-size: 3rem;">🌍</p><p>Selecciona un país para gestionar sus fotos</p></div>';
            return;
        }
        
        const photos = galleryData[country];
        
        if (photos.length === 0) {
            container.innerHTML = `<div class="empty-state-manage"><p style="font-size: 3rem;">📷</p><p>No hay fotos en ${country}</p><p style="font-size: 0.9rem; margin-top: 10px;">Ve a la pestaña "Subir Fotos" para añadir imágenes</p></div>`;
            return;
        }
        
        container.innerHTML = '';
        photos.forEach((photo, index) => {
            const card = document.createElement('div');
            card.className = 'manage-photo-card';
            card.innerHTML = `
                <img src="${photo.url}" alt="${photo.title}" loading="lazy">
                <h4>${photo.title}</h4>
                <div class="manage-photo-actions">
                    <button class="btn-small btn-download" onclick="downloadPhoto('${country}', ${index})">📥 Descargar</button>
                    <button class="btn-small btn-delete" onclick="deletePhoto('${country}', ${index})">🗑️ Eliminar</button>
                </div>
            `;
            container.appendChild(card);
        });
    });
}

window.downloadPhoto = function(country, index) {
    const photo = galleryData[country][index];
    if (photo. url. includes('unsplash.com')) {
        window.open(photo.url, '_blank');
        showToast('Abriendo foto en nueva pestaña', 'info');
    } else {
        const link = document. createElement('a');
        link.href = photo.url;
        link.download = `${country. replace(/\s+/g, '-')}-${photo.title. replace(/\s+/g, '-')}.jpg`;
        link.click();
        showToast(`Descargando:  ${photo.title}`, 'success');
    }
};

window.deletePhoto = async function(country, index) {
    const photo = galleryData[country][index];
    if (confirm(`¿Eliminar "${photo.title}" de ${country}?`)) {
        galleryData[country].splice(index, 1);
        
        const saved = await saveGalleryDataToFirebase(galleryData);
        
        if (saved) {
            document.getElementById('manageCountry').dispatchEvent(new Event('change'));
            updateCountryPhotoCounts();
            showToast(`Foto eliminada de ${country}`, 'success');
            
            if (currentCountry === country && countryModal.style.display === 'block') {
                galleryData = await getGalleryDataFromFirebase();
                if (galleryData[country].length > 0) {
                    currentPhotoIndex = Math.min(currentPhotoIndex, galleryData[country].length - 1);
                    loadGalleryPhotos();
                } else {
                    countryModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }
        }
    }
};

const exportBtn = document.getElementById('exportBtn');
if (exportBtn) {
    exportBtn.addEventListener('click', () => {
        setButtonLoading(exportBtn, true);
        setTimeout(() => {
            const dataStr = JSON.stringify(galleryData, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const filename = `galeria-viajes-${new Date().toISOString().split('T')[0]}.json`;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);
            setButtonLoading(exportBtn, false);
            showToast(`Galería exportada:  ${filename}`, 'success');
        }, 500);
    });
}

const importBtn = document.getElementById('importBtn');
if (importBtn) {
    importBtn.addEventListener('click', () => {
        const file = document.getElementById('importFile').files[0];
        if (!file) {
            showToast('Selecciona un archivo JSON primero', 'warning');
            return;
        }
        
        setButtonLoading(importBtn, true);
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const imported = JSON.parse(e.target.result);
                const requiredCountries = ["United States", "Spain", "Italy", "Portugal", "France", "Switzerland", "Chile"];
                const isValid = requiredCountries.every(country => imported[country] && Array.isArray(imported[country]));
                
                if (!isValid) throw new Error('Estructura de archivo inválida');
                
                galleryData = imported;
                saveGalleryData(galleryData);
                setButtonLoading(importBtn, false);
                showToast('¡Galería importada!  Recargando...', 'success');
                setTimeout(() => location.reload(), 1500);
            } catch (error) {
                setButtonLoading(importBtn, false);
                showToast('Error:  Archivo JSON inválido', 'error');
            }
        };
        reader.readAsText(file);
    });
}

const resetBtn = document.getElementById('resetBtn');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        if (confirm('⚠️ ¿Restaurar galería original?  Se perderán todas tus fotos personalizadas.')) {
            setButtonLoading(resetBtn, true);
            setTimeout(() => {
                localStorage.removeItem('galleryData');
                galleryData = JSON.parse(JSON.stringify(originalGalleryData));
                showToast('Galería restaurada.  Recargando...', 'success');
                setTimeout(() => location.reload(), 1500);
            }, 500);
        }
    });
}

// ============================================
// FUNCIONALIDAD DE TABS
// ============================================

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Remover active de todos
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Activar el seleccionado
        this.classList.add('active');
        document.getElementById(tabName + 'Tab').classList.add('active');
        
        // Si es la pestaña de gestionar, cargar fotos
        if (tabName === 'manage') {
            loadManagePhotos();
        }
    });
});

// ============================================
// GESTIONAR FOTOS (ELIMINAR)
// ============================================

async function loadManagePhotos() {
    const country = document.getElementById('manageCountry').value;
    const container = document.getElementById('managePhotosContainer');
    
    if (!country) {
        container.innerHTML = '<p style="color: #999; text-align: center; padding: 40px;">📍 Selecciona un país para ver sus fotos</p>';
        return;
    }
    
    // Recargar datos desde Firebase
    galleryData = await getGalleryDataFromFirebase();
    const photos = galleryData[country] || [];
    
    if (photos.length === 0) {
        container.innerHTML = `<p style="color: #999; text-align: center; padding: 40px;">📭 No hay fotos en ${country}</p>`;
        return;
    }
    
    container.innerHTML = photos.map((photo, index) => `
        <div class="photo-card">
            <img src="${photo. url}" alt="${photo.title}">
            <div class="photo-card-title">${photo.title}</div>
            <div class="photo-card-actions">
                <button class="btn-delete" onclick="deletePhotoFromManage('${country}', ${index})">
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

// Eliminar foto desde el panel de gestión
window.deletePhotoFromManage = async function(country, index) {
    const photo = galleryData[country][index];
    
    if (confirm(`¿Eliminar "${photo.title}" de ${country}?\n\nEsta acción no se puede deshacer.`)) {
        galleryData[country].splice(index, 1);
        
        const saved = await saveGalleryDataToFirebase(galleryData);
        
        if (saved) {
            showToast(`Foto "${photo.title}" eliminada de ${country}`, 'success');
            loadManagePhotos(); // Recargar la lista
            updateCountryPhotoCounts(); // Actualizar contadores
            
            // Si está viendo ese país en el modal, actualizar
            if (currentCountry === country && countryModal. style.display === 'block') {
                galleryData = await getGalleryDataFromFirebase();
                if (galleryData[country].length > 0) {
                    currentPhotoIndex = Math.min(currentPhotoIndex, galleryData[country].length - 1);
                    loadGalleryPhotos();
                } else {
                    countryModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }
        }
    }
};

// Event listener para cambio de país en gestionar
document.getElementById('manageCountry').addEventListener('change', loadManagePhotos);

// ============================================
// EXPORTAR / IMPORTAR / RESTAURAR
// ============================================

// Exportar galería
document.getElementById('exportBtn').addEventListener('click', async function() {
    try {
        galleryData = await getGalleryDataFromFirebase();
        
        const dataStr = JSON.stringify(galleryData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `polaroid-gallery-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL. revokeObjectURL(url);
        showToast('✅ Galería exportada exitosamente', 'success');
    } catch (error) {
        console.error('Error al exportar:', error);
        showToast('❌ Error al exportar la galería', 'error');
    }
});

// Importar galería
document.getElementById('importBtn').addEventListener('click', async function() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput.files[0];
    
    if (!file) {
        showToast('⚠️ Por favor selecciona un archivo JSON', 'warning');
        return;
    }
    
    if (confirm('⚠️ ¿Importar galería?\n\nEsto REEMPLAZARÁ todas las fotos actuales.\n\n¿Continuar?')) {
        try {
            const reader = new FileReader();
            reader.onload = async function(e) {
                try {
                    const importedData = JSON.parse(e.target.result);
                    
                    // Validar estructura
                    if (typeof importedData !== 'object') {
                        throw new Error('Formato inválido');
                    }
                    
                    galleryData = importedData;
                    const saved = await saveGalleryDataToFirebase(galleryData);
                    
                    if (saved) {
                        showToast('✅ Galería importada exitosamente', 'success');
                        updateCountryPhotoCounts();
                        fileInput.value = '';
                    }
                } catch (error) {
                    console.error('Error al parsear JSON:', error);
                    showToast('❌ Archivo JSON inválido', 'error');
                }
            };
            reader.readAsText(file);
        } catch (error) {
            console.error('Error al importar:', error);
            showToast('❌ Error al importar la galería', 'error');
        }
    }
});

// Restaurar galería original
document.getElementById('resetBtn').addEventListener('click', async function() {
    if (confirm('⚠️ ¿RESTAURAR GALERÍA ORIGINAL?\n\nEsto ELIMINARÁ todas tus fotos y restaurará las fotos de ejemplo.\n\n¿Estás seguro?')) {
        if (confirm('⚠️⚠️ ÚLTIMA CONFIRMACIÓN\n\nTodas tus fotos se perderán.\n\n¿Continuar?')) {
            try {
                galleryData = JSON.parse(JSON.stringify(originalGalleryData));
                const saved = await saveGalleryDataToFirebase(galleryData);
                
                if (saved) {
                    showToast('✅ Galería restaurada a su estado original', 'success');
                    updateCountryPhotoCounts();
                    
                    // Recargar la página después de 1 segundo
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                }
            } catch (error) {
                console.error('Error al restaurar:', error);
                showToast('❌ Error al restaurar la galería', 'error');
            }
        }
    }
});