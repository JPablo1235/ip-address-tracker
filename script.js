const apiKey = "at_kk6TdAwmUCfk2YDEdhFzokREITeR8";
const ipInput = document.getElementById("ipInput");
const searchBtn = document.getElementById("searchBtn");

const ipText = document.getElementById("ip"); // Elementos para mostrar datos
const locationText = document.getElementById("location"); // ubicacion
const timezoneText = document.getElementById("timezone"); // zona horaria
const ispText = document.getElementById("isp"); // proveedor de servicios de internet

// Inicializa el mapa
const map = L.map("map").setView([0, 0], 2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

let marker;

// Función para obtener datos IP
async function getIPData(ip = "") {
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;
  const response = await fetch(url);
  const data = await response.json();

  ipText.textContent = data.ip;
  locationText.textContent = `${data.location.city}, ${data.location.country}`;
  timezoneText.textContent = `UTC ${data.location.timezone}`;
  ispText.textContent = data.isp;

  const { lat, lng } = data.location;
  map.setView([lat, lng], 13);

  if (marker) marker.remove();
  marker = L.marker([lat, lng]).addTo(map);
}

// Buscar IP al hacer clic
searchBtn.addEventListener("click", () => {
  getIPData(ipInput.value);
});

// Cargar IP del usuario al iniciar
getIPData();

