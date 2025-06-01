<template>
    <div class="space-y-2 mt-4">
        <h2 class="text-xl font-semibold">Add new Charging Station</h2>

        <p class="text-gray-600">
            Enter details below to create a new charging station.
        </p>
        <form
            @submit.prevent="submit"
            class="grid md:grid-cols-2 gap-2 py-2 max-w-4xl"
        >
            <div class="flex flex-col gap-1 items-start">
                <label class="text-sm font-semibold">Name</label>
                <input
                    v-model="name"
                    placeholder="Station Name"
                    required
                    class="border-2 border-gray-300 rounded-md p-2 w-full focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div class="flex flex-col gap-1 items-start">
                <label class="text-sm font-semibold">Location</label>
                <div class="flex gap-2 w-full">
                    <input
                        v-model="latitude"
                        type="number"
                        placeholder="Latitude"
                        step="0.000001"
                        min="-90"
                        max="90"
                        required
                        class="border-2 border-gray-300 rounded-md p-2 w-full focus:border-blue-500 focus:ring-blue-500"
                    />
                    <input
                        v-model="longitude"
                        type="number"
                        placeholder="Longitude"
                        step="0.000001"
                        min="-180"
                        max="180"
                        required
                        class="border-2 border-gray-300 rounded-md p-2 w-full focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div class="flex flex-col gap-1 items-start">
                <label class="text-sm font-semibold">Status</label>
                <select
                    v-model="status"
                    class="border-2 border-gray-300 rounded-md p-2 w-full focus:border-blue-500 focus:ring-blue-500"
                >
                    <option disabled value="">Select status</option>
                    <option value="active" selected>Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <div class="flex flex-col gap-1 items-start">
                <label class="text-sm font-semibold">Power Output</label>
                <input
                    v-model="powerOutput"
                    placeholder="0-350 kW"
                    type="number"
                    min="0"
                    max="350"
                    required
                    class="border-2 border-gray-300 rounded-md p-2 w-full focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div class="flex flex-col gap-1 items-start">
                <label class="text-sm font-semibold">Connector Type</label>
                <select
                    v-model="connectorType"
                    class="border-2 border-gray-300 rounded-md p-2 w-full focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="" disabled>Select a connector type</option>
                    <option value="CCS">CCS</option>
                    <option value="CHAdeMO">CHAdeMO</option>
                    <option value="Type2">Type2</option>
                    <option value="Tesla">Tesla</option>
                </select>
            </div>
            <div class="flex flex-col gap-1 items-start">
                <label class="text-sm font-semibold">Created By</label>
                <input
                    :value="createdBy"
                    disabled
                    placeholder="@username"
                    class="border-2 bg-gray-100 border-gray-300 rounded-md p-2 w-full focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <button
                class="bg-black text-white w-full px-4 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
            >
                Create
            </button>
            <router-link
                to="/chargers"
                class="hover:bg-gray-100 transition-all text-center w-full px-4 py-2 rounded-md cursor-pointer"
            >
                Cancel
            </router-link>
        </form>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiFetch } from "../services/api";
import { useRouter } from "vue-router";

const name = ref("");
const latitude = ref("");
const longitude = ref("");
const status = ref("");
const connectorType = ref("");
const powerOutput = ref("");
const error = ref("");

const router = useRouter();

async function submit() {
    const body = {
        name: name.value,
        location: {
            lat: latitude.value,
            lng: longitude.value,
        },
        status: status.value,
        connectorType: connectorType.value,
        powerOutput: powerOutput.value,
    };
    let x = await apiFetch("/stations/create", "POST", body);
    if (x.success === true) {
        router.push("/chargers");
    } else {
        error.value = x.message;
    }
}

const createdBy = ref("");

async function fetchCurrentUser() {
    try {
        const response = await apiFetch("/auth/profile");
        if (response.success && response.data) {
            createdBy.value = `@${response.data.user.username}`;
        }
    } catch (e) {
        console.error("Failed to fetch current user:", e);
    }
}

onMounted(fetchCurrentUser);
</script>
