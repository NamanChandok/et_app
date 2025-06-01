<template>
    <div>
        <h2 class="text-lg font-semibold my-4">Charging Stations Map</h2>
        <div id="map" class="w-full h-[600px]"></div>
    </div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted } from "vue";
import { apiFetch } from "../services/api";

onMounted(async () => {
    let x = await apiFetch("/stations");
    const stations = x.data;

    const map = L.map("map").setView([28.6139, 77.209], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    stations.forEach((station) => {
        const marker = L.marker([
            station.location.lat,
            station.location.lng,
        ]).addTo(map);
        marker.bindPopup(`
      <h1><b>${station.name}</b></h1><br>
      <b>Status:</b> ${station.status}<br>
      <b>Output:</b> ${station.powerOutput} kW<br>
      <b>Connector:</b> ${station.connectorType}
    `);
        if (station.status === "active") {
            marker.setIcon(
                L.icon({
                    iconUrl:
                        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
                    shadowUrl:
                        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                }),
            );
        } else {
            marker.setIcon(
                L.icon({
                    iconUrl:
                        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
                    shadowUrl:
                        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                }),
            );
        }
    });
});
</script>
