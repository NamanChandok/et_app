<template>
    <div class="space-y-2 mt-4">
        <div v-if="loading" class="text-center py-8">
            Loading station data...
        </div>
        <div v-else-if="notFound" class="text-center py-8">
            <p class="text-lg font-semibold">Station not found</p>
            <router-link
                to="/chargers"
                class="text-blue-500 underline mt-2 inline-block"
                >Back to stations</router-link
            >
        </div>
        <div v-else>
            <h2 class="text-xl font-semibold">Update Charging Station</h2>
            <p class="text-gray-600">
                Update details for {{ name }} charging station.
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
                        <option value="active">Active</option>
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
                        <option value="" disabled>
                            Select a connector type
                        </option>
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
                    :disabled="isSaving"
                    class="bg-black text-white w-full px-4 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer disabled:bg-gray-400"
                >
                    {{ isSaving ? "Saving..." : "Update" }}
                </button>
                <router-link
                    to="/chargers"
                    class="hover:bg-gray-100 transition-all text-center w-full px-4 py-2 rounded-md cursor-pointer"
                >
                    Cancel
                </router-link>
            </form>
            <p v-if="e_error" class="text-red-500 mt-2">{{ e_error }}</p>

            <div class="mt-6 pt-6 border-t border-gray-200">
                <h3 class="text-lg font-semibold text-red-600">Danger Zone</h3>
                <p class="text-gray-600">
                    Deleting a charging station is permanent and cannot be
                    undone.
                </p>
                <button
                    @click="showDeleteConfirm = true"
                    class="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer transition-colors"
                >
                    Delete Station
                </button>
            </div>

            <div
                v-if="showDeleteConfirm"
                class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            >
                <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h3 class="text-xl font-bold">Delete Station</h3>
                    <p class="my-4">
                        Are you sure you want to delete
                        <b>{{ name }}</b
                        >? This action cannot be undone.
                    </p>
                    <div class="flex justify-end gap-2">
                        <button
                            @click="showDeleteConfirm = false"
                            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            @click="deleteStation"
                            :disabled="isDeleting"
                            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400 transition-colors cursor-pointer"
                        >
                            {{ isDeleting ? "Deleting..." : "Delete" }}
                        </button>
                    </div>
                </div>
            </div>

            <p v-if="d_error" class="text-red-500 mt-2">{{ d_error }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiFetch } from "../services/api";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const loading = ref(true);
const notFound = ref(false);
const isSaving = ref(false);
const isDeleting = ref(false);
const showDeleteConfirm = ref(false);
const name = ref("");
const latitude = ref("");
const longitude = ref("");
const status = ref("");
const connectorType = ref("");
const powerOutput = ref("");
const createdBy = ref("");
const e_error = ref("");
const d_error = ref("");

onMounted(async () => {
    const stationId = route.params.id;
    if (!stationId) {
        notFound.value = true;
        loading.value = false;
        return;
    }

    try {
        const response = await apiFetch(`/stations/${stationId}`);
        const station = response.data;

        if (!station) {
            notFound.value = true;
            loading.value = false;
            return;
        }

        name.value = station.name;
        latitude.value = station.location.lat;
        longitude.value = station.location.lng;
        status.value = station.status;
        connectorType.value = station.connectorType;
        powerOutput.value = station.powerOutput;
        createdBy.value = station.createdBy
            ? `@${station.createdBy.username}`
            : "";

        loading.value = false;
    } catch (e) {
        e_error.value = e.message || "Failed to load station data";
        loading.value = false;
    }
});

async function submit() {
    const stationId = route.params.id;
    if (!stationId) return;

    isSaving.value = true;
    e_error.value = "";

    const body = {
        name: name.value,
        location: {
            lat: parseFloat(latitude.value),
            lng: parseFloat(longitude.value),
        },
        status: status.value,
        connectorType: connectorType.value,
        powerOutput: parseFloat(powerOutput.value),
    };

    try {
        const response = await apiFetch(`/stations/${stationId}`, "PUT", body);
        if (response.success) {
            router.push("/chargers");
        } else {
            e_error.value = response.message || "Failed to update station";
        }
    } catch (e) {
        e_error.value = e.message || "Failed to update station";
    } finally {
        isSaving.value = false;
    }
}

async function deleteStation() {
    const stationId = route.params.id;
    if (!stationId) return;

    isDeleting.value = true;
    d_error.value = "";

    try {
        const response = await apiFetch(`/stations/${stationId}`, "DELETE");
        if (response.success) {
            router.push("/chargers");
        } else {
            d_error.value = response.message || "Failed to delete station";
            showDeleteConfirm.value = false;
        }
    } catch (e) {
        d_error.value = e.message || "Failed to delete station";
        showDeleteConfirm.value = false;
    } finally {
        isDeleting.value = false;
    }
}
</script>
