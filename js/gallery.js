// Array con las imágenes y textos
const images = [
    { src: '../images/cuadro_palmeras.jpg', caption: 'Cuadro palmeras' },
    { src: '../images/cuadro_playa.jpg', caption: 'Cuadro playa' },
    { src: '../images/cuadro_ventana.jpg', caption: 'Cuadro ventana' },
];

// Selección del contenedor de la galería
const galleryContainer = document.getElementById('gallery');

// Verifica si el contenedor existe
if (galleryContainer) {
    // Crea las imágenes dinámicamente
    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.caption;
        img.className = 'gallery-image';
        img.dataset.index = index; // Para identificar la imagen en el lightbox
        img.addEventListener('click', openLightbox);
        galleryContainer.appendChild(img);
    });
} else {
    console.error('No se encontró el contenedor de la galería.');
}

// Lightbox
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-content">
        <img id="lightbox-image" src="" alt="">
        <p id="lightbox-caption"></p>
        <button id="prev">❮</button>
        <button id="next">❯</button>
        <button id="close">✖</button>
    </div>
`;
document.body.appendChild(lightbox);

// Función para abrir el lightbox
function openLightbox(e) {
    const index = parseInt(e.target.dataset.index, 10);
    showImage(index);
    lightbox.style.display = 'flex';
}

// Función para mostrar una imagen en el lightbox
let currentIndex = 0;
function showImage(index) {
    const { src, caption } = images[index];
    document.getElementById('lightbox-image').src = src;
    document.getElementById('lightbox-caption').textContent = caption;
    currentIndex = index;
}

// Navegación en el lightbox
document.getElementById('prev').addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(newIndex);
});

document.getElementById('next').addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % images.length;
    showImage(newIndex);
});

// Cerrar el lightbox
document.getElementById('close').addEventListener('click', () => {
    lightbox.style.display = 'none';
});

