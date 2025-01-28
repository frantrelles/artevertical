// Inicializar el mapa
const map = L.map("map").setView([43.3619, -5.8494], 14); // Coordenadas de Oviedo

// Añadir capa base de OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Añadir marcador para la ubicación del negocio
const businessLocation = [43.366702, -5.847602]; // Coordenadas de Arte Vertical
L.marker(businessLocation).addTo(map).bindPopup("Arte Vertical - Nuestra ubicación").openPopup();

// Intentar obtener la ubicación del usuario
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLocation = [position.coords.latitude, position.coords.longitude];

            // Añadir marcador para el usuario
            L.marker(userLocation)
                .addTo(map)
                .bindPopup("Tu ubicación")
                .openPopup();

            // Centrar el mapa entre las dos ubicaciones
            const bounds = L.latLngBounds(userLocation, businessLocation);
            map.fitBounds(bounds);

            // Añadir la ruta entre el usuario y el negocio
            L.Routing.control({
                waypoints: [
                    L.latLng(userLocation), // Ubicación del usuario
                    L.latLng(businessLocation), // Ubicación del negocio
                ],
                routeWhileDragging: true,
            }).addTo(map);
        },
        () => {
            alert("No se pudo obtener tu ubicación.");
        }
    );
} else {
    alert("Tu navegador no soporta geolocalización.");
}

function showRoute() {
    if (userLocation) {
        L.Routing.control({
            waypoints: [
                L.latLng(userLocation[0], userLocation[1]), // Ubicación del usuario
                L.latLng(businessLocation[0], businessLocation[1]) // Ubicación del negocio
            ],
            routeWhileDragging: true
        }).addTo(map);
    } else {
        alert('No se pudo obtener tu ubicación.');
    }
}
