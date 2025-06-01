<script setup>
import { ref, watch } from "vue";
import { apiFetch } from "../services/api";
import { useRouter } from "vue-router";

const props = defineProps({
    station: { type: Object, required: true },
    isOpen: { type: Boolean, required: true },
});

const emit = defineEmits(["toggle"]);

const router = useRouter();
const contentHeight = ref("0px");
const contentElement = ref(null);
const showDeleteModal = ref(false);
const isDeleting = ref(false);

watch(
    () => props.isOpen,
    (isOpen) => {
        if (isOpen) {
            contentHeight.value = contentElement.value
                ? `${contentElement.value.scrollHeight}px`
                : "auto";
        } else {
            contentHeight.value = "0px";
        }
    },
    { immediate: true },
);

function confirmDelete() {
    showDeleteModal.value = true;
}

async function deleteStation() {
    isDeleting.value = true;

    try {
        const response = await apiFetch(
            `/stations/${props.station._id}`,
            "DELETE",
        );

        if (response.success) {
            // Refresh the page to update the list
            router.go();
        } else {
            alert(response.message || "Failed to delete station");
        }
    } catch (e) {
        alert(e.message || "Failed to delete station");
    } finally {
        isDeleting.value = false;
        showDeleteModal.value = false;
    }
}
</script>

<template>
    <div class="mb-2">
        <div
            @click="$emit('toggle', station._id)"
            class="bg-gray-100 p-3 rounded cursor-pointer flex justify-between items-center relative z-10"
            :class="{ 'rounded-b-none': isOpen }"
        >
            <span class="flex items-center gap-2 text-gray-500"
                ><b class="font-semibold text-black text-lg">{{
                    station.name
                }}</b>
                <i
                    class="text-green-400 text-2xl"
                    :class="{ 'text-red-500': station.status === 'inactive' }"
                    >•</i
                >
                {{ station.status }}</span
            >
            <svg
                class="w-4 h-4 transition-transform duration-300 ease-in-out"
                :class="{ 'transform rotate-45': isOpen }"
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
        </div>
        <div
            class="bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out border-gray-200"
            :style="{
                height: contentHeight,
                opacity: isOpen ? 1 : 0,
                borderTopWidth: isOpen ? '1px' : '0px',
            }"
        >
            <div ref="contentElement" class="p-3 rounded-b space-y-1">
                <p class="text-gray-700 flex items-end gap-1">
                    <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            stroke-width="2"
                        />
                        <path
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7 12h2l2-4 2 8 2-4h2"
                        />
                    </svg>
                    <span class="font-semibold text-black">Status:</span>
                    {{ station.status }}
                </p>
                <p class="text-gray-700 flex items-end gap-1">
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
                            d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        />
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                        />
                    </svg>

                    <span class="font-semibold text-black">Location:</span>
                    {{ Math.abs(station.location.lat) }}°
                    {{ station.location.lat > 0 ? "N" : "S" }},
                    {{ Math.abs(station.location.lng) }}°
                    {{ station.location.lng > 0 ? "E" : "W" }}
                </p>
                <p class="text-gray-700 flex items-end gap-1">
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
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13 2L4.09 12.97A1 1 0 0 0 5 14.5h4.5l-2 7.5 8.91-10.97A1 1 0 0 0 15.5 9.5H11l2-7.5Z"
                        />
                    </svg>
                    <span class="font-semibold text-black">Power Output:</span>
                    {{ station.powerOutput }} kW
                </p>
                <p class="text-gray-700 flex items-end gap-1">
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
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8 2v4m8-4v4M7 6h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-3l-1 6h-2l-1-6H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                        />
                    </svg>
                    <span class="font-semibold text-black"
                        >Connector Type:</span
                    >
                    {{ station.connectorType }}
                </p>
                <p class="text-gray-700 flex items-end gap-1">
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
                            stroke-width="2"
                            d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>

                    <span class="font-semibold text-black"> Created By:</span>
                    @{{ station.createdBy.username }}
                </p>

                <div class="mt-4 flex justify-end gap-2">
                    <router-link
                        :to="`/update/${station._id}`"
                        class="border border-gray-300 px-4 py-1 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        Edit
                    </router-link>
                    <button
                        @click="confirmDelete"
                        class="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                    >
                        Delete
                    </button>
                </div>

                <div
                    v-if="showDeleteModal"
                    class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
                >
                    <div
                        class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
                    >
                        <h3 class="text-xl font-bold">Delete Station</h3>
                        <p class="my-4">
                            Are you sure you want to delete
                            <b>{{ station.name }}</b
                            >? This action cannot be undone.
                        </p>
                        <div class="flex justify-end gap-2">
                            <button
                                @click="showDeleteModal = false"
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
            </div>
        </div>
    </div>
</template>
