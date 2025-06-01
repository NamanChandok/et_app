<template>
    <div>
        <div class="flex justify-between items-center mt-4">
            <h2 class="text-lg font-semibold">
                All Charging Stations • {{ stations.length }}
            </h2>
            <span class="flex items-center gap-2">
                <router-link
                    to="/create"
                    class="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded-md transition-colors hover:bg-gray-100"
                    ><svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 12h14m-7 7V5"
                        />
                    </svg>
                    Add
                </router-link>
                <button
                    @click="fetchStations"
                    class="cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                    <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
                        />
                    </svg>
                </button>
            </span>
        </div>

        <div class="mt-4">
            <div v-if="stations.length === 0" class="text-center">
                No chargers found.
            </div>
            <div v-else>
                <Charger
                    v-for="station in stations"
                    :key="station._id"
                    :station="station"
                    :is-open="openStationId === station._id"
                    @toggle="toggleStation"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiFetch } from "../services/api";
import Charger from "../components/Charger.vue";

const stations = ref([]);
const openStationId = ref(null);

async function fetchStations() {
    try {
        let x = await apiFetch("/stations");
        stations.value = x.data;
    } catch (e) {
        alert(e.message);
    }
}

function toggleStation(stationId) {
    if (openStationId.value === stationId) {
        openStationId.value = null;
    } else {
        openStationId.value = stationId;
    }
}

onMounted(fetchStations);
</script>
