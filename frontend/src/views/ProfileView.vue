<template>
    <div>
        <div class="mt-4">
            <h3 class="font-semibold text-xl">@{{ user.username }}</h3>
            <p class="text-gray-600">
                {{ user.email }}
            </p>
        </div>
        <div class="flex justify-between items-center mt-4">
            <h2>Your Chargers • {{ stations.length }}</h2>
            <button @click="fetchStations" class="cursor-pointer">
                <svg
                    class="w-5 h-5"
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
        </div>
        <ul>
            <li
                v-for="station in stations"
                :key="station._id"
                class="bg-gray-100"
            >
                {{ station.name }} - {{ station.status }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiFetch } from "../services/api";

const stations = ref([]);
const user = ref({});

async function fetchStations() {
    try {
        let x = await apiFetch("/auth/profile");
        console.log(x);
        stations.value = x.data.stations;
        user.value = x.data.user;
    } catch (e) {
        alert(e.message);
    }
}

onMounted(fetchStations);
</script>
