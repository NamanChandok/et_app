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
        <div class="mt-4 flex flex-wrap gap-3">
            <div>
                <select
                    v-model="filters.status"
                    class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none"
                >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            <div>
                <select
                    v-model="filters.connectorType"
                    class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none"
                >
                    <option value="">All Connector Types</option>
                    <option value="CCS">CCS</option>
                    <option value="CHAdeMO">CHAdeMO</option>
                    <option value="Type2">Type 2</option>
                    <option value="Tesla">Tesla</option>
                </select>
            </div>

            <div>
                <select
                    v-model="filters.powerOutput"
                    class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none"
                >
                    <option value="">All Power Outputs</option>
                    <option value="slow">Slow (< 7kW)</option>
                    <option value="fast">Fast (7-22kW)</option>
                    <option value="rapid">Rapid (22-50kW)</option>
                    <option value="ultra_rapid">Ultra Rapid (> 100kW)</option>
                </select>
            </div>

            <button
                @click="resetFilters"
                class="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-100 transition-colors cursor-pointer"
            >
                Reset Filters
            </button>
        </div>

        <div class="mt-4">
            <div v-if="filteredStations.length === 0" class="text-center">
                No chargers found.
            </div>
            <div v-else>
                <Charger
                    v-for="station in filteredStations"
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
import { ref, onMounted, computed } from "vue";
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

const filters = ref({
    status: "",
    connectorType: "",
    powerOutput: "",
});

function resetFilters() {
    filters.value = {
        status: "",
        connectorType: "",
        powerOutput: "",
    };
}

const filteredStations = computed(() => {
    return stations.value.filter((station) => {
        if (filters.value.status && station.status !== filters.value.status) {
            return false;
        }
        if (
            filters.value.connectorType &&
            station.connectorType !== filters.value.connectorType
        ) {
            return false;
        }

        if (filters.value.powerOutput) {
            const powerOutput = station.powerOutput || 0;

            if (filters.value.powerOutput === "slow" && powerOutput >= 7) {
                return false;
            } else if (
                filters.value.powerOutput === "fast" &&
                (powerOutput < 7 || powerOutput > 22)
            ) {
                return false;
            } else if (
                filters.value.powerOutput === "rapid" &&
                (powerOutput < 22 || powerOutput > 100)
            ) {
                return false;
            } else if (
                filters.value.powerOutput === "ultra_rapid" &&
                powerOutput <= 100
            ) {
                return false;
            }
        }

        return true;
    });
});
</script>
